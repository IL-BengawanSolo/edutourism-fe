import React from "react";
import SelectFilterButton from "@/components/filter/SelectFilterButton.jsx";
import useFetchCategories from "@/api/useFetchCategories.js";
import useFetchPlaceTypes from "@/api/useFetchPlaceTypes.js";
import FilterDialog from "./FilterDialog.jsx";

import { People, Wallet, Swap, Star } from "react-iconly";
import { Badge } from "../ui/badge.jsx";

const FilterBar = ({ setFilters }) => {
  const { categories, loading: categoriesLoading } = useFetchCategories();
  const { placeTypes, loading: placeTypesLoading } = useFetchPlaceTypes();

  // State untuk semua filter
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedPlaceTypes, setSelectedPlaceTypes] = React.useState([]);
  const [priceRange, setPriceRange] = React.useState("");
  const [ageCategory, setAgeCategory] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  // Update parent setiap filter berubah
  React.useEffect(() => {
    setFilters({
      category_id: selectedCategories.join(","),
      place_type_id: selectedPlaceTypes.join(","),
      price_range: priceRange,
      age_category_id: ageCategory,
      sort_by: sortBy,
    });
    // eslint-disable-next-line
  }, [selectedCategories, selectedPlaceTypes, priceRange, ageCategory, sortBy]);

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
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
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
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
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
        value={priceRange}
        onChange={setPriceRange}
        items={[
          { label: "Gratis", value: "free" },
          { label: "< Rp 10K", value: "lt-10k" },
          { label: "Rp 10K - 30K", value: "10-30" },
          { label: "Rp 30K - 100K", value: "30-100" },
          { label: "> Rp 100K", value: "gt-100k" },
        ]}
      >
        {priceRange !== "" && (
          <Badge className="bg-pr-blue-100" variant="custom">
            1
          </Badge>
        )}
      </SelectFilterButton>

      <SelectFilterButton
        icon={<Swap className="text-neutral-grey size-5" filled />}
        label="Urutkan"
        placeholder="Urutkan"
        value={sortBy}
        onChange={setSortBy}
        items={[
          { label: "Harga Tertinggi", value: "highest-price" },
          { label: "Harga Terendah", value: "lowest-price" },
          { label: "Rating Tertinggi", value: "highest-rating" },
          { label: "Jumlah Ulasan", value: "review-count" },
        ]}
      >
        {sortBy !== "" && (
          <Badge className="bg-pr-blue-100" variant="custom">
            1
          </Badge>
        )}
      </SelectFilterButton>


      {/* <SelectFilterButton
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
      /> */}
    </div>
  );
};

export default FilterBar;
