import React from "react";

const Logo = () => {
  return (
    <a href="/" className="flex items-center">
      <img
        src="/images/logo.png"
        alt="Logo"
        className="h-12 w-12 rounded-full"
      />
      <h1 className="text-pr-blue-800 ml-4 text-xl font-bold">EduSolo</h1>
    </a>
  );
};

export default Logo;
