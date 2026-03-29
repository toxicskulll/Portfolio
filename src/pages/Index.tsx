import { useState, useCallback, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GitHubSection from "@/components/GitHubSection";
import SkillsSection from "@/components/SkillsSection";
import ResearchInterestsSection from "@/components/ResearchInterestsSection";
import ProjectsSection from "@/components/ProjectsSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import PublicationsSection from "@/components/PublicationsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import PortfolioFooter from "@/components/PortfolioFooter";
import QuoteSection from "@/components/QuoteSection";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded) return;

    const shouldScroll = sessionStorage.getItem("scrollToPublications");
    if (shouldScroll) {
      sessionStorage.removeItem("scrollToPublications");
      const publicationsSection = document.getElementById("publications");
      if (publicationsSection) {
        setTimeout(() => {
          publicationsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleComplete} />}
      <div className="noise-overlay" />
      {loaded && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <QuoteSection 
              quote="The future belongs to those who believe in the beauty of their dreams."
              author="Eleanor Roosevelt"
            />
            <AboutSection />
            <QuoteSection 
              quote="The only way to do great work is to love what you do."
              author="Steve Jobs"
            />
            <GitHubSection />
            <QuoteSection 
              quote="Code is read much more often than it is written."
              author="Guido van Rossum"
            />
            <SkillsSection />
            <QuoteSection 
              quote="The expert in anything was once a beginner."
              author="Helen Hayes"
            />
            <ResearchInterestsSection />
            <QuoteSection 
              quote="Research is what I'm doing when I don't know what I'm doing."
              author="Wernher von Braun"
            />
            <ProjectsSection />
            <QuoteSection 
              quote="Ideas are easy. Implementation is hard."
              author="Guy Kawasaki"
            />
            <OpenSourceSection />
            <QuoteSection 
              quote="If I have seen further, it is by standing on the shoulders of giants."
              author="Isaac Newton"
            />
            <PublicationsSection />
            <QuoteSection 
              quote="In the middle of difficulty lies opportunity."
              author="Albert Einstein"
            />
            <ExperienceSection />
            <QuoteSection 
              quote="Alone we can do so little; together we can do so much."
              author="Helen Keller"
            />
            <ContactSection />
          </main>
          <PortfolioFooter />
        </>
      )}
    </>
  );
};

export default Index;
