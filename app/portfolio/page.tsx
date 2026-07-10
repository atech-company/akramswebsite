import { PageHeader } from "@/components/shared/page-header";
import { getPortfolio } from "@/lib/data/content";
import { PortfolioList } from "@/features/portfolio/portfolio-list";

export default async function PortfolioPage() {
  const portfolio = await getPortfolio();

  return (
    <>
      <PageHeader badge="Portfolio" title="Our Projects" description="Real engineering challenges solved for enterprise clients worldwide." />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PortfolioList projects={portfolio} />
        </div>
      </section>
    </>
  );
}
