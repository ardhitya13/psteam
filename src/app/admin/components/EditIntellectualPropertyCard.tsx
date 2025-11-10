"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditIntellectualPropertyCardProps {
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

export default function EditIntellectualPropertyCard({
  isOpen,
  onClose,
  onSubmit,
  defaultData,
}: EditIntellectualPropertyCardProps) {
  const [formData, setFormData] = useState({
    no: 0,
    judul: "",
    jenis: "",
    tahun: new Date().getFullYear(),
  });

  // 🔹 Set default data when modal opens or data changes
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
          Edit Data HKI / Paten
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Judul HKI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul HKI / Paten
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

          {/* Jenis HKI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis HKI
            </label>
            <select
              name="jenis"
              value={formData.jenis}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              <option value="">Pilih Jenis HKI</option>
              <option value="Hak Cipta Nasional">Hak Cipta Nasional</option>
              <option value="Hak Cipta Internasional">Hak Cipta Internasional</option>
              <option value="Paten Sederhana">Paten Sederhana</option>
              <option value="Paten Lengkap">Paten Lengkap</option>
              <option value="Desain Industri">Desain Industri</option>
              <option value="Merek Dagang">Merek Dagang</option>
              <option value="Rahasia Dagang">Rahasia Dagang</option>
            </select>
          </div>

          {/* Tahun Terbit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tahun Terbit
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
