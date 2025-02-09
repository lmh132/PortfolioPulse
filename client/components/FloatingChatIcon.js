"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Trash2 } from "lucide-react";
import { ChatComponent } from "./ChatComponent";

export const FloatingChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clearChat = () => {
    localStorage.removeItem("chatMessages");
    window.location.reload(); // This will reload the page, resetting the chat
  };

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
      <div
        className={`text-black fixed right-0 top-0 h-full w-96 bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        <div className="h-full p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Chat</h2>
            <Button variant="ghost" size="icon" onClick={clearChat}>
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-grow overflow-hidden">
            <ChatComponent />
          </div>
        </div>
      </div>
    </>
  );
};
