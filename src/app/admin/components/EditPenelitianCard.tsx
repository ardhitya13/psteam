"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditPenelitianCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: { no: number; nama: string; judul: string; tahun: number }) => void;
  defaultData: { no: number; nama: string; judul: string; tahun: number } | null;
}

export default function EditPenelitianCard({
  isOpen,
  onClose,
  onSubmit,
  defaultData,
}: EditPenelitianCardProps) {
  const [formData, setFormData] = useState({
    no: 0,
    nama: "",
    judul: "",
    tahun: new Date().getFullYear(),
  });

  useEffect(() => {
    if (defaultData) setFormData(defaultData);
  }, [defaultData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "tahun" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
  <ModalWrapper isOpen={isOpen} onClose={onClose}>
    {/* 🔽 HAPUS background putih di wrapper dalam */}
    <div className="w-[95%] max-w-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-800">Edit Penelitian</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Dosen</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Judul Penelitian</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Penelitian</label>
          <input
            type="number"
            name="tahun"
            value={formData.tahun}
            onChange={handleChange}
            min={2000}
            max={2100}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        {/* Tombol */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </ModalWrapper>
);
}
