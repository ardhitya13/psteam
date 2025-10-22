"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import { useLocale } from "@/app/context/LocaleContext";
import { useState, useEffect } from "react";

export type ResearchItem = {
  slug?: string;
  title: string;
  date?: string;
  summary?: string;
  content?: string;
  image?: string;
  pdf?: string;
};

export default function ResearchDetail({ project }: { project?: ResearchItem }) {
  const { locale } = useLocale(); // "id" atau "en"
  const [t, setT] = useState<any>({}); // state terjemahan

  // ✅ Load file JSON sesuai bahasa aktif
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(`@/app/locales/${locale}/research/researchdetail.json`);
        setT(module.default || module);
      } catch (err) {
        console.error("❌ Gagal memuat terjemahan ResearchDetail:", err);
      }
    };
    loadLocale();
  }, [locale]);

  // fallback kalau data riset kosong
  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f9fafb] text-gray-600">
        <p>{t?.noData || "⚠️ Data riset tidak ditemukan."}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] text-gray-800 flex flex-col">
      {/* ===== Navbar ===== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">
          {/* Logo + Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logopsteam4.png"
                alt="PSTEAM"
                width={36}
                height={36}
                className="rounded-md group-hover:scale-105 transition-transform"
              />
              <span className="hidden sm:inline font-semibold text-blue-700 text-lg group-hover:text-blue-800 transition">
                PSTEAM
              </span>
            </Link>
            <span className="text-gray-400 mx-2 hidden sm:block">|</span>
            <p className="text-sm text-gray-600 hidden sm:block">
              {t.research || "Riset"}
            </p>
          </div>

          {/* Tombol Kembali */}
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-blue-700 font-medium px-3 py-1.5 sm:px-4 sm:py-2 border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all"
          >
            <ArrowLeft size={16} />
            {t.back || "Kembali"}
          </Link>
        </div>
      </header>

      {/* ===== Konten utama ===== */}
      <section className="max-w-5xl mx-auto w-full bg-white rounded-xl shadow-md mt-6 sm:mt-10 mb-0 p-5 sm:p-8 md:p-10 pb-16 border border-gray-200 flex-grow">
        {/* Meta Data */}
        <div className="text-sm text-gray-500 mb-3 flex items-center gap-2">
          <Calendar size={15} className="text-blue-600" />
          <span>{project.date || t.defaultDate || "22 Oktober 2025"}</span>
        </div>

        {/* Judul */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-snug">
          {project.title}
        </h1>

        {/* Gambar */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] mb-8 rounded-md overflow-hidden">
          <Image
            src={project.image || "/research/default.jpg"}
            alt={project.title}
            fill
            priority
            className="object-cover rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-500"
            sizes="100vw"
          />
        </div>

        {/* ===== Isi Artikel ===== */}
        <article className="prose prose-base sm:prose-lg max-w-none text-gray-700 text-justify leading-relaxed">
          <p className="mb-5">
            {project.summary ||
              project.content ||
              t.noDescription ||
              "Deskripsi riset ini belum tersedia untuk saat ini."}
          </p>
        </article>

        {/* ===== PDF Viewer ===== */}
        {project.pdf ? (
          <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg shadow-inner overflow-hidden">
            <div className="bg-blue-100 text-blue-800 font-semibold px-5 py-3 border-b border-blue-200">
              {t.pdfTitle || "📄 Laporan Riset (PDF)"}
            </div>
            <div className="relative w-full h-[400px] sm:h-[600px] bg-gray-100 flex items-center justify-center">
              <iframe
                src={project.pdf}
                title={project.title}
                width="100%"
                height="100%"
                className="rounded-b-lg"
                onError={(e) => {
                  const target = e.target as HTMLIFrameElement;
                  target.style.display = "none";
                  const errorMsg = document.createElement("div");
                  errorMsg.textContent =
                    t.pdfError || "❌ File PDF tidak dapat dimuat atau tidak ditemukan.";
                  errorMsg.className =
                    "absolute inset-0 flex items-center justify-center text-gray-600 font-medium";
                  target.parentElement?.appendChild(errorMsg);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-600 italic">
              {t.noPdf || "Tidak ada file PDF yang tersedia untuk proyek ini."}
            </p>
          </div>
        )}

        {/* ===== Tombol Kembali ===== */}
        <div className="flex justify-center mt-14">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-6 py-2 sm:px-8 sm:py-3 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition-all"
          >
            <ArrowLeft size={18} /> {t.backToResearch || "Kembali ke Riset"}
          </Link>
        </div>
      </section>
    </main>
  );
}
