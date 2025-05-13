import React from "react";

import DestinationCardContent from "./DestinationCardContent.jsx";

const DestinationCard = ({ variant = "col" }) => {
  const spacing = variant === "col" ? "mt-8 mb-6" : "mt-3 mb-3 ml-7 mr-3.5";
  const imgStyle =
    variant === "col"
      ? "w-[344px] h-[344px] rounded-[30px]"
      : "w-[200px] h-[200px] rounded-[16px]";
  const cardStyle =
    variant === "col"
      ? "flex-col p-4 max-w-[376px] "
      : "flex-row p-2.5 min-w-full max-h-[220px]";
  return (
    <div className={`flex max-w-1 rounded-3xl bg-white ${cardStyle}`}>
      <img
        src="/src/assets/images/kampung-batik-laweyan.jpeg"
        alt=""
        className={imgStyle}
      />
      <div className={spacing}>
        <DestinationCardContent variant={variant} />
      </div>
    </div>
  );
};

export default DestinationCard;
