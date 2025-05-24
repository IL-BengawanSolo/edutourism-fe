import React from "react";
import { Filter, Filter2, Swap, Wallet } from "react-iconly";
import FilterButton from "@/components/FilterButton.jsx";

const FilterBar = () => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      <FilterButton
        icon={<Filter2 className="text-neutral-grey size-5" filled />}
        label="Kategori"
        placeholder="Kategori"
        items={[
          { label: "Semua", value: "all" },
          { label: "Wisata Alam", value: "nature" },
          { label: "Wisata Budaya", value: "culture" },
          { label: "Wisata Sejarah", value: "history" },
          { label: "Wisata Kuliner", value: "culinary" },
          { label: "Wisata Religi", value: "religious" },
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
        icon={<Filter className="text-neutral-grey size-5" filled />}
        label="Bintang"
        placeholder="Bintang"
        items={[
          { label: "Semua", value: "all" },
          { label: "1 Bintang", value: "1-star" },
          { label: "2 Bintang", value: "2-star" },
          { label: "3 Bintang", value: "3-star" },
          { label: "4 Bintang", value: "4-star" },
          { label: "5 Bintang", value: "5-star" },
        ]}
      />
    </div>
  );
};

export default FilterBar;
