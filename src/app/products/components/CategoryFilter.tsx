"use client";

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

// ✅ Sesuaikan nama kategori sesuai data di ProjectList
const iconMap: Record<string, React.ReactNode> = {
  Semua: <FaLayerGroup className="text-lg" />,
  Web: <FaGlobe className="text-lg" />,
  Mobile: <FaMobileAlt className="text-lg" />,
  IoT: <FaMicrochip className="text-lg" />,
  AI: <FaRobot className="text-lg" />,
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
          className={`flex items-center gap-2 px-4 py-2 rounded-full border font-medium shadow-sm transition-all duration-300 ${
            selectedCategory === category
              ? "bg-blue-800 text-white border-blue-700 shadow-md"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-700"
          }`}
        >
          {iconMap[category]}
          <span>{category}</span>
        </motion.button>
      ))}
    </div>
  );
}
