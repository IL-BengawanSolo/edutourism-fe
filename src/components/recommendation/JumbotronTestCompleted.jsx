import React from "react";
import { Button } from "../ui/button.jsx";
import CarouselDestinationRow from "../CarouselDestinationRow.jsx";
import DestinationCard from "../DestinationCard.jsx";

const JumbotronTestCompleted = () => {
  return (
    <>
      <div className="bg-neutral-light-grey flex w-full flex-row items-center justify-start xl:justify-between">
        {/* Left Image */}
        <div className="mt-6 flex max-w-[350px] min-w-[120px] items-center md:w-auto">
          {/* Desktop image */}
          <img
            src="/src/assets/images/girl.png"
            alt="Traveler Girl"
            className="hidden max-h-[260px] object-cover lg:block"
          />
          {/* Mobile image */}
          <img
            src="/src/assets/images/girl-mobile.png"
            alt="Traveler Girl Mobile"
            className="block max-h-[260px] w-36 object-cover md:max-w-[220px] lg:hidden"
          />
        </div>

        {/* Center Text */}
        <div className="flex flex-1 flex-col items-center px-4 md:max-w-[712px]">
          <h1 className="text-pr-blue-950 text-md text-center font-bold md:text-2xl xl:text-4xl">
            Selamat, kamu telah berhasil menyelesaikan tes rekomendasi!
          </h1>
          <p className="text-pr-blue-900 mt-1 text-left text-xs font-medium md:mt-4 md:text-base lg:mt-6 lg:text-center xl:text-xl"></p>

          <Button
            variant="secondary"
            size="custom"
            className="mt-3 h-8 max-w-xs rounded-full text-sm font-bold shadow-lg transition-all duration-150 hover:scale-105 hover:shadow-xl md:h-10 lg:h-14 lg:min-w-[140px] lg:text-lg"
          >
            Lakukan Test Ulang
          </Button>
        </div>

        {/* Right Image */}
        <div className="mt-6 hidden max-w-[350px] min-w-[120px] items-center md:w-auto xl:block">
          <img
            src="/src/assets/images/plane.png"
            alt="Airplane"
            className="h-auto w-[355px] object-cover pb-22"
          />
        </div>
      </div>

      <section className="max-container mx-auto mt-20 mb-40 flex w-10/12 flex-col items-center justify-center gap-10">
        <div className="flex flex-col justify-center gap-6 sm:flex-row sm:items-center">
          <h1 className="text-center text-2xl font-bold sm:text-4xl">
            Rekomendasi Tempat Wisata Untukmu
          </h1>
        </div>

        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-6 sm:flex-row sm:items-stretch sm:gap-6">
          <DestinationCard
            variant="col"
            title="Kampung Batik Laweyan"
            categoryBadge={["Budaya", "Seni", "Kreativitas"]}
          />
          <DestinationCard
            variant="col"
            imageSrc="/src/assets/images/kauman.jpg"
            title="Kampung Batik Kauman"
            categoryBadge={["Budaya", "Seni", "Kreativitas"]}
            match="78% Match dengan kamu"
            price="Gratis"
          />
          <DestinationCard
            variant="col"
            imageSrc="/src/assets/images/radya.jpg"
            title="Museum Radya Pustaka"
            categoryBadge={["Sejarah", "Budaya"]}
            subCategoryBadge="Museum Sejarah"
            match="71% Match dengan kamu"
            price="5.000 - 20.000"
          />
        </div>
      </section>
    </>
  );
};

export default JumbotronTestCompleted;
