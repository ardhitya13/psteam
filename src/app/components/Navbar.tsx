"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "../context/LocaleContext"; // pakai context

export default function NavBar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  const { locale, setLocale } = useLocale(); // pakai context
  const [t, setT] = useState<{ [key: string]: string }>({});

  // Load file JSON sesuai bahasa
  useEffect(() => {
    import(`../locales/${locale}/navbar.json`)
      .then((res) => setT(res.default || res))
      .catch((err) => console.error("Gagal memuat terjemahan navbar:", err));
  }, [locale]);

  // Navbar sembunyi saat scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY && currentY > 100);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleChangeLocale = (lang: string) => {
    setLocale(lang); // update context
    setLangOpen(false);
  };

  const menuItems = [
    { name: t.beranda || "Beranda", path: "/" },
    { name: t.tentang || "Tentang", path: "/about" },
    { name: t.tim || "Tim", path: "/team" },
    { name: t.riset || "Riset", path: "/research" },
    { name: t.publikasi || "Publikasi", path: "/publications" },
    { name: t.proyek || "Proyek", path: "/projects" },
    { name: t.layanan || "Layanan", path: "/services" },
  ];

  return (
    <nav
      className={`bg-white fixed w-full z-50 top-0 left-0 border-b border-gray-200 shadow-md transition-all duration-500 ease-in-out transform ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="/logopsteam4.png"
            alt="PSTeam Logo"
            width={90}
            height={80}
            priority
          />
        </Link>

        {/* Tombol kanan */}
        <div className="flex items-center space-x-4 md:order-2 relative">
          {/* Tombol Masuk */}
          <Link href="/login" className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold">
            {t.masuk || "Masuk"}
          </Link>

          {/* Dropdown Bahasa */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 border px-3 py-1 rounded-md"
            >
              <Image
                src={locale === "id" ? "/flags/id.png" : "/flags/en.png"}
                alt={locale === "id" ? "Bendera Indonesia" : "Bendera Inggris"}
                width={22}
                height={22}
              />
              <span className="text-sm font-medium">{locale.toUpperCase()}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                <button
                  onClick={() => handleChangeLocale("id")}
                  className={`flex items-center w-full px-3 py-2 text-sm ${
                    locale === "id" ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-800 hover:bg-blue-50"
                  }`}
                >
                  <Image src="/flags/id.png" alt="Bendera Indonesia" width={20} height={20} className="mr-2" />
                  Indonesia
                </button>
                <button
                  onClick={() => handleChangeLocale("en")}
                  className={`flex items-center w-full px-3 py-2 text-sm ${
                    locale === "en" ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-800 hover:bg-blue-50"
                  }`}
                >
                  <Image src="/flags/en.png" alt="Bendera Inggris" width={20} height={20} className="mr-2" />
                  English
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-semibold text-lg md:flex-row md:space-x-10">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block py-2 px-3 md:p-0 ${
                    pathname === item.path ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-800 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
