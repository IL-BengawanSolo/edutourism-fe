import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle.jsx";
import { ArrowLeft, ArrowRight } from "react-iconly";

import React from "react";
import { Button } from "./ui/button.jsx";

const categories = [
  { value: "seni", label: "Seni" },
  { value: "budaya", label: "Budaya" },
  { value: "sejarah", label: "Sejarah" },
  { value: "kreativitas", label: "Kreativitas" },
  { value: "sains", label: "Sains" },
  { value: "teknologi", label: "Teknologi" },
  { value: "lingkungan", label: "Lingkungan" },
  { value: "religi", label: "Religi" },
];

const PreferenceTest = ({ onTestCompleted }) => {
  return (
    <div className="max-container mx-auto mt-10 flex w-11/12 flex-col gap-10 sm:w-10/12">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-4 md:items-start md:gap-8">
          <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full px-6 shadow-xs md:mb-0 md:h-16 md:w-16">
            <span className="text-primary font-base text-4xl font-bold">2</span>
          </div>
          <h2 className="text-pr-blue-950 mb-6 w-full text-lg font-bold md:text-2xl lg:text-3xl xl:text-4xl">
            Apa saja jenis tempat wisata yang kamu sukai? <br /> (bisa lebih
            dari satu)
          </h2>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center">
        <ToggleGroup
          type="multiple"
          className="flex w-full flex-row flex-wrap md:w-10/12 md:gap-4"
        >
          {categories.map((cat) => (
            <div className="mb-6" key={cat.value}>
              <ToggleGroupItem
                key={cat.value}
                value={cat.value}
                aria-label={`Toggle ${cat.label}`}
              >
                <Toggle size="custom2" variant="custom">
                  {cat.label}
                </Toggle>
              </ToggleGroupItem>
            </div>
          ))}
        </ToggleGroup>
      </div>

      <div className="mb-20 flex justify-between">
        <Button
          size="custom"
          className="bg-neutral-light-grey hover:bg-pr-blue-100 hover:text-primary text-neutral-grey mb-4 h-12 w-12 rounded-full md:mb-0 md:h-18 md:w-18"
        >
          <ArrowLeft className="size-8 md:size-10" stroke="bold" />
        </Button>
        <Button
          size="custom"
          className="bg-primary hover:bg-primary/85 mb-4 h-12 w-12 rounded-full text-white md:mb-0 md:h-18 md:w-18"
          onClick={onTestCompleted}
        >
          <ArrowRight className="size-8 md:size-10" stroke="bold" />
        </Button>
      </div>
    </div>
  );
};

export default PreferenceTest;
