"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface ProyekModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  mode: "detail" | "edit";
}

export default function ProyekModal({ isOpen, onClose, data, mode }: ProyekModalProps) {
  const isEdit = mode === "edit";
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleSave = () => {
    console.log("✅ Status proyek diubah:", formData.status);
    alert("Status proyek berhasil diperbarui!");
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center text-lg font-bold mb-6 text-[#0a3b91]">
        {isEdit ? "UBAH STATUS PROYEK" : "DETAIL SPESIFIKASI PROYEK"}
      </h2>

      <div className="space-y-4 text-sm">

        {/* Email & Telepon */}
        <div className="flex gap-3">
          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              Email Pengaju
            </label>
            <input
              value={formData?.email || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              Nomor WhatsApp
            </label>
            <input
              value={formData?.telp || ""}  
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold text-gray-700 mb-1">
            Status Proyek
          </label>

          {isEdit ? (
            <select
              value={formData?.status || ""}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Belum Diproses">Belum Diproses</option>
              <option value="Sedang Diproses">Sedang Diproses</option>
              <option value="Selesai">Selesai</option>
            </select>
          ) : (
            <input
              value={formData?.status || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          )}
        </div>

        {/* Judul & Tipe */}
        <div className="flex gap-3">
          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              Judul Proyek
            </label>
            <input
              value={formData?.judul || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              Tipe Proyek
            </label>
            <input
              value={formData?.tipe || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1">
            Deskripsi Proyek
          </label>
          <textarea
            value={formData?.deskripsi || ""}
            disabled
            className="w-full h-28 px-3 py-2 border rounded-md bg-gray-100 text-gray-800 resize-none"
          />
        </div>

        {/* Tombol Simpan (khusus edit) */}
        {isEdit && (
          <div className="flex justify-end gap-2 pt-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
