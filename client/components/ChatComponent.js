"use client";

import { useChat } from "ai/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ChatComponent = () => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({ api: "/api/chat" });

  useEffect(() => {
    // Load messages from localStorage when component mounts
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [setMessages]);

  useEffect(() => {
    // Save messages to localStorage whenever they change
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                m.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t mt-auto">
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow mr-2"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
};
