"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "../research/components/HeroSection";
import ResearchFocus from "./components/ResearchFocus";
import ResearchFuture from "./components/ResearchFuture";
import ResearchSection from "./components/ResearchSection"; // ✅ alias path



export default function ResearchPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <main className="pt-20 space-y-24 bg-gray-50">
      <section data-aos="fade-up">
        <HeroSection />
      </section>

      <section data-aos="fade-up" data-aos-delay="200">
        <ResearchFocus />
      </section>

      <section data-aos="fade-up" data-aos-delay="400">
        <ResearchFuture />
      </section>

      <section data-aos="fade-up" data-aos-delay="600">
        <ResearchSection />
      </section>
    </main>
  );
}
