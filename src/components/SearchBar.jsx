import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "react-iconly";

const SearchBar = ({ value, onSubmit }) => {
  const [input, setInput] = useState(value || "");

  // Sync input jika value dari parent berubah
  React.useEffect(() => {
    setInput(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(input);
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