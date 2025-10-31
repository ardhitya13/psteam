"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTimes } from "react-icons/fa";
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
  const [lihatDetail, setLihatDetail] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });

    if (open) {
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  if (!open || !course) return null;

  const deskripsiPendek =
    course.description && course.description.length > 180
      ? course.description.slice(0, 180) + "..."
      : course.description;

  return (
    <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 py-10">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Modal Box */}
      <div
        className={`relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-auto z-10 transform transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between p-6 border-b"
          data-aos="fade-down"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
            <p className="text-sm text-gray-500 mt-1">{course.category}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gambar & Harga */}
          <div
            className="md:col-span-1"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="rounded-lg overflow-hidden bg-gray-100 h-48 shadow-md">
              <img
                src={course.img}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            <div className="mt-5 text-center">
              <p className="text-sm text-gray-500">Harga</p>
              <p className="text-xl font-bold text-orange-500 mt-1">
                Rp {course.price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Deskripsi */}
          <div
            className="md:col-span-2"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <h3 className="text-base font-semibold text-gray-700 mb-2">
              Deskripsi Pelatihan
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {lihatDetail ? course.description : deskripsiPendek}
            </p>

            {course.description && course.description.length > 180 && (
              <button
                onClick={() => setLihatDetail(!lihatDetail)}
                className="mt-2 text-blue-700 text-sm font-medium hover:underline transition"
              >
                {lihatDetail ? "Tutup Detail ▲" : "Lihat Detail ▼"}
              </button>
            )}

            {/* Tombol Aksi */}
            <div
              className="mt-8 flex flex-wrap gap-3"
              data-aos="fade-right"
              data-aos-delay="250"
            >
              <button
                className="px-5 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                onClick={() =>
                  alert(`Berhasil mendaftar ke pelatihan: ${course.title}`)
                }
              >
                Daftar Sekarang
              </button>

              <button
                className="px-5 py-2 bg-white border text-gray-700 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all"
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
