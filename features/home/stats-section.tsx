"use client";

import { FadeIn, AnimatedCounter } from "@/components/shared/motion";
import { stats } from "@/lib/data/mock";

export function StatsSection() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div className="gradient-border rounded-[24px] p-8 text-center hover:glow-primary transition-all duration-500">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
