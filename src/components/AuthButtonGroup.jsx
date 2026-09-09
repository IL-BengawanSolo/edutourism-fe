import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Logout, Setting } from "react-iconly";
import { useAuth } from "@/components/utils/AuthProvider";

const AuthButtonGroup = ({ buttonClass = "" }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    // Tombol login dengan redirect ke halaman sekarang
    const redirect = encodeURIComponent(
      location.pathname + location.search + location.hash,
    );
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
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="custom"
            className="w-full rounded-sm font-semibold"
          >
            <span>
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary text-white">
                  {user.first_name?.[0]?.toUpperCase() || ""}
                  {user.last_name?.[0]?.toUpperCase() || ""}
                </AvatarFallback>
              </Avatar>
            </span>
            <span className="text-neutral-black ml-2 font-semibold">
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
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user.role === "admin" && (
            <>
              <DropdownMenuItem asChild>
                <Link
                  to="/admin/destinations"
                  className="text-neutral-black flex items-center gap-2"
                >
                  <Setting className="h-4 w-4" />
                  Kelola Destinasi
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
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
