"use client";

import { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface DetailProjectProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    email?: string;
    phoneNumber?: string;
    projectTitle?: string;
    projectType?: string;
    projectDescription?: string;
  } | null;
}

export default function DetailProjectModal({ isOpen, onClose, data }: DetailProjectProps) {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    setFormData(data || {});
  }, [data]);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center text-lg font-bold mb-6 text-[#000000]">
        DETAIL SPESIFIKASI PROYEK
      </h2>

      <div className="space-y-4 text-sm">

        {/* Email & Telepon */}
        <div className="flex gap-3">
          {/* EMAIL */}
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

          {/* TELEPON */}
          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              Nomor WhatsApp
            </label>
            <input
              value={formData?.phoneNumber || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>
        </div>

        {/* JUDUL & TIPE */}
        <div className="flex gap-3">

          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              Judul Proyek
            </label>
            <input
              value={formData?.projectTitle || ""} 
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="text-xs font-semibold text-gray-700 mb-1">
              Tipe Proyek
            </label>
            <input
              value={formData?.projectType || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-800"
            />
          </div>
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1">
            Deskripsi Proyek
          </label>
          <textarea
            value={formData?.projectDescription || ""} 
            disabled
            className="w-full h-50 px-3 py-2 border rounded-md bg-gray-100 text-gray-800 resize-none"
          />
        </div>

        {/* Tombol Tutup */}
        <div className="flex justify-end pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md bg-gray-500 text-white hover:bg-gray-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
