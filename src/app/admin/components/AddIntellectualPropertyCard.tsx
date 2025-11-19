// admin/components/AddIntellectualPropertyCard.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react"; // ✅ FIX IMPORT
import ModalWrapper from "./ModalWrapper";

type IPItemPayload = {
  lecturer_name: string;
  title: string;
  type: string;
  year: number;
};

type Lecturer = {
  id: number;
  name: string;
  program?: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialLecturerName?: string;
  lecturers: Lecturer[];
  kategoriHKI: string[];
  onSubmit: (payload: IPItemPayload) => void;
}

export default function AddIntellectualPropertyCard({
  isOpen,
  onClose,
  initialLecturerName,
  lecturers,
  kategoriHKI,
  onSubmit
}: Props) {
  /* === STATE === */
  const [lecturerQuery, setLecturerQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [form, setForm] = useState<IPItemPayload>({
    lecturer_name: "",
    title: "",
    type: kategoriHKI[0] ?? "Lain-lain",
    year: new Date().getFullYear(),
  });

  /* === RESET SAAT MODAL DIBUKA === */
  useEffect(() => {
    if (isOpen) {
      setLecturerQuery(initialLecturerName ?? "");
      setForm({
        lecturer_name: initialLecturerName ?? "",
        title: "",
        type: kategoriHKI[0] ?? "Lain-lain",
        year: new Date().getFullYear(),
      });
    }
  }, [isOpen, initialLecturerName, kategoriHKI]);

  /* === FILTER DOSEN === */
  const filteredLecturers = useMemo(() => {
    const q = lecturerQuery.toLowerCase();
    if (!q) return lecturers;
    return lecturers.filter((d) => d.name.toLowerCase().includes(q));
  }, [lecturerQuery, lecturers]);

  /* === PILIH DOSEN === */
  function pickLecturer(name: string) {
    setLecturerQuery(name);
    setForm((p) => ({ ...p, lecturer_name: name }));
    setShowDropdown(false);
  }

  /* === SUBMIT === */
  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.lecturer_name.trim()) return alert("Pilih nama dosen.");
    if (!form.title.trim()) return alert("Judul wajib diisi.");
    if (!form.type.trim()) return alert("Tipe HKI wajib dipilih.");

    onSubmit(form);
    onClose();
  }

  if (!isOpen) return null;

  /* === UI === */
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[860px] max-w-[95%] mx-auto p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Tambah HKI
        </h2>

        <form onSubmit={submit} className="space-y-5 text-gray-900">

          {/* === INPUT DOSEN === */}
          <div>
            <label className="block text-sm font-medium mb-2">Nama Dosen</label>

            <div className="relative">
              <input
                value={lecturerQuery}
                onChange={(e) => {
                  setLecturerQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Ketik nama dosen..."
                className="w-full px-4 py-3 border rounded-md bg-white"
              />

              {/* ICON SEARCH */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>

              {/* DROPDOWN */}
              {showDropdown && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-[#DDE1E5] rounded-md shadow-lg max-h-60 overflow-auto z-50">
                  {filteredLecturers.length === 0 ? (
                    <div className="px-4 py-2 text-gray-500 text-sm">
                      Tidak ditemukan
                    </div>
                  ) : (
                    filteredLecturers.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => pickLecturer(d.name)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                      >
                        <span className="text-gray-800">{d.name}</span>
                        <span className="text-xs text-gray-500">{d.program}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* === JUDUL HKI === */}
          <div>
            <label className="block text-sm font-medium mb-2">Judul HKI</label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
              placeholder="Masukkan judul HKI"
              className="w-full px-4 py-3 border rounded-md bg-white"
            />
          </div>

          {/* === TAHUN & TIPE === */}
          <div className="grid grid-cols-2 gap-4">

            {/* Tahun */}
            <div>
              <label className="block text-sm font-medium mb-2">Tahun</label>
              <input
                type="number"
                min={1900}
                max={2100}
                value={form.year}
                onChange={(e) =>
                  setForm((p) => ({ ...p, year: Number(e.target.value) }))
                }
                className="w-full px-4 py-3 border rounded-md bg-white"
              />
            </div>

            {/* Tipe HKI */}
            <div>
              <label className="block text-sm font-medium mb-2">Tipe HKI</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((p) => ({ ...p, type: e.target.value }))
                }
                className="w-full px-4 py-3 border rounded-md bg-white"
              >
                {kategoriHKI.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* === BUTTON === */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-white border hover:bg-gray-50"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Tambah
            </button>
          </div>

        </form>
      </div>
    </ModalWrapper>
  );
}
