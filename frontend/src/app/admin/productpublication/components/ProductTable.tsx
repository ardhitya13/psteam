"use client";

import React from "react";
import { FileText, Edit as IconEdit, Trash2 } from "lucide-react";
import { ProductItem } from "./ProductManager";

const API_URL = "http://localhost:4000";

export default function ProductTable({
  products,
  onDetail,
  onEdit,
  onDelete,
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
}: {
  products: ProductItem[];
  onDetail: (p: ProductItem) => void;
  onEdit: (p: ProductItem) => void;
  onDelete: (id: number) => void;

  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 mt-4 overflow-hidden">
      {/* ======================== TABLE =========================== */}
      <table className="min-w-full text-sm text-gray-800 text-center border-collapse border border-gray-300">
        <thead className="bg-[#eaf0fa] text-gray-800 text-[14px] font-semibold uppercase border border-gray-300">
          <tr>
            <th className="px-4 py-3 border border-gray-300">No</th>
            <th className="px-4 py-3 border border-gray-300">Gambar</th>
            <th className="px-4 py-3 border border-gray-300">Judul</th>
            <th className="px-4 py-3 border border-gray-300">Kategori</th>
            <th className="px-4 py-3 border border-gray-300">Tahun Ajaran</th>
            <th className="px-4 py-3 border border-gray-300">Kode</th>
            <th className="px-4 py-3 border border-gray-300">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-6 italic text-gray-500">
                Belum ada produk.
              </td>
            </tr>
          ) : (
            products.map((p, i) => {
              // ======================= FIX GAMBAR ========================
              let imageUrl = "/placeholder.png";

              if (p.image) {
                if (p.image.startsWith("http")) {
                  // Full URL
                  imageUrl = p.image;
                } else if (p.image.startsWith("/")) {
                  // Sudah ada slash di depan
                  imageUrl = `${API_URL}${p.image}`;
                } else {
                  // Tidak ada slash → tambahkan "/"
                  imageUrl = `${API_URL}/${p.image}`;
                }
              }
              // ============================================================

              return (
                <tr
                  key={`${p.id}-${i}`}
                  className="hover:bg-blue-50 border border-gray-300 transition"
                >
                  {/* NOMOR */}
                  <td className="border border-gray-300 px-4 py-2">
                    {(currentPage - 1) * itemsPerPage + (i + 1)}
                  </td>

                  {/* GAMBAR */}
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={imageUrl}
                      alt={p.title}
                      className="w-16 h-16 object-cover rounded-md mx-auto bg-gray-100"
                    />
                  </td>

                  {/* JUDUL */}
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {p.title}
                  </td>

                  {/* KATEGORI */}
                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {p.category}
                  </td>

                  {/* TAHUN AJARAN */}
                  <td className="border border-gray-300 px-4 py-2">
                    {p.academicYear}
                  </td>

                  {/* KODE */}
                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    {p.code}
                  </td>

                  {/* AKSI */}
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <div className="inline-flex justify-center gap-2 whitespace">
                      <button
                        onClick={() => onDetail(p)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
                      >
                        <FileText size={14} /> Detail
                      </button>

                      <button
                        onClick={() => onEdit(p)}
                        className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded-md font-semibold hover:bg-yellow-500 transition "
                      >
                       <IconEdit size={14} /> Edit
                      </button>

                      <button
                        onClick={() => onDelete(p.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* ======================== PAGINATION =========================== */}
      <div className="flex justify-end items-center py-3 px-4 gap-2 text-sm bg-gray-50 border-t border-gray-300">
        {/* PREV */}
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded border text-xs ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-300 text-gray-800"
          }`}
        >
          &lt;
        </button>

        {/* CURRENT PAGE */}
        <button className="px-3 py-1 rounded text-xs border bg-blue-600 text-white">
          {currentPage}
        </button>

        {/* NEXT */}
        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded border text-xs ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-300 text-gray-800"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
