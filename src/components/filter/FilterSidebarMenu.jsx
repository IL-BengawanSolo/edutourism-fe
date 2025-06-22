import React from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCalendarDays,
  faHouseCircleCheck,
  faList,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { Category } from "react-iconly";

const FILTER_MENU = [
  {
    icon: <Category className="size-5" filled />,
    label: "Kategori",
    href: "#kategori",
    sectionId: "kategori-section",
  },
  {
    icon: <FontAwesomeIcon icon={faList} />,
    label: "Jenis Tempat",
    href: "#jenis-tempat",
    sectionId: "jenis-tempat-section",
  },
  {
    icon: <FontAwesomeIcon icon={faHouseCircleCheck} />,
    label: "Fasilitas",
    href: "#fasilitas",
    sectionId: "fasilitas-section",
  },
  {
    icon: <FontAwesomeIcon icon={faBolt} />,
    label: "Aktivitas",
    href: "#aktivitas",
    sectionId: "aktivitas-section",
  },
  {
    icon: <FontAwesomeIcon icon={faCalendarDays} />,
    label: "Hari Buka",
    href: "#hari-buka",
    sectionId: "hari-buka-section",
  },
  {
    icon: <FontAwesomeIcon icon={faMapLocationDot} />,
    label: "Wilayah",
    href: "#wilayah",
    sectionId: "wilayah-section",
  },
];

function FilterSidebarMenu({ activeSection, onMenuClick, children }) {
  return (
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
                      isActive={activeSection === item.sectionId}
                      onClick={() => onMenuClick?.(item.sectionId)}
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
      {children}
    </SidebarProvider>
  );
}

export { FILTER_MENU };
export default FilterSidebarMenu;