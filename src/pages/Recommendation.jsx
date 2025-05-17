import { Button } from "@/components/ui/button.jsx";
import React from "react";

const Recommendation = () => {
  return (
    <>
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
