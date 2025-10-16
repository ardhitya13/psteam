"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ResearchSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10">
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="h-64 md:h-96 w-full relative group"
      >
        <Image
          src="/publications/publications2.png"
          alt="Project Development"
          fill
          className="object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>

      <motion.div
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-gray-700 space-y-4"
      >
        <h2 className="text-3xl font-bold text-[#1e376c]">
          Riset dan Pengembangan
        </h2>
        <p className="text-lg leading-relaxed">
          Tim PSTEAM secara aktif melakukan penelitian di bidang{" "}
          <strong>software engineering</strong>, <strong>UI/UX</strong>,{" "}
          <strong>machine learning</strong>, dan{" "}
          <strong>pengembangan sistem informasi</strong> yang berorientasi pada
          kebutuhan industri dan masyarakat.
        </p>
      </motion.div>
    </section>
  );
}
