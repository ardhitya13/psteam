"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "./CategoryFilter";
import CourseCardHorizontal, { Course } from "./CourseCardHorizontal";
import CourseDetailModal from "./CourseDetailModal";
import RegisterTrainingModal from "./RegisterTrainingModal";
import RegistrationGuideModal from "./RegistrationGuideModal";
import { getAllTraining } from "../../../../lib/apiTraining";

import AOS from "aos";
import "aos/dist/aos.css";

// NORMALIZE CATEGORY BACKEND -> UI
function normalizeCategory(c: string): string {
  const key = (c || "").toLowerCase();

  if (key.includes("web")) return "Web Development";
  if (key.includes("mobile")) return "Mobile Development";
  if (key.includes("iot")) return "Internet of Things (IoT)";
  if (key.includes("ai")) return "Artificial Intelligence";

  return "Umum";
}

// PARSE JSON FIELD FROM DATABASE
function safeJSON(input: any, fallback: any) {
  if (!input) return fallback;

  if (Array.isArray(input)) return input;

  try {
    return JSON.parse(input);
  } catch (e) {
    console.warn("JSON PARSE FAILED:", input);
    return fallback;
  }
}

export default function TrainingSection() {
  const searchParams = useSearchParams();
  const filterRef = useRef<HTMLDivElement | null>(null);

  const categoryFromQuery = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedTraining, setSelectedTraining] = useState<Course | null>(null);

  const [openDetail, setOpenDetail] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);

  const [trainings, setTrainings] = useState<Course[]>([]);

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true });
  }, []);

  // FETCH TRAINING + FIX JSON PARSE
  useEffect(() => {
    (async () => {
      try {
        const raw = await getAllTraining();

        const normalized: Course[] = (raw || []).map((t: any) => ({
          id: t.id,
          title: t.title,
          category: normalizeCategory(t.type),
          excerpt: t.shortDescription ?? t.excerpt ?? "",
          price: Number(t.price || 0),

          img: t.thumbnail
            ? "http://localhost:4000" + t.thumbnail
            : "/default-thumb.png",

          description: t.description ?? "",

          // FIX — JSON PARSE PROPERLY
          costDetails: safeJSON(t.costDetails, []),
          requirements: safeJSON(t.requirements, []),
          schedule: safeJSON(t.schedule, []),
          rundown: safeJSON(t.rundown, []),

          organizer: t.organizer ?? "",
          duration: t.duration ?? "",
          location: t.location ?? "",
          certificate: t.certificate ?? "",
          instructor: t.instructor ?? "",
        }));

        setTrainings(normalized);
      } catch (err) {
        console.error("Failed load training:", err);
      }
    })();
  }, []);

  // QUERY CATEGORY
  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);

      setTimeout(() => {
        filterRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    } else {
      setSelectedCategory("Semua");
    }
  }, [categoryFromQuery]);

  const kategori = [
    "Semua",
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "Internet of Things (IoT)",
  ];

  // FILTER CATEGORY
  const filteredTraining =
    selectedCategory === "Semua"
      ? trainings
      : trainings.filter((c) => c.category === selectedCategory);

  // MODAL HANDLER
  const openDetailModal = (course: Course) => {
    setSelectedTraining(course);
    setOpenDetail(true);
  };

  const openRegisterModal = (course: Course) => {
    setSelectedTraining(course);
    setOpenRegister(true);
  };

  const closeAllModals = () => {
    setSelectedTraining(null);
    setOpenDetail(false);
    setOpenRegister(false);
  };

  return (
    <main className="relative min-h-screen py-16 bg-transparent text-white">
      <section className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold">Pelatihan & Sertifikasi</h2>
            <p className="text-white text-sm sm:text-base">
              Pilih bidang pelatihan yang sesuai untuk memperdalam keahlian digitalmu.
            </p>
          </div>

          <button
            onClick={() => setOpenGuide(true)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-md hover:bg-blue-700 transition-all"
          >
            📋 Lihat Tata Cara Pendaftaran
          </button>
        </div>

        {/* FILTER */}
        <div ref={filterRef} className="mt-4 mb-8">
          <CategoryFilter
            categories={kategori}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* JUMLAH */}
        <div className="flex justify-center my-6">
          <div className="px-6 py-2 bg-gray-100 rounded-full border shadow-sm">
            <span className="text-gray-700 font-semibold">
              {filteredTraining.length} Pelatihan / Sertifikasi Tersedia
            </span>
          </div>
        </div>

        {/* LIST TRAINING */}
        <div className="mt-8 flex flex-col gap-5">
          {filteredTraining.map((course) => (
            <CourseCardHorizontal
              key={course.id}
              course={course}
              onClick={() => openDetailModal(course)}
              onDaftar={openRegisterModal}
            />
          ))}
        </div>

        {/* MODALS */}
        <CourseDetailModal
          open={openDetail}
          course={selectedTraining}
          onClose={closeAllModals}
        />

        <RegisterTrainingModal
          open={openRegister}
          course={selectedTraining}
          onClose={closeAllModals}
        />

        <RegistrationGuideModal
          open={openGuide}
          onClose={() => setOpenGuide(false)}
        />
      </section>
    </main>
  );
}
