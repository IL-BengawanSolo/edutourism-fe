// import React from "react";

// import DestinationCardContent from "./DestinationCardContent.jsx";

// const DestinationCard = ({ variant = "col" }) => {
//   const spacing = variant === "col" ? "mt-8 mb-6" : "mt-3 mb-3 ml-7 mr-3.5";

//   const imgStyle =
//     variant === "col"
//       ? "w-[344px] h-[344px] rounded-[30px]"
//       : "w-[200px] h-[200px] rounded-[16px]";
//   const cardStyle =
//     variant === "col"
//       ? "flex-col p-4 max-w-[376px] "
//       : "flex-row p-2.5 min-w-full max-h-[220px]";

//   return (
//     <div className={`flex max-w-1 rounded-3xl bg-white ${cardStyle}`}>
//       <img
//         src="/src/assets/images/kampung-batik-laweyan.jpeg"
//         alt=""
//         className={imgStyle}
//       />
//       <div className={spacing}>
//         <DestinationCardContent variant={variant} />
//       </div>
//     </div>
//   );
// };

// export default DestinationCard;

import React from "react";
import DestinationCardContent from "./DestinationCardContent";

const DestinationCard = ({
  variant = "col",
  className = "",
  imageSrc = "/src/assets/images/kampung-batik-laweyan.jpeg",
  title = "Museum Manusia Purba Sangiran Klaster Krikilan",
  location = "Surakarta",
  badgeText = "Seni dan Budaya",
  price = "25.000 - 50.000",
  match = "84% Match dengan kamu",
  ...props
}) => {
  const isCol = variant === "col";

  return (
    <div
      className={`flex overflow-hidden rounded-3xl bg-white ${className} ${
        isCol ? "max-w-sm flex-col p-4" : "max-h-[220px] w-full flex-row p-2.5"
      }`}
      {...props}
    >
      <img
        src={imageSrc}
        alt={title}
        className={`object-cover ${
          isCol
            ? "h-64 w-full rounded-4xl sm:h-80"
            : "h-40 w-40 rounded-2xl sm:h-48 sm:w-48"
        }`}
      />
      <div className={`${isCol ? "mt-5" : "ml-6 my-3 flex-1"}`}>
        <DestinationCardContent
          variant={variant}
          title={title}
          location={location}
          badgeText={badgeText}
          price={price}
          match={match}
        />
      </div>
    </div>
  );
};

export default DestinationCard;