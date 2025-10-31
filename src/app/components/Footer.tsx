"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarkerAlt,
} from "react-icons/fa";

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

            {/* 🌍 Google Maps Embed Langsung Mode Satelit */}
            <div className="w-full h-[240px] mt-3 rounded-2xl overflow-hidden border border-white/25 shadow-[0_0_25px_rgba(96,165,250,0.2)] hover:shadow-[0_0_40px_rgba(96,165,250,0.3)] transition-all duration-500">
              <iframe
                title="Lokasi Tower A Polibatam (Satelit)"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.371633613185!2d104.0475928!3d1.118553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d989a71199d92d%3A0x23efd5fc785fd9dd!2sTower%20A%20Politeknik%20Negeri%20Batam!5e0!3m2!1sid!2sid!4v1730330400000!5m2!1sid!2sid&t=k"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl w-full h-full"
              ></iframe>
            </div>

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
