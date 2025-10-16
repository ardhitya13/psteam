"use client";

import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServicesSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden"
    >
      {/* Background efek blur */}
      <div className="absolute inset-0 bg-[url('/servicesfoto/services1.png')] bg-cover bg-center opacity-20 blur-sm -z-10"></div>

      <div className="max-w-4xl mx-auto text-center px-6" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-6">
          Siap Mengubah Ide Anda Menjadi Realitas Digital?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Kami menyediakan layanan pengembangan website, aplikasi, IoT, dan AI.
          Mulailah perjalanan digital Anda bersama kami hari ini.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Klik ini akan scroll ke #service-options di bawah */}
          <Link
            href="/services"
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition duration-300 text-lg"
          >
            Mulai Project
          </Link>
          <Link
            href="#projectsection"
            className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 text-lg"
          >
            Lihat Layanan
          </Link>
        </div>
      </div>
    </section>
  );
}
