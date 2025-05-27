import React from "react";
import { Filter, Filter2, Location, People, Swap, Wallet } from "react-iconly";
import FilterButton from "@/components/FilterButton.jsx";

const FilterBar = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-6">
      <FilterButton
        icon={<People className="text-neutral-grey size-5" filled />}
        label="Kategori Umur"
        placeholder="Kategori Umur"
        items={[
          { label: "Semua", value: "all" },
          { label: "Anak-anak", value: "children" },
          { label: "Remaja", value: "teenager" },
        ]}
      />
      <FilterButton
        icon={<Filter2 className="text-neutral-grey size-5" filled />}
        label="Kategori"
        placeholder="Kategori"
        items={[
          { label: "Semua", value: "all" },
          { label: "Alam", value: "nature" },
          { label: "Budaya", value: "culture" },
          { label: "Sejarah", value: "history" },
          { label: "Kuliner", value: "culinary" },
          { label: "Religi", value: "religious" },
        ]}
      />
      <FilterButton
        icon={<Location className="text-neutral-grey size-5" filled />}
        label="Wilayah"
        placeholder="Wilayah"
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

      <FilterButton
        icon={<Wallet className="text-neutral-grey size-5" filled />}
        label="Harga"
        placeholder="Harga"
        items={[
          { label: "Gratis", value: "free" },
          { label: "Berbayar", value: "paid" },
        ]}
      />
      <FilterButton
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
    </div>
  );
};

export default FilterBar;
