"use client";

import React, { createContext, useContext, useState, useRef, useCallback } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Paws 🐾 your AI adoption assistant. How can I help you find your perfect pet today?", suggestions: ["Find a pet for me", "How does adoption work?", "What are the fees?"] }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [petContext, setPetContext] = useState(null);

  // Use sessionId stored in localStorage (set on first use)
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
  const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);

  // Called by "Ask Paws about this pet" buttons
  const startChatWithPet = useCallback((pet) => {
    setPetContext(pet);
    setIsOpen(true);
    const petMessage = `Tell me about ${pet.name}, a ${pet.age} ${pet.breed} available in ${pet.location}.`;
    sendMessage(petMessage, pet.id);
  }, []);

  const sendMessage = useCallback(async (userText, contextPetId = null) => {
    if (!userText.trim() || isStreaming) return;

    const sessionId = getSessionId();
    setSuggestions([]);

    // Add user message to UI immediately
    setMessages(prev => [...prev, { role: "user", content: userText }]);
    
    // Add a placeholder for the streaming AI response
    setMessages(prev => [...prev, { role: "assistant", content: "", streaming: true }]);
    setIsStreaming(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: userText, contextPetId })
      });

      if (!response.ok || !response.body) {
        throw new Error("Bad response from server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // Keep the incomplete last line in the buffer

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "chunk") {
                setMessages(prev => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  updated[updated.length - 1] = { ...last, content: last.content + data.content };
                  return updated;
                });
              } else if (data.type === "suggestions") {
                setSuggestions(data.suggestions);
              } else if (data.type === "done") {
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { ...updated[updated.length - 1], streaming: false };
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error("Chat stream error:", error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Sorry, I'm having trouble connecting right now. Please make sure the backend server is running!", streaming: false };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [isStreaming]);

  return (
    <ChatContext.Provider value={{ isOpen, messages, isStreaming, suggestions, petContext, toggleChat, openChat, closeChat, sendMessage, startChatWithPet }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}
