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
      className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
    >
      {/* Background dekoratif opsional */}
      <div className="absolute inset-0 bg-[url('/pattern-bg.svg')] opacity-5 bg-center bg-cover -z-10"></div>

      <div className="text-center mb-12">
        <h2
          data-aos="fade-down"
          className="text-4xl font-bold text-blue-800 drop-shadow-md"
        >
          Mitra & Kolaborator Kami
        </h2>
        <p
          data-aos="fade-down"
          data-aos-delay="150"
          className="text-gray-600 mt-3 text-lg"
        >
          Kami berkolaborasi dengan institusi dan perusahaan terkemuka.
        </p>
      </div>

      {/* Grid partner */}
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 lg:gap-24 max-w-7xl mx-auto px-6">
        {partners.map((partner, i) => (
          <div
            key={i}
            data-aos={partner.aos}
            data-aos-delay={i * 200}
            className="relative hover:scale-110 transition-transform duration-500 ease-out"
            style={{
              width: "clamp(140px, 18vw, 220px)",
              height: "clamp(70px, 10vw, 130px)",
            }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
