"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ResearchPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="flex flex-col space-y-16 px-4 md:px-16 py-10">
      {/* Section 1 */}
      <section className="relative w-full">
        <div data-aos="fade-up" className="relative h-64 md:h-96 w-full">
          <Image
            src="/research/1.png" // ganti dengan path atau URL gambar
            alt="Data Mining"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <p data-aos="fade-up" className="mt-4 text-center text-gray-700">
          Data Mining adalah proses menemukan pola, tren, dan informasi
          penting dari dataset yang besar dan kompleks.
        </p>
      </section>

      {/* Section 2 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div data-aos="fade-right" className="h-64 md:h-96 w-full relative">
          <Image
            src="/research/2.png"
            alt="Streaming Data"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div data-aos="fade-left" className="text-gray-700">
          <h2 className="text-2xl font-bold mb-4">Streaming Data</h2>
          <p>
            Analisis data real-time dari aliran data besar (streaming data) untuk
            mendukung pengambilan keputusan cepat.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div data-aos="fade-right" className="text-gray-700 order-2 md:order-1">
          <h2 className="text-2xl font-bold mb-4">Performance & Quality</h2>
          <p>
            Fokus pada peningkatan kinerja sistem dan kualitas data untuk
            memastikan hasil analisis yang akurat dan efisien.
          </p>
        </div>
        <div data-aos="fade-left" className="h-64 md:h-96 w-full relative order-1 md:order-2">
          <Image
            src="/research/3.png"
            alt="Performance"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Section 4 */}
      <section className="relative w-full">
        <div data-aos="fade-up" className="relative h-64 md:h-96 w-full">
          <Image
            src="/research/4.png"
            alt="Big Data"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <p data-aos="fade-up" className="mt-4 text-center text-gray-700">
          Big Data dan Deep Learning memungkinkan analisis data yang besar dan
          kompleks dengan akurasi tinggi.
        </p>
      </section>
    </div>
  );
}
