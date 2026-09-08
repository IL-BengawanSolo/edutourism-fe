import React from "react";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/sections/HeroSection.jsx";
import FeaturesSection from "@/sections/FeaturesSection.jsx";
import TopDestinationsCarousel from "@/sections/TopDestinationsCarousel.jsx";
import ChatBotTooltip from "@/components/ChatBotTooltip.jsx";

const Home = () => {
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
      </Helmet>
      <ChatBotTooltip />
      <HeroSection />
      <FeaturesSection />
      <TopDestinationsCarousel />
    </>
  );
};

export default Home;
