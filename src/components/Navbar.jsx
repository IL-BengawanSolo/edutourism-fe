import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/index.js";
import { Menu, X } from "lucide-react"; // Ikon untuk menu hamburger

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between p-4 px-6 lg:px-16">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/src/assets/images/logo.png"
            alt="Logo"
            className="h-12 w-12 rounded-full"
          />
          <h1 className="text-pr-blue-800 ml-4 text-xl font-bold">EduSolo</h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden gap-x-12 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-neutral-dark-grey hover:text-pr-blue-800 text-lg font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden items-center space-x-4 lg:flex">
          <Button size="custom">Login</Button>
          <Button size="custom" variant="lite">
            Register
          </Button>
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
                <a
                  href={link.path}
                  className="text-neutral-dark-grey hover:text-pr-blue-800 text-lg font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <div className="mt-4 flex flex-col items-center gap-y-2">
              <Button size="custom" className="w-full">
                Login
              </Button>
              <Button size="custom" variant="lite" className="w-full">
                Register
              </Button>
            </div>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
