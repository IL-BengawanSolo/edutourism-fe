import Logo from "@/components/Logo.jsx";
import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-neutral-bg">
      <main>
        <div className="grid min-h-screen lg:grid-cols-2">
          <div className="bg-muted relative hidden lg:block">
            <img
              src="/src/assets/images/auth-bg.png"
              alt="Image"
              className="absolute inset-0 h-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <Logo />
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
