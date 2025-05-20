import AutoSizeResponsiveAsset from "@/components/ResponsiveAsset.jsx";
import { Button } from "@/components/ui/button.jsx";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="bg-pr-blue-50 relative h-[calc(100vh-5rem)] w-full overflow-hidden">
        {/* <img
        src="/src/assets/home/plane.png"
        className="object-fit absolute top-[22.2%] left-[3%] h-[11.3vh]"
        alt="plane"
      /> */}

        {/* <img
        src="/src/assets/home/car.png"
        className="object-fit absolute bottom-0 h-[50vh]"
        alt="car"
      /> */}

        <AutoSizeResponsiveAsset
          src="/src/assets/home/cloud-left.png"
          top={0}
          left={0}
          alt={"cloud-left"}
        />

        <AutoSizeResponsiveAsset
          src="/src/assets/home/cloud-right.png"
          top={148}
          right={0}
          alt={"cloud-right"}
        />

        <AutoSizeResponsiveAsset
          src="/src/assets/home/balloon.png"
          top={32}
          right={57}
          alt={"balloon"}
        />

        <AutoSizeResponsiveAsset
          src="/src/assets/home/plane.png"
          top={199}
          left={39}
          alt={"plane"}
        />

        <AutoSizeResponsiveAsset
          src="/src/assets/home/java.png"
          bottom={0}
          right={0}
          alt={"java"}
        />

        <AutoSizeResponsiveAsset
          src="/src/assets/home/scenery.png"
          bottom={0}
          right={0}
          alt={"scenery"}
        />

        <AutoSizeResponsiveAsset
          src="/src/assets/home/path.png"
          bottom={0}
          left={420}
          alt={"path"}
        />

        <AutoSizeResponsiveAsset
          src="/src/assets/home/car.png"
          bottom={0}
          left={0}
          alt={"car"}
        />

        <div className="bg-pr-blue-50/75 relative top-[8.66%] z-10 mx-auto flex max-w-lg flex-col items-center justify-center rounded-xl px-8 py-10 text-center lg:max-w-5xl lg:bg-transparent">
          <h1 className="text-pr-blue-900 text-4xl font-extrabold lg:text-5xl">
            Rencanakan Perjalanan EduTourism Solo Raya Bersama Keluarga!
          </h1>
          <p className="text-pr-blue-900 mt-[3.5%] max-w-3xl text-lg font-medium">
            Dengan bantuan AI, siap memberikan tempat wisata edutourism di kota
            Solo Raya dengan menyesuaikan prefrensi kamu, keluarga kamu, dan
            anak kamu!
          </p>
          <Button
            size="custom"
            variant="secondary"
            className="text-pr-blue-950 mt-12 text-lg"
          >
            Temukan Rekomendasi
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
