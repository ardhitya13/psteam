"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { KeyRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "../../../lib/logout";

interface NavbarAdminProps {
  toggle: () => void;
}

export default function NavbarAdmin({ toggle }: NavbarAdminProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [initials, setInitials] = useState("AD");
  const router = useRouter();

  /* =========================
     AMBIL USER DARI LOCALSTORAGE
     (PASTI SESUAI DATABASE)
  ========================= */
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
      const user = JSON.parse(stored);

      if (user?.name) {
        setAdminName(user.name);

        // 🔥 Buat inisial otomatis (2 huruf)
        const parts = user.name
          .replace(/[^a-zA-Z ]/g, "")
          .trim()
          .split(" ");

        const init =
          (parts[0]?.[0] || "") + (parts[1]?.[0] || "");

        setInitials(init.toUpperCase() || "AD");
      }
    } catch {
      setAdminName("Admin");
      setInitials("AD");
    }
  }, []);

  /* =========================
     TUTUP DROPDOWN KLIK LUAR
  ========================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-area")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Yakin ingin keluar?",
    text: "Anda akan keluar dari halaman admin.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Keluar",
    cancelButtonText: "Batal",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#9ca3af",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    logout(router);
  }
};


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        
        {/* LOGO */}
        <div className="flex items-center space-x-3">
          <div className="relative w-[95px] h-[40px]">
            <Image
              src="/images/logopsteam(modify).png"
              alt="PSTEAM Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* AVATAR + DROPDOWN */}
        <div className="relative dropdown-area">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-blue-800 text-white font-semibold flex items-center justify-center shadow-sm hover:opacity-90 transition"
          >
            {initials}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 animate-fadeIn">
              
              {/* USER INFO */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  {adminName}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>

              {/* MENU */}
              <ul className="py-2 text-sm">
                <li>
                  <button
                    onClick={() => router.push("/admin/changepassword")}
                    className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <KeyRound size={16} className="text-blue-600" />
                    Ganti Sandi
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Keluar
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ANIMASI */}
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
