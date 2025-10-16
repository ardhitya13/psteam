
import HeroSection from "../about/components/HeroSection";
import AboutVisionMission from "./components/AboutVisionMission";
import AboutTeamSummary from "./components/AboutTeamSummary";
import AboutHistory from "./components/AboutHistory";
import AboutSection from "./components/AboutSection"

export default function AboutPage() {
  return (
    <main className="">
      <HeroSection />
      <AboutSection />
      <AboutVisionMission />
      <AboutTeamSummary />
      <AboutHistory />
    </main>
  );
}
