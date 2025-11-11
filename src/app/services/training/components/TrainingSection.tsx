"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "./CategoryFilter";
import CourseCardHorizontal, { Course } from "./CourseCardHorizontal";
import CourseDetailModal from "./CourseDetailModal";
import RegisterTrainingModal from "./RegisterTrainingModal";
import RegistrationGuideModal from "./RegistrationGuideModal";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TrainingSection() {
  const searchParams = useSearchParams();
  const filterRef = useRef<HTMLDivElement | null>(null);
  const categoryFromQuery = searchParams.get("category");

  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>("Semua");
  const [pelatihanTerpilih, setPelatihanTerpilih] = useState<Course | null>(null);
  const [bukaDetail, setBukaDetail] = useState(false);
  const [bukaDaftar, setBukaDaftar] = useState(false);
  const [bukaPanduan, setBukaPanduan] = useState(false);

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
        "📅 Jadwal Pelaksanaan: 10 Februari – 5 April 2025\n🕒 Durasi: 8 Minggu (Setiap Senin–Jumat, 19.00–21.00 WIB)\n📍 Lokasi: Online (Zoom)\n🎓 Sertifikat: Disediakan setelah kelulusan\n👨‍🏫 Instruktur: Tim Fullstack PSTeam\n\nBootcamp ini dirancang untuk membekali peserta dengan pemahaman mendalam mengenai pengembangan website dari sisi frontend dan backend.",
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
        "📅 Jadwal Pelaksanaan: 17 Maret – 10 Mei 2025\n🕒 Durasi: 7 Minggu (Selasa, Kamis, Sabtu)\n📍 Lokasi: Hybrid (Offline Batam + Online)",
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
        "📅 Jadwal Pelaksanaan: 1 April – 30 Mei 2025\n🕒 Durasi: 8 Minggu (Sabtu & Minggu)\n📍 Lokasi: Online (Google Meet)",
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
        "📅 Jadwal Pelaksanaan: 25 Maret – 20 Mei 2025\n🕒 Durasi: 8 Minggu (Weekend Hands-on)\n📍 Lokasi: PSTeam Lab Batam",
    },
  ];

  const pelatihanTersaring =
    kategoriTerpilih === "Semua"
      ? semuaPelatihan
      : semuaPelatihan.filter((c) => c.category === kategoriTerpilih);

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
    <main className="relative min-h-screen py-16 bg-gradient-to-b from-[#00143A] via-[#0A1B55] to-[#00143A] text-white">
      <section className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4" data-aos="fade-down">
          <div>
            <h2 className="text-3xl font-bold text-white">Pelatihan & Sertifikasi</h2>
            <p className="text-gray-200 text-sm sm:text-base">
              Pilih bidang pelatihan yang sesuai untuk memperdalam keahlian digitalmu.
            </p>
          </div>

          {/* Tombol Tata Cara */}
          <button
            onClick={() => setBukaPanduan(true)}
            className="bg-gradient-to-r from-blue-800 to-blue-500 text-white px-5 py-2.5 rounded-full 
            shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
            focus:outline-none select-none [background-size:200%_200%] bg-[position:0%_50%] hover:bg-[position:100%_50%]"
          >
            📋 Lihat Tata Cara Pendaftaran
          </button>
        </div>

        {/* Filter */}
        <div ref={filterRef} className="mt-4 mb-8">
          <CategoryFilter
            categories={kategori}
            selectedCategory={kategoriTerpilih}
            onSelect={setKategoriTerpilih}
          />
        </div>

        {/* Info jumlah */}
        <div className="relative flex justify-center items-center my-6" data-aos="fade-up">
          <div className="flex items-center w-fit px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
            <span className="text-blue-200 font-semibold text-sm sm:text-md tracking-wide">
              {pelatihanTersaring.length} Pelatihan / Sertifikasi Tersedia
            </span>
          </div>
        </div>

        {/* Card Pelatihan */}
        <div className="mt-8 flex flex-col gap-5">
          {pelatihanTersaring.map((course) => (
            <CourseCardHorizontal
              key={course.id}
              course={course}
              onClick={() => bukaModalDetail(course)}
              onDaftar={bukaModalDaftar}
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

        {/* Modal Tata Cara */}
        <RegistrationGuideModal
          open={bukaPanduan}
          onClose={() => setBukaPanduan(false)}
        />
      </section>
    </main>
  );
}
