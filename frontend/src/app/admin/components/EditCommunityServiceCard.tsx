"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";

export default function EditCommunityServiceCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: any) {
  const [local, setLocal] = useState<any>(null);

  /* =============================
     LOAD DATA KE STATE LOCAL
     ============================= */
  useEffect(() => {
    if (defaultData) {
      setLocal({
        lecId: defaultData.lecId, // ID dosen
        item: {
          ...defaultData.item,
          lecturer_name: defaultData.lecturer_name ?? defaultData.item.lecturer_name ?? "",
        },
      });
    } else {
      setLocal(null);
    }
  }, [defaultData, isOpen]);

  if (!isOpen || !local) return null;

  /* =============================
     SAVE BUTTON
     ============================= */
  function save(e: any) {
    e.preventDefault();
    onSubmit(local); // kirim {lecId, item} ke parent
    onClose();
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-[900px] max-w-[95%] mx-auto p-6 bg-white rounded-lg shadow-sm">

        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Edit Pengabdian Masyarakat
        </h2>

        <form onSubmit={save} className="space-y-5 text-gray-900">

          {/* NAMA DOSEN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Dosen
            </label>
            <input
              disabled
              value={local.item.lecturer_name || ""}
              className="w-full px-4 py-3 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>

          {/* JUDUL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Pengabdian
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

          {/* TAHUN */}
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 mt-4">
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
