"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroProjectsSection() {
  return (
    <section className="relative w-full bg-gray-100 flex justify-center items-center py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Background Image */}
        <div className="relative h-60 md:h-[20rem] w-full">
          <Image
            src="/projects/projects1.png"
            alt="PSTEAM Projects"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
              Proyek Digital Kami
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              Eksplorasi berbagai proyek inovatif dari PSTEAM — Web, Mobile, IoT, dan AI.
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white py-10 px-6 md:px-12 text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Kami berkomitmen menghadirkan solusi digital modern untuk mendukung
            kebutuhan industri, pendidikan, dan masyarakat. Setiap proyek kami
            dikembangkan dengan semangat inovasi dan kualitas terbaik oleh tim
            profesional <span className="font-semibold text-blue-600">PSTEAM</span>.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
