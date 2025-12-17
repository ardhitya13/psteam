"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  width?: string;
  lockScroll?: boolean;
}

export default function ModalWrapper({
  isOpen,
  onClose,
  children,
  width = "max-w-4xl",
  lockScroll = false,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  /* =========================
     OPEN / CLOSE ANIMATION
  ========================= */
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 20);
    } else if (isVisible) {
      setIsAnimating(false);
      const t = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        transition-opacity duration-300
        ${isAnimating ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* MODAL CARD */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full ${width}
          bg-white rounded-2xl shadow-2xl
          relative
          max-h-[90vh]
          ${lockScroll ? "overflow-hidden" : "overflow-y-auto scrollbar-hide"}
          transition-all duration-300
          ${isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-white shadow hover:bg-gray-100 text-gray-600"
        >
          <X size={22} />
        </button>

        {/* CONTENT */}
        <div className="px-10 py-6">{children}</div>
      </div>
    </div>
  );
}
