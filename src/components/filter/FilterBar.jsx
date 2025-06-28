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

  const categoriesFilter = Array.isArray(filters.category_id)
    ? filters.category_id.map((v) => Number(v))
    : [];

  const placeTypesFilter = Array.isArray(filters.place_type_id)
    ? filters.place_type_id.map((v) => Number(v))
    : [];

  const regionsFilter = Array.isArray(filters.region_id)
    ? filters.region_id.map((v) => Number(v))
    : [];

  const openDaysFilter = Array.isArray(filters.open_days)
    ? filters.open_days.map((v) => Number(v))
    : [];

  const priceRange = filters.price_range || "";
  const ageCategory = filters.age_category_id || "";
  const sortBy = filters.sort_by || "";

  // State untuk semua filter
  const [selectedCategories, setSelectedCategories] =
    React.useState(categoriesFilter);
  const [selectedPlaceTypes, setSelectedPlaceTypes] =
    React.useState(placeTypesFilter);
  const [selectedRegion, setSelectedRegion] = React.useState(regionsFilter);
  const [selectedOpenDays, setSelectedOpenDays] =
    React.useState(openDaysFilter);

  // Update parent setiap filter berubah
  React.useEffect(() => {
    setFilters({
      category_id: selectedCategories,
      place_type_id: selectedPlaceTypes,
      region_id: selectedRegion,
      open_days: selectedOpenDays,
      price_range: priceRange,
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
  const [initialCategories, setInitialCategories] =
    React.useState(categoriesFilter);
  const [initialPlaceTypes, setInitialPlaceTypes] =
    React.useState(placeTypesFilter);
  const [initialRegion, setInitialRegion] = React.useState(regionsFilter);
  const [initialOpenDays, setInitialOpenDays] = React.useState(openDaysFilter);

  const isDirtySaveButton =
    JSON.stringify(selectedCategories) !== JSON.stringify(initialCategories) ||
    JSON.stringify(selectedPlaceTypes) !== JSON.stringify(initialPlaceTypes) ||
    JSON.stringify(selectedRegion) !== JSON.stringify(initialRegion) ||
    JSON.stringify(selectedOpenDays) !== JSON.stringify(initialOpenDays);

  const isDirtyResetButton =
    selectedCategories.length > 0 ||
    selectedPlaceTypes.length > 0 ||
    selectedRegion.length > 0 ||
    selectedOpenDays.length > 0;

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedPlaceTypes([]);
    setSelectedRegion([]);
    setSelectedOpenDays([]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setInitialCategories(selectedCategories);
    setInitialPlaceTypes(selectedPlaceTypes);
    setInitialRegion(selectedRegion);
    setInitialOpenDays(selectedOpenDays);
    setFilters({
      category_id: selectedCategories,
      place_type_id: selectedPlaceTypes,
      region_id: selectedRegion,
      open_days: selectedOpenDays,
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

  const regionItems = [
    ...(!regionsLoading && regions
      ? regions.map((reg) => ({
          label: reg.name,
          value: reg.id,
        }))
      : []),
  ];

  const openDaysItems = [
    { label: "Senin", value: 1 },
    { label: "Selasa", value: 2 },
    { label: "Rabu", value: 3 },
    { label: "Kamis", value: 4 },
    { label: "Jumat", value: 5 },
    { label: "Sabtu", value: 6 },
    { label: "Minggu", value: 7 },
  ];

  const ageCategoryItems = [
    ...(!ageCategoriesLoading && ageCategories
      ? ageCategories.map((age) => ({
          label: age.name,
          value: String(age.id),
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
        openDaysItems={openDaysItems}
        selectedOpenDays={selectedOpenDays}
        setSelectedOpenDays={setSelectedOpenDays}
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
        onChange={(val) => setFilters({ ...filters, age_category_id: val })}
      />

      <SelectFilterButton
        icon={<Wallet className="text-neutral-grey size-5" filled />}
        label="Harga"
        placeholder="Harga"
        value={priceRange}
        onChange={(val) => setFilters({ ...filters, price_range: val })}
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
        onChange={(val) => setFilters({ ...filters, sort_by: val })}
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
