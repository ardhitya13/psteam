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
    <section className="relative py-28 sm:py-32 md:py-36 text-center overflow-hidden">
      {/* 🚫 Hapus overlay agar background layout terlihat */}

      {/* 🧾 Konten utama */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10">
        {/* 🔹 Judul utama */}
        <h1
          data-aos="fade-up"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        >
          Portofolio{" "}
          <span className="text-[#60A5FA] drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]">
            Dosen PSTeam
          </span>
        </h1>

        {/* 🔹 Deskripsi */}
        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-lg sm:text-xl text-gray-100 leading-relaxed mx-auto max-w-4xl"
        >
          Kumpulan karya, penelitian, publikasi, serta kontribusi para dosen{" "}
          <span className="font-semibold text-[#60A5FA]">
            Politeknik Negeri Batam
          </span>{" "}
          yang tergabung dalam tim{" "}
          <span className="text-[#60A5FA] font-bold drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]">
            PSTeam
          </span>
          . Mereka berperan aktif dalam mengembangkan inovasi dan teknologi
          yang bermanfaat bagi dunia pendidikan dan masyarakat.
        </p>
      </div>
    </section>
  );
}
