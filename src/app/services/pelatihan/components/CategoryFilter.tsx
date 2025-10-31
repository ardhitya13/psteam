"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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

// Map icon berdasarkan kategori
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
  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 justify-items-center">
      {categories.map((category, index) => {
        const isSelected = selectedCategory === category;
        const Icon: IconType = iconMap[category] ?? FaLayerGroup;

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            type="button"
            data-aos="zoom-in-up"
            data-aos-delay={index * 100}
            className={`w-full sm:w-56 p-4 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 focus:outline-none
              ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105"
                  : "bg-white text-gray-800 border-gray-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-1"
              }`}
          >
            <div className="transition-transform duration-300 transform group-hover:scale-110">
              <Icon className={`text-2xl ${isSelected ? "text-white" : "text-blue-600"}`} />
            </div>
            <span className="text-sm font-medium text-center">
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
}
