import React from "react";

const DestinationFacilities = ({ facilities }) => {
  return (
    <div id="facilities" className="mt-4 mb-4 flex flex-col gap-4 rounded-none bg-white p-8 sm:rounded-2xl">
      <h1 className="text-2xl font-bold">Fasilitas</h1>
      <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
        {facilities.map((label) => (
          <div
            key={label}
            className="bg-neutral-bg flex min-h-[36px] items-center gap-2 rounded-xl px-3 py-2"
          >
            <span
              className="bg-neutral-grey flex items-center justify-center rounded-md"
              style={{ width: 24, height: 24, minWidth: 24, minHeight: 24 }}
            >
              {/* General icon */}
              <i className="fa-solid fa-circle-info text-primary text-base"></i>
            </span>
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
