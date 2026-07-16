import type { Metadata } from "next";
import { MapPin, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/shared/motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCareers } from "@/lib/data/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers — Join the AkramsLab Engineering Team",
  description:
    "Build the future of embedded engineering with AkramsLab. Explore open roles for engineers who value craft, curiosity, and impact.",
  path: "/careers",
});

export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <>
      <PageHeader badge="Careers" title="Join Our Team" description="Build the future of embedded engineering with a team that values craft, curiosity, and impact." />
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 space-y-4">
          {careers.map((position, i) => (
            <FadeIn key={position.id} delay={i * 0.1}>
              <Card className="p-6 hover:border-primary/20 transition-all group">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">{position.title}</h2>
                    <div className="flex gap-4 mt-2 text-sm text-muted">
                      <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{position.department}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{position.location}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="capitalize">{position.type}</Badge>
                </div>
                <p className="text-muted text-sm mt-4">{position.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
