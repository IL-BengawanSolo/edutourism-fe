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
  categoryItems,
  selectedCategories,
  setSelectedCategories,
  placeTypeItems,
  selectedPlaceTypes,
  handlePlaceTypeChange,
  isDirty,
  handleReset,
  handleSave,
}) => {
  const [activeSection, setActiveSection] = React.useState(
    FILTER_MENU[0].sectionId,
  );

  // Hitung total filter yang dipilih
  const totalSelected =
    (selectedCategories?.length || 0) + (selectedPlaceTypes?.length || 0);
  // + tambahkan filter lain jika ada

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
    <Dialog>
      <form onSubmit={handleSave}>
        <DialogTrigger asChild>
          <Button
            variant="filter"
            className={`${ 
              totalSelected > 0 ? "ring-sc-yellow-300 ring-2" : "border-none"
            }`}
          >
            <Filter2 className="text-neutral-grey size-5" filled />
            Filter
            {totalSelected > 0 && (
              <Badge
                className="bg-sc-yellow-300 text-xs"
                variant="secondary"
              >
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
          >
            <FilterMainContent
              categoryItems={categoryItems}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              placeTypeItems={placeTypeItems}
              selectedPlaceTypes={selectedPlaceTypes}
              handlePlaceTypeChange={handlePlaceTypeChange}
              onSectionChange={setActiveSection}
            />
          </FilterSidebarMenu>

          <FilterDialogFooter isDirty={isDirty} onReset={handleReset} />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default FilterDialog;
