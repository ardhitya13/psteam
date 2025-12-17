"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditPengabdianCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: { no: number; title: string; year: number }) => void;
  defaultData: { no: number; title: string; year: number } | null;
}

export default function EditPengabdianCard({
  isOpen,
  onClose,
  onSubmit,
  defaultData,
}: EditPengabdianCardProps) {
  const [formData, setFormData] = useState({
    no: 0,
    title: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (defaultData) setFormData(defaultData);
  }, [defaultData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
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
        Edit Pengabdian Masyarakat
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Pengabdian
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tahun
          </label>
          <input
            type="number"
            name="year"
            value={formData.year}
            min={2000}
            max={2100}
            onChange={handleChange}
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
            Simpan Perubahan
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
