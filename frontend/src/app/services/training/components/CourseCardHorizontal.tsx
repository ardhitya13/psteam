// CourseCardHorizontal.tsx
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
}: {
  course: Course;
  onClick: () => void;
  onDaftar: (course: Course) => void;
}) {
  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true });
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={course.id * 100}
      className="w-full bg-white rounded-2xl border hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-[1.01]"
    >
      <div className="sm:w-60 h-48 flex-shrink-0 overflow-hidden group">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 p-5 text-left">
        <div data-aos="fade-right" data-aos-delay="200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">{course.excerpt}</p>
          <p className="text-sm text-gray-500 mt-3 font-medium italic">{course.category}</p>
        </div>

        <div
          className="flex flex-wrap items-center justify-between mt-5 gap-3"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="text-lg font-bold text-gray-900">
            Rp {course.price.toLocaleString("id-ID")}
          </div>

          <div className="flex items-center gap-3">
            <button
              className="bg-gradient-to-r from-blue-800 to-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none active:scale-[0.98] select-none"
              onClick={(e) => {
                e.stopPropagation();
                // debug log: pastikan course yang dikirim lengkap
                console.log("CourseCard: onDaftar called with course:", course);
                onDaftar(course);
              }}
            >
              Daftar Sekarang
            </button>

            <button
              className="bg-white border text-gray-700 hover:border-blue-400 hover:text-blue-600 text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none select-none"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
