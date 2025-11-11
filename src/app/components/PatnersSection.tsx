"use client";

import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function PartnerSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  const partners = [
    { name: "Politeknik Negeri Batam", logo: "/partners/partners1.png", aos: "fade-right" },
    { name: "PSTEAM", logo: "/partners/partners2.png", aos: "fade-up" },
    { name: "PT Sumitomo", logo: "/partners/partners3.png", aos: "fade-left" },
  ];

  return (
    <section
      id="partners"
      // ✅ Transparan biar ikut background dari layout
      className="relative py-24 sm:py-28 md:py-32 text-center bg-transparent overflow-hidden"
    >
      {/* ✅ Kontainer utama */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
        {/* 🔹 Judul */}
        <h2
          data-aos="fade-up"
          className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.5)]"
        >
          Mitra &{" "}
          <span className="text-[#60A5FA] font-extrabold drop-shadow-[0_2px_8px_rgba(96,165,250,0.6)]">
            Kolaborator Kami
          </span>
        </h2>

        {/* 🔹 Deskripsi */}
        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-lg sm:text-xl text-gray-100 leading-relaxed mx-auto max-w-4xl mb-16"
        >
          Kami bekerja sama dengan{" "}
          <span className="text-[#60A5FA] font-semibold">
            institusi pendidikan dan mitra industri
          </span>{" "}
          untuk membangun kolaborasi strategis yang mendorong inovasi, riset, 
          serta pengembangan teknologi berkelanjutan.
        </p>

        {/* 🔹 Daftar logo partner */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 lg:gap-24">
          {partners.map((partner, i) => (
            <div
              key={i}
              data-aos={partner.aos}
              data-aos-delay={i * 200}
              className="flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-500 ease-out"
              style={{
                width: "clamp(160px, 20vw, 240px)",
                height: "clamp(90px, 12vw, 150px)",
              }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={100}
                className="object-contain max-w-[80%] max-h-[80%] transition-transform duration-500 ease-out hover:scale-105"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
