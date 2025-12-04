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

  const [formData, setFormData] = useState<any>({
    id: 0,
    email: "",
    phoneNumber: "",
    projectTitle: "",
    projectType: "",
    projectDescription: "",
    status: "",
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
    const id = formData.id;
    const newStatus = formData.status;

    if (onUpdateStatus) {
      // Parent akan melakukan fetch & menampilkan success
      await onUpdateStatus(id, newStatus);
    } else {
      // fallback: local update
      try {
        const res = await fetch(`http://localhost:4000/api/submissions/${id}/update-status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (!res.ok) {
          alert("Gagal update status");
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }

    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center text-lg font-bold mb-6 text-[#000000]">{isEdit ? "UBAH STATUS PROYEK" : "DETAIL SPESIFIKASI PROYEK"}</h2>

      <div className="space-y-4 text-sm">
        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-700">Email Pengaju</label>
            <input value={formData.email} disabled className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>

          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-700">Nomor WhatsApp</label>
            <input value={formData.phoneNumber} disabled className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">Status Proyek</label>
          {isEdit ? (
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border rounded-md bg-white">
              <option value="pending">Pending</option>
              <option value="approved">Sedang Diproses</option>
              <option value="finished">Selesai</option>
            </select>
          ) : (
            <input value={formData.status} disabled className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          )}
        </div>

        <div className="flex gap-3">
          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-700">Judul Proyek</label>
            <input value={formData.projectTitle} disabled className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>

          <div className="w-1/2">
            <label className="text-xs font-semibold text-gray-700">Tipe Proyek</label>
            <input value={formData.projectType} disabled className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">Deskripsi Proyek</label>
          <textarea value={formData.projectDescription} disabled className="w-full px-3 py-2 border rounded-md bg-gray-100 h-28 resize-none" />
        </div>

        {isEdit && (
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">Batal</button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-md">Simpan</button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
