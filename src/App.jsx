import React from "react";
import { Button } from "@/components/ui/button";
import DestinationCard from "./components/DestinationCard.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-neutral-bg items-center justify-center gap-5">
        <SearchBar />
        <Button size="custom">Custom Default</Button>
        <Button size="custom" variant="lite">
          Custom Lite
        </Button>
        <DestinationCard variant="col" />
        <DestinationCard variant="row" />
      </div>
    </>
  );
}

export default App;
