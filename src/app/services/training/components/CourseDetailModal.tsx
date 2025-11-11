"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUserTie,
  FaCertificate,
} from "react-icons/fa";
import type { Course } from "./CourseCardHorizontal";

export default function CourseDetailModal({
  open,
  course,
  onClose,
}: {
  open: boolean;
  course?: Course | null;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: true });
    if (open) setTimeout(() => setIsVisible(true), 100);
    else setIsVisible(false);
  }, [open]);

  if (!open || !course) return null;

  // ✅ Ambil data tanpa kata "Jadwal Pelaksanaan:" biar tidak dobel
  const jadwalRaw = course.description?.match(/📅 (.*)/)?.[1] || "-";
  const durasiRaw = course.description?.match(/🕒 (.*)/)?.[1] || "-";
  const lokasiRaw = course.description?.match(/📍 (.*)/)?.[1] || "-";
  const sertifikatRaw = course.description?.match(/🎓 (.*)/)?.[1] || "-";
  const instrukturRaw = course.description?.match(/👨‍🏫 (.*)/)?.[1] || "-";

  // Bersihkan kata “Jadwal Pelaksanaan:” dll supaya tidak dobel
  const cleanText = (text: string) =>
    text
      .replace(/Jadwal Pelaksanaan:\s*/i, "")
      .replace(/Durasi:\s*/i, "")
      .replace(/Lokasi:\s*/i, "")
      .replace(/Sertifikat:\s*/i, "")
      .replace(/Instruktur:\s*/i, "")
      .trim();

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 py-10">
      {/* Background Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-auto max-h-[90vh] z-10 transform transition-all duration-700 ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{course.category}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-200 transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Konten */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kiri - Gambar dan info singkat */}
          <div className="md:col-span-1">
            <img
              src={course.img}
              alt={course.title}
              className="w-full h-52 object-cover rounded-lg shadow-md"
            />

            <div className="mt-5 space-y-2 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" /> {cleanText(jadwalRaw)}
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-blue-600" /> {cleanText(durasiRaw)}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" /> {cleanText(lokasiRaw)}
              </p>
              <p className="flex items-center gap-2">
                <FaCertificate className="text-blue-600" /> {cleanText(sertifikatRaw)}
              </p>
              <p className="flex items-center gap-2">
                <FaUserTie className="text-blue-600" /> {cleanText(instrukturRaw)}
              </p>
            </div>

            <div className="mt-5 text-center border-t pt-4">
              <p className="text-sm text-gray-500">Harga Pelatihan</p>
              <p className="text-xl font-bold text-orange-600 mt-1">
                Rp {course.price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Kanan - Deskripsi dan detail panjang */}
          <div className="md:col-span-2 text-gray-800 space-y-8">
            {/* Deskripsi */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🧾 Deskripsi Pelatihan
              </h3>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {course.description?.split("\n\n")[1] ||
                  "Deskripsi lengkap tidak tersedia untuk pelatihan ini."}
              </p>
            </section>

            {/* Rincian Biaya */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                💰 Rincian Biaya
              </h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>Biaya pendaftaran dan sertifikat kelulusan</li>
                <li>Modul pembelajaran digital dan akses LMS</li>
                <li>
                  Penggunaan lab atau ruang belajar (khusus kelas offline di Batam)
                </li>
                <li>Makan siang dan coffee break untuk peserta offline</li>
              </ul>
            </section>

            {/* Syarat Peserta */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📋 Syarat Peserta
              </h3>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>Mahasiswa atau umum yang tertarik di bidang {course.category}</li>
                <li>Memiliki laptop pribadi dengan spesifikasi dasar</li>
                <li>Koneksi internet stabil untuk kelas online</li>
              </ul>
            </section>

            {/* Jadwal Pelaksanaan */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🗓️ Jadwal Pelaksanaan
              </h3>
              <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-blue-100 text-gray-800">
                  <tr>
                    <th className="border px-3 py-2 text-left">Batch</th>
                    <th className="border px-3 py-2 text-left">Tanggal Mulai</th>
                    <th className="border px-3 py-2 text-left">Tanggal Selesai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2">Batch 1</td>
                    <td className="border px-3 py-2">10 Februari 2025</td>
                    <td className="border px-3 py-2">5 April 2025</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border px-3 py-2">Batch 2</td>
                    <td className="border px-3 py-2">20 Mei 2025</td>
                    <td className="border px-3 py-2">15 Juli 2025</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Rundown */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                📅 Rundown Kegiatan
              </h3>
              <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-blue-100 text-gray-800">
                  <tr>
                    <th className="border px-3 py-2 text-left">Hari</th>
                    <th className="border px-3 py-2 text-left">Kegiatan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2">Hari 1</td>
                    <td className="border px-3 py-2">Pengenalan dan orientasi pelatihan</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border px-3 py-2">Hari 2</td>
                    <td className="border px-3 py-2">Pengenalan teknologi & tools yang digunakan</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Hari 3</td>
                    <td className="border px-3 py-2">Materi inti dan praktik langsung</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border px-3 py-2">Hari 4</td>
                    <td className="border px-3 py-2">Project mini & review mentor</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Hari 5</td>
                    <td className="border px-3 py-2">Presentasi hasil & evaluasi akhir</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* Penyelenggara */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🏫 Penyelenggara
              </h3>
              <p className="text-sm text-gray-700">
                Diselenggarakan oleh <b>PSTeam Academy</b> bekerja sama dengan{" "}
                <b>Politeknik Negeri Batam</b>. Pelatihan ini bersifat terbuka
                untuk umum, dengan instruktur berpengalaman di bidangnya.
              </p>
            </section>

            {/* Tombol */}
            <div className="pt-4 flex gap-3">
              <button
                className="px-5 py-2.5 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg 
                transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none"
                onClick={() =>
                  alert(`✅ Kamu berhasil mendaftar pelatihan: ${course.title}`)
                }
              >
                Daftar Sekarang
              </button>
              <button
                className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all"
                onClick={onClose}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
