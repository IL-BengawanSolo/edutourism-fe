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

function FilterSidebarMenu({ children }) {
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
      {children}
    </SidebarProvider>
  );
}

export default FilterSidebarMenu;
