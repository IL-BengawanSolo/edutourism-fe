import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter2 } from "react-iconly";
import FilterSidebarMenu from "./FilterSidebarMenu.jsx";
import FilterMainContent from "./FilterMainContent.jsx";
import FilterDialogFooter from "./FilterDialogFooter.jsx";
import { FILTER_MENU } from "./FilterSidebarMenu";
import { Badge } from "../ui/badge.jsx";

const FilterDialog = ({
  open,
  onOpenChange,
  categoryItems,
  selectedCategories,
  setSelectedCategories,
  placeTypeItems,
  selectedPlaceTypes,
  handlePlaceTypeChange,
  selectedRegion,
  regionItems,
  setSelectedRegion,
  openDaysItems,
  selectedOpenDays,
  setSelectedOpenDays,
  isDirtySaveButton,
  isDirtyResetButton,
  handleReset,
  handleSave,
}) => {
  const [activeSection, setActiveSection] = React.useState(
    FILTER_MENU[0].sectionId,
  );

  // Hitung total filter yang dipilih
  const totalSelected =
    (selectedCategories?.length || 0) +
    (selectedPlaceTypes?.length || 0) +
    (selectedRegion?.length || 0) +
    (selectedOpenDays?.length || 0); 

  // Scroll ke section saat klik menu
  const handleMenuClick = (sectionId) => {
    const container = document.getElementById("filter-main-scroll");
    const section = document.getElementById(sectionId);
    if (container && section) {
      // Hitung posisi relatif section terhadap container
      const containerTop = container.getBoundingClientRect().top;
      const sectionTop = section.getBoundingClientRect().top;
      const scrollOffset = sectionTop - containerTop + container.scrollTop;
      container.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="filter"
          className={`${
            totalSelected > 0
              ? "ring-pr-blue-600 text-pr-blue-800 ring-3"
              : "border-none"
          }`}
        >
          <Filter2
            className={`size-5 ${totalSelected > 0 ? "text-pr-blue-600" : "text-neutral-grey"}`}
            filled
          />
          Filter
          {totalSelected > 0 && (
            <Badge className="bg-pr-blue-100" variant="custom">
              {totalSelected}
            </Badge>
          )}
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

        <FilterSidebarMenu
          activeSection={activeSection}
          onMenuClick={handleMenuClick}
          selectedCategories={selectedCategories}
          selectedPlaceTypes={selectedPlaceTypes}
          selectedRegions={selectedRegion}
          selectedOpenDays={selectedOpenDays}
        >
          <FilterMainContent
            categoryItems={categoryItems}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            placeTypeItems={placeTypeItems}
            selectedPlaceTypes={selectedPlaceTypes}
            handlePlaceTypeChange={handlePlaceTypeChange}
            regionItems={regionItems}
            setSelectedRegion={setSelectedRegion}
            selectedRegion={selectedRegion}
            openDaysItems={openDaysItems}
            selectedOpenDays={selectedOpenDays}
            setSelectedOpenDays={setSelectedOpenDays}
            onSectionChange={setActiveSection}
          />
        </FilterSidebarMenu>
        <FilterDialogFooter
          isDirtySaveButton={isDirtySaveButton}
          isDirtyResetButton={isDirtyResetButton}
          onReset={handleReset}
          onSave={handleSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
