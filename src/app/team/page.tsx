"use client";


import TeamSection from "../components/TeamSection";
import DosenCard from "./components/DosenCard";
import StudentsCard from "./components/StudentsCard";
import ProjectCard from "./components/ProjectCard";
import HeroSection from "../team/components/HeroSection";

export default function TeamPage() {
  return (
    <div className="">
      <HeroSection />
      <DosenCard />
      <StudentsCard />
      <TeamSection />
      <ProjectCard />
    </div>
  );
}
