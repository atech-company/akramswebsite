import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Learn how AkramsLab collects, uses, and protects your personal information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" description="Last updated: April 2026" />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 prose prose-invert prose-sm">
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly, such as when you create an account, enroll in a course, contact us, or subscribe to our newsletter.</p>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
          <h2>Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.</p>
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at privacy@akramslab.com.</p>
        </div>
      </section>
    </>
  );
}
