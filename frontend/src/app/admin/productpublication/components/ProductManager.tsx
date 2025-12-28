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

/* ================= JWT HEADER ================= */
const getAuthHeaders = (): HeadersInit => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function ProductManager() {
  const [addOpen, setAddOpen] = useState(false);
  const [editData, setEditData] = useState<ProductItem | null>(null);
  const [detailData, setDetailData] = useState<ProductItem | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
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

  const refresh = async () => {
    await loadProducts();
  };

  /* ================= DELETE (JWT) ================= */
  const deleteProduct = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      await refresh();
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  /* ================= SEARCH ================= */
  const filtered = products.filter((p) => {
    const matchSearch =
      (p.title ?? "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategory === "all"
        ? true
        : p.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const categoryOptions = React.useMemo(() => {
    const cats = products
      .map((p) => p.category)
      .filter(Boolean);

    return ["all", ...Array.from(new Set(cats))];
  }, [products]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage, selectedCategory]);

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Mengambil data produk...</p>;
  }

  return (
    <>
      {/* === UI TIDAK DIUBAH === */}
      <div className="w-full flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-black text-center">Publikasi Produk</h1>
      </div>

      <div className="flex justify-end items-center gap-3 mb-6">
        <div className="relative flex items-center h-10">
          {!isSearchOpen && (
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => document.getElementById("searchProduct")?.focus(), 50);
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
            onBlur={() => searchTerm.trim() === "" && setIsSearchOpen(false)}
            placeholder="Cari produk..."
            className={`transition-all duration-300 border border-gray-300 bg-white rounded-md shadow-sm text-black text-sm h-10
              ${isSearchOpen ? "w-56 pl-3 pr-3 opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
          />
        </div>

        {/* FILTER JENIS / KATEGORI */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="w-40 border border-gray-300 bg-white text-gray-700 text-sm font-medium rounded-md pl-3 pr-10 py-2 shadow-sm appearance-none"
          >
            <option value="all">Semua Kategori</option>
            {categoryOptions
              .filter((c) => c !== "all")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>

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
        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow flex items-center gap-2"
        >
          <Plus size={16} /> Tambah Produk
        </button>
      </div>

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

      {addOpen && <AddProductModal onClose={() => setAddOpen(false)} onSubmit={refresh} />}
      {editData && <EditProductModal data={editData} onClose={() => setEditData(null)} onSubmit={refresh} />}
      {detailData && <DetailProductModal data={detailData} onClose={() => setDetailData(null)} />}
    </>
  );
}
