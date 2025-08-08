import HeroSection from "../components/Hero";
import FeaturedPoems from "../components/FeaturedPoems";
import HowItWorks from "../components/HowItWorks";
import TestimonialsSection from "../components/Testimonial";
import CTASection from "../components/CTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPoems />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}