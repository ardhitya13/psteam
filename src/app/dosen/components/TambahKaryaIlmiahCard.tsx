"use client";

import React, { useState } from "react";
import ModalWrapper from "../components/ModalWrapper";

interface TambahKaryaIlmiahCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { judul: string; jenis: string; tahun: number }) => void;
}

export default function TambahKaryaIlmiahCard({
  isOpen,
  onClose,
  onSubmit,
}: TambahKaryaIlmiahCardProps) {
  const [formData, setFormData] = useState({
    judul: "",
    jenis: "",
    tahun: new Date().getFullYear(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({ judul: "", jenis: "", tahun: new Date().getFullYear() });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
        Tambah Karya Ilmiah
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Judul */}
        <div>
          <label
            htmlFor="judul"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Judul Karya Ilmiah
          </label>
          <input
            id="judul"
            type="text"
            placeholder="Masukkan judul karya ilmiah"
            value={formData.judul}
            onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Input Jenis */}
        <div>
          <label
            htmlFor="jenis"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Jenis Karya
          </label>
          <select
            id="jenis"
            value={formData.jenis}
            onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
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

        {/* Input Tahun */}
        <div>
          <label
            htmlFor="tahun"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Tahun Publikasi
          </label>
          <input
            id="tahun"
            type="number"
            placeholder="Masukkan tahun publikasi"
            value={formData.tahun}
            onChange={(e) =>
              setFormData({ ...formData, tahun: Number(e.target.value) })
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
