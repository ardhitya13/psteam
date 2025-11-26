"use client";

import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";

type CommunityServiceItem = {
  id: number;
  title: string;
  year: number;
  lecturer_name?: string;
};

type EditPayload = {
  lecId: number;
  item: CommunityServiceItem;
  lecturer_name?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultData: EditPayload | null;
  // onSubmit must accept a single payload object { lecId, item }
  onSubmit: (payload: { lecId: number; item: CommunityServiceItem }) => void;
};

export default function EditCommunityServiceCard({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: Props) {
  const [local, setLocal] = useState<{ lecId: number; item: CommunityServiceItem } | null>(null);

  useEffect(() => {
    if (defaultData) {
      setLocal({
        lecId: defaultData.lecId,
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

  function save(e: React.FormEvent) {
    e.preventDefault();

    // send single payload object (match typing)
    onSubmit({
      lecId: local.lecId,
      item: local.item,
    });

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
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Dosen</label>
            <input
              disabled
              value={local.item.lecturer_name ?? ""}
              className="w-full px-4 py-3 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>

          {/* JUDUL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Pengabdian</label>
            <input
              value={local.item.title}
              onChange={(e) => setLocal({ ...local, item: { ...local.item, title: e.target.value } })}
              className="w-full px-4 py-3 border rounded-md bg-white text-gray-900"
            />
          </div>

          {/* TAHUN */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
              <input
                type="number"
                value={local.item.year}
                onChange={(e) =>
                  setLocal({
                    ...local,
                    item: { ...local.item, year: Number(e.target.value || 0) },
                  })
                }
                className="w-full px-4 py-3 border rounded-md bg-white text-gray-900"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-white border text-gray-700 hover:bg-gray-50">
              Batal
            </button>

            <button type="submit" className="px-5 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
