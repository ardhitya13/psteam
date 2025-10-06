"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import PublicationSection from "../components/PublicationSection"; // pastikan path sesuai

export default function PublicationPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="flex flex-col space-y-20 px-4 md:px-16 py-10 bg-gray-50">
      {/* === SECTION 1 === */}
      <section className="relative w-full">
        <div data-aos="fade-up" className="relative h-64 md:h-96 w-full">
          <Image
            src="https://images.unsplash.com/photo-1534759846116-5792a21b63f0?auto=format&fit=crop&w=1200&q=80"
            alt="Data Mining"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
        <p
          data-aos="fade-up"
          className="mt-4 text-center text-gray-700 text-lg max-w-3xl mx-auto"
        >
          <strong>Data Mining</strong> adalah proses menemukan pola, tren, dan
          informasi penting dari dataset besar dan kompleks, membantu pengambilan
          keputusan berbasis data.
        </p>
      </section>

      {/* === SECTION 2 === */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div data-aos="fade-right" className="h-64 md:h-96 w-full relative">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
            alt="Streaming Data"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
        <div data-aos="fade-left" className="text-gray-700">
          <h2 className="text-3xl font-bold mb-4 text-[#1e376c]">
            Streaming Data
          </h2>
          <p className="text-lg">
            Analisis data real-time dari aliran data besar (streaming data)
            memungkinkan organisasi merespons perubahan dengan cepat, meningkatkan
            efisiensi operasional dan akurasi keputusan.
          </p>
        </div>
      </section>

      {/* === SECTION 3 === */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div
          data-aos="fade-right"
          className="text-gray-700 order-2 md:order-1 space-y-4"
        >
          <h2 className="text-3xl font-bold text-[#1e376c]">
            Performance & Quality
          </h2>
          <p className="text-lg">
            Fokus utama penelitian ini adalah peningkatan performa dan kualitas
            sistem agar data dapat diolah secara cepat, efisien, dan akurat untuk
            mendukung pengambilan keputusan berbasis analitik.
          </p>
        </div>
        <div
          data-aos="fade-left"
          className="h-64 md:h-96 w-full relative order-1 md:order-2"
        >
          <Image
            src="https://images.unsplash.com/photo-1614064641938-3bbee52942e5?auto=format&fit=crop&w=1200&q=80"
            alt="Performance and Quality"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* === SECTION 4 === */}
      <section className="relative w-full">
        <div data-aos="fade-up" className="relative h-64 md:h-96 w-full">
          <Image
            src="https://images.unsplash.com/photo-1620289269941-5f1de3f6c356?auto=format&fit=crop&w=1200&q=80"
            alt="Big Data"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
        <p
          data-aos="fade-up"
          className="mt-4 text-center text-gray-700 text-lg max-w-3xl mx-auto"
        >
          <strong>Big Data</strong> dan <strong>Deep Learning</strong> menjadi
          fondasi utama untuk memahami pola kompleks dan menghasilkan prediksi
          dengan akurasi tinggi dalam berbagai sektor industri.
        </p>
      </section>

      {/* === SECTION 5: PUBLIKASI === */}
      <div data-aos="fade-up" className="mt-10">
        <PublicationSection />
      </div>
    </div>
  );
}
