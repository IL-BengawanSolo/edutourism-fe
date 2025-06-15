import SearchBar from "@/components/SearchBar.jsx";
import React, { useEffect, useRef, useState } from "react";
import DestinationCard from "@/components/DestinationCard.jsx";
import FilterBar from "@/components/FilterBar.jsx";
import DestinationMap from "@/components/DestinationMap.jsx";
import useFetchDestinations from "@/api/useFetchDestinations.js";
import { Link } from "react-router-dom";

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
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.slug}`}
              className="no-underline"
            >
              <DestinationCard
                variant="row"
                title={destination.name}
                category={destination.categories || []}
                placeType={destination.place_type}
                location={destination.region_name}
                minPrice={destination.ticket_price_min}
                maxPrice={destination.ticket_price_max}
                isFree={
                  (Number(destination.ticket_price_min) === 0 ||
                    !destination.ticket_price_min) &&
                  (Number(destination.ticket_price_max) === 0 ||
                    !destination.ticket_price_max)
                }
              />
            </Link>
          ))}
          {/* <Link to="/destinations/id" className="no-underline">
            <DestinationCard
              variant="row"
              title="Kampung Batik Laweyan"
              categoryBadge={["Budaya", "Seni", "Kreativitas"]}
              ageType="all"
            />
          </Link>
          <DestinationCard
            variant="row"
            ageType="remaja"
            imageSrc="/src/assets/images/kauman.jpg"
            title="Kampung Batik Kauman"
            categoryBadge={["Budaya", "Seni", "Kreativitas"]}
            price="Gratis"
          />
          <DestinationCard
            variant="row"
            ageType="all"
            imageSrc="/src/assets/images/radya.jpg"
            title="Museum Radya Pustaka"
            categoryBadge={["Sejarah", "Budaya"]}
            subCategoryBadge="Museum Sejarah"
            price="5.000 - 20.000"
          />
          <DestinationCard variant="row" ageType="anak" />
          <DestinationCard variant="row" ageType="all" /> */}
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
