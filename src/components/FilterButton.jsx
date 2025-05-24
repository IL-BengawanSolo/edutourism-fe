import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// icon: ReactNode, items: array of { label, value }, label: string, placeholder: string
const FilterButton = ({
  icon,
  items = [],
  label = "Filter",
  placeholder = "Filter",
  ...props
}) => {
  return (
    <Select {...props}>
      <SelectTrigger className="text-neutral-dark-grey flex !h-12 w-full justify-center rounded-xl border-none bg-white text-[16px] font-medium">
        {icon}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterButton;