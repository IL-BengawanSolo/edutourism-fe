import { Button } from "@/components/ui/button.jsx";
import React from "react";
("/src/assets/images/girl.png");
const Recommendation = () => {
  return (
    <>
      <div className="bg-neutral-light-grey flex w-full flex-row items-center justify-start xl:justify-between ">
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
        <div className="flex flex-1 flex-col items-center px-4 md:max-w-[712px] ">
          <h1 className="text-pr-blue-950 text-md text-center font-bold md:text-3xl xl:text-5xl line-clamp-1 ">
            Test Preferensi Liburan
          </h1>
          <p className="text-pr-blue-900 mt-1 text-left text-xs font-medium md:mt-4 md:text-base lg:mt-6 lg:text-center xl:text-xl">
            Jawablah pertanyaan sesuai keadaan dan preferensi liburan kamu,
            <br className="hidden md:block" /> dan dapatkan rekomendasi tempat
            dengan bantuan AI kami!
          </p>

          {/* Progress Bar */}
          <div className="mt-3 flex w-full max-w-xs items-center gap-2 md:mt-4 lg:max-w-[512px] xl:max-w-[712px] lg:mt-8">
            <div className="h-3 flex-1 rounded-full bg-white lg:h-5">
              <div className="bg-pr-blue-800 h-full w-2/5 rounded-full"></div>
            </div>
            <span className="text-pr-blue-800 text-xs font-bold whitespace-nowrap md:text-base lg:text-xl">
              2/5
            </span>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden max-w-[350px] min-w-[120px] md:w-auto xl:block mt-6 items-center">
          <img
            src="/src/assets/images/plane.png"
            alt="Airplane"
            className="h-auto w-[355px] object-cover pb-22"
          />
        </div>
      </div>


      <div className="relative flex h-[85vh] items-center justify-center">
        <img
          src="/src/assets/images/not-login.png"
          alt="Not Login Image"
          className="h-[500px] rounded-lg object-cover"
        />
      </div>
      <div className="relative flex h-[85vh] items-center justify-center">
        <img
          src="/src/assets/images/not-test.png"
          alt="Not Login Image"
          className="h-[500px] rounded-lg object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center pt-24">
          <Button
            variant="secondary"
            size="custom"
            className="max-w-xs rounded-full text-lg font-bold shadow-lg transition-all duration-150 hover:scale-105 hover:shadow-xl"
          >
            Mulai Tes Rekomendasi
          </Button>
        </div>
      </div> 
    </>
  );
};

export default Recommendation;
