"use client";

import { useEffect, useState } from "react";
import ProjectCard, { ProductCardItem } from "./ProjectCard";
import CategoryFilter from "./CategoryFilter";
import { getAllProducts } from "../../../lib/apiProducts";

export default function ProjectList() {
  const [projects, setProjects] = useState<ProductCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  /* ================================
        LOAD DATA
  ================================ */
  useEffect(() => {
    async function load() {
      try {
        const result = await getAllProducts();
        const items = Array.isArray(result) ? result : [];

        const normalized: ProductCardItem[] = items.map((p: any) => ({
          id: p.id,
          image: p.image ?? "/placeholder.png",
          title: p.title,
          category: p.category,
          academicYear: p.academicYear,
          code: p.code,
          description: p.description,
          link: p.link,
          publishDate: p.publishDate
            ? new Date(p.publishDate).toLocaleDateString("id-ID")
            : "",
        }));

        setProjects(normalized);
      } catch (err) {
        console.error("Error load:", err);
        setProjects([]);
      }
      setLoading(false);
    }
    load();
  }, []);

  /* ================================
        RESET PAGE SAAT KATEGORI GANTI
  ================================ */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  /* ================================
        FILTER DATA
  ================================ */
  const filtered =
    selectedCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  /* ================================
        PAGINATION
  ================================ */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const categories = ["Semua", "Web", "Mobile", "IoT", "AI"];

  return (
    <div className="w-full max-w-6xl mx-auto">

      {/* FILTER CATEGORY */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">
          Loading data produk...
        </p>
      ) : (
        <>
          {/* DATA GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {pageItems.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                Tidak ada produk.
              </p>
            ) : (
              pageItems.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {/* PREV */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded border ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {"<"}
            </button>

            {/* NUMBERS */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded border ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* NEXT */}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded border ${
                currentPage === totalPages
                  ? "bg-gray-500 text-black hover:border-blue-400 hover:text-blue-700"
                  : "hover:border-blue-400 hover:text-blue-700"
              }`}
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
