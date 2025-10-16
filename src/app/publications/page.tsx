"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "../publications/components/HeroSection";
import ResearchSection from "../publications/components/ResearchSection";
import CollaborationSection from "../publications/components/CollaborationSection";
import NewsSection from "../publications/components/NewsSection";
import DosenSection from "../publications/components/DosenSection";
import PublicationSection from "../publications/components/PublicationSection";

export default function PublicationPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="flex flex-col space-y-20 px-4 md:px-16 py-10 bg-gray-50">
      <HeroSection />
      <ResearchSection />
      <CollaborationSection />
      <NewsSection />
      <DosenSection />
      <PublicationSection />
    </div>
  );
}
