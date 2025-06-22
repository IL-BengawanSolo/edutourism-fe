import React from "react";
import SelectFilterButton from "@/components/SelectFilterButton.jsx";
import useFetchCategories from "@/api/useFetchCategories.js";
import useFetchPlaceTypes from "@/api/useFetchPlaceTypes.js";
import FilterDialog from "./FilterDialog.jsx";

import {
  People,
  Wallet,
  Swap,
  Star,
} from "react-iconly";

const FilterBar = () => {
  const { categories, loading: categoriesLoading } = useFetchCategories();
  const { placeTypes, loading: placeTypesLoading } = useFetchPlaceTypes();
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedPlaceTypes, setSelectedPlaceTypes] = React.useState([]);

  const categoryItems = [
    ...(!categoriesLoading && categories
      ? categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }))
      : []),
  ];

  const placeTypeItems = [
    ...(!placeTypesLoading && placeTypes
      ? placeTypes.map((type) => ({
          label: type.name,
          value: type.id,
        }))
      : []),
  ];

  const handlePlaceTypeChange = (value) => {
    setSelectedPlaceTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // State for dirty check
  const [initialCategories, setInitialCategories] = React.useState([]);
  const [initialPlaceTypes, setInitialPlaceTypes] = React.useState([]);

  const isDirty =
    JSON.stringify(selectedCategories) !== JSON.stringify(initialCategories) ||
    JSON.stringify(selectedPlaceTypes) !== JSON.stringify(initialPlaceTypes);

  const handleReset = () => {
    setSelectedCategories(initialCategories);
    setSelectedPlaceTypes(initialPlaceTypes);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setInitialCategories(selectedCategories);
    setInitialPlaceTypes(selectedPlaceTypes);
    // TODO: trigger filter to parent/frontend as needed
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-6">
      <FilterDialog
        categoryItems={categoryItems}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        placeTypeItems={placeTypeItems}
        selectedPlaceTypes={selectedPlaceTypes}
        handlePlaceTypeChange={handlePlaceTypeChange}
        isDirty={isDirty}
        handleReset={handleReset}
        handleSave={handleSave}
      />

        <SelectFilterButton
        icon={<People className="text-neutral-grey size-5" filled />}
        label="Kategori Umur"
        placeholder="Kategori Umur"
        items={[
          { label: "Semua", value: "all" },
          { label: "Anak-anak", value: "children" },
          { label: "Remaja", value: "teenager" },
        ]}
      />
      <SelectFilterButton
        icon={<Wallet className="text-neutral-grey size-5" filled />}
        label="Harga"
        placeholder="Harga"
        items={[
          { label: "Gratis", value: "free" },
          { label: "Berbayar", value: "paid" },
        ]}
      />
      <SelectFilterButton
        icon={<Swap className="text-neutral-grey size-5" filled />}
        label="Urutkan"
        placeholder="Urutkan"
        items={[
          { label: "Terbaru", value: "newest" },
          { label: "Terlama", value: "oldest" },
          { label: "Rating Tertinggi", value: "highest-rating" },
          { label: "Rating Terendah", value: "lowest-rating" },
        ]}
      />

      <SelectFilterButton
        icon={<Star className="text-neutral-grey size-5" filled />}
        label="Rating"
        placeholder="Rating"
        items={[
          { label: "Semua", value: "all" },
          { label: "Kota Surakarta", value: "surakarta" },
          { label: "Kab. Sukoharjo", value: "sukoharjo" },
          { label: "Kab. Karanganyar", value: "karanganyar" },
          { label: "Kab. Boyolali", value: "boyolali" },
          { label: "Kab. Klaten", value: "klaten" },
          { label: "Kab. Wonogiri", value: "wonogiri" },
        ]}
      />
    </div>
  );
};

export default FilterBar;