"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function ResearchFuture() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section
      className="py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100 text-center relative overflow-hidden"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800 drop-shadow-sm">
          Arah Penelitian ke Depan
        </h2>
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed opacity-90">
          PSTEAM berfokus untuk memperluas penelitian di bidang komputasi berbasis cloud,
          kecerdasan buatan di edge (Edge AI), serta teknologi pendidikan cerdas —
          dengan tujuan menciptakan solusi digital yang inovatif dan berdampak bagi masa depan.
        </p>
      </div>
    </section>
  );
}
