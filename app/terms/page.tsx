import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "Terms of Service for using AkramsLab engineering services, courses, and products.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" description="Last updated: April 2026" />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 prose prose-invert prose-sm">
          <h2>Acceptance of Terms</h2>
          <p>By accessing and using AkramsLab services, you accept and agree to be bound by these Terms of Service.</p>
          <h2>Services</h2>
          <p>AkramsLab provides engineering services, training courses, and hardware products. Service descriptions and pricing are subject to change.</p>
          <h2>Intellectual Property</h2>
          <p>All content, materials, and intellectual property on this platform are owned by AkramsLab and protected by applicable copyright laws.</p>
          <h2>Limitation of Liability</h2>
          <p>AkramsLab shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</p>
        </div>
      </section>
    </>
  );
}
