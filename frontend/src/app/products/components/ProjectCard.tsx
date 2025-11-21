"use client";

import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300"
    >
      {/* Gambar */}
      <div className="relative w-full h-40 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>
        <span className="absolute top-2 right-2 bg-blue-700 text-white text-xs px-2 py-1 rounded-md shadow">
          {project.category}
        </span>
      </div>

      {/* Konten */}
      <div className="flex flex-col flex-grow p-4">
        <h3 className="font-bold text-gray-800 text-lg line-clamp-2">
          {project.title}
        </h3>

        <div className="flex items-center text-sm text-gray-500 mt-2 space-x-3">
          <span>📅 {project.academicYear}</span>
          <span>👥 {project.code}</span>
        </div>

        <p className="text-gray-600 text-sm mt-2 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tombol di bawah selalu sejajar */}
        <div className="mt-auto pt-4">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            className="w-full inline-flex items-center justify-center 
                       bg-gradient-to-r from-blue-700 to-blue-500 
                       text-white font-medium py-2 rounded-lg 
                       hover:from-blue-600 hover:to-blue-400 
                       transition-all duration-300 shadow-sm"
          >
            <FaExternalLinkAlt className="mr-2" />
            Lihat Website
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
