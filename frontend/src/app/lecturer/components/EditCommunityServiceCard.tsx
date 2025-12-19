"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultData: { id: number; title: string; year: number } | null;
  onSubmit: (data: { id: number; title: string; year: number }) => void;
};

export default function EditCommunityServiceCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({ id: 0, title: "", year: new Date().getFullYear() });

  useEffect(() => {
    if (defaultData) {
      setForm(defaultData);
    }
  }, [defaultData]);

  if (!isOpen || !defaultData) return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Judul wajib diisi!");
    onSubmit(form);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg w-[400px] space-y-4">
        <h2 className="text-lg font-semibold text-center">Edit Pengabdian</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium">Judul</label>
          <input
            type="text"
            className="border w-full rounded px-3 py-2"
            placeholder="Judul Pengabdian"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Tahun</label>
          <input
            type="number"
            className="border w-full rounded px-3 py-2"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Simpan
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
