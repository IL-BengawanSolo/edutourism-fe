import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

faBuilding;

const DestinationFacilities = ({ facilities }) => {
  return (
    <div
      id="facilities"
      className="mt-4 mb-4 flex flex-col gap-4 rounded-none bg-white p-8 sm:rounded-2xl"
    >
      <h1 className="text-2xl font-bold">Fasilitas</h1>
      <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
        {facilities.map((label) => (
          <div
            key={label}
            className="bg-neutral-bg flex min-h-[36px] items-center gap-2 rounded-xl px-3 py-2"
          >
            <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-sm">
              <FontAwesomeIcon
                icon={faBuilding}
                className="text-primary text-base"
              />
            </div>

            <span className="text-sm font-medium break-words text-neutral-800">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationFacilities;
