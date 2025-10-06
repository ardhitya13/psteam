"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Footer from "./components/Footer";
import ServicesSection from "./components/ServicesSection";
import TeamSection from "./components/TeamSection";
import ResearchSection from "./components/ResearchSection";
import PublicationSection from "./components/PublicationSection";
import ProjectSection from "./components/ProjectsSection";
import researchData from "./data/researchData";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/campus/logopsteam2.jpeg",
    "/campus/polibatam2.png",
    "/campus/crausel1.png",
    "/campus/polibatam1.mp4",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative h-[calc(100vh-120px)] flex items-center justify-center text-white overflow-hidden">
          {/* Background Slides */}
          <div className="absolute inset-0 z-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {slide.endsWith(".mp4") ? (
                  <video
                    src={slide}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
            ))}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Solusi Digital untuk{" "}
              <span className="text-blue-400 block">Masa Depan Bisnis Anda</span>
            </h1>
            <p className="text-xl mx-auto leading-relaxed">
              PSTeam menghadirkan inovasi dalam Web Development, IoT, Mobile Apps, dan Artificial Intelligence untuk mengakselerasi bisnis Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link
                href="#services"
                className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300 text-lg"
              >
                Jelajahi Layanan
              </Link>
              <Link
                href="#contact"
                className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition duration-300 text-lg border border-white"
              >
                Konsultasi Gratis
              </Link>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 bg-gray-50 text-center">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              PSTeam adalah tim pengembang digital dari Politeknik Negeri Batam
              yang berfokus pada riset, inovasi, dan pengembangan teknologi modern.
              Kami percaya teknologi dapat menjadi solusi masa depan.
            </p>
          </div>
        </section>

        {/* OTHER SECTIONS */}
        <TeamSection />
        <ResearchSection data={researchData} />
        <PublicationSection />
        <ProjectSection />
        <ServicesSection />

        {/* CTA SECTION */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-6">
              Siap Mengubah Ide Anda Menjadi Realitas Digital?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Mari berdiskusi tentang project Anda dan bagaimana kami dapat membantu mewujudkannya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition duration-300 text-lg"
              >
                Mulai Project
              </Link>
              <Link
                href="#service"
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 text-lg"
              >
                Lihat Layanan
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
