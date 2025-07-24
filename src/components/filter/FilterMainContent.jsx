import React from "react";
import ToggleFilter from "./ToggleFilter.jsx";
import { Separator } from "../ui/separator.jsx";
import CheckboxFilter from "./CheckboxFilter.jsx";

const SECTION_IDS = [
  "kategori-section",
  "jenis-tempat-section",
  "wilayah-section",
  "hari-buka-section",
  // Tambahkan section id lain jika ada
];

function FilterMainContent({
  categoryItems,
  selectedCategories,
  setSelectedCategories,
  placeTypeItems,
  selectedPlaceTypes,
  handlePlaceTypeChange,
  regionItems,
  selectedRegion,
  setSelectedRegion,
  openDaysItems,
  selectedOpenDays,
  setSelectedOpenDays,
  onSectionChange,
}) {
  const kategoriSepRef = React.useRef(null);
  const jenisTempatSepRef = React.useRef(null);
  const wilayahSepRef = React.useRef(null);
  const hariBukaSepRef = React.useRef(null);

  // Map section id ke separator ref berikutnya
  const separatorRefs = {
    "kategori-section": kategoriSepRef,
    "jenis-tempat-section": jenisTempatSepRef,
    "wilayah-section": wilayahSepRef,
    "hari-buka-section": hariBukaSepRef,

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
          const sepTop =
            sepRef.current.getBoundingClientRect().top - containerTop;
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
      className="flex h-[320px] flex-1 flex-col overflow-y-auto md:border-l-1 bg-white pl-6"
    >
      <div className="flex w-full flex-col pb-45">
        <section id="kategori-section">
          <ToggleFilter
            label={"Kategori"}
            items={categoryItems}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </section>
        <Separator className="my-4" ref={kategoriSepRef} />
        <section id="jenis-tempat-section">
          <CheckboxFilter
            label={"Jenis Tempat"}
            items={placeTypeItems}
            selected={selectedPlaceTypes}
            onToggle={handlePlaceTypeChange}
          />
        </section>
        <Separator className="my-4" ref={jenisTempatSepRef} />
        <section id="wilayah-section">
          <ToggleFilter
            label={"Wilayah"}
            items={regionItems}
            selected={selectedRegion}
            onChange={setSelectedRegion}
          />
        </section>
        <Separator className="my-4" ref={wilayahSepRef} />
        <section id="hari-buka-section">
          <ToggleFilter
            label={"Hari Buka"}
            items={openDaysItems}
            selected={selectedOpenDays}
            onChange={setSelectedOpenDays}
          />
        </section>
      </div>
    </main>
  );
}

export default FilterMainContent;
