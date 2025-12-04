"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ProductItem } from "./ProductManager";

const API_URL = "http://localhost:4000/api/products";

export default function AddProductModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: () => void; // FIX
}) {
  const today = new Date().toISOString().split("T")[0];

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "Web",
    academicYear: "2024/2025",
    description: "",
    link: "",
    publishDate: today,
  });

  const update = (key: string, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const generateYears = () => {
    const arr = [];
    for (let y = 2010; y <= 2035; y++) arr.push(`${y}/${y + 1}`);
    return arr;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Thumbnail wajib diisi.");
      return;
    }

    const fd = new FormData();
    fd.append("image", file);
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("academicYear", form.academicYear);
    fd.append("description", form.description);
    fd.append("link", form.link);
    fd.append("publishDate", form.publishDate);

    await fetch(API_URL, {
      method: "POST",
      body: fd,
    });

    await onSubmit(); // FIX
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-auto text-black">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4 text-blue-900">Tambah Produk</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-semibold mb-2">Thumbnail</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />

            <div className="w-full h-72 bg-gray-100 border rounded flex items-center justify-center mt-2 overflow-hidden">
              {preview ? (
                <img src={preview} className="object-contain w-full h-full" />
              ) : (
                <p className="text-gray-500 text-sm">Belum ada preview</p>
              )}
            </div>
          </div>

          {/* Judul */}
          <div>
            <label className="text-sm font-semibold">Judul</label>
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="text-sm font-semibold">Deskripsi Singkat</label>
            <input
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-semibold">Kategori</label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option>Web</option>
              <option>Mobile</option>
              <option>IoT</option>
              <option>AI</option>
            </select>
          </div>

          {/* Tahun */}
          <div>
            <label className="text-sm font-semibold">Tahun Akademik</label>
            <select
              value={form.academicYear}
              onChange={(e) => update("academicYear", e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
            >
              {generateYears().map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Publish */}
          <div>
            <label className="text-sm font-semibold">Tanggal Publish</label>
            <input
              type="date"
              value={form.publishDate}
              onChange={(e) => update("publishDate", e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Link */}
          <div>
            <label className="text-sm font-semibold">Link Website</label>
            <input
              value={form.link}
              onChange={(e) => update("link", e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="https://..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
