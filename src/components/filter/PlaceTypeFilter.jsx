import React from "react";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Label } from "@/components/ui/label.jsx";

function PlaceTypeFilter({ items, selected, onToggle }) {
  return (
    <>
      <h1 className="pb-4 text-xl font-bold">Jenis Tempat</h1>
      <div className="flex flex-col gap-2">
        {items.map((type) => (
          <Label
            key={type.value}
            className="flex cursor-pointer items-center gap-2"
          >
            <Checkbox
              checked={selected.includes(type.value)}
              onCheckedChange={() => onToggle(type.value)}
            />
            {type.label}
          </Label>
        ))}
      </div>
    </>
  );
}

export default PlaceTypeFilter;