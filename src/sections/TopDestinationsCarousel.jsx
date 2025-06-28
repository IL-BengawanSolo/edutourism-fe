import { Link } from "react-router-dom";


import React from "react";
import CarouselDestinationRow from "@/components/destination-card/CarouselDestinationRow.jsx";


const TopDestinationsCarousel = () => {
  return (
    <section className="max-container mx-auto mt-20 mb-10 w-10/12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-center text-3xl font-bold sm:text-left sm:text-5xl">
          Top Destinations
        </h1>
        <Link
          to="/destinations"
          className="text-pr-blue-800 hover:text-pr-blue-900 text-center text-xl font-semibold sm:text-right sm:text-3xl"
        >
          Lihat semua
        </Link>
      </div>
      {/* <CarouselDestinationRow /> */}
    </section>
  );
};

export default TopDestinationsCarousel;
