"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditKaryaIlmiahCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: {
    no: number;
    judul: string;
    jenis: string;
    tahun: number;
  }) => void;
  defaultData: {
    no: number;
    judul: string;
    jenis: string;
    tahun: number;
  } | null;
}

export default function EditKaryaIlmiahCard({
  isOpen,
  onClose,
  onSubmit,
  defaultData,
}: EditKaryaIlmiahCardProps) {
  const [formData, setFormData] = useState({
    no: 0,
    judul: "",
    jenis: "",
    tahun: new Date().getFullYear(),
  });

  // 🔹 Set data awal saat defaultData berubah
  useEffect(() => {
    if (defaultData) {
      setFormData(defaultData);
    }
  }, [defaultData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tahun" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[95%] max-w-md bg-white rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
          Edit Data Karya Ilmiah
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Karya Ilmiah
            </label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Jenis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Karya
            </label>
            <select
              name="jenis"
              value={formData.jenis}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              <option value="">Pilih Jenis Karya</option>
              <option value="Jurnal Nasional">Jurnal Nasional</option>
              <option value="Jurnal Nasional Terakreditasi">
                Jurnal Nasional Terakreditasi
              </option>
              <option value="Jurnal Internasional">Jurnal Internasional</option>
              <option value="Prosiding Seminar Nasional">
                Prosiding Seminar Nasional
              </option>
              <option value="Prosiding Seminar Internasional">
                Prosiding Seminar Internasional
              </option>
              <option value="Buku Ajar">Buku Ajar</option>
              <option value="Artikel Ilmiah">Artikel Ilmiah</option>
              <option value="Lain-lain">Lain-lain</option>
            </select>
          </div>

          {/* Tahun */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tahun Publikasi
            </label>
            <input
              type="number"
              name="tahun"
              value={formData.tahun}
              onChange={handleChange}
              min={2000}
              max={2100}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 text-sm transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-all"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
