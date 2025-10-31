"use client";

import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AboutSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  // ✅ Fungsi untuk menebalkan dan memberi warna biru muda pada kata “PSTeam”
  const highlightPSTEAM = (text: string) => {
    return text.replace(
      /(PSTeam|PSTEAM|Psteam)/gi,
      `<strong class="text-[#60A5FA] font-bold">$1</strong>` // biru muda agar kontras di bg gelap
    );
  };

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden pt-10 sm:pt-12 md:pt-16 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* ==== Gambar Kampus ==== */}
        <div
          data-aos="fade-right"
          className="flex justify-center order-2 md:order-1 group relative"
        >
          <div className="relative w-full max-w-[480px] h-[280px] sm:h-[360px] md:h-[440px] rounded-2xl overflow-hidden shadow-xl transform transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-2xl">
            <Image
              src="/about/about1.png"
              alt="Tentang PSTeam"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
            {/* Efek hover gelap halus */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>

        {/* ==== Teks Deskripsi ==== */}
        <div
          data-aos="fade-left"
          className="flex flex-col justify-center order-1 md:order-2 text-center md:text-left space-y-6"
        >
          {/* ✅ Judul dua warna */}
          <h2
            data-aos="zoom-in"
            data-aos-delay="150"
            className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md"
          >
            <span className="text-white">Tentang </span>
            <span className="text-[#60A5FA]">PSTeam</span>
          </h2>

          {/* ✅ Paragraf dengan highlight otomatis */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-base sm:text-lg text-gray-100 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: highlightPSTEAM(
                "PSTeam adalah tim pengembang digital dari Politeknik Negeri Batam yang berfokus pada inovasi teknologi modern. Kami menyediakan solusi di bidang Web, IoT, Mobile Apps, dan Artificial Intelligence (AI) untuk membantu individu, startup, dan perusahaan mewujudkan ide menjadi produk digital yang berdampak nyata."
              ),
            }}
          />
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-base sm:text-lg text-gray-100 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: highlightPSTEAM(
                "Kami percaya bahwa kolaborasi dan teknologi yang tepat dapat mempercepat transformasi digital, meningkatkan efisiensi, dan memberikan nilai tambah bagi pengguna serta masyarakat luas."
              ),
            }}
          />
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-base sm:text-lg text-gray-100 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: highlightPSTEAM(
                "Dengan pendekatan modern dan berkelanjutan, PSTeam berkomitmen menghadirkan karya berkualitas tinggi, inovatif, dan mudah digunakan agar teknologi dapat mempermudah kehidupan manusia."
              ),
            }}
          />
          <p
            data-aos="fade-up"
            data-aos-delay="500"
            className="text-base sm:text-lg text-gray-100 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: highlightPSTEAM(
                "Tim kami selalu berusaha untuk terus belajar, beradaptasi dengan perkembangan teknologi terbaru, serta memastikan setiap solusi yang kami buat relevan, aman, dan memberikan manfaat nyata bagi pengguna."
              ),
            }}
          />
        </div>
      </div>
    </section>
  );
}
