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

            <CarouselItem  className="md:basis-1/1 lg:basis-1/2">
              <div className="p-1">
                <DestinationCard
                  variant="row"
                  ageType="remaja"
                  imageSrc="/src/assets/images/kauman.jpg"
                  title="Kampung Batik Kauman"
                  categoryBadge={["Budaya", "Seni", "Kreativitas"]}
                  price="Gratis"
                />
              </div>
            </CarouselItem>
            <CarouselItem  className="md:basis-1/1 lg:basis-1/2">
              <div className="p-1">
                <DestinationCard
                  variant="row"
                  ageType="all"
                  imageSrc="/src/assets/images/radya.jpg"
                  title="Museum Radya Pustaka"
                  categoryBadge={["Sejarah", "Budaya"]}
                  subCategoryBadge="Museum Sejarah"
                  price="5.000 - 20.000"
                />
              </div>
            </CarouselItem>
            
          
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselDestinationRow;
