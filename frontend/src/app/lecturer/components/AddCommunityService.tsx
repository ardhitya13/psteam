"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; year: number }) => void;
};

export default function AddCommunityServiceCard({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (isOpen) {
      setForm({ title: "", year: new Date().getFullYear() });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Judul wajib diisi!");
      return;
    }
    onSubmit(form);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-6
          rounded-lg
          w-[400px]
          space-y-4
          text-gray-900
        "
      >
        <h2 className="text-lg font-semibold text-center text-gray-800">
          Tambah Pengabdian
        </h2>

        {/* JUDUL */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Judul
          </label>
          <input
            type="text"
            className="
              w-full
              rounded
              border border-gray-300
              px-3 py-2
              bg-white
              text-gray-900
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            placeholder="Judul Pengabdian"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />
        </div>

        {/* TAHUN */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Tahun
          </label>
          <input
            type="number"
            className="
              w-full
              rounded
              border border-gray-300
              px-3 py-2
              bg-white
              text-gray-900
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: Number(e.target.value) })
            }
            required
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="
              px-4 py-2
              rounded
              bg-gray-200
              text-gray-800
              hover:bg-gray-300
            "
          >
            Batal
          </button>

          <button
            type="submit"
            className="
              px-4 py-2
              rounded
              bg-blue-600
              text-white
              hover:bg-blue-700
            "
          >
            Simpan
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
