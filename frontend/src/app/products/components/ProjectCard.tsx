"use client";

import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export type ProductCardItem = {
  id: number;
  image: string;
  title: string;
  category: string;
  academicYear: string;
  code: string;
  description: string;
  link: string;
  publishDate: string;
};

type Props = { project: ProductCardItem };

export default function ProjectCard({ project }: Props) {
  const API = process.env.NEXT_PUBLIC_API_URL || "";

  let imgSrc = project.image?.trim() || "";

  // =============== FIX 1: fallback default ===============
  if (!imgSrc) {
    imgSrc = "/placeholder.png";
  }

  // =============== FIX 2: kalau backend kirim `/uploads/...`
  if (imgSrc.startsWith("/uploads")) {
    imgSrc = `${API}${imgSrc}`;
  }

  // =============== FIX 3: jika URL relatif seperti "uploads/xxx.jpg"
  if (
    !imgSrc.startsWith("http://") &&
    !imgSrc.startsWith("https://") &&
    !imgSrc.startsWith("/")
  ) {
    imgSrc = `${API}/${imgSrc}`;
  }

  // =============== FIX 4: sanitize (hapus double slash) ===============
  imgSrc = imgSrc.replace(/([^:]\/)\/+/g, "$1");

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-80 bg-black">
        <Image
          src={imgSrc}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="p-4 text-black">
        <h3 className="font-semibold text-lg">{project.title}</h3>

        <div className="text-sm text-gray-500 mt-2 space-x-3">
          <span>📅 {project.academicYear}</span>
          <span>👥 {project.code}</span>
        </div>

        <div className="text-xs mt-1 text-gray-500 italic">
          🕒 Dipublish:{" "}
          {project.publishDate
            ? project.publishDate.split("T")[0]
            : "Tidak ada tanggal"}
        </div>

        <p className="text-gray-600 text-sm mt-2">{project.description}</p>

        {project.link && (
          <div className="mt-4">
            <a
              href={project.link}
              target="_blank"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              <FaExternalLinkAlt /> Lihat Website
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
