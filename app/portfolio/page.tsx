import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { getPortfolio } from "@/lib/data/content";
import { PortfolioList } from "@/features/portfolio/portfolio-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Portfolio — Embedded Systems & Hardware Projects",
  description:
    "Explore real engineering projects from AkramsLab: custom PCBs, embedded firmware, robotics, and IoT systems built for clients worldwide.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const portfolio = await getPortfolio();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />
      <PageHeader badge="Portfolio" title="Our Projects" description="Real engineering challenges solved for enterprise clients worldwide." />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PortfolioList projects={portfolio} />
        </div>
      </section>
    </>
  );
}
