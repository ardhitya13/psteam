"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Tentang PSTeam</h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            PSTeam adalah tim pengembang teknologi dari Politeknik Negeri Batam yang berfokus pada pengembangan solusi digital modern — 
            mulai dari website, sistem IoT, hingga kecerdasan buatan.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Kami berkomitmen untuk memberikan layanan profesional, inovatif, dan efisien dalam setiap proyek yang kami tangani.
          </p>
        </div>

        <div className="relative h-[400px]">
          <Image
            src="/campus/polibatam2.png"
            alt="About PSTeam"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
