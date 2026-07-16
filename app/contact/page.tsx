import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/features/contact/contact-form";
import { getSiteInfo } from "@/lib/data/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact AkramsLab — Start Your Engineering Project",
  description:
    "Ready to start your next embedded systems, robotics, IoT, or PCB design project? Contact AkramsLab in Lebanon.",
  path: "/contact",
  keywords: ["contact AkramsLab", "PCB design quote", "embedded systems consulting", "engineering training Lebanon"],
});

export default async function ContactPage() {
  const siteInfo = await getSiteInfo();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader badge="Contact" title="Get in Touch" description="Ready to start your next engineering project? Let's talk." />
      <ContactForm siteInfo={siteInfo} />
    </>
  );
}
