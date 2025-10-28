"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "../components/ModalWrapper";

interface EditPengabdianCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: {
    no: number;
    nama: string;
    judul: string;
    tahun: number;
  }) => void;
  defaultData: {
    no: number;
    nama: string;
    judul: string;
    tahun: number;
  } | null;
}

export default function EditPengabdianCard({
  isOpen,
  onClose,
  onSubmit,
  defaultData,
}: EditPengabdianCardProps) {
  const [formData, setFormData] = useState({
    no: 0,
    nama: "",
    judul: "",
    tahun: new Date().getFullYear(),
  });

  // Set default data saat modal dibuka
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

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Edit Data Pengabdian Masyarakat
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Dosen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Dosen
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama Dosen"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Judul Pengabdian */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Pengabdian
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Judul Pengabdian"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Tahun */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tahun
          </label>
          <input
            type="number"
            name="tahun"
            value={formData.tahun}
            onChange={handleChange}
            min={2000}
            max={2100}
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
            Simpan Perubahan
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
