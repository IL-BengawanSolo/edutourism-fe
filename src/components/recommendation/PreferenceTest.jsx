import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowLeft, ArrowRight } from "react-iconly";

import React from "react";
import { Button } from "../ui/button.jsx";

const PreferenceTest = ({
  currentQuestion = 1,
  questionText = "",
  answerChoices = [],
  selected = [],
  setSelected = () => {},
  onNext,
  onPrev,
  isFirst,
  isLast,
}) => {
   // Handler saat user toggle pilihan
  const handleToggle = (value) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  // Handler tombol Next
  const handleNext = () => {
    if (onNext) onNext();
  };

  return (
    <div className="max-container mx-auto mt-10 flex w-11/12 flex-col gap-10 sm:w-10/12">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center gap-4 md:items-start md:gap-8">
          <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full px-6 shadow-xs md:mb-0 md:h-16 md:w-16">
            <span className="text-primary font-base text-4xl font-bold">
              {currentQuestion}
            </span>
          </div>
          <h2 className="text-pr-blue-950 mb-6 w-full text-lg font-bold md:text-2xl lg:text-3xl xl:text-4xl">
            {questionText}
          </h2>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center">
        <ToggleGroup
          type="multiple"
          className="flex w-full flex-row flex-wrap md:w-10/12 md:gap-4"
          value={selected}
          onValueChange={setSelected}
        >
          {answerChoices.map((choice) => (
            <div className="mb-6" key={choice.id}>
              <ToggleGroupItem
                key={choice.id}
                value={choice.value}
                aria-label={`Toggle ${choice.label}`}
                size="custom2"
                variant="custom"
                className="text-neutral-black border-neutral-black hover:border-primary border-1 data-[state=on]:border-2"
                pressed={selected.includes(choice.value)}
                onClick={() => handleToggle(choice.value)}
              >
                {choice.label}
              </ToggleGroupItem>
            </div>
          ))}
        </ToggleGroup>
      </div>

      <div className="mb-20 flex justify-between">
        <Button
          size="custom"
          className="bg-neutral-light-grey hover:bg-pr-blue-100 hover:text-primary text-neutral-grey mb-4 h-12 w-12 rounded-full md:mb-0 md:h-18 md:w-18"
          onClick={onPrev}
          disabled={isFirst}
        >
          <ArrowLeft className="size-8 md:size-10" stroke="bold" />
        </Button>
        {isLast ? (
          <Button
            size="custom"
            className="h-12 rounded-full text-xl md:mb-0 md:h-18"
            onClick={handleNext}
          >
            Selesai
          </Button>
        ) : (
          <Button
            size="custom"
            className="bg-primary hover:bg-primary/85 mb-4 h-12 w-12 rounded-full text-white md:mb-0 md:h-18 md:w-18"
            onClick={handleNext}
          >
            <ArrowRight className="size-8 md:size-10" stroke="bold" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PreferenceTest;
