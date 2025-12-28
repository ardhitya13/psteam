"use client";

import React from "react";
import type { IconType } from "react-icons";
import {
  FaGlobe,
  FaMobileAlt,
  FaRobot,
  FaMicrochip,
  FaLayerGroup,
} from "react-icons/fa";

type Props = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const iconMap: Record<string, IconType> = {
  "Web Development": FaGlobe,
  "Mobile Development": FaMobileAlt,
  "Internet of Things (IoT)": FaMicrochip,
  "Artificial Intelligence": FaRobot,
  Semua: FaLayerGroup,
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: Props) {
  const sortedCategories = [...categories].sort((a, b) => {
    if (a === "Artificial Intelligence") return 1;
    if (b === "Artificial Intelligence") return -1;
    return 0;
  });

  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-4 mt-5">
      {sortedCategories.map((category) => {
        const isSelected = selectedCategory === category;
        const Icon: IconType = iconMap[category] ?? FaLayerGroup;

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            type="button"
            className={`flex flex-col items-center justify-center px-6 py-3 sm:px-7 sm:py-3.5 md:px-8 md:py-4 
              rounded-xl border min-w-[140px] sm:min-w-[160px] md:min-w-[180px]
              transition-all duration-300 ease-out focus:outline-none
              ${
                isSelected
                  ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white border-blue-700 shadow-lg scale-[1.04]"
                  : "bg-white text-gray-800 border-gray-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-[2px]"
              }`}
          >
            <Icon
              className={`text-lg sm:text-xl md:text-2xl transition-colors duration-300 ${
                isSelected ? "text-white" : "text-blue-600"
              }`}
            />
            <span className="text-xs sm:text-sm font-medium text-center mt-1">
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
}
