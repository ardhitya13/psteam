"use client";

import React from "react";
import { X, ExternalLink } from "lucide-react";
import { ProductItem } from "./ProductManager";

export default function DetailProductModal({
  data,
  onClose,
}: {
  data: ProductItem;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-auto text-black">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-5 text-blue-900">Detail Produk</h2>

        {/* Thumbnail */}
        <div className="w-full h-56 rounded-lg overflow-hidden bg-gray-200 border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Informasi Utama */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <p className="text-sm text-gray-500">Judul Produk</p>
            <p className="text-base font-semibold">{data.title}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Kategori</p>
            <p className="text-base font-semibold capitalize">{data.category}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Kode Produk</p>
            <p className="text-base font-semibold">{data.code}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tahun Akademik</p>
            <p className="text-base font-semibold">{data.academicYear}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tanggal Publish</p>
            <p className="text-base font-semibold">
              {data.publishDate
                ? new Date(data.publishDate).toLocaleDateString("id-ID")
                : "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Link Website</p>
            {data.link ? (
              <a
                href={data.link}
                target="_blank"
                className="text-blue-600 underline flex items-center gap-1"
              >
                Kunjungi Website <ExternalLink size={16} />
              </a>
            ) : (
              <p className="text-gray-600 italic">Tidak ada link</p>
            )}
          </div>

        </div>

        {/* Deskripsi */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">Deskripsi</p>
          <p className="text-base mt-1 leading-relaxed">
            {data.description || "Tidak ada deskripsi."}
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
