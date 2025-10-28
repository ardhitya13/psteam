"use client";

import React from "react";
import { FaShoppingCart, FaFileDownload } from "react-icons/fa";

export type Course = {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  price: number;
  img: string;
  description?: string;
};

export default function CourseCardHorizontal({
  course,
  onClick,
}: {
  course: Course;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="w-full bg-white rounded-2xl border hover:shadow-lg transition-all flex flex-col sm:flex-row overflow-hidden cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="sm:w-60 h-48 flex-shrink-0 overflow-hidden">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5 text-left">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {course.excerpt}
          </p>
          <p className="text-sm text-gray-500 mt-3 font-medium">{course.category}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
          <div className="text-lg font-bold text-gray-900">
            Rp {course.price.toLocaleString("id-ID")}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FaFileDownload className="text-sm" />
              Minta Brosur
            </button>

            <button
              className="flex items-center gap-2 bg-white border text-gray-700 hover:border-blue-400 hover:text-blue-600 text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <FaShoppingCart className="text-sm" />
              Tambahkan ke keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
