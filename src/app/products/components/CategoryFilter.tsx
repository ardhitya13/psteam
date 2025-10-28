"use client";

import { motion } from "framer-motion";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelect(category)}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`px-4 py-2 rounded-full border font-medium shadow-sm transition-all duration-300 ${
            selectedCategory === category
              ? "bg-blue-800 text-white border-blue-700 shadow-md"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-700"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
