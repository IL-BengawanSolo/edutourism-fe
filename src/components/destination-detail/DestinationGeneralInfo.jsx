import React from "react";
import { Badge } from "@/components/ui/badge.jsx";
import { Location } from "react-iconly";
import { Separator } from "@/components/ui/separator.jsx";

const DestinationGeneralInfo = ({ destination, priceLabel }) => {
  return (
    <div  className="mt-4 mb-4 flex flex-col gap-4 rounded-none bg-white p-8 sm:rounded-2xl">
      {/* Destination name */}
      <h1 className="text-4xl font-bold">{destination.name}</h1>

      {/* Destination region */}
      <p className="text-neutral-grey flex items-center gap-2 text-base font-medium">
        <Location set="bold" className="text-neutral-grey" />
        {destination.region_name}
      </p>

      {/* Categories */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {destination.categories.map((text, idx) => (
          <Badge key={idx} className="text-sm" variant="custom">
            {text}
          </Badge>
        ))}{" "}
        {/* Place type */}
        <Separator orientation="vertical" className="mx-1 h-5" />
        {destination.place_types.map((text, idx) => (
          <Badge key={idx} className="text-sm" variant="custom_secondary">
            {text}
          </Badge>
        ))}{" "}
      </div>

      {/* Price label */}
      <p className="text-neutral-black mt-4 text-xl font-bold">
        <span className="text-primary">Harga Tiket Masuk: </span>
        {priceLabel}
      </p>

      {/* Description */}
      <p className="text-neutral-black mt-4 text-base font-medium">
        {destination.description}
      </p>
    </div>
  );
};

export default DestinationGeneralInfo;
