"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditResearchCardProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { id: number; title: string; year: number }) => Promise<void>;
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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultData) setFormData(defaultData);
  }, [defaultData]);

  if (!isOpen || !defaultData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = formData.title.trim();
    if (!trimmed) return;

    setLoading(true);
    await onSubmit({
      id: formData.id,
      title: trimmed,
      year: formData.year,
    });
    setLoading(false);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[95%] max-w-md bg-white p-4 rounded-xl text-black">
        <h2 className="text-lg font-semibold text-center mb-4">
          Edit Penelitian
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Judul</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Tahun</label>
            <input
              type="number"
              value={formData.year}
              min={1900}
              max={2100}
              onChange={(e) =>
                setFormData({ ...formData, year: Number(e.target.value) })
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
