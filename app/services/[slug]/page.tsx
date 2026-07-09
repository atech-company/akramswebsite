import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services, portfolio } from "@/lib/data/mock";
import { ContentImage } from "@/components/shared/content-image";
import { serviceImages, images } from "@/lib/data/images";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const workflow = service.workflow || [
    { step: "Discovery", description: "Requirements analysis and feasibility study" },
    { step: "Design", description: "Architecture and detailed engineering" },
    { step: "Build", description: "Prototype development and validation" },
    { step: "Deliver", description: "Production handoff and ongoing support" },
  ];

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/services"><ArrowLeft className="h-4 w-4" /> All Services</Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <Badge className="mb-4">Engineering Service</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-lg text-muted leading-relaxed mb-8">{service.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {service.technologies.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
          <ContentImage
            src={serviceImages[service.slug] ?? images.coursePcb}
            alt={service.title}
            aspect="square"
            className="rounded-[24px] gradient-border"
          />
        </div>

        <h2 className="text-3xl font-bold mb-8">Our Workflow</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {workflow.map((step, i) => (
            <Card key={i} className="p-6 relative">
              <span className="text-4xl font-bold text-primary/20 absolute top-4 right-4">{i + 1}</span>
              <h3 className="font-semibold mb-2">{step.step}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </Card>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {portfolio.slice(0, 3).map((p) => (
            <Link key={p.id} href={`/portfolio/${p.slug}`}>
              <Card className="p-6 hover:border-primary/20 transition-all h-full">
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted">{p.excerpt}</p>
                <p className="text-xs text-primary mt-4 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />{p.result}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
