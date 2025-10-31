"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    // ✅ Tidak ada background khusus, hanya overlay lembut transparan
    <section className="relative overflow-hidden py-28 sm:py-32 md:py-36 text-center">
      {/* 🔹 Overlay lembut untuk efek dalam tapi tetap transparan */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1B55]/20 via-[#00143A]/10 to-transparent"></div>

      {/* === Konten Utama === */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
        {/* 🔹 Judul (warna tetap) */}
        <h1
          data-aos="fade-up"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        >
          Tim Pengembang{" "}
          <span className="text-[#60A5FA] font-extrabold drop-shadow-[0_2px_8px_rgba(96,165,250,0.6)]">
            PSTeam
          </span>
        </h1>

        {/* 🔹 Deskripsi (melebar, warna tetap) */}
        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed mx-auto max-w-5xl"
        >
          Tim ini terdiri dari{" "}
          <span className="text-[#60A5FA] font-semibold">
            dosen pembimbing dan mahasiswa Teknik Informatika
          </span>{" "}
          Politeknik Negeri Batam yang berkolaborasi dalam pengembangan berbagai
          proyek teknologi, penelitian, serta inovasi perangkat lunak modern
          yang mendukung perkembangan dunia digital dan pendidikan.
        </p>
      </div>

      {/* 🔹 Efek cahaya bawah lembut biar dinamis tapi nyatu */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-400/10 blur-3xl opacity-50"></div>
    </section>
  );
}
