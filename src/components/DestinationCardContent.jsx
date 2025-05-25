import { Badge } from "@/components/ui/badge";
import { Location } from "react-iconly";

const DestinationCardContent = ({
  variant,
  title,
  location,
  categoryBadge,
  subCategoryBadge,
  price,
  match,
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

      <div className="flex flex-wrap items-center gap-2">
        {categoryBadge.map((text, idx) => (
          <Badge key={idx} className={`${badgeSize}`} variant="custom">
            {text}
          </Badge>
        ))}
        {subCategoryBadge && (
          <Badge className={badgeSize} variant="custom_secondary">
            {subCategoryBadge}
          </Badge>
        )}
      </div>

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
