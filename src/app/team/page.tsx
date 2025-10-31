"use client";


import TeamSection from "../components/TeamSection";
import ProjectCard from "./components/ProjectCard";
import HeroSection from "../team/components/HeroSection";

export default function TeamPage() {
  return (
    <div className="">
      <HeroSection />
      <TeamSection />
      <ProjectCard />
    </div>
  );
}
