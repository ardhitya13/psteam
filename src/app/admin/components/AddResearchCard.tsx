"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import ModalWrapper from "./ModalWrapper";

type Lecturer = {
  id: number;
  name: string;
  program: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialLecturerName?: string;
  lecturers: Lecturer[];
  onSubmit: (data: { lecturer_name: string; title: string; year: number }) => void;
}

export default function AddResearchCard({
  isOpen,
  onClose,
  initialLecturerName,
  lecturers,
  onSubmit,
}: Props) {
  const [query, setQuery] = useState(initialLecturerName ?? "");
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    lecturer_name: initialLecturerName ?? "",
    title: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    setQuery(initialLecturerName ?? "");
    setForm((p) => ({ ...p, lecturer_name: initialLecturerName ?? "" }));
  }, [initialLecturerName]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return lecturers;
    return lecturers.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.program.toLowerCase().includes(q)
    );
  }, [query, lecturers]);

  function pick(name: string) {
    setQuery(name);
    setForm((p) => ({ ...p, lecturer_name: name }));
    setShow(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.lecturer_name.trim()) return alert("Nama dosen wajib dipilih.");
    if (!form.title.trim()) return alert("Judul wajib diisi.");
    if (!form.year) return alert("Tahun tidak valid.");

    onSubmit(form);
    onClose();

    setForm({ lecturer_name: "", title: "", year: new Date().getFullYear() });
    setQuery("");
  }

  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg shadow p-7 w-[800px] mx-auto text-gray-900">

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold text-gray-800">Tambah Karya Ilmiah</h2>
          <button className="p-2 hover:bg-gray-200 rounded" onClick={onClose}>
            <X />
          </button>
        </div>

        <form className="space-y-5" onSubmit={submit}>

          {/* Lecturer */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Dosen</label>
            <div className="relative">
              <input
                className="w-full border border-gray-300 rounded px-4 py-2 text-gray-900 bg-white"
                placeholder="Cari nama dosen..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShow(true);
                }}
                onFocus={() => setShow(true)}
              />

              {show && query && (
                <div className="absolute bg-white border border-gray-300 rounded shadow max-h-56 overflow-auto w-full z-50 mt-1">
                  {filtered.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-600">Tidak ditemukan</div>
                  ) : (
                    filtered.map((l) => (
                      <div
                        key={l.id}
                        onClick={() => pick(l.name)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        <div className="font-medium text-gray-900">{l.name}</div>
                        <div className="text-xs text-gray-600">{l.program}</div>
                      </div>
                    ))
                  )}
                </div>
              )}

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Search size={17} />
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Judul</label>
            <input
              className="w-full border border-gray-300 rounded px-4 py-2 text-gray-900 bg-white"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tahun</label>
            <input
              type="number"
              min={1900}
              max={2100}
              className="w-40 border border-gray-300 rounded px-4 py-2 text-gray-900 bg-white"
              value={form.year}
              onChange={(e) => setForm((p) => ({ ...p, year: Number(e.target.value) }))}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 rounded border text-gray-700 bg-white hover:bg-gray-100"
              onClick={onClose}
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
