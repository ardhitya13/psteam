"use client";

import HeroSection from "./components/HeroSection"; 
import AboutSection from "./about/components/AboutSection"; 
import TeamSection from "./components/TeamSection";
import ResearchSection from "./research/components/ResearchSection";
import PublicationSection from "./publications/components/PublicationSection";
import ProjectSection from "./projects/components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import PatnersSection from "./components/PatnersSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* HERO SECTION */}
        <HeroSection />

        {/* ABOUT SECTION */}
        <AboutSection />

        {/* OTHER SECTIONS */}
        <TeamSection />
        <ResearchSection />
        <PublicationSection />
        <ProjectSection />
        <ServicesSection />
        <PatnersSection />
      </main>
    </div>
  );
}
