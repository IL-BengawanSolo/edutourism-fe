import { Badge } from "@/components/ui/badge";
import { Location } from "react-iconly";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChild,
  faBaby,
  faPerson,
  faUniversalAccess,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// Mapping untuk label singkat usia
const AGE_LABEL_SHORT = {
  Remaja: "Remaja",
  "Anak-anak": "Anak",
  Balita: "Balita",
  "Semua Umur": "Semua",
};

// Mapping untuk icon usia
const getAgeIcon = (age, short = false) => {
  const title = short ? AGE_LABEL_SHORT[age] || age : age;
  switch (age) {
    case "Remaja":
      return (
        <FontAwesomeIcon
          className="text-primary h-5 w-5"
          icon={faPerson}
          title={title}
        />
      );
    case "Anak-anak":
      return (
        <FontAwesomeIcon
          className="text-primary h-5 w-5"
          icon={faChild}
          title={title}
        />
      );
    case "Balita":
      return (
        <FontAwesomeIcon
          className="text-primary h-5 w-5"
          icon={faBaby}
          title={title}
        />
      );
    case "Semua Umur":
      return (
        <FontAwesomeIcon
          className="text-primary h-5 w-5"
          icon={faUniversalAccess}
          title={title}
        />
      );
    default:
      return null;
  }
};

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
    variant === "col" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";
  const textSize =
    variant === "col" ? "text-base sm:text-lg" : "text-sm sm:text-base";
  const badgeSize =
    variant === "col" ? "text-sm sm:text-base" : "text-xs sm:text-sm";

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
            <FontAwesomeIcon
              className="mr-2 h-5 w-5"
              icon={faMoneyBillWave}
            />
          </span>
          <span className="font-semibold">{price}</span>
        </p>
        <div className="ml-4 flex items-center gap-3">
          {ages.map(
            (age) =>
              getAgeIcon(age, shortAgeIcon) && (
                <span key={age} className="flex items-center gap-1">
                  {getAgeIcon(age, shortAgeIcon)}
                  <span className="text-xs text-neutral-700">
                    {shortAgeIcon ? AGE_LABEL_SHORT[age] || age : age}
                  </span>
                </span>
              ),
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
