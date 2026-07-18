import Link from "next/link";
import { ArrowRight, Play, Zap, CircuitBoard, Wifi, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StartLearningButton } from "@/components/course-registration/start-learning-button";
import type { Partner } from "@/types";
import type { SiteInfo } from "@/lib/data/site";

const floatingIcons = [
  { Icon: CircuitBoard, x: "8%", y: "22%" },
  { Icon: Wifi, x: "88%", y: "18%" },
  { Icon: Bot, x: "82%", y: "62%" },
  { Icon: Zap, x: "12%", y: "68%" },
];

/** Server-rendered hero — no opacity:0 motion (mobile Speed Index killer). */
export function HeroSection({ siteInfo, partners }: { siteInfo: SiteInfo; partners: Partner[] }) {
  return (
    <section className="relative flex items-center overflow-hidden pt-28 pb-14 md:pt-32 md:pb-16">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      {/* Lightweight atmosphere — avoid huge live blur on mobile */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(59,130,246,0.12),transparent_50%),radial-gradient(ellipse_at_80%_70%,rgba(34,211,238,0.08),transparent_45%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-[1]" />

      {floatingIcons.map(({ Icon, x, y }, i) => (
        <div
          key={i}
          className="absolute hidden lg:flex h-11 w-11 items-center justify-center rounded-xl glass opacity-80"
          style={{ left: x, top: y }}
          aria-hidden
        >
          <Icon className="h-5 w-5 text-primary/50" />
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <Badge className="mb-4 text-xs">
            Founded {siteInfo.founded} · {siteInfo.location}
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            Build Real <span className="text-gradient">Embedded Hardware</span> That Works
          </h1>

          <p className="text-base md:text-lg text-muted max-w-xl mb-7 leading-relaxed">
            {siteInfo.tagline} — hands-on training and custom hardware from Lebanon&apos;s {siteInfo.name}.
          </p>

          <div className="flex flex-wrap gap-3">
            <StartLearningButton>
              Start Learning <ArrowRight className="ml-1 h-4 w-4" />
            </StartLearningButton>
            <Button variant="secondary" asChild>
              <Link href="/services">
                <Play className="mr-1 h-4 w-4" /> Our Services
              </Link>
            </Button>
          </div>
        </div>

        {partners.length > 0 && (
          <div className="mt-12 md:mt-14 pt-8 border-t border-white/8">
            <p className="text-[11px] text-muted uppercase tracking-widest mb-4">
              Trusted by universities & partners
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
              {partners.map((partner) => (
                <span
                  key={partner.id}
                  className="text-xs md:text-sm font-medium text-muted/80 hover:text-foreground transition-colors"
                >
                  {partner.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
