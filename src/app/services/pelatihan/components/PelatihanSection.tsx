"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "./CategoryFilter";
import CourseCardHorizontal, { Course } from "./CourseCardHorizontal";
import CourseDetailModal from "./CourseDetailModal";
import RegisterTrainingModal from "./RegisterTrainingModal";
import CartModal from "./CartModal";
import { FaShoppingCart } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PelatihanSection() {
  const searchParams = useSearchParams();
  const filterRef = useRef<HTMLDivElement | null>(null);

  const categoryFromQuery = searchParams.get("category");

  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>("Semua");
  const [pelatihanTerpilih, setPelatihanTerpilih] = useState<Course | null>(null);
  const [bukaDetail, setBukaDetail] = useState(false);
  const [bukaDaftar, setBukaDaftar] = useState(false);
  const [bukaKeranjang, setBukaKeranjang] = useState(false);
  const [keranjang, setKeranjang] = useState<Course[]>([]);

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true });
  }, []);

  useEffect(() => {
    if (categoryFromQuery) {
      setKategoriTerpilih(categoryFromQuery);
      setTimeout(() => {
        filterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      setKategoriTerpilih("Semua");
    }
  }, [categoryFromQuery]);

  const kategori = [
    "Semua",
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "Internet of Things (IoT)",
  ];

  const semuaPelatihan: Course[] = [
    {
      id: 1,
      title: "Fullstack Web Developer Bootcamp",
      category: "Web Development",
      excerpt:
        "Pelajari HTML, CSS, JavaScript, React, dan Node.js untuk menjadi pengembang web profesional.",
      price: 8500000,
      img: "/pelatihan/fullstack.png",
      description:
        "Bootcamp intensif selama 8 minggu yang mengajarkan pengembangan web dari frontend hingga backend menggunakan React, Express, dan MySQL.",
    },
    {
      id: 2,
      title: "Flutter Mobile Apps Development",
      category: "Mobile Development",
      excerpt:
        "Bangun aplikasi Android dan iOS menggunakan Flutter dan Dart dengan desain modern.",
      price: 9000000,
      img: "/pelatihan/flutterapp.png",
      description:
        "Pelatihan ini mengajarkan pembuatan aplikasi multiplatform menggunakan Flutter. Peserta akan membangun 3 proyek mobile nyata.",
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      category: "Artificial Intelligence",
      excerpt:
        "Kuasai dasar-dasar AI dan Machine Learning dengan Python, NumPy, Pandas, dan Scikit-Learn.",
      price: 10000000,
      img: "/pelatihan/ai.png",
      description:
        "Peserta akan belajar supervised dan unsupervised learning, regresi, klasifikasi, serta evaluasi model menggunakan dataset nyata.",
    },
    {
      id: 4,
      title: "IoT dengan Arduino & ESP32",
      category: "Internet of Things (IoT)",
      excerpt:
        "Belajar membangun sistem IoT dengan sensor, mikrokontroler, dan koneksi cloud.",
      price: 9500000,
      img: "/pelatihan/iot.png",
      description:
        "Pelatihan praktis untuk membuat proyek IoT berbasis sensor menggunakan Arduino & ESP32 yang terhubung ke cloud seperti Blynk atau Firebase.",
    },
  ];

  const pelatihanTersaring =
    kategoriTerpilih === "Semua"
      ? semuaPelatihan
      : semuaPelatihan.filter((c) => c.category === kategoriTerpilih);

  const tambahKeKeranjang = (course: Course) => {
    if (!keranjang.find((item) => item.id === course.id)) {
      setKeranjang([...keranjang, course]);
    } else {
      alert("Pelatihan ini sudah ada di keranjang!");
    }
  };

  const hapusDariKeranjang = (id: number) => {
    setKeranjang(keranjang.filter((item) => item.id !== id));
  };

  const bukaModalDetail = (course: Course) => {
    setPelatihanTerpilih(course);
    setBukaDetail(true);
  };

  const bukaModalDaftar = (course: Course) => {
    setPelatihanTerpilih(course);
    setBukaDaftar(true);
  };

  const tutupSemuaModal = () => {
    setPelatihanTerpilih(null);
    setBukaDetail(false);
    setBukaDaftar(false);
  };

  return (
    // 🔹 Background mengikuti default layout (gradasi biru seperti di HeroSection)
    <main className="relative min-h-screen py-20 bg-gradient-to-b from-[#00143A] via-[#0A1B55] to-[#00143A] text-white transition-colors duration-500">
      <section className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6" data-aos="fade-down">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Pelatihan & Sertifikasi
            </h2>
            <p className="text-gray-200">
              Pilih bidang pelatihan yang sesuai untuk memperdalam keahlian digitalmu.
            </p>
          </div>

          <button
            onClick={() => setBukaKeranjang(true)}
            className="relative bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow transition"
          >
            <FaShoppingCart />
            Keranjang
            {keranjang.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {keranjang.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter */}
        <div ref={filterRef}>
          <CategoryFilter
            categories={kategori}
            selectedCategory={kategoriTerpilih}
            onSelect={setKategoriTerpilih}
          />
        </div>

        {/* Info jumlah */}
        <div className="relative flex justify-center items-center my-12" data-aos="fade-up">
          <div className="flex items-center w-fit px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
            <span className="text-blue-200 font-semibold text-md tracking-wide">
              {pelatihanTersaring.length} Pelatihan / Sertifikasi Tersedia
            </span>
          </div>
        </div>

        {/* Card Pelatihan */}
        <div className="mt-10 flex flex-col gap-6">
          {pelatihanTersaring.map((course) => (
            <CourseCardHorizontal
              key={course.id}
              course={course}
              onClick={() => bukaModalDetail(course)}
              onDaftar={bukaModalDaftar}
              onAddToCart={tambahKeKeranjang}
            />
          ))}
        </div>

        {/* Modal Detail */}
        <CourseDetailModal
          open={bukaDetail}
          course={pelatihanTerpilih}
          onClose={tutupSemuaModal}
        />

        {/* Modal Daftar */}
        <RegisterTrainingModal
          open={bukaDaftar}
          course={pelatihanTerpilih}
          onClose={tutupSemuaModal}
        />
      </section>

      {/* Modal Keranjang */}
      <CartModal
        keranjang={keranjang}
        onRemove={hapusDariKeranjang}
        onClose={() => setBukaKeranjang(false)}
        open={bukaKeranjang}
      />
    </main>
  );
}
