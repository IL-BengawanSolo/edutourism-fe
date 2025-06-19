import { Badge } from "@/components/ui/badge";
import { Location } from "react-iconly";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChild,
  faBaby,
  faPerson,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";

const AGE_ICON_MAP = {
  Remaja: <FontAwesomeIcon className="text-primary h-5 w-5" icon={faPerson} title="Remaja" />,
  "Anak-anak": <FontAwesomeIcon className="text-primary h-5 w-5" icon={faChild} title="Anak-anak" />,
  Balita: <FontAwesomeIcon className="text-primary h-5 w-5" icon={faBaby} title="Balita" />,
  "Semua Umur": <FontAwesomeIcon className="text-primary h-5 w-5" icon={faUniversalAccess} title="Semua Umur" />,
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

        {placeTypes && (
          <div className="flex flex-wrap gap-2">
            {placeTypes.map((text, idx) => (
              <Badge key={idx} className={badgeSize} variant="custom_secondary">
                {text}
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
        <div className="ml-4 flex items-center gap-3">
          {ages.map(
            (age) =>
              AGE_ICON_MAP[age] && (
                <span key={age} className="flex items-center gap-1">
                  {AGE_ICON_MAP[age]}
                  <span className="text-xs text-neutral-700">{age}</span>
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
