import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DestinationCard from "@/components/DestinationCard.jsx";

import React from 'react'

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
        <div className="mt-16 gap-4 lg:gap-8">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                  <div className="p-1">
                    <DestinationCard variant="row" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
  )
}

export default TopDestinationsCarousel