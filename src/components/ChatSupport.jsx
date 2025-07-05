import { Send } from "lucide-react";
import {
  ChatBubble,
  ChatBubbleAvatar,
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

export default function ChatSupport() {
  const messages = [
    {
      id: 1,
      message: "Halo, ada yang bisa saya bantu?",
      sender: "bot",
    },
    {
      id: 2,
      message: "Saya ingin tahu tentang tempat wisata di Solo.",
      sender: "user",
    },
    {
      id: 3,
      message: "",
      sender: "bot",
      isLoading: true,
    },
  ];
  return (
    <ExpandableChat size="md" position="bottom-right">
      <ExpandableChatHeader className="flex-col items-start justify-center text-center">
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/images/home/chat-bot-icon.png"
            alt="Chat Bot Icon"
            className="h-6 w-6 object-contain sm:h-8 sm:w-8 md:h-10 md:w-10 rotate-y-180"
          />
          <h3 className="text-pr-blue-900 text-xl font-bold">EduBot</h3>
        </div>
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => {
            const variant = message.sender === "user" ? "sent" : "received";
            return (
              <ChatBubble key={message.id} variant={variant}>
                {/* <ChatBubbleAvatar fallback={variant === "sent" ? "US" : "AI"} /> */}
                <ChatBubbleMessage
                  isLoading={message.isLoading}
                  className={`text-sm font-medium ${message.sender === "user" ? "bg-pr-blue-600" : "bg-neutral-bg"} `}
                >
                  {message.message}
                </ChatBubbleMessage>
              </ChatBubble>
            );
          })}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter>
        <form className="relative flex gap-2">
          <ChatInput className="bg-background min-h-12 shadow-none" placeholder="Tanya sesuatu ke Edu Bot..." />
          <Button
            className="absolute top-1/2 right-2 size-8 -translate-y-1/2 transform"
            size="icon"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
