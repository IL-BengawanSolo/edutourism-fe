import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" aria-label="EduSolo home" className="flex items-center">
      <img
        src="/images/logo.png"
        alt="EduSolo logo"
        className="h-12 w-12 rounded-full"
      />
      <span className="text-pr-blue-800 ml-4 text-xl font-bold">EduSolo</span>
    </Link>
  );
};

export default Logo;
