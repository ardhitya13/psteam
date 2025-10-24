"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocale } from "../../context/LocaleContext";

interface Translation {
  title?: string;
  description?: string;
}

export default function HeroSection() {
  const { locale } = useLocale();
  const [t, setT] = useState<Translation>({});

  // 🔁 Load JSON sesuai locale aktif
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

  // 🎞️ Inisialisasi animasi hanya untuk teks
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="relative bg-white py-28 sm:py-32 md:py-36 text-center overflow-hidden">
      {/* === Container Utama === */}
      <div className="max-w-3xl mx-auto px-6">
        {/* Judul */}
        <h1
          data-aos="fade-up"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 leading-tight"
        >
          {t.title || "Tim Pengembang"}{" "}
          <span className="text-blue-600">PSTEAM</span>
        </h1>

        {/* Deskripsi */}
        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mx-auto"
        >
          {t.description ||
            "Tim ini terdiri dari dosen pembimbing dan mahasiswa Teknik Informatika Politeknik Negeri Batam yang berkolaborasi dalam pengembangan berbagai proyek teknologi, penelitian, serta inovasi perangkat lunak modern."}
        </p>

        {/* Garis Dekoratif */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mt-10 w-20 sm:w-24 h-1 bg-blue-600 mx-auto rounded-full"
        ></div>
      </div>
    </section>
  );
}
