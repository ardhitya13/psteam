"use client";

import React from "react";
import { ProductItem } from "./ProductManager";

export default function ProductTable({
  products,
  onDetail,
  onEdit,
  onDelete,
}: {
  products: ProductItem[];
  onDetail: (p: ProductItem) => void;
  onEdit: (p: ProductItem) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 mt-4">
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
              <td
                colSpan={7}
                className="text-center py-10 italic text-gray-500"
              >
                Belum ada produk.
              </td>
            </tr>
          ) : (
            products.map((p, i) => (
              <tr
                key={p.id}
                className="hover:bg-blue-50 border border-gray-300 transition"
              >
                <td className="border border-gray-300 px-4 py-2">{i + 1}</td>

                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded-md mx-auto"
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

                <td className="border border-gray-300 px-4 py-2">
                  {p.code}
                </td>

                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="inline-flex items-center gap-2 whitespace-nowrap">
                    <button
                      onClick={() => onDetail(p)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition"
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
