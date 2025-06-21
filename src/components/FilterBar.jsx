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
  const { categories, loading } = useFetchCategories();

  const categoryItems = [
    { label: "Semua", value: "all" },
    ...(!loading && categories
      ? categories.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }))
      : []),
  ];

  return (
    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-6">
      <Dialog>
        <form>
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

              <main className="flex h-[480px] flex-1 flex-col overflow-hidden border-l-1 bg-white">
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto pt-0 pl-6">
                  <div className="flex w-full flex-col border-t-1 pt-4">
                    <h1 className="pb-4 text-xl font-bold">Kategori</h1>

                    <ToggleGroup
                      type="multiple"
                      className="flex w-full flex-row flex-wrap gap-2 md:w-11/12"
                    >
                      {categoryItems.map((cat) => (
                        <div key={cat.value}>
                          <ToggleGroupItem
                            key={cat.value}
                            value={cat.value}
                            aria-label={`Toggle ${cat.label}`}
                            size="custom_sm"
                            variant="custom"
                          >
                            {cat.label}
                          </ToggleGroupItem>
                        </div>
                      ))}
                    </ToggleGroup>

                    <Separator className="my-4" />
                    <h1 className="pb-4 text-xl font-bold">Jenis Tempat</h1>
                  </div>
                </div>
              </main>
            </SidebarProvider>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
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
