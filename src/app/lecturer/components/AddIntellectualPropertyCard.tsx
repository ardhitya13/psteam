"use client";

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface TambahKaryaIlmiahCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { title: string; type: string; year: number }) => void;
}

export default function AddIntellectualPropertyCard({
  isOpen,
  onClose,
  onSubmit,
}: TambahKaryaIlmiahCardProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    year: new Date().getFullYear(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({ title: "", type: "", year: new Date().getFullYear() });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">
        Tambah HKI
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Judul Karya
          </label>
          <input
            id="title"
            type="text"
            placeholder="Masukkan judul karya"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Input type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Jenis Karya
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Pilih jenis karya</option>
            <option value="Hak Cipta Nasional">Hak Cipta Nasional</option>
            <option value="Lain-lain">Lain-lain</option>
          </select>
        </div>

        {/* Input year */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-semibold text-gray-900 mb-1"
          >
            Tahun Pengajuan HKI
          </label>
          <input
            id="year"
            type="number"
            placeholder="Enter the year of application"
            value={formData.year}
            onChange={(e) =>
              setFormData({ ...formData, year: Number(e.target.value) })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm font-medium"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium"
          >
            Tambahkan
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
