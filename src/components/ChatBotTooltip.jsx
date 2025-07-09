import React, { useEffect, useState } from "react";

const ChatBotTooltip = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 6000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="fixed z-50 flex flex-col items-end right-5 bottom-25">
      {showTooltip && (
        <div className="animate-fade-in mb-2 max-w-xs rounded-lg border border-gray-200 bg-white/90 px-4 py-2 text-sm text-gray-800 shadow-lg">
          Halo, aku <b>EduBot</b>! Kalau kamu ada pertanyaan klik di sini ya.
        </div>
      )}
    </div>
  );
};

export default ChatBotTooltip;
