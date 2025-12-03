"use client";

import React, { useEffect, useState } from "react";
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

const API_URL = "http://localhost:4000/api/products";

export default function ProductManager() {
  const [addOpen, setAddOpen] = useState(false);
  const [editData, setEditData] = useState<ProductItem | null>(null);
  const [detailData, setDetailData] = useState<ProductItem | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ==========================================================
     FETCH DATA DARI BACKEND
  ========================================================== */
  const loadProducts = async () => {
    try {
      const res = await fetch(API_URL, { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Gagal memuat produk:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ==========================================================
     CRUD
  ========================================================== */

  // CREATE
  const addProduct = (p: ProductItem) => {
    setProducts((prev) => [...prev, p]);
  };

  // UPDATE
  const updateProduct = (updated: ProductItem) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  // DELETE
  const deleteProduct = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  /* ==========================================================
     SEARCH
  ========================================================== */
  const filtered = products.filter((p) => {
    const title = (p.title ?? "").toLowerCase();
    const q = searchTerm.toLowerCase();
    return title.includes(q);
  });

  /* ==========================================================
     PAGINATION
  ========================================================== */
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [products.length, itemsPerPage, totalPages]);

  /* ==========================================================
     RENDER
  ========================================================== */
  if (loading) {
    return (
      <p className="text-center text-gray-500 py-10">
        Mengambil data produk...
      </p>
    );
  }

  return (
    <>
      <div className="w-full flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-black text-center">
          Publikasi Produk
        </h1>
      </div>

      {/* FILTER BAR */}
      <div className="flex justify-end items-center gap-3 mb-6">

        {/* SEARCH */}
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
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
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

        {/* ITEMS PER PAGE */}
        <div className="relative">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="w-40 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md pl-3 pr-10 py-2 shadow-sm appearance-none"
          >
            {[5, 10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n} Halaman
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
          />
        </div>

        {/* ADD BUTTON */}
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
        currentPage={safePage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onDetail={(p) => setDetailData(p)}
        onEdit={(p) => setEditData(p)}
        onDelete={deleteProduct}
      />

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
          existingProducts={products}
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
