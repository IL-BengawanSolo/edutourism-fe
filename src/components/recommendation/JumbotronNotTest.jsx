import React from "react";
import AutoSizeResponsiveAsset from "../ResponsiveAsset.jsx";
import { Button } from "../ui/button.jsx";

const JumbotronNotTest = ({ onTestClick }) => {
  return (
    <div className="max-container mx-auto my-auto flex w-10/12 flex-col items-center">
      <div className="mt-4 mb-4 grid w-full grid-cols-6 gap-4">
        <div className="bg-neutral-light-grey relative col-span-6 min-h-[512px] gap-4 rounded-[40px] p-12 md:col-span-4 md:col-start-2">
          <AutoSizeResponsiveAsset
            src="/src/assets/recommendation/sun.png"
            alt="Cloud Background"
            className="absolute !h-auto rounded-tr-[40px]"
            top={0}
            right={0}
          />
          <AutoSizeResponsiveAsset
            src="/src/assets/recommendation/cloud.png"
            alt="Cloud Background"
            className="absolute !h-auto rounded-tl-[40px]"
            top={0}
            left={0}
          />
          <AutoSizeResponsiveAsset
            src="/src/assets/recommendation/plane.png"
            alt="Plane Background"
            className="absolute !h-auto w-6/12 rotate-y-180 rounded-br-[40px]"
            bottom={0}
            left={0}
          />
          <AutoSizeResponsiveAsset
            src="/src/assets/recommendation/girl.png"
            alt="Girl Background"
            className="absolute !h-auto w-6/12 rotate-y-180 sm:w-auto md:w-[35%]"
            bottom={0}
            right={0}
          />

          <div className="relative top-1/5 z-10 flex w-full flex-col items-start rounded-xl sm:top-1/8">
            <div className="max-w-md">
              <div>
                <h1 className="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  Kamu belum melakukan test preferensi liburan. Lakukan test
                  sekarang!
                </h1>
              </div>
              <div className="mt-8">
                {/* <Button
                      size="custom"
                      className="sm:h-14 sm:min-w-[140px]"
                      onClick={() => setIsTested(true)}
                    >
                      Mulai Test
                    </Button> */}
                <Button
                  variant="secondary"
                  size="custom"
                  onClick={onTestClick}
                  className="max-w-xs rounded-full text-lg font-bold shadow-lg transition-all duration-150 hover:scale-105 hover:shadow-xl sm:h-14 sm:min-w-[140px]"
                >
                  Mulai Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JumbotronNotTest;
