"use client";

import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function PartnerSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const partners = [
    { name: "Politeknik Negeri Batam", logo: "/partners/partners1.png" },
    { name: "Psteam", logo: "/partners/partners2.png" },
    { name: "PT Sumitomo", logo: "/partners/partners3.png" },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-b from-blue-50 to-white"
      data-aos="fade-up"
    >
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 lg:gap-24 max-w-7xl mx-auto px-6">
        {partners.map((partner, i) => (
          <div
            key={i}
            className="relative hover:scale-110 transition-transform duration-300"
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
