// admin/components/EditIntellectualPropertyCard.tsx
"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";

type IPItem = {
  id: number;
  title: string;
  type: string;
  year: number;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  kategoriHKI: string[];
  defaultData:
  | { lecId: number; item: IPItem; lecturer_name: string }
  | null
  | undefined;
  onSubmit: (payload: { lecId: number; item: IPItem }) => void;
}

export default function EditIntellectualPropertyCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
  kategoriHKI,
}: Props) {
  const [local, setLocal] =
    useState<{ lecId: number; item: IPItem; lecturer_name: string } | null>(
      null
    );

  /* === LOAD DATA === */
  useEffect(() => {
    if (isOpen && defaultData) {
      setLocal({
        lecId: defaultData.lecId,
        lecturer_name: defaultData.lecturer_name,
        item: { ...defaultData.item },
      });
    }
  }, [isOpen, defaultData]);

  if (!isOpen || !local) return null;

  /* === SAVE === */
  function save(e: React.FormEvent) {
    e.preventDefault();

    if (!local?.item) {
      return alert("Data HKI tidak valid.");
    }

    const title = String(local.item.title ?? "").trim();
    const type = String(local.item.type ?? "").trim();
    const year = Number(local.item.year);

    if (!title) return alert("Judul HKI harus diisi.");
    if (!type) return alert("Tipe HKI wajib dipilih.");
    if (!year || Number.isNaN(year)) return alert("Tahun tidak valid.");

    onSubmit({
      lecId: local.lecId,
      item: { ...local.item, title, type, year },
    });

    onClose();
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[860px] max-w-[95%] mx-auto p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Edit HKI
        </h2>

        <form onSubmit={save} className="space-y-5 text-gray-900">

          {/* === Nama Dosen === */}
          <div>
            <label className="block text-sm font-medium mb-2">Nama Dosen</label>
            <input
              disabled
              value={local.lecturer_name}
              className="w-full px-4 py-3 border rounded-md bg-gray-100"
            />
          </div>

          {/* === Judul === */}
          <div>
            <label className="block text-sm font-medium mb-2">Judul HKI</label>
            <input
              value={local.item.title}
              onChange={(e) =>
                setLocal((p) =>
                  p && { ...p, item: { ...p.item, title: e.target.value } }
                )
              }
              className="w-full px-4 py-3 border rounded-md bg-white"
            />
          </div>

          {/* === Tahun & Tipe === */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium mb-2">Tahun</label>
              <input
                type="number"
                min={1900}
                max={2100}
                value={local.item.year}
                onChange={(e) =>
                  setLocal((p) =>
                    p && {
                      ...p,
                      item: { ...p.item, year: Number(e.target.value) },
                    }
                  )
                }
                className="w-full px-4 py-3 border rounded-md bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tipe HKI</label>
              <select
                value={local.item.type}
                onChange={(e) =>
                  setLocal((p) =>
                    p && {
                      ...p,
                      item: { ...p.item, type: e.target.value },
                    }
                  )
                }
                className="w-full px-4 py-3 border rounded-md bg-white"
              >
                {kategoriHKI.map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </div>

          </div>

          {/* === Buttons === */}
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
              className="px-5 py-2 rounded-md bg-yellow-400 text-white hover:bg-yellow-500"
            >
              Simpan Perubahan
            </button>
          </div>

        </form>
      </div>
    </ModalWrapper>
  );
}
