import AutoSizeResponsiveAsset from "@/components/ResponsiveAsset.jsx";
import { Button } from "@/components/ui/button.jsx";
import React from "react";
import { Link } from "react-router-dom";
("/src/assets/images/girl.png");
const Recommendation = () => {
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
          <h1 className="text-pr-blue-950 text-md line-clamp-1 text-center font-bold md:text-3xl xl:text-5xl">
            Test Preferensi Liburan
          </h1>
          <p className="text-pr-blue-900 mt-1 text-left text-xs font-medium md:mt-4 md:text-base lg:mt-6 lg:text-center xl:text-xl">
            Jawablah pertanyaan sesuai keadaan dan preferensi liburan kamu,
            <br className="hidden md:block" /> dan dapatkan rekomendasi tempat
            dengan bantuan AI kami!
          </p>

          {/* Progress Bar */}
          <div className="mt-3 flex w-full max-w-xs items-center gap-2 md:mt-4 lg:mt-8 lg:max-w-[512px] xl:max-w-[712px]">
            <div className="h-3 flex-1 rounded-full bg-white lg:h-5">
              <div className="bg-pr-blue-800 h-full w-2/5 rounded-full"></div>
            </div>
            <span className="text-pr-blue-800 text-xs font-bold whitespace-nowrap md:text-base lg:text-xl">
              2/5
            </span>
          </div>
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

      {/* <div className="relative flex h-[85vh] items-center justify-center">
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
      </div> */}

      <section className="max-container mx-auto w-10/12">
        <div className="mt-4 mb-4 grid w-full grid-cols-6 gap-4">
          <div className="bg-neutral-light-grey relative col-span-6 min-h-[586px] gap-4 rounded-[40px] p-12 md:col-span-4 md:col-start-2">
            <AutoSizeResponsiveAsset
              src="/src/assets/auth/scenery.png"
              alt="Cloud Background"
              className="absolute !h-auto rounded-b-[40px]"
              bottom={0}
              left={0}
            />
            <AutoSizeResponsiveAsset
              src="/src/assets/auth/sun.png"
              alt="Cloud Background"
              className="absolute !h-auto rounded-tr-[40px]"
              top={0}
              right={0}
            />
            <AutoSizeResponsiveAsset
              src="/src/assets/auth/cloud.png"
              alt="Cloud Background"
              className="absolute !h-auto rounded-tl-[40px]"
              top={0}
              left={0}
            />
            <AutoSizeResponsiveAsset
              src="/src/assets/auth/boy.png"
              alt="Cloud Background"
              className="absolute !h-auto w-8/12 rounded-br-[40px] sm:w-auto md:w-5/12"
              bottom={0}
              right={0}
            />

            <section className="relative top-1/8 z-10 mx-auto flex w-full flex-col rounded-xl">
              <h1 className="line-clamp-5 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                <span className="text-primary italic">Cekrek... </span>
                Kamu ketahuan belum login nih, masuk ke akun EduSolo untuk
                mendapatkan fitur rekomendasi AI
              </h1>

              <div className="mt-8 flex flex-row justify-start gap-3">
                <Link to="/recommendations">
                  <Button
                    size="custom"
                    variant="lite"
                    className="sm:h-14 sm:min-w-[140px]"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/recommendations">
                  <Button size="custom" className="sm:h-14 sm:min-w-[140px]">
                    Register
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* not test */}
      <section className="max-container mx-auto w-10/12">
        <div className="mt-4 mb-4 grid w-full grid-cols-6 gap-4">
          <div className="bg-neutral-light-grey relative col-span-6 min-h-[586px] gap-4 rounded-[40px] p-12 md:col-span-4 md:col-start-2">
            <AutoSizeResponsiveAsset
              src="/src/assets/auth/sun.png"
              alt="Cloud Background"
              className="absolute !h-auto rounded-tr-[40px]"
              top={0}
              right={0}
            />
            <AutoSizeResponsiveAsset
              src="/src/assets/auth/cloud.png"
              alt="Cloud Background"
              className="absolute !h-auto rounded-tl-[40px]"
              top={0}
              left={0}
            />
            <AutoSizeResponsiveAsset
              src="/src/assets/auth/plane.png"
              alt="Plane Background"
              className="absolute rotate-y-180 !h-auto rounded-br-[40px] w-6/12"
              bottom={0}
              left={0}
            />
            <AutoSizeResponsiveAsset
              src="/src/assets/auth/girl.png"
              alt="Girl Background"
              className="absolute rotate-y-180 !h-auto w-6/12 sm:w-auto md:w-[35%]"
              bottom={0}
              right={0}
            />

            <section className="relative top-1/5 sm:top-1/8 z-10 flex w-full flex-col items-start rounded-xl">
              <div className="max-w-md">
                <div>
                  <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    Kamu belum melakukan test preferensi liburan. Lakukan test
                    sekarang!
                  </h1>
                </div>
                <div className="mt-8">
                  <Link to="/recommendations">
                    <Button size="custom" className="sm:h-14 sm:min-w-[140px]">
                      Mulai Test
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Recommendation;
