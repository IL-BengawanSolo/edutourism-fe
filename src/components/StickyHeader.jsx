import React, { useRef, useEffect, useState } from "react";

const StickyHeader = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const { top } = stickyRef.current.getBoundingClientRect();
      setIsSticky(top <= 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={stickyRef}
      className={`bg-neutral-bg sticky top-0 z-10 py-3 transition-shadow duration-200 sm:py-5 ${
        isSticky ? "shadow-[0px_4px_10px_-4px_rgba(0,0,0,0.16)]" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default StickyHeader;