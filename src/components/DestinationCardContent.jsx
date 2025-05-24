// import { Badge } from "@/components/ui/badge";
// import { Location } from "react-iconly";

// const DestinationCardContent = ({ variant = "col" }) => {
//   const titleSize = variant === "col" ? "text-2xl" : "text-xl";
//   const textSize = variant === "col" ? "text-xl" : "text-base";
//   const badgeSize = variant === "col" ? "text-lg" : "text-sm";

//   return (
//     <div className="flex flex-col gap-4 font-montserrat">
//       <h2 className={`${titleSize} font-bold line-clamp-2`}>
//       Museum Manusia Purba Sangiran Klaster Krikilan
//       </h2>
//       <p
//         className={`${textSize} text-neutral-grey font-semibold flex items-center gap-2`}
//       >
//         <Location set="bold" className="text-neutral-grey" />
//         Surakarta
//       </p>
//       <Badge className={badgeSize} variant="custom">
//         Seni dan Budaya
//       </Badge>
//       <p className={`${textSize} text-neutral-dark-grey font-medium`}>
//         Harga Rp <span className="font-semibold">25.000 - 50.000</span>
//       </p>
//       {variant === "col" && (
//         <p className={`${textSize} text-pr-blue-800 font-bold`}>
//           84% Match dengan kamu
//         </p>
//       )}
//     </div>
//   );
// };

// export default DestinationCardContent;


import { Badge } from "@/components/ui/badge";
import { Location } from "react-iconly";

const DestinationCardContent = ({
  variant = "col",
  title = "Museum Manusia Purba Sangiran Klaster Krikilan",
  location = "Surakarta",
  badgeText = "Seni dan Budaya",
  price = "25.000 - 50.000",
  match = "84% Match dengan kamu",
}) => {
  const titleSize = variant === "col" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
  const textSize = variant === "col" ? "text-base sm:text-lg" : "text-sm sm:text-base";
  const badgeSize = variant === "col" ? "text-sm sm:text-base" : "text-xs sm:text-sm";

  return (
    <div className="flex flex-col gap-2 sm:gap-3 font-montserrat">
      <h2 className={`${titleSize} font-bold line-clamp-2`}>{title}</h2>

      <p className={`${textSize} text-neutral-grey font-medium flex items-center gap-2`}>
        <Location set="bold" className="text-neutral-grey" />
        {location}
      </p>

      {badgeText && (
        <Badge className={`${badgeSize}`} variant="custom">
          {badgeText}
        </Badge>
      )}

      <p className={`${textSize} text-neutral-dark-grey font-medium`}>
        Harga Rp <span className="font-semibold">{price}</span>
      </p>

      {variant === "col" && match && (
        <p className={`${textSize} text-pr-blue-800 font-bold`}>{match}</p>
      )}
    </div>
  );
};

export default DestinationCardContent;