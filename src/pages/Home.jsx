import React from "react";

import HeroSection from "@/sections/HeroSection.jsx";
import FeaturesSection from "@/sections/FeaturesSection.jsx";
import TopDestinationsCarousel from "@/sections/TopDestinationsCarousel.jsx";
import ChatBotTooltip from "@/components/ChatBotTooltip.jsx";

const Home = () => {
  return (
    <> 
      <ChatBotTooltip />
      <HeroSection />
      <FeaturesSection />
      <TopDestinationsCarousel />
    </>
  );
};

export default Home;
