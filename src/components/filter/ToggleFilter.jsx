import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

function ToggleFilter({ label, items, selected, onChange }) {
  return (
    <>
      <h1 className="pb-4 text-xl font-bold">{label}</h1>
      <ToggleGroup
        type="multiple"
        className="flex w-full flex-row flex-wrap gap-2 md:w-11/12"
        value={selected}
        onValueChange={onChange}
      >
        {items.map((cat) => (
          <div key={cat.value}>
            <ToggleGroupItem
              key={cat.value}
              value={cat.value}
              aria-label={`Toggle ${cat.label}`}
              size="custom_sm"
              variant="custom"
              className="text-neutral-black border-neutral-black hover:border-primary border-1 data-[state=on]:border-2"
            >
              {cat.label}
            </ToggleGroupItem>
          </div>
        ))}
      </ToggleGroup>
    </>
  );
}

export default ToggleFilter;