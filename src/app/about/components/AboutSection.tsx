"use client";

import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LocaleContext";

export default function AboutSection() {
  const { locale } = useLocale();
  const [t, setT] = useState<{ title?: string; paragraphs?: string[] }>({ paragraphs: [] });

  useEffect(() => {
    import(`../../locales/${locale}/about/aboutsection.json`)
      .then((res) => setT(res.default || res))
      .catch((err) => console.error("Gagal memuat terjemahan AboutSection:", err));
  }, [locale]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out", offset: 100 });
  }, []);

  return (
    <section id="about" className="bg-white text-gray-800 w-full overflow-hidden pt-10 sm:pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div data-aos="fade-right" className="flex justify-center order-2 md:order-1 group relative">
          <div className="relative w-full max-w-[480px] h-[280px] sm:h-[360px] md:h-[440px] rounded-2xl overflow-hidden shadow-xl transform transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-2xl">
            <Image
              src="/campus/polibatam2.png"
              alt={t.title || "Tentang PSTEAM"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>

        <div data-aos="fade-left" className="flex flex-col justify-center order-1 md:order-2 text-center md:text-left space-y-6">
          <h2 data-aos="zoom-in" data-aos-delay="150" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-700">
            {t.title || "Tentang PSTEAM"}
          </h2>
          {t.paragraphs?.map((para, i) => (
            <p key={i} data-aos="fade-up" data-aos-delay={200 + i * 100} className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
