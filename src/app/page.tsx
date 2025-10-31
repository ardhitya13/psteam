"use client";

import HeroSection from "./components/HeroSection";
import AboutSection from "./about/components/AboutSection";
import TeamSection from "./components/TeamSection";
import DosenCard from "./portfolio/components/DosenCard";
import ProjectList from "./products/components/ProjectList";
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

        {/* === Portofolio Dosen === */}
        <section className="">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            Portofolio{" "}
            <span className="text-[#60A5FA] font-extrabold drop-shadow-[0_2px_8px_rgba(96,165,250,0.6)]">
              Dosen
            </span>
          </h2>

          {/* 🔹 Tampilkan hanya 1 dosen (sesuai permintaanmu sebelumnya) */}
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

        {/* === Produk PSTEAM === */}
        <section className="relative py-20 px-6 text-center overflow-hidden">
          {/* ✨ Overlay lembut mengikuti background default */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1B55]/30 via-[#00143A]/15 to-transparent -z-10"></div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
              Produk{" "}
              <span className="text-[#60A5FA] font-extrabold drop-shadow-[0_2px_10px_rgba(96,165,250,0.6)]">
                PSTEAM
              </span>
            </h2>

            <p className="text-lg text-gray-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Kumpulan <span className="text-[#60A5FA] font-semibold">produk digital</span> hasil
              pengembangan tim{" "}
              <span className="text-[#60A5FA] font-semibold">Polibatam Software Team</span>.  
              Terdiri dari aplikasi web, mobile, hingga solusi berbasis IoT dan AI
              yang mendukung inovasi serta pengabdian di bidang teknologi dan pendidikan.
            </p>

            {/* === Daftar produk === */}
            <ProjectList />

            {/* Tombol Lihat Semua Produk */}
            <div className="flex justify-center mt-12">
              <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Lihat Semua Produk
              </Link>
            </div>
          </div>
        </section>

        <ServicesSection />
        <PatnersSection />
      </main>
    </div>
  );
}
