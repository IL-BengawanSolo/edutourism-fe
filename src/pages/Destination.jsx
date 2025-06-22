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
      region_id: searchParams.get("region_id") || undefined,
      category_id: searchParams.get("category_id") || undefined,
      place_type_id: searchParams.get("place_type_id") || undefined,
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
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
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
          <FilterBar setFilters={handleFilterChange} />
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
