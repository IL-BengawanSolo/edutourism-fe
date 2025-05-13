import SearchBar from "@/components/SearchBar.jsx";
import React from "react";
import DestinationCard from "@/components/DestinationCard.jsx";

const Destination = () => {
  return (
    <div className="w-full max-w-10/12 mx-auto">
      {/* Search Bar */}
      <section className="my-8">
        <SearchBar />
      </section>

      {/* Main Layout */}
      <section className="grid grid-cols-1 gap-9 lg:grid-cols-2">
        {/* Destination Cards */}
        <div className="col-span-1 flex flex-col gap-4">
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
        </div>

        {/* Map */}
        <div className="col-span-1 h-[500px] rounded-lg bg-amber-400 shadow-md">
          <p className="flex h-full items-center justify-center text-lg font-medium text-white">
            Peta
          </p>
        </div>
      </section>
    </div>
  );
};

export default Destination;
