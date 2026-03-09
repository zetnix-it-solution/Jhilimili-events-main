import HeroSection from "@/components/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import PortfolioPreview from "@/components/PortfolioPreview";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import PackagesPreview from "@/components/PackagesPreview";
import ContactCTA from "@/components/ContactCTA";

const Index = () => {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <PortfolioPreview />
      <WhyChooseUs />
      <Testimonials />
      <PackagesPreview />
      <ContactCTA />
    </>
  );
};

export default Index;
