import React, { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar.jsx";
import { Outlet } from "react-router-dom";

const ChatSupport = lazy(() => import("@/components/ChatSupport.jsx"));

const MainLayout = () => {
  return (
    <div className="bg-neutral-bg flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <ChatSupport />
      </Suspense>
    </div>
  );
};

export default MainLayout;
