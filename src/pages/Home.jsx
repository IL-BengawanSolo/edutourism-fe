import React from "react";

import HeroSection from "@/sections/HeroSection.jsx";
import FeaturesSection from "@/sections/FeaturesSection.jsx";
import TopDestinationsCarousel from "@/sections/TopDestinationsCarousel.jsx";
import ChatSupport from "@/components/ChatSupport.jsx";
import ChatBotTemp from "@/components/ChatBotTemp.jsx";
import ChatBotTooltip from "@/components/ChatBotTooltip.jsx";

const Home = () => {
  return (
    <> 
      {/* <ChatBotTemp /> */}
      <ChatBotTooltip />
      {/* <ChatSupport /> */}
      <HeroSection />
      <FeaturesSection />
      <TopDestinationsCarousel />
    </>
  );
};

export default Home;
