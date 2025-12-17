"use client";

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface AddPengabdianProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; year: number }) => void;
}

export default function TambahPengabdianCard({
  isOpen,
  onClose,
  onSubmit,
}: AddPengabdianProps) {
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({ title: "", year: new Date().getFullYear() });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Tambah Pengabdian Masyarakat
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Pengabdian
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Masukkan judul pengabdian"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tahun
          </label>
          <input
            type="number"
            min={2000}
            max={2100}
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-lg"
          >
            Batal
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Simpan
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
