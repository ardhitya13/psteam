"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaLaptopCode, FaMobileAlt, FaRobot, FaNetworkWired } from "react-icons/fa";

export default function ResearchFocus() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const focuses = [
    {
      icon: <FaLaptopCode />,
      title: "Pengembangan Web",
      desc: "Membangun aplikasi web yang skalabel dan mudah dikelola menggunakan framework modern seperti Next.js dan Laravel.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Aplikasi Mobile",
      desc: "Menciptakan pengalaman pengguna yang interaktif dan responsif melalui teknologi lintas platform seperti React Native dan Flutter.",
    },
    {
      icon: <FaRobot />,
      title: "Kecerdasan Buatan (AI)",
      desc: "Mengintegrasikan kecerdasan buatan ke dalam sistem perangkat lunak untuk menghadirkan fungsi yang lebih cerdas dan adaptif.",
    },
    {
      icon: <FaNetworkWired />,
      title: "Internet of Things (IoT)",
      desc: "Mengembangkan sistem yang saling terhubung untuk otomasi, pemantauan, serta pemrosesan data secara real-time.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-center">
      <h2
        className="text-3xl md:text-4xl font-bold text-blue-700 mb-10"
        data-aos="fade-up"
      >
        Fokus Penelitian
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {focuses.map((f, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition duration-300 border border-gray-100"
            data-aos="zoom-in"
            data-aos-delay={i * 150}
          >
            <div className="text-4xl text-blue-700 mb-4 flex justify-center">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {f.title}
            </h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
