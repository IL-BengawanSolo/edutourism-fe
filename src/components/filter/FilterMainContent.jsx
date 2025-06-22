import React from "react";
import CategoryFilter from "./CategoryFilter.jsx";
import PlaceTypeFilter from "./PlaceTypeFilter.jsx";
import { Separator } from "../ui/separator.jsx";

const SECTION_IDS = [
  "kategori-section",
  "jenis-tempat-section",
  // Tambahkan section id lain jika ada
];

function FilterMainContent({
  categoryItems,
  selectedCategories,
  setSelectedCategories,
  placeTypeItems,
  selectedPlaceTypes,
  handlePlaceTypeChange,
  onSectionChange,
}) {

  const kategoriSepRef = React.useRef(null);
  const jenisTempatSepRef = React.useRef(null);

  // Map section id ke separator ref berikutnya
  const separatorRefs = {
    "kategori-section": kategoriSepRef,
    "jenis-tempat-section": jenisTempatSepRef,
    // Tambahkan separator ref lain jika ada
  };

  React.useEffect(() => {
    const container = document.getElementById("filter-main-scroll");
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;

      let active = SECTION_IDS[0];
      for (let i = 0; i < SECTION_IDS.length; i++) {
        const sectionId = SECTION_IDS[i];
        const sepRef = separatorRefs[sectionId];
        if (sepRef && sepRef.current) {
          const sepTop = sepRef.current.getBoundingClientRect().top - containerTop;
          if (sepTop > 0) {
            active = sectionId;
            break;
          }
        }
        // Jika sudah di akhir, tetap aktif di section terakhir
        if (i === SECTION_IDS.length - 1) {
          active = sectionId;
        }
      }
      onSectionChange?.(active);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, []);

  return (
    <main
      id="filter-main-scroll"
      className="flex h-[320px] flex-1 flex-col border-l-1 bg-white overflow-y-auto pl-6"
    >
      <div className="flex w-full flex-col border-t-1 pt-4 ">
        <section id="kategori-section">
          <CategoryFilter
            items={categoryItems}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </section>
        <Separator className="my-4" ref={kategoriSepRef} />
        <section id="jenis-tempat-section">
          <PlaceTypeFilter
            items={placeTypeItems}
            selected={selectedPlaceTypes}
            onToggle={handlePlaceTypeChange}
          />
        </section>
        <Separator className="my-4" ref={jenisTempatSepRef} />
        {/* Tambahkan section dan separator lain sesuai kebutuhan */}
      </div>
    </main>
  );
}

export default FilterMainContent;