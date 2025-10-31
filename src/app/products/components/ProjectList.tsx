"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import CategoryFilter from "./CategoryFilter";

type Project = {
  image: string;
  category: string;
  title: string;
  academicYear: string;
  code: string;
  description: string;
  link: string;
};

type ProjectListProps = {
  searchQuery?: string;
};

export default function ProjectList({ searchQuery = "" }: ProjectListProps) {
  const projects: Project[] = [
    {
      image: "/produtcs/asri.png",
      category: "Web",
      title: "ASRI: Aplikasi Rumah Susun Pintar",
      academicYear: "2024/2025 - Genap",
      code: "PSTEAM-WEB01",
      description:
        "Aplikasi web menggunakan Laravel/MySQL dengan fungsi CRUD, laporan, dan integrasi API JSON.",
      link: "https://asri-app.vercel.app",
    },
    {
      image: "/produtcs/digita.png",
      category: "Web",
      title: "DigiTA: Sistem Digital Bimbingan TA",
      academicYear: "2024/2025 - Genap",
      code: "PSTEAM-WEB02",
      description:
        "Platform bimbingan tugas akhir berbasis web yang mempermudah komunikasi dan manajemen dokumen.",
      link: "https://digita.vercel.app",
    },
    {
      image: "/produtcs/smartiot.png",
      category: "IoT",
      title: "Smart Soil Monitor IoT",
      academicYear: "2024/2025 - Genap",
      code: "PSTEAM-IOT01",
      description:
        "Sistem IoT untuk memantau kelembapan tanah secara real-time menggunakan sensor DHT dan ESP32.",
      link: "https://iot-kelembapan.vercel.app",
    },
    {
      image: "/produtcs/aiface.png",
      category: "AI",
      title: "FaceTrack: AI Face Attendance System",
      academicYear: "2024/2025 - Genap",
      code: "PSTEAM-AI01",
      description:
        "Aplikasi absensi berbasis AI untuk mendeteksi wajah menggunakan Python, Flask, dan OpenCV.",
      link: "https://ai-faceapp.vercel.app",
    },
    {
      image: "/produtcs/mobilelearn.png",
      category: "Mobile",
      title: "Learnify: Aplikasi Edukasi Mobile",
      academicYear: "2024/2025 - Genap",
      code: "PSTEAM-MOB01",
      description:
        "Aplikasi mobile berbasis Flutter untuk pembelajaran interaktif dengan fitur video dan kuis.",
      link: "https://learnify.vercel.app",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const categories = ["Semua", "Web", "Mobile", "IoT", "AI"];
  const q = searchQuery.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchCategory =
      selectedCategory === "Semua" || project.category === selectedCategory;
    const searchable =
      `${project.title} ${project.code} ${project.description}`.toLowerCase();
    const matchSearch = q === "" ? true : searchable.includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory + q} // supaya animasi berubah tiap kategori/search berubah
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-6"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10 col-span-full">
              Tidak ditemukan proyek yang cocok dengan pencarianmu 😔
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
