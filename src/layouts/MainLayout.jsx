import React from "react";
import Navbar from "@/components/Navbar.jsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-neutral-bg">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;