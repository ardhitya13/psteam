"use client";

import HeroSection from "./components/HeroSection";
import AboutSection from "./about/components/AboutSection";
import TeamSection from "./components/TeamSection";
import DosenCard from "./portfolio/components/DosenCard";
import ServicesSection from "./components/ServicesSection";
import PatnersSection from "./components/PatnersSection";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <TeamSection />

        {/* === Publikasi Dosen === */}
        <section className="bg-[#f8faff] py-20">
          <h2 className="text-4xl font-bold text-center mb-8 text-blue-800">
            Profil Dosen & Publikasi
          </h2>
          {/* 🔹 Tampilkan hanya 2 dosen */}
          <DosenCard limit={1} />

          {/* 🔹 Tombol lihat semua */}
          <div className="flex justify-center mt-10">
            <Link
              href="/portfolio"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Lihat Semua Dosen
            </Link>
          </div>
        </section>

        <ServicesSection />
        <PatnersSection />
      </main>
    </div>
  );
}
