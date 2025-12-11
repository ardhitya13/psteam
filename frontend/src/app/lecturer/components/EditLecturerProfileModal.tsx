"use client";

import { useEffect, useState } from "react";
import { Camera } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultData: any;
  onSubmit: (data: any) => void;
};

export default function EditLecturerProfileModal({
  isOpen,
  onClose,
  defaultData,
  onSubmit,
}: Props) {
  const DEFAULT_IMG = "/images/default-user.png";

  const [formData, setFormData] = useState<any>({});
  const [preview, setPreview] = useState<string>(DEFAULT_IMG);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // LOAD DEFAULT DATA SAAT MODAL DIBUKA
  useEffect(() => {
    if (!isOpen) return;

    setFormData(defaultData || {});
    setPhotoFile(null);

    // FIX: jika defaultData.photo kosong → pakai DEFAULT IMG
    if (defaultData?.photo) {
      setPreview(defaultData.photo);
    } else {
      setPreview(DEFAULT_IMG);
    }
  }, [isOpen, defaultData]);

  if (!isOpen) return null;

  // HANDLER INPUT TEXT
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // HANDLE UPLOAD FOTO
  const handlePhotoChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setPreview(URL.createObjectURL(file)); // preview realtime
  };

  // SUBMIT DATA
  const handleSubmit = () => {
    onSubmit({
      studyProgram: formData.studyProgram,
      specialization: formData.specialization,
      photoFile: photoFile, // file atau null
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999]">
      <div className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-10 py-5 border-b bg-[#0a3b91] text-white">
          <h2 className="text-2xl font-semibold">Edit Profil Dosen</h2>
          <button
            onClick={onClose}
            className="text-3xl font-bold hover:text-gray-200"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="px-10 py-8 flex-1 overflow-y-auto">

          {/* FOTO */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <img
                src={preview}
                onError={(e) => (e.currentTarget.src = DEFAULT_IMG)}
                alt="Foto Profil"
                className="w-40 h-40 rounded-full object-cover border-4 border-yellow-400 shadow-md"
              />

              <label
                htmlFor="photoUpload"
                className="absolute bottom-2 right-2 bg-[#0a3b91] hover:bg-blue-800 text-white p-3 rounded-full cursor-pointer shadow-lg"
              >
                <Camera size={18} />
              </label>

              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>

            <p className="text-sm text-gray-600 mt-3">
              Klik untuk mengganti foto
            </p>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

            {/* NAMA */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={formData.name || ""}
                disabled
                className="w-full border bg-gray-100 rounded-xl px-5 py-3 text-gray-500"
              />
            </div>

            {/* PROGRAM STUDI */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Program Studi</label>
              <input
                type="text"
                name="studyProgram"
                value={formData.studyProgram || ""}
                onChange={handleChange}
                placeholder="Masukkan Program Studi"
                className="w-full border rounded-xl px-5 py-3 text-black focus:ring-2 focus:ring-[#0a3b91]"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email || ""}
                disabled
                className="w-full border bg-gray-100 rounded-xl px-5 py-3 text-gray-500"
              />
            </div>

            {/* SPESIALISASI */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Spesialisasi</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization || ""}
                onChange={handleChange}
                placeholder="Masukkan Spesialisasi"
                className="w-full border rounded-xl px-5 py-3 text-black focus:ring-2 focus:ring-[#0a3b91]"
              />
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-4 px-10 py-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl border text-gray-700 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#0a3b91] text-white rounded-xl hover:bg-blue-800"
          >
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
}
