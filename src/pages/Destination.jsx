import SearchBar from "@/components/SearchBar.jsx";
import React, { useEffect, useRef, useState } from "react";
import DestinationCard from "@/components/DestinationCard.jsx";
import FilterBar from "@/components/FilterBar.jsx";
import DestinationMap from "@/components/DestinationMap.jsx";
import useFetchDestinations from "@/api/useFetchDestinations.js";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Destination = () => {
  const { destinations } = useFetchDestinations();
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);
  console.log("destinations:", destinations);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current) return;
      const { top } = stickyRef.current.getBoundingClientRect();
      setIsSticky(top <= 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Infinite scroll state
  const [visible, setVisible] = useState(10); // tampilkan 10 item awal

  const fetchMoreData = () => {
    setVisible((prev) => prev + 10); // tambah 10 setiap scroll bawah
  };

  return (
    <div>
      <div
        ref={stickyRef}
        className={`bg-neutral-bg sticky top-0 z-10 py-3 transition-shadow duration-200 sm:py-5 ${
          isSticky ? "shadow-[0px_4px_10px_-4px_rgba(0,0,0,0.16)]" : ""
        }`}
      >
        <section className="max-container mx-auto w-11/12 sm:w-10/12">
          <SearchBar />
          <FilterBar />
        </section>
      </div>

      {/* Main Layout */}
      <section className="max-container mx-auto grid w-11/12 grid-cols-1 gap-6 sm:w-10/12 lg:grid-cols-5">
        {/* Destination Cards */}
        <div className="col-span-3 flex flex-col gap-4">
          <InfiniteScroll
            dataLength={Math.min(visible, destinations.length)}
            next={fetchMoreData}
            hasMore={visible < destinations.length}
            loader={<h4 className="py-4 text-center">Memuat...</h4>}
            endMessage={
              <p className="py-4 text-center text-neutral-500">
                Semua destinasi sudah ditampilkan.
              </p>
            }
            className="flex flex-col gap-4"
          >
            {destinations.slice(0, visible).map((destination) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.slug}`}
                className="no-underline"
              >
                <DestinationCard
                  variant="row"
                  name={destination.name}
                  categories={destination.categories || []}
                  placeTypes={destination.place_types}
                  region_name={destination.region_name}
                  minPrice={destination.ticket_price_min}
                  maxPrice={destination.ticket_price_max}
                  ageCategories={destination.age_categories}
                />
              </Link>
            ))}
          </InfiniteScroll>
        </div>

        {/* Map */}
        <div className="sticky top-38 col-span-1 h-[calc(100vh-14rem)] lg:col-span-2">
          <DestinationMap destinations={destinations} />
        </div>
      </section>
    </div>
  );
};

export default Destination;
