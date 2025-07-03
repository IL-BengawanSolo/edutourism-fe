import { Badge } from "@/components/ui/badge";
import { Location } from "react-iconly";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import AgeIcons from "./AgeIcons.jsx";

const ALL_AGES = ["Remaja", "Anak-anak", "Balita", "Semua Umur"];

const DestinationCardContent = ({
  variant,
  name,
  region_name,
  categories,
  placeTypes,
  price,
  match,
  ageCategories,
  shortAgeIcon,
}) => {
  const titleSize =
    variant === "col" ? "text-lg sm:text-xl" : "text-lg sm:text-xl";
  const textSize =
    variant === "col" ? "text-sm sm:text-base" : "text-sm sm:text-base";
  const badgeSize =
    variant === "col" ? "text-xs sm:text-sm" : "text-xs sm:text-sm";

  let ages = [];
  if (typeof ageCategories === "string") {
    if (ageCategories === "Semua Umur") {
      ages = ALL_AGES;
    } else {
      ages = [ageCategories];
    }
  } else if (Array.isArray(ageCategories)) {
    ages = ageCategories;
  }

  return (
    <div className="font-montserrat flex flex-col gap-2 sm:gap-3">
      <h2 className={`${titleSize} line-clamp-2 font-bold`}>{name}</h2>
      <p
        className={`${textSize} text-neutral-grey flex items-center gap-2 font-medium`}
      >
        <Location set="bold" className="text-neutral-grey" />
        {region_name}
      </p>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {categories.map((text, idx) => (
            <Badge key={idx} className={badgeSize} variant="custom">
              {text}
            </Badge>
          ))}{" "}
        </div>

        {placeTypes && placeTypes.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Badge className={`${badgeSize}`} variant="custom_secondary">
              {placeTypes[0]}
            </Badge>
            {placeTypes.length > 1 && (
              <Badge className={badgeSize} variant="custom_secondary">
                {placeTypes[1]}
              </Badge>
            )}
            {placeTypes.length > 2 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className={badgeSize} variant="custom_secondary">
                    +{placeTypes.length - 2}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="z-50"
                  classNameArrow="bg-white fill-white"
                >
                  <div className="flex flex-col gap-2">
                    {placeTypes.slice(2).map((type, index) => (
                      <Badge
                        className={badgeSize}
                        variant="custom_secondary"
                        key={index}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-between">
        <p className={`${textSize} text-neutral-dark-grey font-medium`}>
          <span>
            <FontAwesomeIcon className="mr-2 h-5 w-5" icon={faMoneyBillWave} />
          </span>
          <span className="font-semibold">{price}</span>
        </p>
        {variant !== "col" && (
          <AgeIcons
            ages={ages}
            shortAgeIcon={shortAgeIcon}
            className="ml-4 flex items-center gap-3"
          />
        )}
      </div>
      {variant === "col" && (
        <AgeIcons ages={ages} shortAgeIcon className="flex flex-row gap-3" />
      )}
      {variant === "col" && match && (
        <p className={`${textSize} text-pr-blue-800 font-bold mt-2`}>{match}% cocok dengan kamu</p>
      )}
    </div>
  );
};

export default DestinationCardContent;
