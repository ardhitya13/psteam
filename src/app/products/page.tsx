"use client";

import { useState } from "react";
import ProjectList from "./components/ProjectList";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="py-10 px-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header kategori */}
        <div className="bg-blue-800 text-white rounded-xl p-5 text-center shadow-md">
          <h2 className="text-xl font-semibold">Produk PSTEAM</h2>
          <p className="text-sm text-blue-100">
            Temukan proyek-proyek menarik sesuai kategori
          </p>
        </div>

        {/* Input pencarian */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Cari proyek berdasarkan nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 
                       focus:ring-2 focus:ring-blue-600 outline-none 
                       text-gray-900 placeholder-gray-400 bg-white"
          />
        </div>

        {/* Kirim searchQuery sebagai prop */}
        <ProjectList searchQuery={searchQuery} />
      </div>
    </section>
  );
}
