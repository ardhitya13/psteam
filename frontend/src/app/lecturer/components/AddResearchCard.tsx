"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import Swal from "sweetalert2";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; year: number }) => Promise<void>;
};

export default function AddResearchCard({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    year: new Date().getFullYear(),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({
        title: "",
        year: new Date().getFullYear(),
      });
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Judul wajib diisi",
        text: "Silakan masukkan judul penelitian terlebih dahulu.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      setLoading(true);

      await onSubmit(form);

      // ✅ ALERT SUKSES
      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Penelitian berhasil ditambahkan.",
        confirmButtonColor: "#2563eb",
      });

      onClose();
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err?.message || "Terjadi kesalahan saat menyimpan data.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-[400px] space-y-4 text-gray-900"
      >
        <h2 className="text-lg font-semibold text-center text-gray-800">
          Tambah Penelitian
        </h2>

        {/* JUDUL */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Judul</label>
          <input
            type="text"
            className="
              w-full rounded border border-gray-300
              px-3 py-2 bg-white text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            placeholder="Judul Penelitian"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            disabled={loading}
          />
        </div>

        {/* TAHUN */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Tahun</label>
          <input
            type="number"
            className="
              w-full rounded border border-gray-300
              px-3 py-2 bg-white text-gray-900
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            value={form.year}
            onChange={(e) =>
              setForm({ ...form, year: Number(e.target.value) })
            }
            disabled={loading}
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              px-4 py-2 rounded bg-blue-600 text-white
              hover:bg-blue-700 disabled:opacity-60
            "
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
