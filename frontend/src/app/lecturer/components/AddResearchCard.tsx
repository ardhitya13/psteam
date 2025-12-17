"use client";

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface AddResearchCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; year: number }) => void;
}

export default function AddResearchCard({
  isOpen,
  onClose,
  onSubmit,
}: AddResearchCardProps) {
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.year) return;

    onSubmit({
      title: formData.title,
      year: formData.year,
    });

    onClose();
    setFormData({ title: "", year: new Date().getFullYear() });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Tambah Penelitian Dosen
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Penelitian
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Masukkan judul penelitian"
            required
          />
        </div>

        {/* year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tahun Penelitian
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            min={2000}
            max={2100}
            onChange={(e) =>
              setFormData({ ...formData, year: Number(e.target.value) })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-sm"
          >
            Simpan
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
