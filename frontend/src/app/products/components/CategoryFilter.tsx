"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaMobileAlt,
  FaRobot,
  FaMicrochip,
  FaLayerGroup,
} from "react-icons/fa";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

// Daftar ikon sesuai kategori (pakai React.ReactNode supaya aman di semua konfigurasi TSX)
const iconMap: Record<string, React.ReactNode> = {
  Semua: <FaLayerGroup />,
  Web: <FaGlobe />,
  Mobile: <FaMobileAlt />,
  IoT: <FaMicrochip />,
  AI: <FaRobot />,
};

// Label teks kategori
const labelMap: Record<string, string> = {
  Semua: "Semua",
  Web: "Web Development",
  Mobile: "Mobile Development",
  IoT: "Internet of Things (IoT)",
  AI: "Artificial Intelligence",
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const iconColor = isSelected ? "text-white" : "text-blue-600";

        // ambil ikon & label dengan fallback agar tidak error saat key tidak ada
        const iconElement = iconMap[category] ?? <FaLayerGroup />;
        const labelText = labelMap[category] ?? category;

        return (
          <motion.button
            key={category}
            onClick={() => onSelect(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-col items-center justify-center min-w-[200px] py-3 px-6 rounded-xl border text-sm font-semibold shadow-sm transition-all duration-300 ${
              isSelected
                ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white border-blue-700 shadow-md"
                : "bg-white text-gray-800 border-gray-300 hover:border-blue-400 hover:text-blue-700"
            }`}
          >
            <span className={`mb-1 text-2xl ${iconColor}`}>
              {iconElement}
            </span>
            <span>{labelText}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
