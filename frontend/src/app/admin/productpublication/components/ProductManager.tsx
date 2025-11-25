"use client";

import React, { useState } from "react";
import ProductTable from "./ProductTable";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import DetailProductModal from "./DetailProductModal";

import { Search, ChevronDown, Plus } from "lucide-react";

export type ProductItem = {
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

export default function ProductManager() {
  const [addOpen, setAddOpen] = useState(false);
  const [editData, setEditData] = useState<ProductItem | null>(null);
  const [detailData, setDetailData] = useState<ProductItem | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 1,
      image: "/products/asri.png",
      title: "ASRI: Aplikasi Rumah Susun Pintar",
      category: "Web",
      academicYear: "2024/2025",
      code: "PSTEAM-WEB01",
      description: "Aplikasi manajemen rusun berbasis Laravel.",
      link: "https://asri-app.vercel.app",
      publishDate: "2024-01-01",
    },
  ]);

  // CRUD ==========================
  const addProduct = (p: ProductItem) => {
    setProducts([...products, { ...p, id: Date.now() }]);
  };

  const updateProduct = (p: ProductItem) => {
    setProducts(products.map((x) => (x.id === p.id ? p : x)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // SEARCH & PAGINATION ==========================
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {/* TITLE CENTER */}
      <div className="w-full flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-black text-center">
          Publikasi Produk
        </h1>
      </div>

      {/* FILTER BAR (Search + Halaman + Tambah) */}
      <div className="flex justify-end items-center gap-3 mb-6">

        {/* SEARCH BUTTON */}
        <div className="relative flex items-center h-10">
          {!isSearchOpen && (
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => {
                  document.getElementById("searchProduct")?.focus();
                }, 50);
              }}
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md"
            >
              <Search size={18} />
            </button>
          )}

          <input
            id="searchProduct"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={() => {
              if (searchTerm.trim() === "") setIsSearchOpen(false);
            }}
            placeholder="Cari produk..."
            className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-sm h-10
              ${
                isSearchOpen
                  ? "w-56 pl-3 pr-3 opacity-100"
                  : "w-0 opacity-0 pointer-events-none"
              }`}
          />
        </div>

        {/* DROPDOWN HALAMAN */}
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-40 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md 
            pl-3 pr-10 py-2 shadow-sm cursor-pointer appearance-none"
          >
            {[5, 10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n} Halaman
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
          />
        </div>

        {/* BUTTON TAMBAH PRODUK */}
        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Produk
        </button>
      </div>

      {/* TABLE */}
      <ProductTable
        products={pageItems}
        onDetail={(p) => setDetailData(p)}
        onEdit={(p) => setEditData(p)}
        onDelete={deleteProduct}
      />

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          disabled={safePage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="w-10 h-10 border rounded-md bg-white hover:bg-gray-100"
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 border rounded-md ${
              safePage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={safePage === totalPages}
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
          className="w-10 h-10 border rounded-md bg-white hover:bg-gray-100"
        >
          {">"}
        </button>
      </div>

      {/* MODALS */}
      {addOpen && (
        <AddProductModal
          onClose={() => setAddOpen(false)}
          onSubmit={addProduct}
        />
      )}

      {editData && (
        <EditProductModal
          data={editData}
          onClose={() => setEditData(null)}
          onSubmit={updateProduct}
        />
      )}

      {detailData && (
        <DetailProductModal
          data={detailData}
          onClose={() => setDetailData(null)}
        />
      )}
    </>
  );
}
