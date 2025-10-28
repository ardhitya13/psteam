"use client";

import React, { useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import CourseCardHorizontal, { Course } from "./components/CourseCardHorizontal";
import CourseDetailModal from "./components/CourseDetailModal";

export default function PelatihanPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Semua",
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "Internet of Things (IoT)",
  ];

  const allCourses: Course[] = [
    {
      id: 1,
      title: "Fullstack Web Developer Bootcamp",
      category: "Web Development",
      excerpt:
        "Pelajari HTML, CSS, JavaScript, React, dan Node.js untuk menjadi developer web profesional.",
      price: 8500000,
      img: "/images/web.jpg",
      description:
        "Bootcamp intensif 8 minggu yang mengajarkan pengembangan web dari frontend hingga backend menggunakan React, Express, dan MySQL.",
    },
    {
      id: 2,
      title: "Flutter Mobile Apps Development",
      category: "Mobile Development",
      excerpt:
        "Bangun aplikasi Android dan iOS menggunakan Flutter dan Dart dengan desain modern.",
      price: 9000000,
      img: "/images/mobile.jpg",
      description:
        "Pelatihan ini mengajarkan cara membuat aplikasi multiplatform menggunakan Flutter. Peserta akan membangun 3 proyek mobile real-world.",
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      category: "Artificial Intelligence",
      excerpt:
        "Kuasai dasar AI dan Machine Learning menggunakan Python, NumPy, Pandas, dan Scikit-Learn.",
      price: 10000000,
      img: "/images/ai.jpg",
      description:
        "Peserta akan belajar supervised dan unsupervised learning, regression, classification, serta evaluasi model dengan dataset nyata.",
    },
    {
      id: 4,
      title: "IoT with Arduino & ESP32",
      category: "Internet of Things (IoT)",
      excerpt:
        "Belajar membangun sistem IoT dengan sensor, mikrokontroler, dan koneksi cloud.",
      price: 9500000,
      img: "/images/iot.jpg",
      description:
        "Pelatihan praktis membuat proyek IoT berbasis sensor menggunakan Arduino & ESP32, terhubung ke platform cloud seperti Blynk atau Firebase.",
    },
  ];

  const filteredCourses =
    selectedCategory === "Semua"
      ? allCourses
      : allCourses.filter((c) => c.category === selectedCategory);

  const openDetail = (course: Course) => {
    setSelectedCourse(course);
    setIsOpen(true);
  };

  const closeDetail = () => {
    setSelectedCourse(null);
    setIsOpen(false);
  };

  return (
    <main className="bg-white min-h-screen py-20">
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Pelatihan & Sertifikasi
        </h2>
        <p className="text-gray-600 mb-8">
          Pilih bidang pelatihan yang sesuai untuk memperdalam keahlian digitalmu.
        </p>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="flex items-center justify-between mt-10 mb-5">
          <h3 className="text-lg font-semibold text-gray-800">
            {filteredCourses.length} Pelatihan / Sertifikasi Tersedia
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          {filteredCourses.map((course) => (
            <CourseCardHorizontal
              key={course.id}
              course={course}
              onClick={() => openDetail(course)}
            />
          ))}
        </div>

        <CourseDetailModal open={isOpen} course={selectedCourse} onClose={closeDetail} />
      </section>
    </main>
  );
}
