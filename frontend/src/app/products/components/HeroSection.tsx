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
    // ✅ Full width, tanpa overlay tambahan
    <section className="w-full py-28 sm:py-32 md:py-36 text-center">
      {/* Konten utama */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* Judul */}
        <h1
          data-aos="fade-up"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
        >
          Produk{" "}
          <span className="text-[#60A5FA] font-extrabold drop-shadow-[0_2px_10px_rgba(96,165,250,0.6)]">
            PSTEAM
          </span>
        </h1>

        {/* Deskripsi */}
        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-lg sm:text-xl text-gray-100 leading-relaxed mx-auto max-w-4xl"
        >
          Kumpulan{" "}
          <span className="text-[#60A5FA] font-semibold">produk digital</span>{" "}
          hasil pengembangan tim{" "}
          <span className="text-[#60A5FA] font-semibold">
            Polibatam Software Team
          </span>
          . Terdiri dari aplikasi web, mobile, hingga solusi berbasis{" "}
          <span className="text-[#60A5FA] font-semibold">IoT</span> dan{" "}
          <span className="text-[#60A5FA] font-semibold">AI</span> yang
          mendukung inovasi serta pengabdian di bidang teknologi dan pendidikan.
        </p>
      </div>

      {/* Cahaya lembut di bawah */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-blue-400/10 blur-3xl opacity-40 pointer-events-none"></div>
    </section>
  );
}
