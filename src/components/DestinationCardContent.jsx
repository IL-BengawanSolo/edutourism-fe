import { Badge } from "@/components/ui/badge";
import { Location } from "react-iconly";

const DestinationCardContent = ({ variant = "col" }) => {
  const titleSize = variant === "col" ? "text-2xl" : "text-xl";
  const textSize = variant === "col" ? "text-xl" : "text-base";
  const badgeSize = variant === "col" ? "text-lg" : "text-sm";

  return (
    <div className="flex flex-col gap-4 font-montserrat">
      <h2 className={`${titleSize} font-bold text-shadow-neutral-black2 line-clamp-2`}>
      Museum Manusia Purba Sangiran Klaster Krikilan
      </h2>
      <p
        className={`${textSize} text-neutral-grey font-semibold flex items-center gap-2`}
      >
        <Location set="bold" className="text-neutral-grey" />
        Surakarta
      </p>
      <Badge className={badgeSize} variant="custom">
        Seni dan Budaya
      </Badge>
      <p className={`${textSize} text-neutral-dark-grey font-medium`}>
        Harga Rp <span className="font-semibold">25.000 - 50.000</span>
      </p>
      {variant === "col" && (
        <p className={`${textSize} text-pr-blue-800 font-bold`}>
          84% Match dengan kamu
        </p>
      )}
    </div>
  );
};

export default DestinationCardContent;
