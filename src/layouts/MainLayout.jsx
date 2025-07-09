import React from "react";
import Navbar from "@/components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import ChatSupport from "@/components/ChatSupport.jsx";

const MainLayout = () => {
  return (
    <div className="bg-neutral-bg flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <ChatSupport />
    </div>
  );
};

export default MainLayout;
