"use client";

import React from "react";
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
}: {
  products: ProductItem[];
  onDetail: (p: ProductItem) => void;
  onEdit: (p: ProductItem) => void;
  onDelete: (id: number) => void;

  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 mt-4 overflow-hidden">

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
              <td colSpan={7} className="text-center py-10 italic text-gray-500">
                Belum ada produk.
              </td>
            </tr>
          ) : (
            products.map((p, i) => {
              const imageUrl = p.image
                ? `${API_URL}${p.image}`
                : "/placeholder.png";

              return (
                <tr
                  key={`${p.id}-${i}`}   // <-- FIX: GUARANTEED UNIQUE
                  className="hover:bg-blue-50 border border-gray-300 transition"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {(currentPage - 1) * products.length + (i + 1)}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={imageUrl}
                      alt={p.title}
                      className="w-16 h-16 object-cover rounded-md mx-auto bg-gray-100"
                    />
                  </td>

                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {p.title}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {p.category}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {p.academicYear}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 font-mono">
                    {p.code}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="inline-flex items-center gap-2 whitespace-nowrap">

                      <button
                        onClick={() => onDetail(p)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
                      >
                        Detail
                      </button>

                      <button
                        onClick={() => onEdit(p)}
                        className="px-3 py-1 bg-yellow-400 text-black rounded-md font-semibold hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(p.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
                      >
                        Hapus
                      </button>

                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="w-full flex justify-end items-center gap-3 py-4 pr-4 bg-white border-t border-gray-300">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-md border text-lg ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-black"
          }`}
        >
          {"<"}
        </button>

        <button className="w-10 h-10 rounded-md bg-blue-600 text-white cursor-default">
          {currentPage}
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-md border text-lg ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-black"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
