import HeroSection from "@/components/home/HeroSection";
import AboutSnapshot from "@/components/home/AboutSnapshot";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProgramDesign from "@/components/home/ProgramDesign";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhyChoose from "@/components/home/WhyChoose";
import PartnersStrip from "@/components/home/PartnersStrip";
import CTABanner from "@/components/home/CTABanner";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <AboutSnapshot />
      <ServicesGrid />
      <ProgramDesign />
      <FeaturedProjects />
      <WhyChoose />
      <PartnersStrip />
      <CTABanner />
    </main>
  );
};

export default Index;
