import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChild,
  faBaby,
  faPerson,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";

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

const AgeIcons = ({
  ages = [],
  shortAgeIcon = false,
  className = "",
  hideLabel = false,
}) => (
  <div className={`${className}`}>
    {ages.map(
      (age) =>
        getAgeIcon(age, shortAgeIcon) && (
          <span key={age} className="flex items-center gap-1">
            {getAgeIcon(age, shortAgeIcon)}
            {!hideLabel && (
              <span className="text-xs text-neutral-700">
                {shortAgeIcon ? AGE_LABEL_SHORT[age] || age : age}
              </span>
            )}
          </span>
        ),
    )}
  </div>
);

export default AgeIcons;
