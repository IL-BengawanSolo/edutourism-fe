import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCalendarDays,
  faHouseCircleCheck,
  faList,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Category } from "react-iconly";
import { Badge } from "@/components/ui/badge";
const FILTER_MENU = [
  {
    icon: <Category className="size-5" filled />,
    label: "Kategori",
    href: "#kategori",
    sectionId: "kategori-section",
    key: "kategori",
  },
  {
    icon: <FontAwesomeIcon icon={faList} />,
    label: "Jenis Tempat",
    href: "#jenis-tempat",
    sectionId: "jenis-tempat-section",
    key: "jenisTempat",
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    label: "Hari Buka",
    href: "#hari-buka",
    sectionId: "hari-buka-section",
    key: "hariBuka",
  },
  {
    icon: <FontAwesomeIcon icon={faMapLocationDot} />,
    label: "Wilayah",
    href: "#wilayah",
    sectionId: "wilayah-section",
    key: "wilayah",
  },
  {
    icon: <FontAwesomeIcon icon={faHouseCircleCheck} />,
    label: "Fasilitas",
    href: "#fasilitas",
    sectionId: "fasilitas-section",
    key: "fasilitas",
  },
  {
    icon: <FontAwesomeIcon icon={faBolt} />,
    label: "Aktivitas",
    href: "#aktivitas",
    sectionId: "aktivitas-section",
    key: "aktivitas",
  },
];

function FilterSidebarMenu({
  activeSection,
  onMenuClick,
  selectedCategories = [],
  selectedPlaceTypes = [],
  selectedFacilities = [],
  selectedActivities = [],
  selectedOpenDays = [],
  selectedRegions = [],
  children,
}) {
  const badgeCount = {
    kategori: selectedCategories.length,
    jenisTempat: selectedPlaceTypes.length,
    fasilitas: selectedFacilities.length,
    aktivitas: selectedActivities.length,
    hariBuka: selectedOpenDays.length,
    wilayah: selectedRegions.length,
  };

  return (
    <SidebarProvider className="items-start">
      <Sidebar
        collapsible="none"
        className="text-neutral-dark-grey hidden pr-4 md:flex"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-2">
                {FILTER_MENU.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      key={item.label}
                      isActive={activeSection === item.sectionId}
                      onClick={() => onMenuClick?.(item.sectionId)}
                    >
                      <a href={item.href}>
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                    {badgeCount[item.key] > 0 && (
                      <SidebarMenuBadge>
                        <Badge variant="custom" className="text-white bg-primary">
                          {badgeCount[item.key]}
                        </Badge>
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {children}
    </SidebarProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { FILTER_MENU };
export default FilterSidebarMenu;
