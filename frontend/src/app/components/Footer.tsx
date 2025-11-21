"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
} from "react-icons/fa";

// 🧩 Load GoogleMap hanya di client agar tidak bikin hydration error
const GoogleMap = dynamic(() => import("./GoggleMaps"), { ssr: false });

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white w-full pt-20 pb-10 bg-gradient-to-b from-[#00143A]/95 via-[#0A1B55]/90 to-[#00143A]/95 border-t border-white/10 backdrop-blur-md shadow-inner relative overflow-hidden">
      {/* Efek background lembut */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(96,165,250,0.12),_transparent_65%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {/* 🏢 Kolom 1: Lokasi dan Logo */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-4 mb-3">
              <Image
                src="/logopsteam4.png"
                alt="PSTEAM Logo"
                width={190}
                height={190}
                className="object-contain drop-shadow-[0_0_10px_rgba(96,165,250,0.6)] hover:scale-105 transition-transform duration-300"
              />
            </div>

            <p className="text-white/90 text-[15px] leading-relaxed flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#60A5FA] mt-1 flex-shrink-0" />
              Gedung Mohamad Nasir Lt.12, Kompleks Politeknik Negeri Batam,
              Batam Centre, 29461 Indonesia.
            </p>

            {/* 🌍 Ganti iframe dengan GoogleMap dinamis */}
            <GoogleMap />

            {/* Kontak */}
            <div className="mt-4 space-y-2 text-[15px] sm:text-base leading-relaxed">
              <p>
                <strong className="text-[#60A5FA]">Telepon:</strong>{" "}
                <a
                  href="https://wa.me/6281364440803"
                  target="_blank"
                  className="hover:text-[#93C5FD] transition"
                >
                  +62 813-6444-0803
                </a>
              </p>
              <p>
                <strong className="text-[#60A5FA]">Email:</strong>{" "}
                <a
                  href="mailto:psteam@polibatam.ac.id"
                  className="hover:text-[#93C5FD] transition"
                >
                  psteam@polibatam.ac.id
                </a>
              </p>
            </div>
          </div>

          {/* 🔗 Kolom 2: Tautan Pengguna */}
          <div>
            <h2 className="text-2xl font-semibold mb-5 uppercase tracking-wider text-[#60A5FA] drop-shadow-sm">
              Tautan Pengguna
            </h2>
            <ul className="space-y-2 text-[15px] sm:text-lg text-white/90">
              {[
                { href: "/", label: "Beranda" },
                { href: "/about", label: "Tentang" },
                { href: "/team", label: "Tim" },
                { href: "/portfolio", label: "Portofolio" },
                { href: "/products", label: "Produk" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="hover:text-[#93C5FD] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              <li className="pt-5">
                <span className="font-semibold text-white text-lg">Layanan</span>
                <ul className="pl-4 mt-3 space-y-2 text-white/80 text-[15px] sm:text-base">
                  <li>
                    <Link
                      href="/services/pengajuan"
                      className="hover:text-[#93C5FD] hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      Pengajuan Proyek
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/pelatihan"
                      className="hover:text-[#93C5FD] hover:translate-x-1 inline-block transition-all duration-300"
                    >
                      Pelatihan & Sertifikasi
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* 🏫 Kolom 3: Instansi */}
          <div>
            <h2 className="text-2xl font-semibold mb-5 uppercase tracking-wider text-[#60A5FA] drop-shadow-sm">
              Instansi
            </h2>
            <ul className="space-y-2 text-[15px] sm:text-lg text-white/90">
              <li>
                <a
                  href="https://www.polibatam.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#93C5FD] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Politeknik Negeri Batam
                </a>
              </li>
              <li>
                <a
                  href="https://if.polibatam.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#93C5FD] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Jurusan Teknik Informatika
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#93C5FD] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Program Studi Teknik Informatika
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#93C5FD] hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Program Studi Rekayasa Perangkat Lunak
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Garis pembatas */}
        <div className="border-t border-white/20"></div>

        {/* Bawah Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4 text-white/80">
          <span className="text-sm sm:text-base text-center sm:text-left font-medium tracking-wide">
            © {currentYear}{" "}
            <span className="text-[#93C5FD] font-semibold">
              Polibatam Software Team
            </span>{" "}
            — Hak Cipta Dilindungi.
          </span>

          <div className="flex gap-5">
            {[
              {
                href: "https://wa.me/6281364440803",
                icon: <FaWhatsapp size={22} />,
              },
              {
                href: "https://www.youtube.com/@polibatamsoftwareteam6325",
                icon: <FaYoutube size={22} />,
              },
              {
                href: "https://www.instagram.com/psteam.polibatam/",
                icon: <FaInstagram size={22} />,
              },
              {
                href: "https://www.facebook.com/people/Polibatam-Software-Team/100076205555012/",
                icon: <FaFacebookF size={22} />,
              },
              {
                href: "https://www.linkedin.com/company/polibatam-software-team",
                icon: <FaLinkedinIn size={22} />,
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 hover:text-[#93C5FD] transition-all duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
