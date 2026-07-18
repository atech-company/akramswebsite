import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/features/home/hero-section";
import { FeaturedCoursesSection } from "@/features/home/courses-section";
import { ServicesSection } from "@/features/home/services-section";
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

const PortfolioSection = dynamic(() =>
  import("@/features/home/more-sections").then((m) => m.PortfolioSection)
);
const ProductsSection = dynamic(() =>
  import("@/features/home/more-sections").then((m) => m.ProductsSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/features/home/more-sections").then((m) => m.TestimonialsSection)
);
const PartnersSection = dynamic(() =>
  import("@/features/home/more-sections").then((m) => m.PartnersSection)
);
const BlogPreviewSection = dynamic(() =>
  import("@/features/home/more-sections").then((m) => m.BlogPreviewSection)
);
const NewsletterSection = dynamic(() =>
  import("@/features/home/newsletter-section").then((m) => m.NewsletterSection)
);

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
    getBlogPosts(6),
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
