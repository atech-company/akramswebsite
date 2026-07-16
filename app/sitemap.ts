import type { MetadataRoute } from "next";
import {
  getBlogPosts,
  getCourses,
  getPortfolio,
  getProducts,
  getServices,
} from "@/lib/data/content";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/courses"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/portfolio"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/products"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/events"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/gallery"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/careers"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [courses, services, portfolio, products, posts] = await Promise.all([
    getCourses().catch(() => []),
    getServices().catch(() => []),
    getPortfolio().catch(() => []),
    getProducts().catch(() => []),
    getBlogPosts().catch(() => []),
  ]);

  const dynamicPages: MetadataRoute.Sitemap = [
    ...courses.map((item) => ({
      url: absoluteUrl(`/courses/${item.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...services.map((item) => ({
      url: absoluteUrl(`/services/${item.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...portfolio.map((item) => ({
      url: absoluteUrl(`/portfolio/${item.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((item) => ({
      url: absoluteUrl(`/products/${item.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...posts.map((item) => ({
      url: absoluteUrl(`/blog/${item.slug}`),
      lastModified: item.published_at ? new Date(item.published_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...dynamicPages];
}
