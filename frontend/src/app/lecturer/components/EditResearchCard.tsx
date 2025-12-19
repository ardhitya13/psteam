"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditResearchCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: { id: number; title: string; year: number }) => void;
  defaultData: { id: number; title: string; year: number } | null;
}

export default function EditResearchCard({
  isOpen,
  onClose,
  onSubmit,
  defaultData,
}: EditResearchCardProps) {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (defaultData) {
      setFormData({
        id: defaultData.id,
        title: defaultData.title,
        year: defaultData.year,
      });
    }
  }, [defaultData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = formData.title.trim();
    if (!trimmed) return alert("Judul tidak boleh kosong.");
    if (formData.year < 1900 || formData.year > 2100)
      return alert("Tahun tidak valid.");

    onSubmit({ id: formData.id, title: trimmed, year: formData.year });
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[95%] max-w-md bg-white p-4 rounded-xl text-black">

        <h2 className="text-lg font-semibold text-center mb-4 text-gray-800">
          Edit Penelitian
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Judul
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Tahun
            </label>
            <input
              type="number"
              value={formData.year}
              min={1900}
              max={2100}
              onChange={(e) =>
                setFormData({ ...formData, year: Number(e.target.value) })
              }
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
