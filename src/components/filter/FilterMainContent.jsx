import React from "react";
import CategoryFilter from "./CategoryFilter.jsx";
import PlaceTypeFilter from "./PlaceTypeFilter.jsx";
import { Separator } from "../ui/separator.jsx";

function FilterMainContent({
  categoryItems,
  selectedCategories,
  setSelectedCategories,
  placeTypeItems,
  selectedPlaceTypes,
  handlePlaceTypeChange,
}) {
  return (
    <main className="flex h-[320px] flex-1 flex-col border-l-1 bg-white">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto pt-0 pl-6">
        <div className="flex w-full flex-col border-t-1 pt-4">
          <CategoryFilter
            items={categoryItems}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
          <Separator className="my-4" />
          <PlaceTypeFilter
            items={placeTypeItems}
            selected={selectedPlaceTypes}
            onToggle={handlePlaceTypeChange}
          />
          <Separator className="my-4" />
        </div>
      </div>
    </main>
  );
}

export default FilterMainContent;