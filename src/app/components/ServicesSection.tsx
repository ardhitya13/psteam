"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocale } from "../context/LocaleContext"; // ✅ Import context

interface Translation {
  title?: string;
  description?: string;
  startProject?: string;
  viewServices?: string;
}

export default function ServicesSection() {
  const { locale } = useLocale(); // ✅ Ambil locale aktif dari context
  const [t, setT] = useState<Translation>({});

  // ✅ Load JSON sesuai bahasa
  useEffect(() => {
    const loadLocale = async () => {
      try {
        const module = await import(`../locales/${locale}/servicessection.json`);
        setT(module.default || module);
      } catch (err) {
        console.error("Gagal memuat terjemahan ServicesSection:", err);
      }
    };
    loadLocale();
  }, [locale]);

  // ✅ Inisialisasi animasi AOS
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
          {t.title || "Siap Mengubah Ide Anda Menjadi Realitas Digital?"}
        </h2>
        <p className="text-xl mb-8 opacity-90">
          {t.description ||
            "Kami menyediakan layanan pengembangan website, aplikasi, IoT, dan AI. Mulailah perjalanan digital Anda bersama kami hari ini."}
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition duration-300 text-lg"
          >
            {t.startProject || "Mulai Project"}
          </Link>
          <Link
            href="#projectsection"
            className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 text-lg"
          >
            {t.viewServices || "Lihat Layanan"}
          </Link>
        </div>
      </div>
    </section>
  );
}
