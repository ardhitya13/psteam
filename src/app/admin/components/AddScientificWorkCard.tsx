"use client";

import React, { useState, useEffect, useMemo } from "react";
import ModalWrapper from "./ModalWrapper";
import { Search, Check } from "lucide-react";

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
  kategoriScientificWork: string[];
  onSubmit: (payload: {
    lecturer_name: string;
    title: string;
    type: string;
    year: number;
  }) => void;
}

export default function AddScientificWorkCard({
  isOpen,
  onClose,
  initialLecturerName = "",
  lecturers = [],
  kategoriScientificWork,
  onSubmit,
}: Props) {
  const [lecturerQuery, setLecturerQuery] = useState(initialLecturerName);
  const [selectedLecturer, setSelectedLecturer] = useState(initialLecturerName);
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    lecturer_name: initialLecturerName || "",
    title: "",
    type: kategoriScientificWork[0],
    year: new Date().getFullYear(),
  });

  /* Reset */
  useEffect(() => {
    setLecturerQuery(initialLecturerName);
    setSelectedLecturer(initialLecturerName);
    setFormData((p) => ({ ...p, lecturer_name: initialLecturerName || "" }));
  }, [initialLecturerName, isOpen]);

  /* Filter dosen */
  const filteredLecturers = useMemo(() => {
    return lecturers.filter((d) =>
      d.name.toLowerCase().includes(lecturerQuery.toLowerCase())
    );
  }, [lecturers, lecturerQuery]);

  function pickLecturer(name: string) {
    setSelectedLecturer(name);
    setLecturerQuery(name);
    setFormData((p) => ({ ...p, lecturer_name: name }));
    setShowDropdown(false);
  }

  /* Submit */
  function submit(e: any) {
    e.preventDefault();
    if (!formData.lecturer_name.trim())
      return alert("Pilih nama dosen terlebih dahulu.");
    if (!formData.title.trim()) return alert("Judul wajib diisi.");
    onSubmit(formData);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[980px] max-w-[95%] mx-auto p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Tambah Karya Ilmiah
        </h2>

        <form className="space-y-5 text-gray-900" onSubmit={submit}>
          {/* Nama Dosen */}
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
                className="w-full px-4 py-3 border rounded-md bg-white text-gray-900 placeholder-gray-400"
                placeholder="Ketik nama dosen..."
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              {showDropdown && lecturerQuery && (
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
                          <Check className="text-blue-600" size={16} />
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Karya Ilmiah
            </label>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData((p) => ({ ...p, title: e.target.value }))
              }
              placeholder="Masukkan judul karya ilmiah..."
              className="w-full px-4 py-3 border rounded-md bg-white text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Tahun + Tipe */}
          <div className="grid grid-cols-2 gap-4">
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
                  setFormData((p) => ({
                    ...p,
                    year: Number(e.target.value),
                  }))
                }
                className="w-full px-4 py-3 border rounded-md bg-white text-gray-900"
              />
            </div>

            {/* Tipe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Karya Ilmiah
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, type: e.target.value }))
                }
                className="w-full px-4 py-3 border rounded-md bg-white text-gray-900"
              >
                {kategoriScientificWork.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
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
