"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from "react";

export interface ChatMessage {
  role: "user" | "assistant" | "model" | "system";
  content: string;
  suggestions?: string[];
  streaming?: boolean;
}

export interface ChatContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  isStreaming: boolean;
  suggestions: string[];
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (userText: string, contextPetId?: string | null) => Promise<void>;
  startChatWithPet: (pet: any) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Initial suggestions shown in the welcome message
const INITIAL_SUGGESTIONS = ["Find a pet for me", "How does adoption work?", "What are the fees?"];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Paws 🐾 your AI adoption assistant. How can I help you find your perfect pet today?",
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  // Seed initial suggestions so chips show on first open
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);

  // Use a ref to track streaming state inside async functions to avoid stale closures
  const isStreamingRef = useRef(false);

  const getSessionId = () => {
    if (typeof window === "undefined") return "default-session";
    let id = localStorage.getItem("paws_session_id");
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("paws_session_id", id);
    }
    return id;
  };

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);

  const sendMessage = useCallback(async (userText: string, contextPetId: string | null = null) => {
    // Guard: don't send if already streaming or input is blank
    if (!userText?.trim() || isStreamingRef.current) return;

    const sessionId = getSessionId();
    setSuggestions([]);
    isStreamingRef.current = true;
    setIsStreaming(true);

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    // Add empty assistant placeholder for streaming
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", streaming: true },
    ]);

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        "https://pawmatchai-server.onrender.com";

      const response = await fetch(`${apiBaseUrl}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: userText, contextPetId }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is null — streaming not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let receivedContent = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // keep incomplete last line in buffer

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw || raw === "[DONE]") continue;

          let data: any;
          try {
            data = JSON.parse(raw);
          } catch {
            // Skip malformed SSE lines
            continue;
          }

          if (data.type === "chunk" && typeof data.content === "string") {
            receivedContent = true;
            setMessages((prev) => {
              const updated = [...prev];
              const last = { ...updated[updated.length - 1] };
              last.content = last.content + data.content;
              updated[updated.length - 1] = last;
              return updated;
            });
          } else if (data.type === "suggestions" && Array.isArray(data.suggestions)) {
            setSuggestions(data.suggestions);
          } else if (data.type === "done") {
            // Mark last message as no longer streaming
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                streaming: false,
              };
              return updated;
            });
          } else if (data.type === "error") {
            // Surface server-sent errors to the user
            throw new Error(data.message || "The AI returned an error");
          }
        }
      }

      // If the stream ended without any content, show a fallback
      if (!receivedContent) {
        throw new Error("Empty response from AI");
      }

    } catch (error) {
      console.error("Chat stream error:", error);
      // Replace the empty placeholder with a friendly error message
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Woof! I'm having trouble connecting right now. Please make sure the backend server is running and try again! 🐾",
          streaming: false,
        };
        return updated;
      });
      // Restore suggestion chips so user can still interact
      setSuggestions(["Try again", "Browse pets instead", "How does adoption work?"]);
    } finally {
      isStreamingRef.current = false;
      setIsStreaming(false);
    }
  }, []); // No deps needed — all state updates go through setters or ref

  // Called by "Ask Paws about this pet" buttons on pet detail pages
  const startChatWithPet = useCallback(
    (pet: any) => {
      setIsOpen(true);
      const petMessage = `Tell me about ${pet.name}, a ${pet.age} ${pet.breed} available in ${pet.location}.`;
      sendMessage(petMessage, pet.id);
    },
    [sendMessage],
  );

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        messages,
        isStreaming,
        suggestions,
        toggleChat,
        openChat,
        closeChat,
        sendMessage,
        startChatWithPet,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}
