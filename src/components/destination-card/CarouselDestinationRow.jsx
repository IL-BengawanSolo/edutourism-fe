import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DestinationCard from "@/components/destination-card/DestinationCard.jsx";
import { Link } from "react-router-dom";

const CarouselDestinationRow = ({ destinations }) => {
  return (
    <div className="mt-16 gap-4 lg:gap-8">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {destinations.map((destination, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
      
                <Link
                  key={destination.slug}
                  to={`/destinations/${destination.slug}`}
                  className="no-underline"
                >
                  <DestinationCard
                    variant="col"
                    name={destination.name}
                    categories={destination.categories || []}
                    placeTypes={destination.place_types}
                    region_name={destination.region_name}
                    minPrice={destination.ticket_price_min}
                    maxPrice={destination.ticket_price_max}
                    ageCategories={destination.age_categories}   
                    shortPrice
                    shortAgeIcon
                  />
                </Link>
          
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
