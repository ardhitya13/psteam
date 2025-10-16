"use client";

import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServiceOptions() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="service-options"
      className="py-20 bg-gray-50 text-gray-800 text-center"
    >
      <div className="max-w-5xl mx-auto px-6" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-8">
          Pilih Cara Anda Memulai Bersama Kami
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Anda dapat memulai proyek baru dengan mengisi formulir atau mengikuti
          pelatihan bersama tim profesional kami.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Isi Formulir */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">📝 Isi Formulir Proyek</h3>
            <p className="text-gray-600 mb-6">
              Sampaikan ide Anda dan kami akan bantu wujudkan melalui diskusi dan penawaran terbaik.
            </p>
            <Link
              href="/form-proyek"
              className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Isi Formulir
            </Link>
          </div>

          {/* Card Mulai Pelatihan */}
          <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">🎓 Mulai Pelatihan</h3>
            <p className="text-gray-600 mb-6">
              Bergabung dalam program pelatihan profesional di bidang Web, Mobile, IoT, dan AI.
            </p>
            <Link
              href="/pelatihan"
              className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              Mulai Pelatihan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
