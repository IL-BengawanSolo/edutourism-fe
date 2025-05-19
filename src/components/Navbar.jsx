import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/index.js";
import { Menu, X } from "lucide-react"; // Ikon untuk menu hamburger
import Logo from "./Logo.jsx";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between p-3 px-4 lg:px-16">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden gap-x-12 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `line-clamp-1 text-lg ${
                  isActive
                    ? "text-pr-blue-800 font-bold"
                    : "text-neutral-dark-grey hover:text-pr-blue-800 font-medium"
                }`
              }
              end
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden items-center space-x-4 lg:flex">
          <Link to="/login">
            <Button size="custom">Masuk Akun</Button>
          </Link>
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
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive
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
