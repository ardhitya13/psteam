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
      {/* ⛔️ Gak ada background apapun, full ikut layout */}
      <main className="flex-grow text-white">
        {/* === Hero === */}
        <HeroSection />

        {/* === Tentang & Tim === */}
        <AboutSection />
        <TeamSection />

        {/* === Portofolio Dosen === */}
        <section className="py-20 px-6">
          <h2 className="text-4xl font-bold text-center mb-8">
            Portofolio{" "}
            <span className="text-[#60A5FA] font-extrabold drop-shadow-[0_2px_8px_rgba(96,165,250,0.6)]">
              Dosen
            </span>
          </h2>

          {/* 🔹 Tampilkan hanya 1 dosen */}
          <DosenCard limit={1} />

          {/* 🔹 Tombol lihat semua */}
          <div className="flex justify-center mt-10">
            <Link
              href="/portfolio"
              className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Lihat Semua Dosen
            </Link>
          </div>
        </section>

        {/* === Produk PSTEAM === */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Produk{" "}
              <span className="text-[#60A5FA] font-extrabold drop-shadow-[0_2px_10px_rgba(96,165,250,0.6)]">
                PSTEAM
              </span>
            </h2>

            <p className="text-lg text-gray-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Kumpulan{" "}
              <span className="text-[#60A5FA] font-semibold">produk digital</span>{" "}
              hasil pengembangan tim{" "}
              <span className="text-[#60A5FA] font-semibold">
                Polibatam Software Team
              </span>
              . Terdiri dari aplikasi web, mobile, hingga solusi berbasis IoT dan
              AI yang mendukung inovasi serta pengabdian di bidang teknologi dan
              pendidikan.
            </p>

            {/* === Daftar produk (6 item saja di Home) === */}
            <ProjectList initialShow={6} />

            {/* Tombol Lihat Semua Produk */}
            <div className="flex justify-center mt-12">
              <Link
                href="/products"
                className="inline-block bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Lihat Semua Produk
              </Link>
            </div>
          </div>
        </section>

        {/* === Layanan & Partner === */}
        <ServicesSection />
        <PatnersSection />
      </main>
    </div>
  );
}
