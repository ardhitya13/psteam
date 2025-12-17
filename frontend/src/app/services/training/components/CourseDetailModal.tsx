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
import RegisterTrainingModal from "./RegisterTrainingModal";

// =====================================================
// 🔥 NORMALIZER UNIVERSAL UNTUK ARRAY
// =====================================================
function parseArray(value: any) {
  if (!value) return [];

  // Kalau sudah array
  if (Array.isArray(value)) return value;

  // Kalau string JSON array
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {}

  // Fallback: split string biasa
  return String(value).split("|");
}

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
  const [registerOpen, setRegisterOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: true });
    if (open) setTimeout(() => setIsVisible(true), 100);
    else setIsVisible(false);
  }, [open]);

  if (!open || !course) return null;

  // ================================
  // NORMALISASI DATA BENAR
  // ================================
  const safeCostDetails = parseArray(course.costDetails);
  const safeRequirements = parseArray(course.requirements);
  const safeSchedule = parseArray(course.schedule);
  const safeRundown = parseArray(course.rundown);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 py-10">
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        <div
          className={`relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-auto max-h-[90vh] z-10 transform transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b bg-gray-50 rounded-t-2xl">
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

          {/* Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left */}
            <div className="md:col-span-1">
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-52 object-cover rounded-lg shadow-md"
              />

              <div className="mt-5 space-y-2 text-gray-700 text-sm">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-600" />
                  {course.duration || "-"}
                </p>
                <p className="flex items-center gap-2">
                  <FaClock className="text-blue-600" />
                  {course.duration || "-"}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  {course.location || "-"}
                </p>
                <p className="flex items-center gap-2">
                  <FaCertificate className="text-blue-600" />
                  {course.certificate || "-"}
                </p>
                <p className="flex items-center gap-2">
                  <FaUserTie className="text-blue-600" />
                  {course.instructor || "-"}
                </p>
              </div>

              <div className="mt-5 text-center border-t pt-4">
                <p className="text-sm text-gray-500">Harga Pelatihan</p>
                <p className="text-xl font-bold text-orange-600 mt-1">
                  Rp {course.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="md:col-span-2 text-gray-800 space-y-8">
              {/* Deskripsi */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🧾 Deskripsi Pelatihan
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {course.description || "Deskripsi tidak tersedia."}
                </p>
              </section>

              {/* Rincian Biaya */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  💰 Rincian Biaya
                </h3>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {safeCostDetails.length
                    ? safeCostDetails.map((c, i) => <li key={i}>{c}</li>)
                    : "−"}
                </ul>
              </section>

              {/* Syarat */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  📋 Syarat Peserta
                </h3>
                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                  {safeRequirements.length
                    ? safeRequirements.map((r, i) => <li key={i}>{r}</li>)
                    : "−"}
                </ul>
              </section>

              {/* Jadwal */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🗓️ Jadwal Pelaksanaan
                </h3>
                <table className="w-full text-sm border border-gray-300 rounded-2xl overflow-hidden shadow-sm">
                  <thead className="bg-blue-100 text-gray-800">
                    <tr>
                      <th className="px-3 py-2">Batch</th>
                      <th className="px-3 py-2">Tanggal Mulai</th>
                      <th className="px-3 py-2">Tanggal Selesai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeSchedule.length ? (
                      safeSchedule.map((s, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-3 py-2">{s.batchName}</td>
                          <td className="px-3 py-2">{s.startDate}</td>
                          <td className="px-3 py-2">{s.endDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-3 text-center text-gray-500">
                          Belum ada jadwal
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>

              {/* Rundown */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  📅 Rundown Kegiatan
                </h3>
                <table className="w-full text-sm border border-gray-300 rounded-2xl overflow-hidden shadow-sm">
                  <thead className="bg-blue-100 text-gray-800">
                    <tr>
                      <th className="px-3 py-2">Hari</th>
                      <th className="px-3 py-2">Kegiatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {safeRundown.length ? (
                      safeRundown.map((r, i) => (
                        <tr key={i} className="border-t">
                          <td className="px-3 py-2">{r.day}</td>
                          <td className="px-3 py-2">{r.activity}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="py-3 text-center text-gray-500">
                          Belum ada rundown
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </section>

              {/* Penyelenggara */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🏫 Penyelenggara
                </h3>
                <p className="text-sm text-gray-700">
                  {course.organizer || "Tidak ada data penyelenggara."}
                </p>
              </section>

              {/* Tombol */}
              <div className="pt-4 flex gap-3">
                <button
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-800 to-blue-500 text-white rounded-lg shadow-md"
                  onClick={() => setRegisterOpen(true)}
                >
                  Daftar Sekarang
                </button>

                <button
                  className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg"
                  onClick={onClose}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Daftar */}
      <RegisterTrainingModal
        open={registerOpen}
        course={course}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  );
}
