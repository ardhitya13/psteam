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
    // ✅ Mengikuti background default layout
    <section className="relative overflow-hidden py-28 sm:py-32 md:py-36 text-center">
      {/* Overlay lembut biar nyatu sama layout */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1B55]/20 via-[#00143A]/10 to-transparent"></div>

      {/* Konten utama */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10">
        <h1
          data-aos="fade-up"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
        >
          Produk{" "}
          <span className="text-[#60A5FA] drop-shadow-[0_2px_10px_rgba(96,165,250,0.6)]">
            PSTEAM
          </span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-lg sm:text-xl text-gray-100 leading-relaxed mx-auto max-w-3xl"
        >
          Temukan proyek-proyek digital unggulan yang dikembangkan oleh tim{" "}
          <span className="text-[#60A5FA] font-semibold">PSTEAM</span>  menghadirkan inovasi
          di bidang teknologi Web, IoT, Mobile, dan AI.
        </p>
      </div>

      {/* Efek cahaya bawah */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-blue-400/10 blur-3xl opacity-40"></div>
    </section>
  );
}
