import { HeroSection } from "@/features/home/hero-section";
import { StatsSection } from "@/features/home/stats-section";
import { FeaturedCoursesSection } from "@/features/home/courses-section";
import { ServicesSection } from "@/features/home/services-section";
import {
  PortfolioSection,
  ProductsSection,
  TestimonialsSection,
  PartnersSection,
  BlogPreviewSection,
} from "@/features/home/more-sections";
import { NewsletterSection } from "@/features/home/newsletter-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedCoursesSection />
      <ServicesSection />
      <PortfolioSection />
      <ProductsSection />
      <TestimonialsSection />
      <PartnersSection />
      <BlogPreviewSection />
      <NewsletterSection />
    </>
  );
}
