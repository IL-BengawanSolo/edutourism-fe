import React from "react";
import DestinationCardContent from "./DestinationCardContent";

const DestinationCard = ({
  variant = "col",
  className = "",
  imageSrc = "/src/assets/images/kampung-batik-laweyan.jpeg",
  title = "Kampung Batik Laweyan",
  location = "Surakarta",
  categoryBadge = ["Sains", "Lingkungan", "Sejarah"],
  subCategoryBadge = "Kampung Batik",
  price = "25.000 - 50.000",
  match = "84% Match dengan kamu",
  ageType = undefined, // "anak" | "remaja" | undefined
  ...props
}) => {
  const isCol = variant === "col";

  return (
    <div
      className={`flex overflow-hidden rounded-2xl bg-white ${className} ${
        isCol ? "max-w-sm flex-col p-4" : "max-h-[236px] w-full flex-row p-2.5"
      }`}
      {...props}
    >
      <img
        src={imageSrc}
        alt={title}
        className={`object-cover ${
          isCol
            ? "h-64 w-[352px] rounded-4xl sm:h-80 object-cover"
            : "h-40 w-40 rounded-2xl sm:h-54 sm:w-54"
        }`}
      />

      {/* <img
        src={imageSrc}
        alt={title}
        className={`aspect-[3/4] object-cover ${
          isCol
            ? "h-auto max-h-80 w-full rounded-4xl"
            : "h-40 w-40 rounded-2xl sm:h-64 sm:w-48"
        }`}
      /> */}

      <div className={`${isCol ? "mt-5" : "my-3 ml-6 flex-1"}`}>
        <DestinationCardContent
          variant={variant}
          title={title}
          location={location}
          categoryBadge={categoryBadge}
          subCategoryBadge={subCategoryBadge}
          price={price}
          match={match}
          ageType={ageType}
        />
      </div>
    </div>
  );
};

export default DestinationCard;
