import SearchBar from "@/components/SearchBar.jsx";
import React, { useEffect, useState } from "react";
import DestinationCard from "@/components/DestinationCard.jsx";
import FilterBar from "@/components/filter/FilterBar.jsx";
import DestinationMap from "@/components/DestinationMap.jsx";
// import useFetchDestinations from "@/api/useFetchDestinations.js";
import { Link, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useSearchAndFilterDestinations from "@/api/useSearchAndFilterDestinations.js";
import StickyHeader from "@/components/StickyHeader.jsx";

const Destination = () => {
  const { destinations, loading, error, searchAndFilter } =
    useSearchAndFilterDestinations();
  console.log("Destinations:", destinations);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const filters = React.useMemo(
    () => ({
      region_id: searchParams.getAll("region_id"),
      category_id: searchParams.getAll("category_id"),
      place_type_id: searchParams.getAll("place_type_id"),
      age_category_id: searchParams.get("age_category_id") || undefined,
      price_range: searchParams.get("price_range") || undefined,
      sort_by: searchParams.get("sort_by") || undefined,
    }),
    [searchParams],
  );

  // Handler SearchBar
  const handleSearchChange = (val) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (val) {
        params.set("search", val);
      } else {
        params.delete("search");
      }
      return params;
    });
  };

  // Handler FilterBar
  const handleFilterChange = (newFilters) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      // Hapus semua category_id & place_type_id dulu
      params.delete("category_id");
      params.delete("place_type_id");
      params.delete("region_id");

      // Tambahkan array category_id
      if (Array.isArray(newFilters.category_id)) {
        newFilters.category_id.forEach((id) => {
          if (id) params.append("category_id", id);
        });
      } else if (newFilters.category_id) {
        params.append("category_id", newFilters.category_id);
      }

      // Tambahkan array place_type_id
      if (Array.isArray(newFilters.place_type_id)) {
        newFilters.place_type_id.forEach((id) => {
          if (id) params.append("place_type_id", id);
        });
      } else if (newFilters.place_type_id) {
        params.append("place_type_id", newFilters.place_type_id);
      }

      // Tambahkan array region_id
      if (Array.isArray(newFilters.region_id)) {
        newFilters.region_id.forEach((id) => {
          if (id) params.append("region_id", id);
        });
      } else if (newFilters.region_id) {
        params.append("region_id", newFilters.region_id);
      }

      // Sisanya tetap pakai set
      ["age_category_id", "price_range", "sort_by"].forEach((key) => {
        if (newFilters[key]) {
          params.set(key, newFilters[key]);
        } else {
          params.delete(key);
        }
      });

      return params;
    });
  };

  // Fetch data saat search/filter berubah
  useEffect(() => {
    searchAndFilter({ search: searchValue, ...filters });
    setVisible(10); // reset infinite scroll saat filter/search berubah
  }, [
    searchValue,
    filters.region_id,
    filters.category_id,
    filters.place_type_id,
    filters.age_category_id,
    filters.price_range,
    filters.sort_by,
    searchAndFilter,
    filters,
  ]);

  // Infinite scroll state
  const [visible, setVisible] = useState(10);
  const fetchMoreData = () => {
    setVisible((prev) => prev + 10);
  };

  return (
    <div>
      <StickyHeader>
        <section className="max-container mx-auto w-11/12 sm:w-10/12">
          <SearchBar value={searchValue} onSubmit={handleSearchChange} />
          <FilterBar filters={filters} setFilters={handleFilterChange} />
        </section>
      </StickyHeader>

      {/* Main Layout */}
      <section className="max-container mx-auto grid w-11/12 grid-cols-1 gap-6 sm:w-10/12 lg:grid-cols-5">
        {/* Destination Cards */}
        <div className="col-span-3 flex flex-col gap-4">
          <InfiniteScroll
            dataLength={Math.min(visible, destinations.length)}
            next={fetchMoreData}
            hasMore={visible < destinations.length}
            loader={<h4 className="py-4 text-center">Memuat...</h4>}
            endMessage={
              <p className="py-4 text-center text-neutral-500">
                Semua destinasi sudah ditampilkan.
              </p>
            }
            className="flex flex-col gap-4"
          >
            <p>
              Ditemukan {destinations.length} destinasi
              {searchValue && ` untuk "${searchValue}"`}
            </p>
            {destinations.slice(0, visible).map((destination) => (
              <Link
                key={destination.slug}
                to={`/destinations/${destination.slug}`}
                className="no-underline"
              >
                <DestinationCard
                  variant="row"
                  name={destination.name}
                  categories={destination.categories || []}
                  placeTypes={destination.place_types}
                  region_name={destination.region_name}
                  minPrice={destination.ticket_price_min}
                  maxPrice={destination.ticket_price_max}
                  ageCategories={destination.age_categories}
                />
              </Link>
            ))}
          </InfiniteScroll>
        </div>

        {/* Map */}
        <div className="sticky top-38 col-span-1 h-[calc(100vh-14rem)] lg:col-span-2">
          <DestinationMap
            key={destinations.map((d) => d.uuid).join(",")}
            destinations={destinations}
          />
        </div>
      </section>
    </div>
  );
};

export default Destination;
