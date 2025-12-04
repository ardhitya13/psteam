// admin/components/AddCommunityServiceCard.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Search, Check } from "lucide-react";

type CommunityServiceItem = {
  id?: number;
  title: string;
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
  onSubmit: (payload: { lecturer_name: string; title: string; year: number }) => void;
}

export default function AddCommunityServiceCard({
  isOpen,
  onClose,
  initialLecturerName,
  lecturers,
  onSubmit,
}: Props) {
  const [lecturerQuery, setLecturerQuery] = useState(initialLecturerName ?? "");
  const [selectedLecturer, setSelectedLecturer] = useState(initialLecturerName ?? "");
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    lecturer_name: initialLecturerName || "",
    title: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    setLecturerQuery(initialLecturerName ?? "");
    setSelectedLecturer(initialLecturerName ?? "");
    setFormData({
      lecturer_name: initialLecturerName || "",
      title: "",
      year: new Date().getFullYear(),
    });
  }, [initialLecturerName, isOpen]);

  const filteredLecturers = useMemo(() => {
    const q = lecturerQuery.trim().toLowerCase();
    if (!q) return [];
    return lecturers.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.program || "").toLowerCase().includes(q)
    );
  }, [lecturerQuery, lecturers]);

  function pickLecturer(name: string) {
    setSelectedLecturer(name);
    setLecturerQuery(name);
    setFormData((p) => ({ ...p, lecturer_name: name }));
    setShowDropdown(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.lecturer_name.trim()) return alert("Nama dosen wajib diisi.");
    if (!formData.title.trim()) return alert("Judul pengabdian wajib diisi.");

    onSubmit(formData);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[980px] max-w-[95%] mx-auto p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Tambah Pengabdian Masyarakat
        </h2>

        <form onSubmit={submit} className="space-y-5 text-gray-900">
          {/* =======================
              Nama Dosen
            ======================= */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Dosen
            </label>

            <div className="relative">
              <input
                value={lecturerQuery}
                onChange={(e) => {
                  setLecturerQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Ketik nama dosen..."
                className="w-full px-4 py-3 border rounded-md bg-white text-gray-900 placeholder-gray-400"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              {/* Autocomplete */}
              {showDropdown && lecturerQuery.trim() !== "" && (
                <div className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-56 overflow-auto z-50">
                  {filteredLecturers.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      Tidak ditemukan
                    </div>
                  ) : (
                    filteredLecturers.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => pickLecturer(d.name)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      >
                        <span className="text-sm text-gray-800">{d.name}</span>
                        {selectedLecturer === d.name && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Judul Pengabdian */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Pengabdian
            </label>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Judul pengabdian..."
              className="w-full px-4 py-3 border rounded-md bg-white text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Tahun */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tahun
            </label>
            <input
              type="number"
              min={1900}
              max={3000}
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: Number(e.target.value) })
              }
              className="w-40 px-4 py-3 border rounded-md bg-white text-gray-900"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-white border text-gray-700 hover:bg-gray-50"
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
