"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function ModalWrapper({ isOpen, onClose, children }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // 🔄 Logika animasi buka & tutup
  useEffect(() => {
    if (isOpen) {
      // Saat modal dibuka
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10); // memicu transisi
    } else if (!isOpen && isVisible) {
      // Saat modal ditutup
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsVisible(false), 400); // waktu animasi keluar
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Jika belum pernah dibuka, jangan render
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 
        ${isAnimating ? "bg-black/40 backdrop-blur-sm" : "bg-black/0 backdrop-blur-0"}`}
    >
      {/* 🧩 Card Modal */}
      <div
        className={`bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
      >
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Konten Modal */}
        {children}
      </div>
    </div>
  );
}
