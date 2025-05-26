import AutoSizeResponsiveAsset from "@/components/ResponsiveAsset.jsx";
import { Button } from "@/components/ui/button.jsx";
import { heroAssets } from "@/constants/index.js";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-pr-blue-50 relative h-[calc(100vh-72px)] w-full overflow-hidden">
      <div className="pointer-events-none select-none">
        {heroAssets.map((asset, idx) => (
          <AutoSizeResponsiveAsset
            key={asset.alt + idx}
            src={asset.src}
            alt={asset.alt}
            className={asset.className}
            {...asset.style}
          />
        ))}
      </div>

      <section className="relative top-1/4 z-10 mx-auto flex w-[90vw] max-w-lg flex-col items-center justify-center rounded-xl bg-white/75 px-4 py-8 text-center backdrop-blur-xs sm:top-[8.66%] md:max-w-3xl lg:max-w-5xl lg:bg-transparent lg:backdrop-blur-none 2xl:max-w-[1440px]">
        <h1 className="text-pr-blue-900 xs:text-3xl text-2xl font-extrabold sm:text-4xl md:text-5xl 2xl:text-7xl">
          Rencanakan Perjalanan EduTourism Solo Raya Bersama Keluarga!
        </h1>
        <p className="text-pr-blue-900 mt-[3.5%] max-w-4xl text-base font-medium sm:text-lg md:text-xl 2xl:max-w-5xl 2xl:text-2xl">
          Dengan bantuan AI, siap memberikan tempat wisata edutourism di kota
          Solo Raya dengan menyesuaikan prefrensi kamu, keluarga kamu, dan anak
          kamu!
        </p>

        <Link to="/recommendations">
          <Button
            size="custom"
            variant="secondary"
            className="text-pr-blue-950 group relative mt-12 rounded-full px-6 py-3 text-base font-semibold shadow-lg transition-transform duration-300 hover:scale-105 sm:text-lg 2xl:px-8 2xl:py-8 2xl:text-2xl"
          >
            <span className="relative z-10 flex items-center gap-2 font-bold">
              <img
                src="/src/assets/icons8-ai-48.png"
                alt="AI Icon"
                className="pointer-events-none h-8 w-8 select-none"
              />
              Temukan Rekomendasi
            </span>
          </Button>
        </Link>
      </section>
    </section>
  );
};

export default HeroSection;
