"use client";

import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface TambahPengabdianCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { nama: string; title: string; year: number }) => void;
}

export default function TambahPengabdianCard({
  isOpen,
  onClose,
  onSubmit,
}: TambahPengabdianCardProps) {
  const [formData, setFormData] = useState({
    nama: "Arifah Husaini",
    title: "",
    year: new Date().getFullYear(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      nama: "Arifah Husaini",
      title: "",
      year: new Date().getFullYear(),
    });
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Tambah title Pengabdian Masyarakat
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Dosen
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-100 text-gray-900"
          />
        </div>

        {/* title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Pengabdian
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Masukkan title pengabdian..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>

        {/* year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            year
          </label>
          <input
            type="number"
            name="year"
            min={2000}
            max={2100}
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 text-gray-900"
            required
          />
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm"
          >
            Tambahkan
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
