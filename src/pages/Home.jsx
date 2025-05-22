import React, { useEffect, useRef, useState } from "react";

import HeroSection from "@/sections/HeroSection.jsx";
import FeaturesSection from "@/sections/FeaturesSection.jsx";
import TopDestinationsCarousel from "@/sections/TopDestinationsCarousel.jsx";

// import { Chat } from "@/components/ui/chat";

const Home = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const [openChat, setOpenChat] = useState(false);
  const chatRef = useRef(null);

  // // Dummy state for Blazity Chatbox
  // const [messages, setMessages] = useState([
  //   { id: 1, role: "assistant", content: "Halo, ada yang bisa saya bantu?" },
  // ]);
  // const [input, setInput] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // // Dummy handle input change
  // const handleInputChange = (e) => setInput(e.target.value);

  // // Dummy handle submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;
  //   setIsLoading(true);
  //   setMessages((prev) => [
  //     ...prev,
  //     { id: prev.length + 1, role: "user", content: input },
  //   ]);
  //   setInput("");
  //   setTimeout(() => {
  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         id: prev.length + 1,
  //         role: "assistant",
  //         content: "Ini jawaban dummy dari EduBot.",
  //       },
  //     ]);
  //     setIsLoading(false);
  //   }, 800);
  // };

  // Dummy stop handler
  const stop = () => setIsLoading(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Close chat if click outside chatbox (optional UX)
  useEffect(() => {
    if (!openChat) return;
    function handleClick(e) {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setOpenChat(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openChat]);

  return (
    <>
      {/* Chatbot Button & Tooltip */}
      <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end sm:right-6 sm:bottom-6">
        {showTooltip && (
          <div className="animate-fade-in mb-2 max-w-xs rounded-lg border border-gray-200 bg-white/90 px-4 py-2 text-sm text-gray-800 shadow-lg">
            Halo, aku <b>EduBot</b>! Kalau kamu ada pertanyaan klik di sini ya.
          </div>
        )}
        {!openChat && (
          <img
            src="/src/assets/home/chat-bot-icon.png"
            alt="Chat Bot Icon"
            className="h-12 w-12 cursor-pointer object-contain transition-transform duration-300 hover:scale-105 sm:h-16 sm:w-16 md:h-20 md:w-20"
            onClick={() => {
              setOpenChat((v) => !v);
              setShowTooltip(false);
            }}
          />
        )}
        {/* Chatbox */}
        {openChat && (
          <div
            ref={chatRef}
            className="animate-fade-in mt-3 flex h-[640px] w-[320px] max-w-xs flex-col rounded-2xl bg-white p-4 shadow-2xl sm:w-sm sm:max-w-sm"
          >
            <div className="flex flex-row items-center justify-between border-b pb-4 font-bold">
              <div className="flex items-center gap-2">
                <img
                  src="/src/assets/home/chat-bot-icon.png"
                  alt="Chat Bot Icon"
                  className="h-6 w-6 object-contain sm:h-8 sm:w-8 md:h-12 md:w-12"
                />
                <h3 className="text-pr-blue-900">EduBot</h3>
              </div>
              <button
                className="hover:text-pr-blue-800 ml-2 text-xl font-bold text-gray-400"
                onClick={() => setOpenChat(false)}
                aria-label="Tutup chat"
                type="button"
              >
                ×
              </button>
            </div>
            {/* <Chat
              className="mt-4 flex-1 overflow-y-auto"
              messages={messages}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isGenerating={isLoading}
              stop={stop}
              append={true}
            /> */}
          </div>
        )}
      </div>
      <HeroSection />
      <FeaturesSection />
      <TopDestinationsCarousel />
    </>
  );
};

export default Home;
