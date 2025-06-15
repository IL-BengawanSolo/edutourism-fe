import { Badge } from "@/components/ui/badge";
import { Baby, PersonStanding } from "lucide-react";
import { Location } from "react-iconly";

const DestinationCardContent = ({
  variant,
  title,
  location,
  category,
  placeType,
  price,
  match,
  ageType,
}) => {
  const titleSize =
    variant === "col" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
  const textSize =
    variant === "col" ? "text-base sm:text-lg" : "text-sm sm:text-base";
  const badgeSize =
    variant === "col" ? "text-sm sm:text-base" : "text-xs sm:text-sm";

  return (
    <div className="font-montserrat flex flex-col gap-2 sm:gap-3">
      <h2 className={`${titleSize} line-clamp-2 font-bold`}>{title}</h2>
      <p
        className={`${textSize} text-neutral-grey flex items-center gap-2 font-medium`}
      >
        <Location set="bold" className="text-neutral-grey" />
        {location}
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {category.map((text, idx) => (
            <Badge key={idx} className={badgeSize} variant="custom">
              {text}
            </Badge>
          ))}{" "}
        </div>

        {placeType && (
          <div className="flex flex-wrap gap-2">
            {placeType.split(",").map((text, idx) => (
              <Badge key={idx} className={badgeSize} variant="custom_secondary">
                {text.trim()}
              </Badge>
            ))}{" "}
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-between">
        <p className={`${textSize} text-neutral-dark-grey font-medium`}>
          <span className="hidden md:inline">Harga </span>
          <span className="font-semibold">{price}</span>
        </p>
        <div className="ml-4 flex items-center gap-2">
          {(ageType === "anak" || ageType === "all") && (
            <Baby className="text-primary text-lg" title="Anak-anak" />
          )}
          {(ageType === "remaja" || ageType === "all") && (
            <PersonStanding className="text-primary text-lg" title="Remaja" />
          )}
        </div>
      </div>
      {variant === "col" && match && (
        <p className={`${textSize} text-pr-blue-800 font-bold`}>{match}</p>
      )}
    </div>
  );
};

export default DestinationCardContent;
