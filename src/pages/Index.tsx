import HeroSection from "@/components/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import PortfolioPreview from "@/components/PortfolioPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import ExperienceStats from "@/components/ExperienceStats";
import ProcessSection from "@/components/ProcessSection";
import FloatingElements from "@/components/FloatingElements";
import SectionDivider from "@/components/SectionDivider";
import InteractiveVision from "@/components/InteractiveVision";
import FAQSection from "@/components/FAQSection";
import Newsletter from "@/components/Newsletter";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="relative" ref={containerRef}>
      <FloatingElements />
      
      <HeroSection />
      <ExperienceStats />
      <SectionDivider variant="dots" />
      <ServicesPreview />
      <SectionDivider />
      <InteractiveVision />
      <SectionDivider variant="wave" />
      <ProcessSection />
      <SectionDivider />
      <PortfolioPreview />
      <SectionDivider variant="dots" />
      <WhyChooseUs />
      <SectionDivider />
      <FAQSection />
      <SectionDivider variant="wave" />
      <Testimonials />
      <SectionDivider />
      <Newsletter />
      <ContactCTA />
    </div>
  );
};

export default Index;
