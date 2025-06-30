import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Logout } from "react-iconly";
import { useAuth } from "@/components/utils/AuthProvider";

const AuthButtonGroup = ({ buttonClass = ""}) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    // Tombol login dengan redirect ke halaman sekarang
    const redirect = encodeURIComponent(location.pathname + location.search + location.hash);
    return (
      <Link to={`/login?redirect=${redirect}`} className={buttonClass}>
        <Button size="custom" className="w-full">
          Masuk Akun
        </Button>
      </Link>
    );
  }

  // Jika sudah login, tampilkan dropdown profil dan tombol logout
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            size="custom"
            className="rounded-sm font-semibold w-full"
          >
            <span>
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary text-white">
                  {user.first_name?.[0]?.toUpperCase() || ""}
                  {user.last_name?.[0]?.toUpperCase() || ""}
                </AvatarFallback>
              </Avatar>
            </span>
            <span className="text-neutral-black font-semibold ml-2">
              {user.first_name
                ? user.first_name.slice(0, 12).charAt(0).toUpperCase() +
                  user.first_name.slice(1, 12)
                : ""}
              {user.last_name
                ? " " +
                  user.last_name.slice(0, 12).charAt(0).toUpperCase() +
                  user.last_name.slice(1, 12)
                : ""}
            </span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={logout} className="text-neutral-black">
            Logout
            <Logout className="text-neutral-black h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthButtonGroup;