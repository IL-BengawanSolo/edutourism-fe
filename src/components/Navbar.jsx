import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/index.js";
import { Menu, X } from "lucide-react"; // Ikon untuk menu hamburger
import Logo from "./Logo.jsx";
import { Link } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4 px-6 lg:px-16">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden gap-x-12 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path} // Ganti href dengan to
              className="text-neutral-dark-grey hover:text-pr-blue-800 text-lg font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden items-center space-x-4 lg:flex">
          <Link to="/login">
            <Button size="custom">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="custom" variant="lite">
              Register
            </Button>
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
                <Link
                  to={link.path} // Ganti href dengan to
                  className="text-neutral-dark-grey hover:text-pr-blue-800 text-lg font-medium"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <div className="mt-4 flex flex-col items-center gap-y-2">
              <Link to="/login" className="w-full">
                <Button size="custom" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register" className="w-full">
                <Button size="custom" variant="lite" className="w-full">
                  Register
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
