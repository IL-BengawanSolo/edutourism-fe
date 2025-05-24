import SearchBar from "@/components/SearchBar.jsx";
import React, { useEffect, useRef, useState } from "react";
import DestinationCard from "@/components/DestinationCard.jsx";
import FilterBar from "@/components/FilterBar.jsx";
import DestinationMap from "@/components/DestinationMap.jsx";
import useFetchDestinations from "@/api/useFetchDestinations.js";

const Destination = () => {
  const { destinations } = useFetchDestinations();
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);
  console.log(destinations);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const { top } = stickyRef.current.getBoundingClientRect();
      setIsSticky(top <= 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-container mx-auto w-11/12 sm:w-10/12">
      <section
        ref={stickyRef}
        className={`bg-neutral-bg sticky top-0 z-10 py-4 transition-shadow duration-200 sm:py-6 ${
          isSticky ? "shadow-[0px_16px_8px_-8px_rgba(0,0,0,0.12)]" : ""
        }`}
      >
        <SearchBar />
        <FilterBar />
      </section>

      {/* Main Layout */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Destination Cards */}
        <div className="col-span-1 flex flex-col gap-4">
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
        </div>

        {/* Map */}
        <div className="sticky top-28 col-span-1 h-[calc(100vh-1rem)]">
          <DestinationMap destinations={destinations} />
        </div>
      </section>
    </div>
  );
};

export default Destination;
