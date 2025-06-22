import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter2 } from "react-iconly";
import FilterSidebarMenu from "./FilterSidebarMenu.jsx";
import FilterMainContent from "./FilterMainContent.jsx";
import FilterDialogFooter from "./FilterDialogFooter.jsx";

const FilterDialog = ({
  categoryItems,
  selectedCategories,
  setSelectedCategories,
  placeTypeItems,
  selectedPlaceTypes,
  handlePlaceTypeChange,
  isDirty,
  handleReset,
  handleSave,
}) => (
  <Dialog>
    <form onSubmit={handleSave}>
      <DialogTrigger asChild>
        <Button variant="filter">
          <Filter2 className="text-neutral-grey size-5" filled />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            <span className="text-3xl">Filter</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-neutral-dark-grey">
          Pilih filter untuk menemukan tempat wisata yang sesuai dengan
          preferensimu.
        </DialogDescription>

        <FilterSidebarMenu>
          <FilterMainContent
            categoryItems={categoryItems}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            placeTypeItems={placeTypeItems}
            selectedPlaceTypes={selectedPlaceTypes}
            handlePlaceTypeChange={handlePlaceTypeChange}
          />
        </FilterSidebarMenu>

        <FilterDialogFooter isDirty={isDirty} onReset={handleReset} />
      </DialogContent>
    </form>
  </Dialog>
);

export default FilterDialog;
