"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface LocaleContextType {
  locale: string;
  setLocale: (lang: string) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState("id");

  // Ambil locale dari localStorage saat pertama kali load
  useEffect(() => {
    const saved = localStorage.getItem("locale");
    if (saved) setLocaleState(saved);
  }, []);

  // Fungsi ganti locale dan simpan ke localStorage
  const setLocale = (lang: string) => {
    setLocaleState(lang);
    localStorage.setItem("locale", lang);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within a LocaleProvider");
  return context;
}
