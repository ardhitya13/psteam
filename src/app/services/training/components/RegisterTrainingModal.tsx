"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import type { Course } from "./CourseCardHorizontal";

type RegisterTrainingModalProps = {
  open: boolean;
  course?: Course | null;
  onClose: () => void;
};

export default function RegisterTrainingModal({
  open,
  course,
  onClose,
}: RegisterTrainingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    city: "",
    note: "",
  });

  // Notifikasi custom
  const [showNotif, setShowNotif] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });

    if (open) setTimeout(() => setIsVisible(true), 100);
    else setIsVisible(false);
  }, [open]);

  if (!open || !course) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Tampilkan notifikasi di tengah
    setShowNotif(true);

    // Setelah OK ditekan → modal pendaftaran tertutup
  };

  return (
    <>
      {/* BACKDROP MODAL FORM */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6">
        <div
          className={`bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative p-8 border border-gray-100 transform transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          {/* Tombol Tutup */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
          >
            <FaTimes size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-6" data-aos="fade-down" data-aos-delay="100">
            <h2 className="text-3xl font-bold text-gray-800">Daftar Pelatihan</h2>
            <p className="text-gray-600 text-sm mt-1">
              Lengkapi data berikut untuk mengikuti pelatihan pilihanmu.
            </p>
          </div>

          {/* Konten Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Kiri - Info Pelatihan */}
            <div
              className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm"
              data-aos="fade-right"
            >
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-700 hover:scale-105"
              />
              <h3 className="font-bold text-gray-900 text-lg">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.category}</p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-5">
                {course.description || "Deskripsi tidak tersedia."}
              </p>
              <p className="text-xl font-bold text-orange-600 mt-3">
                Rp {course.price.toLocaleString("id-ID")}
              </p>
            </div>

            {/* Kanan - Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-aos="fade-left"
              data-aos-delay="150"
            >
              {/* Nama */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan nama lengkap..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan email aktif..."
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Telepon */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Masukkan nomor WhatsApp..."
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Status & Kota */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Status Peserta
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">Pilih status peserta...</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Pekerja">Pekerja</option>
                    <option value="Fresh Graduate">Fresh Graduate</option>
                    <option value="Siswa SMA/SMK">Siswa SMA/SMK</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                {/* Kota */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Kota / Wilayah
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Masukkan kota..."
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 text-gray-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Catatan */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  name="note"
                  placeholder="Tuliskan pertanyaan atau catatan tambahan..."
                  rows={3}
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>

              {/* Tombol */}
              <div className="pt-4" data-aos="zoom-in-up" data-aos-delay="400">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-full flex justify-center items-center gap-2 shadow-lg transition-all duration-300"
                >
                  <FaPaperPlane /> Kirim Pendaftaran
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ====================== */}
      {/* NOTIFIKASI DI TENGAH    */}
      {/* ====================== */}
      {showNotif && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-800">
              Pendaftaran Berhasil!
            </h3>

            <p className="text-gray-600 mt-2">
              Terima kasih, <b>{formData.name}</b>!  
              <br />
              Kamu telah berhasil mendaftar untuk pelatihan:
            </p>

            <p className="mt-4 text-blue-700 font-semibold text-lg">“{course.title}”</p>

            <button
              onClick={() => {
                setShowNotif(false);
                onClose();
              }}
              className="mt-6 w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}
