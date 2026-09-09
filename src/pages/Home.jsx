import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/sections/HeroSection.jsx";
import FeaturesSection from "@/sections/FeaturesSection.jsx";
import TopDestinationsCarousel from "@/sections/TopDestinationsCarousel.jsx";
import ChatBotTooltip from "@/components/ChatBotTooltip.jsx";

const Home = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: "EduSolo",
    description: "AI-powered educational tourism platform for Solo Raya",
    url: "https://edusolo-fe.vercel.app",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surakarta",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
  };
  return (
    <>
      <Helmet>
        <title>
          EduSolo — EduTourism Solo Raya | AI Recommendations & Family Trips
        </title>
        <meta
          name="description"
          content="Discover Solo Raya's best educational tourism with AI-powered recommendations, interactive maps, and 24/7 EduBot. Perfect for families and kids."
        />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <ChatBotTooltip />
      <HeroSection />
      <FeaturesSection />
      <TopDestinationsCarousel />
    </>
  );
};

export default Home;
