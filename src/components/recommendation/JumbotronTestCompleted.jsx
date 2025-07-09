import React, { useEffect, useState } from "react";
import { Button } from "../ui/button.jsx";
import DestinationCard from "../destination-card/DestinationCard.jsx";
import { Link } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";

const JumbotronTestCompleted = ({
  destinations,
  onRetakeTest,
  onlyWithThumbnail = true,
  loading = false,
}) => {
  // Filter destinasi jika onlyWithThumbnail true
  const filteredDestinations = onlyWithThumbnail
    ? (destinations || []).filter((d) => !!d.thumbnail_url)
    : destinations || [];

  const [rendering, setRendering] = useState(true);

  // Skeleton loading saat render banyak card
  useEffect(() => {
    setRendering(true);
    const timeout = setTimeout(() => setRendering(false), 300); // 500ms delay
    return () => clearTimeout(timeout);
  }, [destinations]);

  if (loading || rendering) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80">
        <SpinnerCircular
          size={96}
          thickness={100}
          color="#3b82f6"
          secondaryColor="#e5e7eb"
        />
        <span className="mt-4 text-neutral-500">
          Memuat rekomendasi destinasi...
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="bg-neutral-light-grey flex w-full flex-row items-center justify-start xl:justify-between">
        {/* Left Image */}
        <div className="mt-6 flex max-w-[350px] min-w-[120px] items-center md:w-auto">
          {/* Desktop image */}
          <img
            src="/src/assets/images/recommendation/girl-heading.png"
            alt="Traveler Girl"
            className="hidden max-h-[260px] object-cover lg:block"
          />
          {/* Mobile image */}
          <img
            src="/src/assets/images/recommendation/girl-mobile.png"
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
            onClick={onRetakeTest}
          >
            Lakukan Test Ulang
          </Button>
        </div>

        {/* Right Image */}
        <div className="mt-6 hidden max-w-[350px] min-w-[120px] items-center md:w-auto xl:block">
          <img
            src="/src/assets/images/recommendation/plane-heading.png"
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

        <div className="flex w-full flex-row flex-wrap items-start justify-center gap-4">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((destination) => (
              <Link
                to={`/destinations/${destination.slug}`}
                key={destination.place_id}
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
                  imageSrc={destination.thumbnail_url}
                  match={
                    typeof destination.score === "number"
                      ? Number(destination.score).toFixed(1)
                      : destination.score
                  }
                />
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada rekomendasi destinasi yang ditemukan.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default JumbotronTestCompleted;
