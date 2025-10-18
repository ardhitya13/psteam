import HeroProjectsSection from "./components/HeroProjectsSection";
import ProjectsSection from "./components/ProjectsSection";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-20">
      <HeroProjectsSection />
      <ProjectsSection />
    </main>
  );
}
