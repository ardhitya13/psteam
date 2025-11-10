"use client";

import ModalWrapper from "./ModalWrapper";

interface DetailProyekModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    email?: string;
    judul?: string;
    tipe?: string;
    deskripsi?: string;
    status?: string;
  } | null;
  canChangeStatus?: boolean;
}

export default function DetailProyekModal({
  isOpen,
  onClose,
  data,
  canChangeStatus = false,
}: DetailProyekModalProps) {
  if (!data) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center text-lg font-bold mb-6 text-[#000000]">
        DETAIL SPESIFIKASI PROYEK
      </h2>

      <div className="space-y-4">
        {/* Email dan Status */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="block text-gray-600 mb-1 text-xs font-semibold">
              Email Pengaju
            </label>
            <input
              value={data.email || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-600 mb-1 text-xs font-semibold">
              Status Proyek
            </label>
            <input
              value={data.status || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <div className="w-1/2">
            <label className="block text-gray-600 mb-1 text-xs font-semibold">
              Judul Proyek
            </label>
            <input
              value={data.judul || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-600 mb-1 text-xs font-semibold">
              Tipe Proyek
            </label>
            <input
              value={data.tipe || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>
        </div>
        <label className="block text-gray-600 mb-1 text-xs font-semibold">
          Deskripsi Proyek
        </label>
        {/* Deskripsi */}
        <textarea
          value={data.deskripsi || ""}
          disabled
          className="w-full h-28 px-3 py-2 border rounded-md bg-gray-100 resize-none text-sm text-gray-800"
          placeholder="Deskripsi Proyek"
        />

        {/* Tombol Simpan jika canChangeStatus = true */}
        {canChangeStatus && (
          <button
            onClick={onClose}
            className="w-full mt-2 bg-[#0a3b91] hover:bg-blue-800 text-white py-2 rounded-md font-semibold"
          >
            Simpan
          </button>
        )}
      </div>
    </ModalWrapper>
  );
}
