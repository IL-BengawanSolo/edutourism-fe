import Logo from "@/components/Logo.jsx";
import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-neutral-bg">
      <main>
        <div className="grid min-h-screen lg:grid-cols-2">
          {/* Kiri: Gambar */}
          <div className="sticky top-0 z-10 hidden h-screen w-full lg:block">
            <img
              src="/src/assets/images/auth-bg.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover object-left"
            />
          </div>
          {/* Kanan: Form */}
          <div className="flex min-h-screen flex-col justify-center p-6 md:px-8 md:py-4 ">
            <header className="mb-4 flex items-center">
              <Logo />
            </header>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-md">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
