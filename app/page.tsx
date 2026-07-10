import { HeroSection } from "@/features/home/hero-section";
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
import {
  getBlogPosts,
  getFeaturedCourses,
  getPartners,
  getPortfolio,
  getProducts,
  getServices,
  getTestimonials,
} from "@/lib/data/content";
import { getSiteInfo } from "@/lib/data/site";

export default async function HomePage() {
  const [
    siteInfo,
    courses,
    services,
    portfolio,
    products,
    testimonials,
    partners,
    blogPosts,
  ] = await Promise.all([
    getSiteInfo(),
    getFeaturedCourses(),
    getServices(true),
    getPortfolio(true),
    getProducts(true),
    getTestimonials(),
    getPartners(),
    getBlogPosts(),
  ]);

  return (
    <>
      <HeroSection siteInfo={siteInfo} partners={partners} />
      <FeaturedCoursesSection courses={courses} />
      <ServicesSection services={services} />
      <PortfolioSection projects={portfolio} />
      <ProductsSection products={products} />
      <TestimonialsSection testimonials={testimonials} />
      <PartnersSection partners={partners} />
      <BlogPreviewSection posts={blogPosts} />
      <NewsletterSection />
    </>
  );
}
