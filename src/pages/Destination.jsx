import SearchBar from "@/components/SearchBar.jsx";
import React, { useCallback, useEffect, useState } from "react";
import DestinationCard from "@/components/destination-card/DestinationCard.jsx";
import FilterBar from "@/components/filter/FilterBar.jsx";
import DestinationMap from "@/components/DestinationMap.jsx";
// import useFetchDestinations from "@/api/useFetchDestinations.js";
import { Link, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useSearchAndFilterDestinations from "@/api/useSearchAndFilterDestinations.js";
import StickyHeader from "@/components/StickyHeader.jsx";
import useFetchDestinations from "@/api/useFetchDestinations";

const Destination = () => {
  const { destinations, searchAndFilter } = useSearchAndFilterDestinations();
  console.log("Destinations:", destinations);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const filters = React.useMemo(
    () => ({
      region_id: searchParams.getAll("region_id"),
      category_id: searchParams.getAll("category_id"),
      place_type_id: searchParams.getAll("place_type_id"),
      open_days: searchParams.getAll("open_days"),
      age_category_id: searchParams.get("age_category_id") || undefined,
      price_range: searchParams.get("price_range") || undefined,
      sort_by: searchParams.get("sort_by") || undefined,
    }),
    [searchParams],
  );

  // State untuk pagination
  const [page, setPage] = useState(1); // Halaman saat ini
  const [allDestinations, setAllDestinations] = useState([]); // Semua data destinasi
  const [hasMore, setHasMore] = useState(true); // Apakah masih ada data untuk di-fetch

  // Fungsi untuk fetch data
  const fetchDestinations = useCallback(
    async (page) => {
      const limit = 10;
      let response = [];
      try {
        response = await searchAndFilter({
          search: searchValue,
          page,
          limit,
          ...filters,
        });
      } catch (err) {
        console.error("Gagal fetch destinasi:", err);
        response = [];
      }
      if (!Array.isArray(response)) response = [];
      if (response.length < limit) setHasMore(false);

      setAllDestinations((prev) => {
        const combined = [...prev, ...response];
        const unique = [];
        const seen = new Set();
        for (const dest of combined) {
          const key = dest.slug || dest.id || dest.uuid;
          if (!seen.has(key)) {
            seen.add(key);
            unique.push(dest);
          }
        }
        return unique;
      });
    },
    [searchAndFilter, searchValue, filters],
  );

  const { destinations: mapDestinations } =
    useFetchDestinations({
      search: searchValue,
      ...filters,
      page: 1,
      limit: 1000, // atau limit besar
    });

  // Fetch data saat search/filter berubah
  useEffect(() => {
    setPage(1); // Reset ke halaman pertama
    setAllDestinations([]); // Reset data destinasi
    setHasMore(true); // Reset status hasMore
    fetchDestinations(1); // Fetch halaman pertama
  }, [
    searchValue,
    filters.region_id,
    filters.category_id,
    filters.place_type_id,
    filters.open_days,
    filters.age_category_id,
    filters.price_range,
    filters.sort_by,
    fetchDestinations,
  ]);

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

  // Infinite scroll handler
  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchDestinations(nextPage);
  };

  // Handler FilterBar
  const handleFilterChange = (newFilters) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      // Hapus semua category_id & place_type_id dulu
      params.delete("category_id");
      params.delete("place_type_id");
      params.delete("region_id");
      params.delete("open_days");

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

      // Tambahkan open_days
      if (Array.isArray(newFilters.open_days)) {
        newFilters.open_days.forEach((day) => {
          if (day) params.append("open_days", day);
        });
      } else if (newFilters.open_days) {
        params.append("open_days", newFilters.open_days);
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

  console.log("All Destinations:", allDestinations);

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
            dataLength={allDestinations.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="py-4 text-center">Memuat...</h4>}
            endMessage={
              <p className="py-4 text-center text-neutral-500">
                Semua destinasi sudah ditampilkan.
              </p>
            }
            className="flex flex-col gap-4"
          >
            <p>
              Ditemukan {allDestinations.length} destinasi
              {searchValue && ` untuk "${searchValue}"`}
            </p>
            {allDestinations.map((destination) => (
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
            key={mapDestinations.map((d) => d.uuid).join(",")}
            destinations={mapDestinations}
          />
        </div>
      </section>
    </div>
  );
};

export default Destination;
