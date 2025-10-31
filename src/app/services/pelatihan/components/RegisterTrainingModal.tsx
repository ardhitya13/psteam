"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import type { Course } from "./CourseCardHorizontal";

type DaftarPelatihanModalProps = {
  open: boolean;
  course?: Course | null;
  onClose: () => void;
};

export default function DaftarPelatihanModal({
  open,
  course,
  onClose,
}: DaftarPelatihanModalProps) {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    telepon: "",
    perusahaan: "",
    kota: "",
    catatan: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  // Inisialisasi efek AOS dan animasi masuk
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
    });

    if (open) {
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  if (!open || !course) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDaftar = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `✅ Pendaftaran berhasil untuk pelatihan "${course.title}"!\nTerima kasih, ${formData.nama}!`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6">
      {/* Animasi Modal */}
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
        <div
          className="text-center mb-6"
          data-aos="fade-down"
          data-aos-delay="100"
        >
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

          {/* Kanan - Form Pendaftaran */}
          <form
            onSubmit={handleDaftar}
            className="space-y-4"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                placeholder="Masukkan nama lengkap..."
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Email */}
            <div data-aos="fade-up" data-aos-delay="200">
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
                className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Telepon */}
            <div data-aos="fade-up" data-aos-delay="250">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="telepon"
                placeholder="Masukkan nomor WhatsApp..."
                value={formData.telepon}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Perusahaan dan Kota */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Perusahaan (Opsional)
                </label>
                <input
                  type="text"
                  name="perusahaan"
                  placeholder="Nama perusahaan..."
                  value={formData.perusahaan}
                  onChange={handleChange}
                  className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Kota / Wilayah
                </label>
                <input
                  type="text"
                  name="kota"
                  placeholder="Masukkan kota..."
                  value={formData.kota}
                  onChange={handleChange}
                  className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Catatan */}
            <div data-aos="fade-up" data-aos-delay="350">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                name="catatan"
                placeholder="Tuliskan pertanyaan atau catatan..."
                rows={3}
                value={formData.catatan}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              />
            </div>

            {/* Tombol Daftar */}
            <div
              className="pt-4"
              data-aos="zoom-in-up"
              data-aos-delay="400"
            >
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
  );
}
