import { features } from "@/constants/index.js";
import React from "react";

const FeaturesSection = () => {
  return (
    <section className="max-container mx-auto mt-20 w-10/12">
      <h1 className="text-center text-5xl font-bold">Our Features</h1>

      <div className="mt-20 flex flex-col gap-14">
        {features.map((feature, index) => (
          <article
            key={index}
            className={`flex flex-col-reverse items-center justify-between gap-8 lg:flex-row lg:gap-14 ${
              feature.imageLeft ? "" : "lg:flex-row-reverse"
            }`}
          >
            <div>
              <img
                src={feature.image}
                alt={feature.title}
                className="h-auto w-full max-w-[340px] flex-shrink-0 object-cover lg:max-w-[420px] xl:max-w-xl"
              />
            </div>

            <div className="flex max-w-full flex-col px-2 lg:max-w-lg lg:px-0">
              <h2 className="text-center text-2xl font-bold lg:text-left lg:text-3xl lg:text-[40px]">
                {feature.title}
              </h2>
              <p className="text-pr-blue-900 mt-6 text-center text-base font-medium lg:mt-12 lg:text-left lg:text-xl xl:text-2xl">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
