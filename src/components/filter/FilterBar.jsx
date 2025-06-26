import React from "react";
import SelectFilterButton from "@/components/filter/SelectFilterButton.jsx";
import useFetchCategories from "@/api/useFetchCategories.js";
import useFetchPlaceTypes from "@/api/useFetchPlaceTypes.js";
import useFetchAgeCategories from "@/api/useFetchAgeCategories.js";
import FilterDialog from "./FilterDialog.jsx";

import { People, Wallet, Swap, Star } from "react-iconly";
import useFetchRegions from "@/api/useFetchRegions.js";

const FilterBar = ({ filters, setFilters }) => {
  const [open, setOpen] = React.useState(false);
  const { categories, loading: categoriesLoading } = useFetchCategories();
  const { placeTypes, loading: placeTypesLoading } = useFetchPlaceTypes();
  const { ageCategories, loading: ageCategoriesLoading } =
    useFetchAgeCategories();
  const { regions, loading: regionsLoading } = useFetchRegions();

  // State untuk semua filter
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [selectedPlaceTypes, setSelectedPlaceTypes] = React.useState([]);
  const [selectedRegion, setSelectedRegion] = React.useState([]);

  const [priceRange, setPriceRange] = React.useState("");
  const [ageCategory, setAgeCategory] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  // Sinkronkan state lokal dengan filter global saat dialog dibuka
  React.useEffect(() => {
    setSelectedCategories(
      Array.isArray(filters.category_id)
        ? filters.category_id.map((v) => Number(v))
        : [],
    );
    setSelectedPlaceTypes(
      Array.isArray(filters.place_type_id)
        ? filters.place_type_id.map((v) => Number(v))
        : [],
    );
    setSelectedRegion(
      Array.isArray(filters.region_id)
        ? filters.region_id.map((v) => Number(v))
        : [],
    );
    // setPriceRange(filters.price_range || "");
    // setAgeCategory(filters.age_category_id || "");
    // setSortBy(filters.sort_by || "");
  }, [open, filters]);

  // Update parent setiap filter berubah
  React.useEffect(() => {
    setFilters({
      category_id: selectedCategories,
      place_type_id: selectedPlaceTypes,
      price_range: priceRange,
      region_id: selectedRegion,
      age_category_id: ageCategory,
      sort_by: sortBy,
    });
    // eslint-disable-next-line
  }, [priceRange, ageCategory, sortBy]);

  const handlePlaceTypeChange = (value) => {
    setSelectedPlaceTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // State for dirty check
  const [initialCategories, setInitialCategories] = React.useState([]);
  const [initialPlaceTypes, setInitialPlaceTypes] = React.useState([]);
  const [initialRegion, setInitialRegion] = React.useState([]);

  const isDirtySaveButton =
    JSON.stringify(selectedCategories) !== JSON.stringify(initialCategories) ||
    JSON.stringify(selectedPlaceTypes) !== JSON.stringify(initialPlaceTypes) ||
    JSON.stringify(selectedRegion) !== JSON.stringify(initialRegion);

  const isDirtyResetButton =
    selectedCategories.length > 0 ||
    selectedPlaceTypes.length > 0 ||
    selectedRegion.length > 0;

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedPlaceTypes([]);
    setSelectedRegion([]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setInitialCategories(selectedCategories);
    setInitialPlaceTypes(selectedPlaceTypes);
    setInitialRegion(selectedRegion);
    setFilters({
      category_id: selectedCategories,
      place_type_id: selectedPlaceTypes,
      region_id: selectedRegion,
      price_range: priceRange,
      age_category_id: ageCategory,
      sort_by: sortBy,
    });
    setOpen(false);
  };

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

  const ageCategoryItems = [
    ...(!ageCategoriesLoading && ageCategories
      ? ageCategories.map((age) => ({
          label: age.name,
          value: age.id,
        }))
      : []),
  ];

  const regionItems = [
    ...(!regionsLoading && regions
      ? regions.map((reg) => ({
          label: reg.name,
          value: reg.id,
        }))
      : []),
  ];

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      <FilterDialog
        open={open}
        onOpenChange={setOpen}
        categoryItems={categoryItems}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        placeTypeItems={placeTypeItems}
        selectedPlaceTypes={selectedPlaceTypes}
        handlePlaceTypeChange={handlePlaceTypeChange}
        regionItems={regionItems}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        isDirtySaveButton={isDirtySaveButton}
        isDirtyResetButton={isDirtyResetButton}
        handleReset={handleReset}
        handleSave={handleSave}
      />

      <SelectFilterButton
        icon={<People className="text-neutral-grey size-5" filled />}
        label="Kategori Umur"
        placeholder="Kategori Umur"
        items={ageCategoryItems}
        value={ageCategory}
        onChange={setAgeCategory}
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
      />

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
      />
    </div>
  );
};

export default FilterBar;
