"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { KeyRound, LogOut } from "lucide-react";

interface NavbarAdminProps {
  toggle: () => void;
}

export default function NavbarAdmin({ toggle }: NavbarAdminProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ✅ Tutup dropdown saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-area")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* ✅ LOGO (tidak berubah, hanya tambahkan priority agar tidak mismatch SSR/CSR) */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="relative w-[120px] h-[30px] overflow-hidden">
            <Image
              src="/logopsteam1.png"
              alt="PSTEAM Logo"
              fill
              priority // <--- tambahkan ini agar Next.js tidak re-render berbeda antara server dan client
              className="object-cover object-center"
            />
          </div>
        </a>

        {/* ✅ AVATAR + DROPDOWN (tidak diubah posisi atau styling) */}
        <div className="relative dropdown-area">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-blue-800 text-white font-semibold flex items-center justify-center focus:outline-none shadow-sm hover:opacity-90 transition"
          >
            AD
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 animate-fadeIn">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Admin</p>
              </div>

              {/* Menu Items */}
              <ul className="py-2 text-sm">
                <li>
                  <a
                    href="/admin/ubahsandi"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <KeyRound size={16} className="text-blue-600" />
                    Ganti Sandi
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Animasi muncul dropdown */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.18s ease-out;
        }
      `}</style>
    </nav>
  );
}
