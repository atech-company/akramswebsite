"use client";

import Link from "next/link";
import {
  CircuitBoard, Cpu, Microchip, Wifi, Plane, Box, Wrench, Lightbulb, ArrowRight,
} from "lucide-react";
import { FadeIn, HoverLift } from "@/components/shared/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/data/mock";

const iconMap: Record<string, React.ElementType> = {
  "circuit-board": CircuitBoard,
  cpu: Cpu,
  microchip: Microchip,
  wifi: Wifi,
  plane: Plane,
  box: Box,
  wrench: Wrench,
  lightbulb: Lightbulb,
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <Badge className="mb-4">Engineering Services</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            End-to-End Engineering
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            From concept to production — we deliver enterprise-grade embedded solutions.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon || "cpu"] || Cpu;
            return (
              <FadeIn key={service.id} delay={i * 0.05}>
                <HoverLift>
                  <Link href={`/services/${service.slug}`}>
                    <Card className="group h-full hover:border-primary/30 transition-all duration-300 p-6">
                      <CardContent className="p-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-4 group-hover:glow-primary transition-all">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                        <p className="text-sm text-muted line-clamp-2">{service.excerpt}</p>
                        <span className="inline-flex items-center gap-1 text-sm text-primary mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn more <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </HoverLift>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
