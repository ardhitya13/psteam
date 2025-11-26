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
  let imgSrc = project.image;

  // 1. jika null/undefined → fallback
  if (!imgSrc || imgSrc.trim() === "") {
    imgSrc = "/placeholder.png";
  }

  // 2. kalau image berasal dari backend (mulai /uploads)
  if (imgSrc.startsWith("/uploads")) {
    imgSrc = `${process.env.NEXT_PUBLIC_API_URL}${imgSrc}`;
  }

  // 3. kalau masih tanpa http/https → jadikan absolute URL
  if (!imgSrc.startsWith("http://") && !imgSrc.startsWith("https://")) {
    imgSrc = `${process.env.NEXT_PUBLIC_API_URL}/${imgSrc.replace(/^\//, "")}`;
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
    >
      <div className="relative w-full h-80 bg-black flex items-center justify-center">
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

        <div className="mt-4">
          <a
            href={project.link}
            target="_blank"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            <FaExternalLinkAlt /> Lihat Website
          </a>
        </div>
      </div>
    </motion.div>
  );
}
