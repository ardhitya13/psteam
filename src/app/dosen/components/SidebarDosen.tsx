"use client";
import { Menu, Home, ClipboardList, GraduationCap, FileText } from "lucide-react";
import Link from "next/link";

export default function SidebarDosen({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const menuItems = [
    { name: "Beranda", icon: Home, href: "/dosen" },
    { name: "Ajukan Penelitian", icon: ClipboardList, href: "/dosen/kelola/AjukanPenelitian" },
    { name: "Daftar Publikasi", icon: FileText, href: "/dosen/kelola/publikasi" },
  ];

  return (
    <div
      className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-[#0a3b91] text-white transition-all duration-300 z-30 ${
        isOpen ? "w-[232px]" : "w-[80px]"
      }`}
    >
      {/* Header Menu */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-800">
        <button
          onClick={toggle}
          className="flex items-center text-white hover:text-gray-200 transition"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} strokeWidth={2} />
          {isOpen && <span className="ml-3 text-sm font-semibold">MENU</span>}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="mt-4">
        <ul className="space-y-2">
          {menuItems.map(({ name, icon: Icon, href }, idx) => (
            <li key={idx}>
              <Link href={href} className="block mx-3 relative group">
                <div
                  className={
                    "flex items-center gap-3 py-3 px-3 rounded-md transition-all duration-200 transform group-hover:bg-white hover:scale-[1.01]"
                  }
                >
                  <Icon
                    size={22}
                    strokeWidth={2.4}
                    className="text-white group-hover:text-[#0a3b91] transition-transform duration-200 transform group-hover:scale-105"
                  />
                  {isOpen && (
                    <span
                      className={
                        "text-white text-[15px] font-semibold transition-all duration-200 transform group-hover:scale-105 group-hover:text-[#0a3b91]"
                      }
                    >
                      {name}
                    </span>
                  )}
                </div>

                {!isOpen && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-white text-[#0a3b91] text-sm font-semibold rounded-md shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 whitespace-nowrap z-50">
                    {name}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
