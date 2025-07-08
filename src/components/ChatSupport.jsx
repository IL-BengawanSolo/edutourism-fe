import React, { useState, useEffect } from "react";
import { Send, Trash2 } from "lucide-react";
import {
  ChatBubble,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
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
import useChatbotFetch from "@/api/useChatbotFetch.js";

const LOCAL_STORAGE_KEY = "edubot_chat_history";

export default function ChatSupport() {
  const initialBotMessage = {
    role: "assistant",
    content: "Halo! 👋 Ada yang bisa EduBot bantu hari ini?",
    timestamp: getTimestamp(),
  };

  function getTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const [showConfirm, setShowConfirm] = useState(false);

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
  const { fetchChatbot, loading: isLoading } = useChatbotFetch();

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = {
      role: "user",
      content: input,
      timestamp: getTimestamp(),
    };
    const backendMessages = messages
      .map(({ role, content }) => ({ role, content }))
      .concat({
        role: "user",
        content: input,
      });
    setMessages([...messages, userMessage]);
    try {
      const data = await fetchChatbot(backendMessages);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Maaf, tidak ada jawaban dari AI.",
          timestamp: getTimestamp(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Terjadi kesalahan pada server.",
          timestamp: getTimestamp(),
        },
      ]);
    }
    setInput("");
  };

  // Optional: Tombol reset chat
  const handleReset = () => {
    setMessages([initialBotMessage]);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([initialBotMessage]),
    );
    setShowConfirm(false);
  };

  return (
    <ExpandableChat size="sm" position="bottom-right">
      <ExpandableChatHeader className="relative flex-col items-start justify-center text-center">
        <div className="flex min-h-12 w-full items-center gap-2">
          <img
            src="/src/assets/images/home/chat-bot-icon.png"
            alt="Chat Bot Icon"
            className="h-6 w-6 rotate-y-180 object-contain sm:h-8 sm:w-8 md:h-10 md:w-10"
          />
          <h3 className="text-pr-blue-900 text-xl font-bold">EduBot</h3>
          <Button
            size="icon"
            variant="ghost"
            className="text-state-error hover:bg-state-error/10 hover:text-state-error absolute top-2 right-14 size-12 p-2"
            title="Reset Chat"
            onClick={() => setShowConfirm(true)}
          >
            <Trash2 className="size-6" />
          </Button>
        </div>
        {/* Konfirmasi Reset */}
        {showConfirm && (
          <div className="absolute top-10 right-2 z-10 flex flex-col gap-2 rounded border bg-white p-3 shadow-md">
            <span>Yakin ingin reset chat?</span>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="destructive" onClick={handleReset}>
                Ya, Reset
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowConfirm(false)}
              >
                Batal
              </Button>
            </div>
          </div>
        )}
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
                  {message.timestamp && (
                    <ChatBubbleTimestamp timestamp={message.timestamp} />
                  )}
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
            placeholder="Tanya sesuatu ke EduBot..."
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
