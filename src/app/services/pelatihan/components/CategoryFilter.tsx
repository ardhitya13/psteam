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

// Map menyimpan komponen ikon (IconType) — lebih aman daripada JSX.Element
const iconMap: Record<string, IconType> = {
  "Web Development": FaGlobe,
  "Mobile Development": FaMobileAlt,
  "Artificial Intelligence": FaRobot,
  "Internet of Things (IoT)": FaMicrochip,
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 justify-items-center">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const Icon: IconType = iconMap[category] ?? FaLayerGroup; // fallback

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            type="button"
            className={`w-full sm:w-56 p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 focus:outline-none
              ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                  : "bg-white text-gray-800 border-gray-200 hover:border-blue-400 hover:shadow-md"
              }`}
          >
            <div>
              <Icon className={`text-2xl ${isSelected ? "text-white" : ""}`} />
            </div>
            <span className="text-sm font-medium text-center">{category}</span>
          </button>
        );
      })}
    </div>
  );
}
