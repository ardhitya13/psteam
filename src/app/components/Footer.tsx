"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1e376c] text-white w-full pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
        {/* 🔹 Bagian atas: 3 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* === Kolom 1: Info Umum === */}
          <div className="flex flex-col items-start">
            <Image
              src="/logopsteam4.png"
              alt="PSTEAM Logo"
              width={110}
              height={110}
              className="object-contain mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">
              Polibatam Software Team
            </h2>
            <p className="text-white/90 text-sm leading-relaxed">
              Gedung Mohamad Nasir Lt.12, Kompleks Politeknik Negeri Batam,
              Batam Centre, 29461 Indonesia
            </p>
            <p className="mt-3 text-white/90 text-sm">
              <strong>Telepon:</strong> +62 813-6444-0803 <br />
              <strong>Email:</strong> psteam@polibatam.ac.id
            </p>
          </div>

          {/* === Kolom 2: Tautan Berguna === */}
          <div>
            <h2 className="text-xl font-semibold mb-4 uppercase">
              Tautan Berguna
            </h2>
            <ul className="space-y-2 text-white/90">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  Tentang
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition">
                  Tim
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-white transition">
                  Riset
                </Link>
              </li>
              <li>
                <Link
                  href="/publications"
                  className="hover:text-white transition"
                >
                  Publikasi
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition">
                  Proyek
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Layanan
                </Link>
              </li>
            </ul>
          </div>

          {/* === Kolom 3: Instansi === */}
          <div>
            <h2 className="text-xl font-semibold mb-4 uppercase">Instansi</h2>
            <ul className="space-y-2 text-white/90">
              <li>
                <a
                  href="https://www.polibatam.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Politeknik Negeri Batam
                </a>
              </li>
              <li>
                <a
                  href="https://if.polibatam.ac.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Jurusan Teknik Informatika
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Program Studi Teknik Informatika
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Program Studi Rekayasa Perangkat Lunak
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 🔹 Garis Pemisah */}
        <div className="border-t border-white/30"></div>

        {/* 🔹 Bagian bawah: hak cipta + sosial media */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <span className="text-sm text-white/90 text-center sm:text-left">
            © {currentYear} Polibatam Software Team — Hak Cipta Dilindungi.
          </span>

          <div className="flex gap-5">
            <a
              href="https://api.whatsapp.com/send/?phone=6281364440803&text=Halo+PSTEAM&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaWhatsapp size={22} />
            </a>
            <a
              href="https://www.youtube.com/@polibatamsoftwareteam6325"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaYoutube size={22} />
            </a>
            <a
              href="https://www.instagram.com/psteam.polibatam/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="https://www.facebook.com/people/Polibatam-Software-Team/100076205555012/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebookF size={22} />
            </a>
            <a
              href="https://www.linkedin.com/company/polibatam-software-team"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaLinkedinIn size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
