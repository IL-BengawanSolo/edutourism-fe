import React from "react";
import AutoSizeResponsiveAsset from "../ResponsiveAsset.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useLocation } from "react-router-dom";

const JumbotronNotLogin = () => {
  const location = useLocation();
  const redirect = encodeURIComponent(
    location.pathname + location.search + location.hash
  );
  return (
    <div className="max-container mx-auto my-auto flex w-10/12 flex-col items-center">
      <div className="mt-4 mb-4 grid w-full grid-cols-6 gap-4">
        <div className="bg-neutral-light-grey relative col-span-6 min-h-[586px] gap-4 rounded-[40px] p-12 md:col-span-4 md:col-start-2">
          <AutoSizeResponsiveAsset
            src="/src/assets/images/recommendation/scenery.png"
            alt="Cloud Background"
            className="absolute !h-auto rounded-b-[40px]"
            bottom={0}
            left={0}
          />
          <AutoSizeResponsiveAsset
            src="/src/assets/images/recommendation/sun.png"
            alt="Cloud Background"
            className="absolute !h-auto rounded-tr-[40px]"
            top={0}
            right={0}
          />
          <AutoSizeResponsiveAsset
            src="/src/assets/images/recommendation/cloud.png"
            alt="Cloud Background"
            className="absolute !h-auto rounded-tl-[40px]"
            top={0}
            left={0}
          />
          <AutoSizeResponsiveAsset
            src="/src/assets/images/recommendation/boy.png"
            alt="Cloud Background"
            className="absolute !h-auto w-8/12 rounded-br-[40px] sm:w-auto md:w-5/12"
            bottom={0}
            right={0}
          />

          <div className="relative top-1/8 z-10 mx-auto flex w-full flex-col rounded-xl">
            <h1 className="line-clamp-5 text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              <span className="text-primary italic">Cekrek... </span>
              Kamu ketahuan belum login nih, masuk ke akun EduSolo untuk
              mendapatkan fitur rekomendasi AI
            </h1>

            <div className="mt-8 flex flex-row justify-start gap-3">
              <Link to={`/login?redirect=${redirect}`}>
                <Button
                  size="custom"
                  variant="lite"
                  className="sm:h-14 sm:min-w-[140px]"
                >
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button size="custom" className="sm:h-14 sm:min-w-[140px]">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumbotronNotLogin;
