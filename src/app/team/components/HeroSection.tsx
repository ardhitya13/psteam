"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocale } from "../../context/LocaleContext"; // ✅ gunakan locale context

interface Translation {
  title?: string;
  description?: string;
}

export default function HeroSection() {
  const { locale } = useLocale(); // ambil locale aktif
  const [t, setT] = useState<Translation>({});

  // ✅ Load JSON terjemahan sesuai locale
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(`../../locales/${locale}/team/herosection.json`);
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan HeroSection:", err);
      }
    };
    loadLocale();
  }, [locale]);

  // Inisialisasi animasi AOS
  useEffect(() => {
    AOS.init({ duration: 1200, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section
      className="relative text-center overflow-hidden flex items-center justify-center h-[75vh] sm:h-[80vh] md:h-[90vh]"
      data-aos="fade-up"
    >
      {/* Background Tetap */}
      <div className="absolute inset-0 bg-[url('/team/crausel1.png')] bg-no-repeat bg-center bg-cover bg-fixed -z-20"></div>

      {/* Overlay gradasi */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-blue-100/60 to-blue-200/80 -z-10"></div>

      {/* Konten Utama */}
      <div className="max-w-3xl mx-auto px-6 z-10" data-aos="fade-up">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-blue-800 drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] leading-tight">
          {t.title || "Tim Pengembang"} <span className="text-blue-600">PSTEAM</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed opacity-95">
          {t.description ||
            "Tim ini terdiri dari dosen pembimbing dan mahasiswa Teknik Informatika Politeknik Negeri Batam yang berkolaborasi dalam pengembangan berbagai proyek teknologi, penelitian, serta inovasi perangkat lunak modern."}
        </p>

        {/* Garis dekoratif */}
        <div className="mt-8 w-20 sm:w-24 h-1 bg-blue-600 mx-auto rounded-full animate-pulse"></div>
      </div>
    </section>
  );
}
