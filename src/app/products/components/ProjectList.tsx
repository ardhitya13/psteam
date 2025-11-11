"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryFilter from "./CategoryFilter";
import Link from "next/link";

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
  initialShow?: number | null;
};

export default function ProjectList({
  searchQuery = "",
  initialShow = undefined,
}: ProjectListProps) {
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
    {
      image: "/produtcs/asri.png",
      category: "Web",
      title: "ASRI (Demo 2)",
      academicYear: "2024",
      code: "PSTEAM-WEB03",
      description: "Demo tambahan untuk uji grid.",
      link: "#",
    },
    {
      image: "/produtcs/digita.png",
      category: "Web",
      title: "DigiTA (Demo 2)",
      academicYear: "2024",
      code: "PSTEAM-WEB04",
      description: "Demo tambahan untuk uji grid.",
      link: "#",
    },
    {
      image: "/produtcs/smartiot.png",
      category: "IoT",
      title: "Smart Soil Monitor (Demo 2)",
      academicYear: "2024",
      code: "PSTEAM-IOT02",
      description: "Demo tambahan untuk uji grid.",
      link: "#",
    },
    {
      image: "/produtcs/aiface.png",
      category: "AI",
      title: "FaceTrack (Demo 2)",
      academicYear: "2024",
      code: "PSTEAM-AI02",
      description: "Demo tambahan untuk uji grid.",
      link: "#",
    },
    {
      image: "/produtcs/mobilelearn.png",
      category: "Mobile",
      title: "Learnify (Demo 2)",
      academicYear: "2024",
      code: "PSTEAM-MOB02",
      description: "Demo tambahan untuk uji grid.",
      link: "#",
    },
  ];

  const q = searchQuery.trim().toLowerCase();
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [page, setPage] = useState(1);
  const categories = ["Semua", "Web", "Mobile", "IoT", "AI"];
  const isPreview = typeof initialShow === "number";
  const perPage = 6;

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory =
        selectedCategory === "Semua" || p.category === selectedCategory;
      const searchable = `${p.title} ${p.code} ${p.description}`.toLowerCase();
      return matchCategory && searchable.includes(q);
    });
  }, [projects, selectedCategory, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const visibleProjects = isPreview
    ? filtered.slice(0, initialShow as number)
    : filtered.slice(start, start + perPage);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={(c) => {
          setSelectedCategory(c);
          setPage(1);
        }}
      />

      {/* Grid Project Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory + q + page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mt-10 justify-items-center"
        >
          {visibleProjects.length > 0 ? (
            visibleProjects.map((p, idx) => (
              <motion.div
                key={idx}
                className="
                  w-[360px] h-[520px]
                  bg-white text-gray-800 
                  rounded-2xl shadow-lg border border-gray-200 
                  flex flex-col justify-between overflow-hidden
                  hover:shadow-2xl hover:scale-[1.03]
                  transition-all duration-300
                "
              >
                {/* Gambar */}
                <div className="h-[180px] w-full flex items-center justify-center overflow-hidden bg-gray-100">
                  <img src={p.image} alt={p.title} className="object-contain h-full" />
                </div>

                {/* Isi */}
                <div className="px-6 py-5 flex flex-col flex-grow text-center">
                  <h3 className="font-bold text-xl text-gray-900 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{p.academicYear} • {p.code}</p>
                  <p className="text-base text-gray-600 mt-3 line-clamp-3">{p.description}</p>
                </div>

                {/* Tombol */}
                <div className="px-6 pb-6">
                  <a
                    href={p.link}
                    target="_blank"
                    className="block text-center bg-gradient-to-r from-blue-800 to-blue-500 text-white py-2.5 rounded-md font-semibold transition-all duration-300 hover:opacity-90"
                  >
                    Lihat Website
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-300 mt-8 col-span-full">Tidak ditemukan proyek yang cocok.</p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination (default buttons = PUTIH, active = GRADIENT) */}
      {!isPreview && filtered.length > perPage && (
        <div className="flex justify-center items-center gap-3 mt-12">
          {/* Prev */}
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border text-base font-semibold transition-all ${
              page === 1
                ? "bg-white border-gray-200 text-gray-300 cursor-not-allowed"
                : "bg-white border-gray-300 text-blue-600 hover:bg-gray-50"
            }`}
            aria-label="Previous page"
          >
            &lt;
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
            const active = page === num;
            return (
              <button
                key={num}
                onClick={() => setPage(num)}
                aria-current={active ? "page" : undefined}
                className={`w-10 h-10 rounded-lg border text-base font-semibold transition-all duration-200 focus:outline-none
                  ${active
                    ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white border-transparent shadow-md"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:text-blue-600"
                  }`}
              >
                {num}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border text-base font-semibold transition-all ${
              page === totalPages
                ? "bg-white border-gray-200 text-gray-300 cursor-not-allowed"
                : "bg-white border-gray-300 text-blue-600 hover:bg-gray-50"
            }`}
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
