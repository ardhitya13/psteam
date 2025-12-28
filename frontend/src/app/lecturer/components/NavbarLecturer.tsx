"use client";

import { LogOut, User, KeyRound } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { logout } from "../../../lib/logout";

export default function NavbarLecturer({ toggle }: { toggle: () => void }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [name, setName] = useState("");
  const [studyProgram, setStudyProgram] = useState("");
  const [photo, setPhoto] = useState("");
  const [initial, setInitial] = useState("U");

  /* ================= LOAD USER FROM LOCAL STORAGE ================= */
  useEffect(() => {
  async function loadUser() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    // 🔥 FETCH PROFIL LANGSUNG
    const res = await fetch(
      `http://localhost:4000/api/lecturer/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const profile = await res.json();

    const name = profile?.user?.name ?? "";
    const study = profile?.studyProgram ?? "";
    const photo = profile?.imageUrl
      ? `http://localhost:4000${profile.imageUrl}`
      : "";

    setName(name);
    setStudyProgram(study);
    setPhoto(photo);
    setInitial(name ? name[0].toUpperCase() : "U");

    // cache
    localStorage.setItem("userName", name);
    localStorage.setItem("userStudyProgram", study);
    localStorage.setItem("userPhoto", photo);
  }

  loadUser();
}, []);

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout(router);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
        
        {/* LOGO */}
        <div className="flex items-center space-x-3">
          <div className="relative w-[120px] h-[30px] overflow-hidden">
            <Image
              src="/logopsteam1.png"
              alt="PSTEAM Logo"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* PROFILE DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((s) => !s)}
            className="flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-100 transition"
          >
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                onError={(e) =>
                  (e.currentTarget.src = "/images/default-user.png")
                }
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#0a3b91] text-white flex items-center justify-center font-semibold">
                {initial}
              </div>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-xl border border-gray-100 py-2 text-sm">
              
              {/* USER INFO */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-800">
                  {name || "User"}
                </p>
                <p className="text-gray-500 text-xs">
                  {studyProgram || "Program Studi tidak tersedia"}
                </p>
              </div>

              {/* PROFILE */}
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push("/lecturer/profil");
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                <User size={16} className="mr-2 text-[#0a3b91]" />
                Lihat Profil
              </button>

              {/* CHANGE PASSWORD */}
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  router.push("/lecturer/change-password");
                }}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                <KeyRound size={16} className="mr-2 text-[#0a3b91]" />
                Ganti Password
              </button>

              <hr className="my-1" />

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-50"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
