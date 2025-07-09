import React, { useState, useEffect, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPriceLabel } from "@/lib/utils.js";

import { useParams } from "react-router-dom";
import useFetchDestinationBySlug from "@/api/useFetchDestinationBySlug.js";
import useFetchSimilarDestinations from "@/api/useFetchSimilarDestinations.js";
import CarouselDestinationRow from "@/components/destination-card/CarouselDestinationRow.jsx";

import DestinationImages from "@/components/destination-detail/DestinationImages.jsx";
import DestinationGeneralInfo from "@/components/destination-detail/DestinationGeneralInfo.jsx";
import DestinationLocation from "@/components/destination-detail/DestinationLocation.jsx";
import DestinationOpeningHours from "@/components/destination-detail/DestinationOpeningHours.jsx";
import DestinationTabs from "@/components/destination-detail/DestinationTabs.jsx";
import DestinationListSection from "@/components/destination-detail/DestinationListSection.jsx";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import DestinationRating from "@/components/destination-detail/DestinationRating.jsx";

const TAB_SECTIONS = [
  { id: "general-info", sectionId: "general-info" },
  { id: "activities", sectionId: "activities" },
  { id: "facilities", sectionId: "facilities" },
  { id: "location", sectionId: "location" },
  { id: "opening-hours", sectionId: "opening-hours" },
];

const SCROLL_OFFSET = 60; // px, sesuaikan dengan tinggi sticky header/tab

const DestinationDetail = () => {
  const [activeTab, setActiveTab] = useState("general-info");

  // Scroll handler untuk update active tab
  const handleScroll = useCallback(() => {
    let found = "general-info";
    for (let i = 0; i < TAB_SECTIONS.length; i++) {
      const { id, sectionId } = TAB_SECTIONS[i];
      const el = document.getElementById(sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top - SCROLL_OFFSET <= 0) {
          found = id;
        }
      }
    }
    setActiveTab(found);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const { slug } = useParams();
  const { destination, loading, error } = useFetchDestinationBySlug(slug);
  const { similar } = useFetchSimilarDestinations(slug);
  console.log(slug);

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
        <DestinationImages destination_uuid={destination.uuid} />
        <DestinationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <DestinationGeneralInfo
          destination={destination}
          priceLabel={priceLabel}
        />
        <DestinationListSection
          id="activities"
          title="Aktivitas"
          items={destination.activities}
          icon={faPersonRunning}
        />
        <DestinationListSection
          id="facilities"
          title="Fasilitas"
          items={destination.facilities}
        />
        <div className="mt-4 mb-4 grid grid-cols-1 gap-4 rounded-none lg:grid-cols-6">
          <DestinationLocation destination={destination} />
          <DestinationOpeningHours opening_hours={destination.opening_hours} />
        </div>
        <DestinationRating />
      </section>
      <section className="max-container mx-auto mt-10 mb-40 w-10/12">
        <div className="flex flex-col justify-center gap-6 sm:flex-row sm:items-center">
          <h1 className="text-center text-2xl font-bold sm:text-4xl">
            Tempat Wisata Serupa
          </h1>
        </div>
        <CarouselDestinationRow destinations={similar} />
      </section>
    </>
  );
};

export default DestinationDetail;
