"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section
      className="relative bg-gradient-to-b from-white via-blue-50 to-blue-100 text-center overflow-hidden py-24"
      data-aos="fade-up"
    >
      {/* Gambar latar belakang tanpa blur */}
      <div className="absolute inset-0 bg-[url('/research/research1.png')] bg-cover bg-center opacity-15 -z-10"></div>

      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 drop-shadow-sm">
          Penelitian Kami
        </h1>
        <p className="text-lg md:text-xl text-black leading-relaxed opacity-90">
          PSTEAM berfokus pada penelitian terapan dan inovasi di bidang Web,
          Mobile, Kecerdasan Buatan (Artificial Intelligence), dan Internet of
          Things (IoT) — untuk mendukung transformasi digital melalui rekayasa
          perangkat lunak modern.
        </p>
      </div>
    </section>
  );
}
