"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FaGlobe,
  FaMobileAlt,
  FaRobot,
  FaMicrochip,
  FaLayerGroup,
} from "react-icons/fa";

export default function NavBar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  // Efek muncul/hilang saat scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < lastScrollY) setHidden(false);
      else if (currentY > lastScrollY && currentY > 100 && !menuOpen)
        setHidden(true);

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen]);

  const handleSelectCategory = (category: string) => {
    if (category === "Semua Pelatihan & Sertifikasi") {
      router.push("/services/pelatihan");
    } else {
      router.push(
        `/services/pelatihan?category=${encodeURIComponent(category)}`
      );
    }
    setServiceOpen(false);
    setMenuOpen(false);
  };

  const categories = [
    { icon: <FaLayerGroup size={32} />, title: "Semua Pelatihan & Sertifikasi" },
    { icon: <FaGlobe size={32} />, title: "Web Development" },
    { icon: <FaMobileAlt size={32} />, title: "Mobile Development" },
    { icon: <FaMicrochip size={32} />, title: "Internet of Things (IoT)" },
    { icon: <FaRobot size={32} />, title: "Artificial Intelligence" },
  ];

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/about" },
    { name: "Tim", path: "/team" },
    { name: "Portofolio", path: "/portfolio" },
    { name: "Produk", path: "/products" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b border-gray-200 shadow-md backdrop-blur-md bg-white/90
      transition-all duration-500 ease-in-out ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 font-inter">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/logopsteam4.png"
            alt="PSTeam Logo"
            width={90}
            height={80}
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Tombol Login + Hamburger */}
        <div className="flex items-center space-x-4 md:order-2">
          <Link
            href="/login"
            className="hidden md:block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white 
            px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm hover:shadow-lg focus:ring-2 focus:ring-blue-300"
          >
            Masuk
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center justify-center p-2 w-12 h-12 text-2xl text-gray-800 rounded-lg md:hidden hover:bg-gray-100 transition-all duration-200"
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Menu Utama */}
        <div
          className={`w-full md:flex md:w-auto md:order-1 transition-all duration-300 ${
            menuOpen
              ? "block bg-white shadow-lg rounded-xl mt-3 py-3 border border-gray-200"
              : "hidden md:block"
          }`}
        >
          <ul
            className="flex flex-col p-4 mt-2 font-semibold text-[17px] 
            md:flex-row md:space-x-10 md:mt-0 md:p-0 space-y-2 md:space-y-0 items-center"
          >
            {/* Item biasa */}
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`inline-block py-2 px-3 rounded-lg transition-colors duration-200 align-middle ${
                    pathname === item.path
                      ? "text-blue-600 bg-blue-50 md:bg-transparent font-semibold"
                      : "text-gray-800 hover:text-blue-600 hover:bg-blue-50 md:hover:bg-transparent"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Dropdown Layanan */}
            <li
              className="relative flex items-center"
              onMouseEnter={() => window.innerWidth >= 768 && setServiceOpen(true)}
              onMouseLeave={() => window.innerWidth >= 768 && setServiceOpen(false)}
            >
              <button
                onClick={() =>
                  window.innerWidth < 768 && setServiceOpen(!serviceOpen)
                }
                className="inline-flex items-center gap-1 py-2 px-3 rounded-lg text-gray-800 hover:text-blue-600 font-semibold transition-colors duration-200 align-middle"
              >
                <span>Layanan</span>
                <span
                  className={`text-xs transition-transform duration-300 ${
                    serviceOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Dropdown Desktop */}
              <div
                className={`hidden md:block fixed left-1/2 -translate-x-1/2 top-[calc(100%+10px)] w-[80vw] rounded-2xl shadow-2xl bg-white border border-gray-200 p-10 transition-all duration-500 ease-in-out backdrop-blur-lg z-40 ${
                  serviceOpen
                    ? "opacity-100 translate-y-0 visible"
                    : "opacity-0 -translate-y-5 invisible"
                }`}
              >
                <div className="flex gap-10">
                  {/* Pengajuan Proyek */}
                  <div className="w-1/3 border-r border-gray-200 pr-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      💡 Pengajuan Proyek
                    </h3>
                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                      Ajukan ide proyek atau kerja sama dengan tim PSTEAM untuk diwujudkan bersama.
                    </p>
                    <Link
                      href="/services/pengajuan"
                      className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                    >
                      Ajukan Sekarang
                    </Link>
                  </div>

                  {/* Pelatihan & Sertifikasi */}
                  <div className="w-2/3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      🎓 Pelatihan & Sertifikasi
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Pilih bidang pelatihan sesuai minat dan tingkatkan skill-mu bersama kami.
                    </p>

                    <div className="grid grid-cols-5 gap-6">
                      {categories.map((item) => (
                        <button
                          key={item.title}
                          onClick={() => handleSelectCategory(item.title)}
                          className="flex flex-col items-center justify-center text-center border rounded-xl py-6 px-3 bg-white hover:bg-blue-50/70 transition-all duration-300 group shadow-sm hover:shadow-xl hover:-translate-y-1"
                        >
                          <div className="text-blue-800 mb-3 group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700">
                            {item.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Tombol Login Mobile */}
            <li className="md:hidden mt-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-gray-800 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-gray-900 transition-all duration-300"
              >
                Masuk
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
