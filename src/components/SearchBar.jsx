import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "react-iconly";

const SearchBar = ({ value, onSubmit }) => {
  const [input, setInput] = useState(value || "");
  const debounceRef = useRef(null);

  // Sync input jika value dari parent berubah
  useEffect(() => {
    setInput(value || "");
  }, [value]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (onSubmit) onSubmit(newValue);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(input); // Submit saat tombol "Cari" ditekan
  };

  return (
    <form
      className="relative mx-auto flex w-full items-center"
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search destinations"
    >
      <label htmlFor="search-destinations" className="sr-only">
        Cari destinasi wisata
      </label>
      <Search
        className="text-neutral-grey absolute left-10"
        aria-hidden="true"
      />
      <Input
        id="search-destinations"
        type="text"
        placeholder="Cari destinasi wisata..."
        aria-label="Cari destinasi wisata"
        value={input}
        onChange={handleInputChange}
        className="placeholder:text-neutral-grey text-neutral-dark-grey h-14 rounded-xl border-none bg-white pr-20 pl-24 !text-lg !font-medium placeholder:text-lg placeholder:font-medium placeholder:italic"
      />
      <Button
        size="custom"
        variant="lite"
        type="submit"
        className="absolute right-2 h-10 rounded-xl px-8"
      >
        Cari
      </Button>
    </form>
  );
};

export default SearchBar;
