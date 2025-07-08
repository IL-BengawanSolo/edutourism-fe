import React from "react";
import DestinationCardContent from "./DestinationCardContent";
import { getPriceLabel } from "@/lib/utils.js";

const fallbackImage = "/src/assets/images/default-placeholder.png";

const DestinationCard = ({
  variant = "col",
  className = "",
  imageSrc = fallbackImage,
  name = "Kampung Batik Laweyan",
  region_name = "Surakarta",
  categories = ["Sains", "Lingkungan", "Sejarah"],
  placeTypes = ["Kampung Batik"],
  minPrice = "25.000",
  maxPrice = "50.000",
  match = "",
  ageCategories = undefined,
  shortPrice = false,
  shortAgeIcon = false,
  hideLabel = false,
  ...props
}) => {
  const isCol = variant === "col";

  const priceLabel = getPriceLabel(minPrice, maxPrice, shortPrice);

  const validImageSrc = imageSrc ? imageSrc : fallbackImage;

  return (
    <div
      className={`flex overflow-hidden rounded-2xl bg-white ${className} ${
        isCol
          ? "max-w-[288px] flex-col p-4 min-h-[600px]"
          : "max-h-[236px] w-full flex-row p-2.5"
      }`}
      {...props}
    >
      <img
        src={validImageSrc}
        alt={name}
        className={`object-cover ${
          isCol
            ? "h-64 w-full rounded-2xl object-cover"
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
          shortAgeIcon={shortAgeIcon}
          hideLabel={hideLabel}
        />
      </div>
    </div>
  );
};

export default DestinationCard;
