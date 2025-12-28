"use client";

import { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  mode: "detail" | "edit";
  onUpdateStatus?: (id: number, status: string) => void;
}

export default function EditProjectModal({
  isOpen,
  onClose,
  data,
  mode,
  onUpdateStatus,
}: EditProjectModalProps) {
  const isEdit = mode === "edit";

  const [formData, setFormData] = useState({
    id: 0,
    email: "",
    phoneNumber: "",
    projectTitle: "",
    projectType: "",
    projectDescription: "",
    status: "pending",
  });

  useEffect(() => {
    if (!data) return;

    setFormData({
      id: data.id,
      email: data.email,
      phoneNumber: data.phoneNumber,
      projectTitle: data.projectTitle,
      projectType: data.projectType,
      projectDescription: data.projectDescription,
      status: data.status,
    });
  }, [data]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!onUpdateStatus) return;

    await onUpdateStatus(formData.id, formData.status);
    onClose();
  };

  const statusColor =
    formData.status === "finished"
      ? "bg-green-100 text-green-700 border-green-300"
      : formData.status === "approved"
      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
      : "bg-gray-100 text-gray-700 border-gray-300";

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center text-lg font-bold mb-6 text-gray-900">
        {isEdit ? "UBAH STATUS PROYEK" : "DETAIL SPESIFIKASI PROYEK"}
      </h2>

      <div className="space-y-4 text-sm text-gray-800">
        {/* EMAIL & PHONE */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-700">
              Email Pengaju
            </label>
            <input
              value={formData.email}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-white text-gray-800 cursor-not-allowed"
            />
          </div>

          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-700">
              Nomor WhatsApp
            </label>
            <input
              value={formData.phoneNumber}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-white text-gray-800 cursor-not-allowed"
            />
          </div>
        </div>

        {/* STATUS */}
        <div>
          <label className="text-xs font-semibold text-gray-700">
            Status Proyek
          </label>

          {isEdit ? (
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className={`w-full px-3 py-2 border rounded-md font-semibold ${statusColor}`}
            >
              <option value="pending">Pending</option>
              <option value="approved">Sedang Diproses</option>
              <option value="finished">Selesai</option>
            </select>
          ) : (
            <div
              className={`w-full px-3 py-2 border rounded-md font-semibold ${statusColor}`}
            >
              {formData.status === "pending"
                ? "Pending"
                : formData.status === "approved"
                ? "Sedang Diproses"
                : "Selesai"}
            </div>
          )}
        </div>

        {/* TITLE & TYPE */}
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-700">
              Judul Proyek
            </label>
            <input
              value={formData.projectTitle}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-white text-gray-800 cursor-not-allowed"
            />
          </div>

          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-700">
              Tipe Proyek
            </label>
            <input
              value={formData.projectType}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-white text-gray-800 cursor-not-allowed"
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-xs font-semibold text-gray-700">
            Deskripsi Proyek
          </label>
          <textarea
            value={formData.projectDescription}
            disabled
            className="w-full px-3 py-2 border rounded-md bg-white text-gray-800 h-28 resize-none cursor-not-allowed"
          />
        </div>

        {/* ACTION */}
        {isEdit && (
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Batal
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
