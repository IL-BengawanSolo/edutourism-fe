import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-neutral-bg">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;