import DestinationCard from "@/components/DestinationCard.jsx";
import AutoSizeResponsiveAsset from "@/components/ResponsiveAsset.jsx";
import { Button } from "@/components/ui/button.jsx";
import { features } from "@/constants/index.js";
import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  return (
    <>
      <section className="bg-pr-blue-50 relative h-[calc(100vh-5rem)] w-full overflow-hidden">
        <div className="pointer-events-none select-none">
          <AutoSizeResponsiveAsset
            src="/src/assets/home/cloud-left.png"
            top={0}
            left={0}
            alt={"cloud-left"}
            className={"absolute"}
          />

          <AutoSizeResponsiveAsset
            src="/src/assets/home/cloud-right.png"
            top={148}
            right={0}
            alt={"cloud-right"}
            className={"absolute"}
          />

          <AutoSizeResponsiveAsset
            src="/src/assets/home/balloon.png"
            top={32}
            right={57}
            alt={"balloon"}
            className={"absolute"}
          />

          <AutoSizeResponsiveAsset
            src="/src/assets/home/plane.png"
            top={199}
            left={39}
            alt={"plane"}
            className={"absolute"}
          />

          <AutoSizeResponsiveAsset
            src="/src/assets/home/java.png"
            bottom={0}
            right={0}
            alt={"java"}
            className={"absolute"}
          />

          <AutoSizeResponsiveAsset
            src="/src/assets/home/scenery.png"
            bottom={0}
            right={0}
            alt={"scenery"}
            className={"absolute"}
          />

          <AutoSizeResponsiveAsset
            src="/src/assets/home/path.png"
            bottom={0}
            left={420}
            alt={"path"}
            className={"absolute"}
          />

          <AutoSizeResponsiveAsset
            src="/src/assets/home/car.png"
            bottom={0}
            left={0}
            alt={"car"}
            className={"absolute"}
          />
        </div>

        <section className="relative top-1/4 z-10 mx-auto flex w-[90vw] max-w-lg flex-col items-center justify-center rounded-xl bg-white/75 px-4 py-8 text-center backdrop-blur-xs sm:top-[8.66%] md:max-w-3xl lg:max-w-5xl lg:bg-transparent lg:backdrop-blur-none 2xl:max-w-[1440px]">
          <h1 className="text-pr-blue-900 xs:text-3xl text-2xl font-extrabold sm:text-4xl md:text-5xl 2xl:text-7xl">
            Rencanakan Perjalanan EduTourism Solo Raya Bersama Keluarga!
          </h1>
          <p className="text-pr-blue-900 mt-[3.5%] max-w-4xl text-base font-medium sm:text-lg md:text-xl 2xl:max-w-5xl 2xl:text-2xl">
            Dengan bantuan AI, siap memberikan tempat wisata edutourism di kota
            Solo Raya dengan menyesuaikan prefrensi kamu, keluarga kamu, dan
            anak kamu!
          </p>

          <Link to="/recommendations">
            <Button
              size="custom"
              variant="secondary"
              className="text-pr-blue-950 group relative mt-12 rounded-full px-6 py-3 text-base font-semibold shadow-lg transition-transform duration-300 hover:scale-105 sm:text-lg 2xl:px-8 2xl:py-8 2xl:text-2xl"
            >
              <span className="relative z-10 flex items-center gap-2 font-bold">
                {/* SVG AI Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="!h-7 !w-7"
                  viewBox="0 0 48 48"
                >
                  <radialGradient
                    id="oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1"
                    cx="-670.437"
                    cy="617.13"
                    r=".041"
                    gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#1ba1e3"></stop>
                    <stop offset="0" stop-color="#1ba1e3"></stop>
                    <stop offset=".3" stop-color="#5489d6"></stop>
                    <stop offset=".545" stop-color="#9b72cb"></stop>
                    <stop offset=".825" stop-color="#d96570"></stop>
                    <stop offset="1" stop-color="#f49c46"></stop>
                  </radialGradient>
                  <path
                    fill="url(#oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1)"
                    d="M22.882,31.557l-1.757,4.024c-0.675,1.547-2.816,1.547-3.491,0l-1.757-4.024	c-1.564-3.581-4.378-6.432-7.888-7.99l-4.836-2.147c-1.538-0.682-1.538-2.919,0-3.602l4.685-2.08	c3.601-1.598,6.465-4.554,8.002-8.258l1.78-4.288c0.66-1.591,2.859-1.591,3.52,0l1.78,4.288c1.537,3.703,4.402,6.659,8.002,8.258	l4.685,2.08c1.538,0.682,1.538,2.919,0,3.602l-4.836,2.147C27.26,25.126,24.446,27.976,22.882,31.557z"
                  ></path>
                  <radialGradient
                    id="oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2"
                    cx="-670.437"
                    cy="617.13"
                    r=".041"
                    gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#1ba1e3"></stop>
                    <stop offset="0" stop-color="#1ba1e3"></stop>
                    <stop offset=".3" stop-color="#5489d6"></stop>
                    <stop offset=".545" stop-color="#9b72cb"></stop>
                    <stop offset=".825" stop-color="#d96570"></stop>
                    <stop offset="1" stop-color="#f49c46"></stop>
                  </radialGradient>
                  <path
                    fill="url(#oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2)"
                    d="M39.21,44.246l-0.494,1.132	c-0.362,0.829-1.51,0.829-1.871,0l-0.494-1.132c-0.881-2.019-2.467-3.627-4.447-4.506l-1.522-0.676	c-0.823-0.366-0.823-1.562,0-1.928l1.437-0.639c2.03-0.902,3.645-2.569,4.511-4.657l0.507-1.224c0.354-0.853,1.533-0.853,1.886,0	l0.507,1.224c0.866,2.088,2.481,3.755,4.511,4.657l1.437,0.639c0.823,0.366,0.823,1.562,0,1.928l-1.522,0.676	C41.677,40.619,40.091,42.227,39.21,44.246z"
                  ></path>
                </svg>
                Temukan Rekomendasi
              </span>
            </Button>
          </Link>
        </section>
      </section>

      <section className="mx-auto mt-20 w-full max-w-10/12">
        <h1 className="text-center text-5xl font-bold">Our Features</h1>

        <div className="mt-20 flex flex-col gap-14">
          {features.map((feature, index) => (
            <article
              key={index}
              className={`flex flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:gap-14 ${
                feature.imageLeft ? "" : "lg:flex-row-reverse"
              }`}
            >
              <div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="h-auto w-full max-w-[340px] flex-shrink-0 object-cover lg:max-w-[420px] xl:max-w-[480px]"
                />
              </div>

              <div className="flex max-w-full flex-col px-2 lg:max-w-[542px] lg:px-0">
                <h2 className="text-center text-2xl font-bold lg:text-left lg:text-3xl lg:text-[40px]">
                  {feature.title}
                </h2>
                <p className="text-pr-blue-900 mt-6 text-center text-base font-medium lg:mt-12 lg:text-left lg:text-xl xl:text-2xl">
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* <section className="mx-auto mt-20 w-full max-w-10/12 overflow-x-auto">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-5xl font-bold">Top Destinations</h1>
          <Link
            to="/destinations"
            className="text-pr-blue-800 text-3xl font-semibold hover:text-pr-blue-900"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-20 flex flex-row gap-4">
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
        </div>
      </section> */}

      {/* <section className="mx-auto mt-20 w-full max-w-10/12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-center text-3xl font-bold sm:text-left sm:text-5xl">
            Top Destinations
          </h1>
          <Link
            to="/destinations"
            className="text-pr-blue-800 hover:text-pr-blue-900 text-center text-xl font-semibold sm:text-right sm:text-3xl"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
          <DestinationCard variant="row" />
        </div>
      </section> */}

      <section className="mx-auto mt-20 w-full max-w-10/12 mb-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-center text-3xl font-bold sm:text-left sm:text-5xl">
            Top Destinations
          </h1>
          <Link
            to="/destinations"
            className="text-pr-blue-800 hover:text-pr-blue-900 text-center text-xl font-semibold sm:text-right sm:text-3xl"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-10 gap-4 lg:gap-8">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: 4 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <DestinationCard variant="row" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default Home;
