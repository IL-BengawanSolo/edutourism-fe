import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/index.js";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { Link, NavLink, useLocation } from "react-router";
import { useAuth } from "@/components/utils/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Logout } from "react-iconly";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Ganti warna background jika di path "/"
  const headerBg = location.pathname === "/" ? "bg-pr-blue-50" : "bg-white";

  return (
    <header className={headerBg}>
      <div className="flex items-center justify-between p-4 px-4 lg:p-3 lg:px-16">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden gap-x-12 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={() => {
                // Custom active: aktif jika path sekarang diawali dengan link.path
                const active =
                  link.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.path);
                return `line-clamp-1 text-lg ${
                  active
                    ? "text-pr-blue-800 font-bold"
                    : "text-neutral-dark-grey hover:text-pr-blue-800 font-medium"
                }`;
              }}
              end={link.path === "/"}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden items-center space-x-4 lg:flex">
          {!user ? (
            <Link to="/login">
              <Button size="custom">Masuk Akun</Button>
            </Link>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="custom" className="rounded-sm font-semibold">
                    <span>
                      <Avatar className="size-8">
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback className="bg-primary text-white">
                          {" "}
                          {user.first_name?.[0]?.toUpperCase() || ""}
                          {user.last_name?.[0]?.toUpperCase() || ""}
                        </AvatarFallback>
                      </Avatar>
                    </span>
                    <span className="text-neutral-black font-semibold">
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
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuItem onClick={logout} className="text-neutral-black">Logout
                    <Logout className="h-4 w-4 text-neutral-black" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-neutral-dark-grey hover:text-pr-blue-800 flex items-center justify-center rounded-md p-2 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="bg-white shadow-sm lg:hidden">
          <ul className="flex flex-col items-center gap-y-4 p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={() =>
                    // Custom active: aktif jika path sekarang diawali dengan link.path
                    `line-clamp-1 text-lg ${
                      link.path === "/"
                        ? location.pathname === "/"
                          ? "text-pr-blue-800 font-bold"
                          : "text-neutral-dark-grey hover:text-pr-blue-800 font-medium"
                        : location.pathname.startsWith(link.path)
                          ? "text-pr-blue-800 font-bold"
                          : "text-neutral-dark-grey hover:text-pr-blue-800 font-medium"
                    }`
                  }
                  end
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <div className="mt-4 flex flex-col items-center gap-y-2">
              <Link to="/login" className="w-full">
                <Button size="custom" className="w-full">
                  Masuk Akun
                </Button>
              </Link>
            </div>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
