"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditProps {
  isOpen: boolean;
  onClose: () => void;
  defaultData:
    | {
        lecId: number;
        lecturer_name: string;
        item: {
          id: number;
          title: string;
          type: string;
          year: number;
        };
      }
    | null;
  kategoriScientificWork: string[];
  onSubmit: (payload: { lecId: number; item: any }) => void;
}

export default function EditScientificWorkCard({
  isOpen,
  onClose,
  defaultData,
  kategoriScientificWork,
  onSubmit,
}: EditProps) {
  const [local, setLocal] = useState<any>(null);

  useEffect(() => {
    if (defaultData) {
      setLocal({
        lecId: defaultData.lecId,
        lecturer_name: defaultData.lecturer_name,
        item: { ...defaultData.item },
      });
    } else {
      setLocal(null);
    }
  }, [defaultData, isOpen]);

  if (!isOpen || !local) return null;

  function save(e: any) {
    e.preventDefault();
    onSubmit(local);
    onClose();
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[980px] max-w-[95%] mx-auto p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Edit Karya Ilmiah
        </h2>

        <form className="space-y-5 text-gray-900" onSubmit={save}>
          {/* Nama dosen (disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Dosen
            </label>
            <input
              disabled
              value={local.lecturer_name}
              className="w-full px-4 py-3 border rounded-md bg-gray-100 text-gray-700"
            />
          </div>

          {/* Judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Karya
            </label>
            <input
              value={local.item.title}
              onChange={(e) =>
                setLocal({
                  ...local,
                  item: { ...local.item, title: e.target.value },
                })
              }
              className="w-full px-4 py-3 border rounded-md bg-white text-gray-900"
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
                value={local.item.year}
                onChange={(e) =>
                  setLocal({
                    ...local,
                    item: { ...local.item, year: Number(e.target.value) },
                  })
                }
                className="w-full px-4 py-3 border rounded-md bg-white text-gray-900"
              />
            </div>

            {/* Tipe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Karya
              </label>
              <select
                value={local.item.type}
                onChange={(e) =>
                  setLocal({
                    ...local,
                    item: { ...local.item, type: e.target.value },
                  })
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
              className="px-5 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
