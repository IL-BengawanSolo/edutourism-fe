import React from "react";

import { getPriceLabel } from "@/lib/utils.js";

import { useParams } from "react-router-dom";
import useFetchDestinationBySlug from "@/api/useFetchDestinationBySlug.js";
import CarouselDestinationRow from "@/components/CarouselDestinationRow.jsx";

import DestinationImages from "@/components/DestinationImages.jsx";
import DestinationGeneralInfo from "@/components/DestinationGeneralInfo.jsx";
import DestinationFacilities from "@/components/DestinationFacilities.jsx";
import DestinationLocation from "@/components/DestinationLocation.jsx";
import DestinationOpeningHours from "@/components/DestinationOpeningHours.jsx";
import DestinationTabs from "@/components/DestinationTabs.jsx";

const DestinationDetail = () => {
  const { slug } = useParams();
  const { destination, loading, error } = useFetchDestinationBySlug(slug);
  console.log(destination);

  if (loading) {
    return <div className="py-10 text-center">Memuat data destinasi...</div>;
  }
  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        Gagal memuat data destinasi.
      </div>
    );
  }
  if (!destination) {
    return <div className="py-10 text-center">Destinasi tidak ditemukan.</div>;
  }

  const minPrice = destination.ticket_price_min;
  const maxPrice = destination.ticket_price_max;
  const priceLabel = getPriceLabel(minPrice, maxPrice);

  return (
    <>
      <section className="max-container mx-auto w-full sm:w-10/12">
        <DestinationImages />
        <DestinationTabs />
        <DestinationGeneralInfo
          destination={destination}
          priceLabel={priceLabel}
        />
        <DestinationFacilities facilities={destination.facilities} />
        <div className="mt-4 mb-4 grid grid-cols-1 gap-4 rounded-none lg:grid-cols-6">
          <DestinationLocation destination={destination} />
          <DestinationOpeningHours opening_hours={destination.opening_hours} />
        </div>
      </section>
      <section className="max-container mx-auto mt-10 mb-40 w-10/12">
        <div className="flex flex-col justify-center gap-6 sm:flex-row sm:items-center">
          <h1 className="text-center text-2xl font-bold sm:text-4xl">
            Tempat Wisata Serupa
          </h1>
        </div>
        <CarouselDestinationRow />
      </section>
    </>
  );
};

export default DestinationDetail;
