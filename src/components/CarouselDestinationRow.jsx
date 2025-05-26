import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DestinationCard from "@/components/DestinationCard.jsx";

const CarouselDestinationRow = () => {
  return (
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
  );
};

export default CarouselDestinationRow;
