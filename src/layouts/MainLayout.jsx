import React, { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar.jsx";
import { Outlet, useLocation } from "react-router-dom";

const ChatSupport = lazy(() => import("@/components/ChatSupport.jsx"));

const MainLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="bg-neutral-bg flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      {!isAdmin && (
        <Suspense fallback={null}>
          <ChatSupport />
        </Suspense>
      )}
    </div>
  );
};

export default MainLayout;
