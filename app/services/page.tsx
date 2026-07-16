import type { Metadata } from "next";
import Link from "next/link";
import {
  CircuitBoard, Cpu, Microchip, Wifi, Plane, Box, Wrench, Lightbulb, ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn, HoverLift } from "@/components/shared/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/data/content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

const iconMap: Record<string, React.ElementType> = {
  "circuit-board": CircuitBoard, cpu: Cpu, microchip: Microchip, wifi: Wifi,
  plane: Plane, box: Box, wrench: Wrench, lightbulb: Lightbulb,
};

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Services — PCB, Firmware, IoT & Product Development",
  description:
    "From PCB design to full product development — enterprise-grade embedded systems, robotics, and IoT engineering for ambitious teams.",
  path: "/services",
  keywords: [
    "PCB design services",
    "firmware development",
    "IoT engineering services",
    "embedded systems consulting",
    "custom electronics Lebanon",
  ],
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHeader
        badge="Services"
        title="Engineering Services"
        description="From PCB design to full product development — enterprise-grade engineering for ambitious teams."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon || "cpu"] || Cpu;
            return (
              <FadeIn key={service.id} delay={i * 0.05}>
                <HoverLift>
                  <Card className="group hover:border-primary/20 h-full overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h2>
                      <p className="text-muted mb-6">{service.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.technologies.slice(0, 4).map((t) => (
                          <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">{t}</span>
                        ))}
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/services/${service.slug}`}>
                          Request Quote <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </HoverLift>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </>
  );
}
