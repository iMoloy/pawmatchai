"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Paws 🐾 your AI adoption assistant. How can I help you find your perfect pet today?",
      suggestions: [
        "Find a pet for me",
        "How does adoption work?",
        "What are the fees?",
      ],
    },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

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

  const sendMessage = useCallback(async (userText, contextPetId = null) => {
    // Use ref instead of state for the guard so we don't have stale closure issues
    if (!userText?.trim() || isStreamingRef.current) return;

    const sessionId = getSessionId();
    setSuggestions([]);
    isStreamingRef.current = true;
    setIsStreaming(true);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    // Add empty assistant placeholder
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
        throw new Error(`Server error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error(
          "ReadableStream not supported or response body is null",
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? ""; // keep incomplete last line in buffer

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === "chunk") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = { ...updated[updated.length - 1] };
                last.content = last.content + data.content;
                updated[updated.length - 1] = last;
                return updated;
              });
            } else if (data.type === "suggestions") {
              setSuggestions(data.suggestions);
            } else if (data.type === "done") {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  streaming: false,
                };
                return updated;
              });
            } else if (data.type === "error") {
              throw new Error(data.message || "Stream error");
            }
          } catch {
            // Ignore malformed JSON lines
          }
        }
      }
    } catch (error) {
      console.error("Chat stream error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Woof! I'm having trouble connecting right now. Please make sure the backend server is running on port 5000 and try again! 🐾",
          streaming: false,
        };
        return updated;
      });
    } finally {
      isStreamingRef.current = false;
      setIsStreaming(false);
    }
  }, []); // No dependencies needed — uses ref for guard

  // Called by "Ask Paws about this pet" buttons
  const startChatWithPet = useCallback(
    (pet) => {
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
