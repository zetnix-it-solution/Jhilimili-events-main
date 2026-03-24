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

const Index = () => {
  return (
    <div className="relative">
      <FloatingElements />
      
      <HeroSection />
      <ExperienceStats />
      <SectionDivider variant="dots" />
      <ServicesPreview />
      <SectionDivider />
      <ProcessSection />
      <SectionDivider variant="wave" />
      <PortfolioPreview />
      <SectionDivider />
      <WhyChooseUs />
      <SectionDivider variant="dots" />
      <Testimonials />
      <SectionDivider />
      <ContactCTA />
    </div>
  );
};

export default Index;
