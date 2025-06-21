import React from "react";
import {
  Filter,
  Filter2,
  Star,
  People,
  Swap,
  Wallet,
  Category,
} from "react-iconly";
import SelectFilterButton from "@/components/SelectFilterButton.jsx";
import useFetchCategories from "@/api/useFetchCategories.js";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCalendarDays,
  faHouseCircleCheck,
  faList,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle.jsx";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Separator } from "./ui/separator.jsx";
import useFetchPlaceTypes from "@/api/useFetchPlaceTypes.js";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Label } from "@/components/ui/label.jsx";

const FILTER_MENU = [
  {
    icon: <Category className="size-5" filled />,
    label: "Kategori",
    href: "#",
    isActive: true,
  },
  {
    icon: <FontAwesomeIcon icon={faList} />,
    label: "Jenis Tempat",
    href: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faHouseCircleCheck} />,
    label: "Fasilitas",
    href: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faBolt} />,
    label: "Aktivitas",
    href: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    label: "Hari Buka",
    href: "#",
  },
  {
    icon: <FontAwesomeIcon icon={faMapLocationDot} />,
    label: "Wilayah",
    href: "#",
  },
];

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
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // State untuk deteksi perubahan (dirty state)
  const [initialCategories, setInitialCategories] = React.useState([]);
  const [initialPlaceTypes, setInitialPlaceTypes] = React.useState([]);

  // Cek apakah ada perubahan
  const isDirty =
    JSON.stringify(selectedCategories) !== JSON.stringify(initialCategories) ||
    JSON.stringify(selectedPlaceTypes) !== JSON.stringify(initialPlaceTypes);

  // Reset handler
  const handleReset = () => {
    setSelectedCategories(initialCategories);
    setSelectedPlaceTypes(initialPlaceTypes);
  };

  // Simpan handler
  const handleSave = (e) => {
    e.preventDefault();
    setInitialCategories(selectedCategories);
    setInitialPlaceTypes(selectedPlaceTypes);
    // TODO: trigger filter ke parent/FE sesuai kebutuhan
  };

  console.log("Selected Categories:", selectedCategories);
  console.log("Selected Place Types:", selectedPlaceTypes);

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-6">
      <Dialog>
        <form onSubmit={handleSave}>
          <DialogTrigger asChild>
            <Button variant="filter">
              <Filter2 className="text-neutral-grey size-5" filled />
              Filter
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-hidden md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {" "}
                <span className="text-3xl">Filter</span>
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-neutral-dark-grey">
              Pilih filter untuk menemukan tempat wisata yang sesuai dengan
              preferensimu.
            </DialogDescription>

            <SidebarProvider className="items-start">
              <Sidebar
                collapsible="none"
                className="text-neutral-dark-grey hidden pr-4 md:flex"
              >
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem className="flex flex-col gap-2">
                          {FILTER_MENU.map((item) => (
                            <SidebarMenuButton
                              asChild
                              key={item.label}
                              isActive={item.isActive}
                            >
                              <a href={item.href}>
                                {item.icon}
                                <span>{item.label}</span>
                              </a>
                            </SidebarMenuButton>
                          ))}
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>

              <main className="flex h-[320px] flex-1 flex-col border-l-1 bg-white">
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto pt-0 pl-6">
                  <div className="flex w-full flex-col border-t-1 pt-4">
                    <h1 className="pb-4 text-xl font-bold">Kategori</h1>

                    <ToggleGroup
                      type="multiple"
                      className="flex w-full flex-row flex-wrap gap-2 md:w-11/12"
                      value={selectedCategories}
                      onValueChange={setSelectedCategories}
                    >
                      {categoryItems.map((cat) => (
                        <div key={cat.value}>
                          <ToggleGroupItem
                            key={cat.value}
                            value={cat.value}
                            aria-label={`Toggle ${cat.label}`}
                            size="custom_sm"
                            variant="custom"
                            className="text-neutral-black border-neutral-black hover:border-primary border-1 data-[state=on]:border-2"
                          >
                            {cat.label}
                          </ToggleGroupItem>
                        </div>
                      ))}
                    </ToggleGroup>

                    <Separator className="my-4" />
                    <h1 className="pb-4 text-xl font-bold">Jenis Tempat</h1>

                    <div className="flex flex-col gap-2">
                      {placeTypeItems.map((type) => (
                        <Label
                          key={type.value}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <Checkbox
                            checked={selectedPlaceTypes.includes(type.value)}
                            onCheckedChange={() =>
                              handlePlaceTypeChange(type.value)
                            }
                          />
                          {type.label}
                        </Label>
                      ))}
                    </div>

                    <Separator className="my-4" />
                  </div>
                </div>
              </main>
            </SidebarProvider>

            <DialogFooter
              className="absolute bottom-0 left-0 z-10 flex w-full gap-2 border-t border-neutral-200 bg-white px-6 py-4"
              style={{ boxShadow: "0 -2px 8px 0 rgba(0,0,0,0.03)" }}
            >
              {isDirty && (
                <div className="flex w-full justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleReset}
                    size="custom"
                    className="h-10 rounded-full text-lg font-bold"
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    size="custom"
                    className="h-10"
                  >
                    Simpan
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

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
