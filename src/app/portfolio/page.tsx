"use client";

import HeroSection from "./components/HeroSection";
import DosenCard from "./components/DosenCard";

export default function PortfolioPage() {
  return (
    <>
      {/* 🟦 Hero Section */}
      <HeroSection />

      {/* 🧾 Daftar Portofolio Dosen */}
      <DosenCard />
    </>
  );
}
