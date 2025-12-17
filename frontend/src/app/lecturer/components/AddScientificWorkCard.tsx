"use client";

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface AddScientificWorkCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; type: string; year: number }) => void;
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

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Judul Karya Ilmiah
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Jenis Karya
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
            required
          >
            <option value="">Pilih jenis karya</option>
            <option value="Jurnal Nasional">Jurnal Nasional</option>
            <option value="Jurnal Nasional Terakreditasi">Jurnal Nasional Terakreditasi</option>
            <option value="Jurnal Internasional">Jurnal Internasional</option>
            <option value="Prosiding Nasional">Prosiding Nasional</option>
            <option value="Prosiding Internasional">Prosiding Internasional</option>
            <option value="Buku Ajar">Buku Ajar</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Tahun Publikasi
          </label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} type="button" className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
            Batal
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Tambahkan
          </button>
        </div>

      </form>
    </ModalWrapper>
  );
}
