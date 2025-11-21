"use client";

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface AddScientificWorkCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { title: string; type: string; year: number }) => void;
}

export default function AddScientificWorkCard({
  isOpen,
  onClose,
  onSubmit,
}: AddScientificWorkCardProps) {
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
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
        Tambah Karya Ilmiah
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            title Karya Ilmiah
          </label>
          <input
            id="title"
            type="text"
            placeholder="Masukkan title karya ilmiah"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Input type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Jenis Karya
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
            required
          >
            <option value="">Pilih jenis karya</option>
            <option value="Jurnal Nasional">Jurnal Nasional</option>
            <option value="Jurnal Nasional Terakreditasi">Jurnal Nasional Terakreditasi</option>
            <option value="Jurnal Internasional">Jurnal Internasional</option>
            <option value="Prosiding Seminar Nasional">Prosiding Seminar Nasional</option>
            <option value="Prosiding Seminar Internasional">Prosiding Seminar Internasional</option>
            <option value="Buku Ajar">Buku Ajar</option>
            <option value="Artikel Ilmiah">Artikel Ilmiah</option>
            <option value="Artikel Ilmiah">Lain-lain</option>
          </select>
        </div>

        {/* Input year */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Tahun Publikasi
          </label>
          <input
            id="year"
            type="number"
            placeholder="Masukkan tahun publikasi"
            value={formData.year}
            onChange={(e) =>
              setFormData({ ...formData, year: Number(e.target.value) })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium"
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
