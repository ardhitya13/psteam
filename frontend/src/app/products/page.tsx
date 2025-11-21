"use client";

import { useState } from "react";
import HeroSection from "./components/HeroSection";
import ProjectList from "./components/ProjectList";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative min-h-screen text-center">
      {/* Hero Section */}
      <HeroSection />

      {/* Input Pencarian */}
      <div className="max-w-4xl mx-auto px-6 mt-10">
        <input
          type="text"
          placeholder="🔍 Cari proyek berdasarkan nama..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl py-3 px-5 text-gray-900 placeholder-gray-400 
                     bg-white/90 shadow-md focus:ring-2 focus:ring-[#60A5FA] 
                     focus:outline-none border border-gray-200 transition duration-300"
        />
      </div>

      {/* Daftar Proyek */}
      <div className="mt-12 px-6">
        <ProjectList searchQuery={searchQuery} />
      </div>
    </section>
  );
}
