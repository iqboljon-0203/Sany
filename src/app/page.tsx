import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhySanySection from "@/components/WhySanySection";
import ProjectsSection from "@/components/ProjectsSection";
import PartnersMarquee from "@/components/PartnersMarquee";
import LeasingCalculator from "@/components/LeasingCalculator";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhySanySection />
      <LeasingCalculator />
      <ProjectsSection />
      <PartnersMarquee />
    </>
  );
}
