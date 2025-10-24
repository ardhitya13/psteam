"use client";

import ModalWrapper from "../components/ModalWrapper";

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
      <h2 className="text-center text-lg font-bold mb-6 text-[#0a3b91]">
        DETAIL SPESIFIKASI PROYEK
      </h2>

      <div className="space-y-4">
        {/* Email dan Status */}
        <div className="flex gap-3">
          <input
            value={data.email || ""}
            disabled
            className="w-1/2 px-3 py-2 border rounded-md bg-gray-100 text-sm"
            placeholder="Email Pengaju"
          />
          {canChangeStatus ? (
            <select className="w-1/2 px-3 py-2 border rounded-md text-sm">
              <option>Belum Diproses</option>
              <option>Sedang Diproses</option>
              <option>Selesai</option>
            </select>
          ) : (
            <input
              value={data.status || ""}
              disabled
              className="w-1/2 px-3 py-2 border rounded-md bg-gray-100 text-sm"
              placeholder="Status Proyek"
            />
          )}
        </div>

        {/* Judul dan Tipe */}
        <div className="flex gap-3">
          <input
            value={data.judul || ""}
            disabled
            className="w-1/2 px-3 py-2 border rounded-md bg-gray-100 text-sm"
            placeholder="Judul Proyek"
          />
          <input
            value={data.tipe || ""}
            disabled
            className="w-1/2 px-3 py-2 border rounded-md bg-gray-100 text-sm"
            placeholder="Tipe Proyek"
          />
        </div>

        {/* Deskripsi */}
        <textarea
          value={data.deskripsi || ""}
          disabled
          className="w-full h-28 px-3 py-2 border rounded-md bg-gray-100 resize-none text-sm"
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
