"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import ModalWrapper from "./ModalWrapper";

type ResearchItem = {
  id: number;
  title: string;
  year: number;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultData: {
    lecId: number;
    item: ResearchItem;
    lecturer_name: string;
  } | null;
  onSubmit: (payload: { lecId: number; item: ResearchItem }) => void;
}

export default function EditResearchCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: Props) {
  const [local, setLocal] = useState<{
    lecId: number;
    item: ResearchItem;
    lecturer_name: string;
  } | null>(null);

  useEffect(() => {
    if (defaultData) {
      setLocal({
        lecId: defaultData.lecId,
        item: { ...defaultData.item },
        lecturer_name: defaultData.lecturer_name,
      });
    } else {
      setLocal(null);
    }
  }, [defaultData, isOpen]);

  if (!isOpen || !local) return null;

  function save(e: React.FormEvent) {
    e.preventDefault();

    if (!local || !local.item) {
      alert("Data tidak valid.");
      return;
    }

    if (!local.item.title?.trim()) {
      alert("Judul wajib diisi.");
      return;
    }

    if (!local.item.year) {
      alert("Tahun tidak valid.");
      return;
    }

    onSubmit({
      lecId: local.lecId,
      item: local.item,
    });

    onClose();
  }

  return (
    <ModalWrapper onClose={onClose} isOpen={isOpen}>
      <div className="bg-white p-6 rounded-lg shadow w-[700px] mx-auto text-black">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-xl text-black">Edit Karya Ilmiah</h2>
          <button
            className="p-2 hover:bg-gray-200 rounded text-black"
            onClick={onClose}
          >
            <X className="text-black" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={save}>
          {/* Lecturer */}
          <div>
            <label className="text-sm font-semibold text-black">
              Nama Dosen
            </label>
            <input
              disabled
              className="w-full border rounded px-4 py-2 bg-gray-200 text-black font-medium"
              value={local.lecturer_name}
            />
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-black">Judul</label>
            <input
              className="w-full border rounded px-4 py-2 text-black"
              value={local.item.title}
              onChange={(e) =>
                setLocal((p) =>
                  p && { ...p, item: { ...p.item, title: e.target.value } }
                )
              }
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-sm font-semibold text-black">Tahun</label>
            <input
              type="number"
              min={1900}
              max={2100}
              className="w-40 border rounded px-4 py-2 text-black"
              value={local.item.year}
              onChange={(e) =>
                setLocal((p) =>
                  p && {
                    ...p,
                    item: { ...p.item, year: Number(e.target.value) },
                  }
                )
              }
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 border border-red-600 text-red-600 rounded font-semibold bg-white"
              onClick={onClose}
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-semibold"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
