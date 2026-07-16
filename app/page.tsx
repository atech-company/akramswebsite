import type { Metadata } from "next";
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
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  keywords: [
    "AkramsLab",
    "embedded systems Lebanon",
    "robotics training",
    "IoT engineering",
    "PCB design services",
    "AVR microcontroller courses",
  ],
});

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
