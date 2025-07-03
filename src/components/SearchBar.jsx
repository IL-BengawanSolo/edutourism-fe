import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "react-iconly";

const SearchBar = ({ value, onSubmit }) => {
  const [input, setInput] = useState(value || "");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Sync input jika value dari parent berubah
  useEffect(() => {
    setInput(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);

    // Debounce logic
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear timeout jika user mengetik lagi
    }

    const timeout = setTimeout(() => {
      if (onSubmit) onSubmit(newValue); // Auto-submit setelah 300ms
    }, 700); // Delay 500ms

    setDebounceTimeout(timeout);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(input); // Submit saat tombol "Cari" ditekan
  };

  return (
    <form className="relative mx-auto flex w-full items-center" onSubmit={handleSubmit}>
      <Search className="text-neutral-grey absolute left-10" />
      <Input
        type="text"
        placeholder="Cari destinasi wisata..."
        value={input}
        onChange={handleInputChange}
        className="placeholder:text-neutral-grey text-neutral-dark-grey h-14 rounded-xl border-none bg-white pr-20 pl-24 !text-lg !font-medium placeholder:text-lg placeholder:font-medium placeholder:italic"
      />
      <Button
        size="custom"
        variant="lite"
        type="submit"
        className="absolute right-2 px-8 h-10 rounded-xl"
      >
        Cari
      </Button>
    </form>
  );
};

export default SearchBar;