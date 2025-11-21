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
  const [formData, setFormData] = useState<any>({});
  const [preview, setPreview] = useState<string>("/default-profile.jpg");

  useEffect(() => {
    if (isOpen) {
      setFormData(defaultData || {});
      setPreview(defaultData?.Foto || "/default-profile.jpg");
    }
  }, [isOpen, defaultData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      setFormData((prev: any) => ({ ...prev, Foto: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999]">
      {/* === Modal Container === */}
      <div className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* === Header === */}
        <div className="flex justify-between items-center px-10 py-5 border-b bg-[#0a3b91] text-white">
          <h2 className="text-2xl font-semibold tracking-wide">
            Edit Profil Dosen
          </h2>
          <button
            onClick={onClose}
            className="text-3xl font-bold leading-none hover:text-gray-200"
          >
            ×
          </button>
        </div>

        {/* === Body === */}
        <div className="px-10 py-8 flex-1 overflow-y-auto">
          {/* Foto Profil */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <img
                src={preview}
                alt="Foto Profil"
                className="w-40 h-40 rounded-full object-cover border-4 border-yellow-400 shadow-md"
              />
              <label
                htmlFor="fotoUpload"
                className="absolute bottom-2 right-2 bg-[#0a3b91] hover:bg-blue-800 text-white p-3 rounded-full cursor-pointer shadow-lg"
              >
                <Camera size={18} />
              </label>
              <input
                id="fotoUpload"
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Klik ikon kamera untuk mengganti foto profil
            </p>
          </div>

          {/* === Form Grid === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            {[
              { label: "Nama Lengkap", name: "Nama", type: "text" },
              { label: "NIDN", name: "NIDN", type: "text" },
              { label: "Program Studi", name: "Prodi", type: "text" },
              { label: "Email", name: "Email", type: "email" },
              { label: "Nomor HP", name: "Phone", type: "text" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={`Masukkan ${field.label}`}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#0a3b91] outline-none text-gray-900 transition-all"
                />
              </div>
            ))}
          </div>

          {/* === Sosial Media === */}
          <h3 className="text-[#0a3b91] font-semibold text-lg mt-10 mb-4">
            Akun Sosial Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">
            {["Instagram", "Facebook", "Github"].map((platform) => (
              <div key={platform} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {platform}
                </label>
                <input
                  type="text"
                  name={platform}
                  value={formData[platform] || ""}
                  onChange={handleChange}
                  placeholder={`Username ${platform}`}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-[#0a3b91] outline-none text-gray-900 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* === Footer === */}
        <div className="flex justify-end gap-4 px-10 py-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl border text-gray-700 hover:bg-gray-100 transition font-medium"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#0a3b91] text-white rounded-xl hover:bg-blue-800 transition font-medium"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}