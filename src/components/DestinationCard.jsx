import React from "react";
import DestinationCardContent from "./DestinationCardContent";
import { getPriceLabel } from "@/lib/utils.js";

const DestinationCard = ({
  variant = "col",
  className = "",
  imageSrc = "/src/assets/images/kampung-batik-laweyan.jpeg",
  name = "Kampung Batik Laweyan",
  region_name = "Surakarta",
  categories = ["Sains", "Lingkungan", "Sejarah"],
  placeTypes = ["Kampung Batik"],
  minPrice = "25.000",
  maxPrice = "50.000",
  match = "84% Match dengan kamu",
  ageCategories = undefined,
  ...props
}) => {
  const isCol = variant === "col";

  const priceLabel = getPriceLabel(minPrice, maxPrice);

  return (
    <div
      className={`flex overflow-hidden rounded-2xl bg-white ${className} ${
        isCol ? "max-w-sm flex-col p-4" : "max-h-[236px] w-full flex-row p-2.5"
      }`}
      {...props}
    >
      <img
        src={imageSrc}
        alt={name}
        className={`object-cover ${
          isCol
            ? "h-64 w-[352px] rounded-4xl object-cover sm:h-80"
            : "h-40 w-40 rounded-2xl sm:h-54 sm:w-54"
        }`}
      />
      <div className={`${isCol ? "mt-5" : "my-3 ml-6 flex-1"}`}>
        <DestinationCardContent
          variant={variant}
          name={name}
          region_name={region_name}
          categories={categories}
          placeTypes={placeTypes}
          price={priceLabel}
          match={match}
          ageCategories={ageCategories}
        />
      </div>
    </div>
  );
};

export default DestinationCard;
