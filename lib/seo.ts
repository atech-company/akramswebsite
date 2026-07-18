import type { Metadata } from "next";
import { resolveMediaUrl } from "@/lib/media-url";

export const SITE_NAME = "AkramsLab";
export const SITE_NAME_AR = "مختبر اكرم";
export const SITE_TAGLINE = "Embedded Systems, Robotics & IoT Engineering";
export const DEFAULT_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const DEFAULT_DESCRIPTION =
  "Premium embedded systems engineering, robotics, IoT, and PCB design services. World-class training for engineers who build the future.";
export const DEFAULT_KEYWORDS = [
  "AkramsLab",
  "مختبر اكرم",
  "embedded systems",
  "robotics",
  "IoT",
  "PCB design",
  "firmware",
  "AVR microcontroller",
  "engineering training",
  "Lebanon electronics",
  "hardware engineering",
];

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://akramslab.computechsleb.com").replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncateMeta(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function toAbsoluteImage(src?: string | null): string | undefined {
  if (!src) return undefined;
  const resolved = resolveMediaUrl(src);
  if (!resolved) return undefined;
  if (resolved.startsWith("http://") || resolved.startsWith("https://")) return resolved;
  return absoluteUrl(resolved);
}

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  keywords = DEFAULT_KEYWORDS,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const desc = truncateMeta(description);
  const ogImage = toAbsoluteImage(image) || absoluteUrl("/brand/og.png");

  return {
    title: path === "/" ? { absolute: title } : title,
    description: desc,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      type,
      locale: "en_US",
      siteName: SITE_NAME,
      title,
      description: desc,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationJsonLd(input?: {
  email?: string;
  phone?: string;
  location?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl("/brand/logo-master.png"),
    description: DEFAULT_DESCRIPTION,
    email: input?.email,
    telephone: input?.phone,
    address: input?.location
      ? {
          "@type": "PostalAddress",
          addressLocality: input.location,
          addressCountry: "LB",
        }
      : undefined,
    sameAs: input?.sameAs?.filter(Boolean) ?? [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    description: DEFAULT_DESCRIPTION,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };
}
