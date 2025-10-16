"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CollaborationSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-gray-700 order-2 md:order-1 space-y-4"
      >
        <h2 className="text-3xl font-bold text-[#1e376c]">Kolaborasi</h2>
        <p className="text-lg leading-relaxed">
          PSTEAM berkolaborasi dengan berbagai instansi, kampus, dan perusahaan
          teknologi dalam pengembangan produk digital, riset terapan, serta
          publikasi ilmiah di tingkat nasional dan internasional.
        </p>
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="h-64 md:h-96 w-full relative order-1 md:order-2 group"
      >
        <Image
          src="/publications/publications3.png"
          alt="Collaboration"
          fill
          className="object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
    </section>
  );
}
