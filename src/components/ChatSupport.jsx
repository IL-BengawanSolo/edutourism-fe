import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import {
  ChatBubble,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble.js";
import { ChatInput } from "@/components/ui/chat/chat-input.js";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat.js";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list.js";
import { Button } from "./ui/button.jsx";
import ReactMarkdown from "react-markdown";

const LOCAL_STORAGE_KEY = "edubot_chat_history";

export default function ChatSupport() {
  const initialBotMessage = {
    role: "assistant",
    content: "Halo! 👋 Ada yang bisa EduBot bantu hari ini?",
  };

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Jika chat kosong, tambahkan sapaan awal
        return parsed.length > 0 ? parsed : [initialBotMessage];
      }
      // Jika belum ada chat, tambahkan sapaan awal
      return [initialBotMessage];
    } catch {
      return [initialBotMessage];
    }
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5500/api/v1/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Maaf, tidak ada jawaban dari AI.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Terjadi kesalahan pada server.",
        },
      ]);
    }
    setIsLoading(false);
    setInput("");
  };

  // Optional: Tombol reset chat
  const handleReset = () => {
    setMessages([initialBotMessage]);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([initialBotMessage]),
    );
  };

  return (
    <ExpandableChat size="md" position="bottom-right">
      <ExpandableChatHeader className="flex-col items-start justify-center text-center">
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/images/home/chat-bot-icon.png"
            alt="Chat Bot Icon"
            className="h-6 w-6 rotate-y-180 object-contain sm:h-8 sm:w-8 md:h-10 md:w-10"
          />
          <h3 className="text-pr-blue-900 text-xl font-bold">EduBot</h3>
        </div>
        <Button
          size="sm"
          className="mt-2"
          variant="outline"
          onClick={handleReset}
        >
          Reset Chat
        </Button>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message, idx) => {
            const variant = message.role === "user" ? "sent" : "received";
            return (
              <ChatBubble key={idx} variant={variant}>
                <ChatBubbleMessage
                  isLoading={
                    isLoading &&
                    idx === messages.length - 1 &&
                    message.role !== "user"
                  }
                  className={`text-sm font-medium ${message.role === "user" ? "bg-pr-blue-600" : "bg-neutral-bg"} `}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </ChatBubbleMessage>
              </ChatBubble>
            );
          })}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter>
        <form
          className="relative flex gap-2"
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!isLoading && input.trim()) handleSubmit(e);
            }
          }}
        >
          <ChatInput
            minRows={1}
            maxRows={6}
            className="bg-background min-h-12 shadow-none"
            placeholder="Tanya sesuatu ke Edu Bot..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <div className="flex items-end justify-end">
            <Button
              size="icon"
              type="submit"
              disabled={isLoading || !input.trim()}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
