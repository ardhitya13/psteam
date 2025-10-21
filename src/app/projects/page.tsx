import HeroProjectsSection from "./components/HeroProjectsSection";
import ProjectsSection from "./components/ProjectsSection";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-20 bg-gray-900 text-white">
      <HeroProjectsSection />
      <ProjectsSection />
    </main>
  );
}
