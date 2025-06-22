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
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Badge } from "../ui/badge.jsx";

const SelectFilterButton = ({
  icon,
  items = [],
  label = "Filter",
  placeholder = "Filter",
  value,
  onChange,
  showBadge = true,
  className = "",
  ...props
}) => {
  const isActive = typeof value === "string" ? value !== "" : !!value;

  const triggerClassName = [
    "text-neutral-dark-grey flex !h-10 w-full justify-center rounded-full border-none bg-white text-[16px] font-medium",
    isActive ? "ring-pr-blue-600 ring-3 text-pr-blue-800 " : "border-none",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Handler reset
  const handleReset = (e) => {
    e.stopPropagation();
    if (onChange) onChange("");
  };

  // Icon coloring: jika aktif, gunakan warna utama, jika tidak, warna netral
  const iconWithColor = React.isValidElement(icon)
    ? React.cloneElement(icon, {
        className: `${icon.props.className || ""} ${isActive ? "text-pr-blue-600" : "text-neutral-grey"}`,
      })
    : icon;

  return (
    <div className="relative flex items-center">
      <Select value={value} onValueChange={onChange} {...props}>
        <SelectTrigger className={triggerClassName}>
          {iconWithColor}
          <SelectValue placeholder={placeholder} />
          {showBadge && isActive && (
            <span className="ml-2">
              <Badge className="bg-pr-blue-100" variant="custom">
                1
              </Badge>
            </span>
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="text-md"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isActive && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="bg-state-error/85 hover:bg-state-error absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 rounded-full p-0 text-white hover:text-white"
          onClick={handleReset}
          tabIndex={-1}
          title={`Reset ${label}`}
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default SelectFilterButton;
