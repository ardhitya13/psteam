"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
  onDaftar,
  onAddToCart,
}: {
  course: Course;
  onClick: () => void;
  onDaftar: (course: Course) => void;
  onAddToCart: (course: Course) => void;
}) {
  // Inisialisasi efek AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      offset: 100,
      once: true,
    });
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={course.id * 100}
      onClick={onClick}
      className="w-full bg-white rounded-2xl border hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-[1.01]"
    >
      {/* Gambar */}
      <div className="sm:w-60 h-48 flex-shrink-0 overflow-hidden group">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Isi Card */}
      <div className="flex flex-col justify-between flex-1 p-5 text-left">
        <div data-aos="fade-right" data-aos-delay="200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{course.excerpt}</p>
          <p className="text-sm text-gray-500 mt-3 font-medium italic">
            {course.category}
          </p>
        </div>

        {/* Harga dan Tombol */}
        <div
          className="flex flex-wrap items-center justify-between mt-5 gap-3"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="text-lg font-bold text-gray-900">
            Rp {course.price.toLocaleString("id-ID")}
          </div>

          <div className="flex items-center gap-3">
            {/* Tombol Daftar */}
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onDaftar(course);
              }}
            >
              Daftar Sekarang
            </button>

            {/* Tombol Tambah ke Keranjang */}
            <button
              className="bg-white border text-gray-700 hover:border-blue-400 hover:text-blue-600 text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(course);
              }}
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
