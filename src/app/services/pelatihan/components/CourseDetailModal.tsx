"use client";

import React from "react";
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
  if (!open || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 py-10"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-auto z-10">
        {/* Header */}
        <div className="flex items-start md:items-center justify-between p-4 md:p-6 border-b">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              {course.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{course.category}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Close details"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden bg-gray-100 h-48">
              {course.img ? (
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-500">Harga</div>
              <div className="text-lg font-semibold text-orange-500">
                {course.price
                  ? `Rp ${course.price.toLocaleString("id-ID")}`
                  : "Gratis"}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-700">Deskripsi</h3>
            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
              {course.description || course.excerpt || "Deskripsi belum tersedia."}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow"
                onClick={() => alert(`Mendaftar: ${course.title}`)}
              >
                Daftar Sekarang
              </button>

              <button
                className="px-4 py-2 bg-white border rounded-lg"
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
