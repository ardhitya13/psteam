"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  width?: string; // optional custom width
}

export default function ModalWrapper({
  isOpen,
  onClose,
  children,
  width = "max-w-5xl", // DEFAULT LEBAR BESAR
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  /* ANIMASI MASUK & KELUAR */
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 20);
    } else if (!isOpen && isVisible) {
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-start justify-center 
        p-6 overflow-y-auto transition-all duration-300
        ${isAnimating ? "bg-black/40 backdrop-blur-sm" : "bg-black/0 backdrop-blur-0"}
      `}
      onClick={onClose}
    >
      {/* Card Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full ${width}
          bg-white rounded-2xl shadow-2xl relative
          transition-all duration-300 transform
          ${isAnimating ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-5 scale-95"}
        `}
      >
        {/* X Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-white shadow hover:bg-gray-100 text-gray-600 transition"
        >
          <X size={22} />
        </button>

        {/* Content */}
        <div className="p-10">{children}</div>
      </div>
    </div>
  );
}
