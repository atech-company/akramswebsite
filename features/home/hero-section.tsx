"use client";

import Link from "next/link";
import { ArrowRight, Play, Zap, CircuitBoard, Wifi, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedGrid, FloatingBlobs, MouseGlow } from "@/components/shared/effects";
import { StartLearningButton } from "@/components/course-registration/start-learning-button";
import { trustedCompanies, siteInfo } from "@/lib/data/mock";

const floatingIcons = [
  { Icon: CircuitBoard, x: "8%", y: "22%", delay: 0 },
  { Icon: Wifi, x: "88%", y: "18%", delay: 0.5 },
  { Icon: Bot, x: "82%", y: "62%", delay: 1 },
  { Icon: Zap, x: "12%", y: "68%", delay: 1.5 },
];

export function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden pt-28 pb-14 md:pt-32 md:pb-16">
      <AnimatedGrid />
      <FloatingBlobs />
      <MouseGlow />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent z-[1]" />

      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex h-11 w-11 items-center justify-center rounded-xl glass opacity-80"
          style={{ left: x, top: y }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay }}
        >
          <Icon className="h-5 w-5 text-primary/50" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 text-xs">Founded {siteInfo.founded} · Lebanon · 500+ Students</Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Build Real <span className="text-gradient">Embedded Hardware</span> That Works
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-muted max-w-xl mb-7 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            AVR · PCB Design · ESP32 IoT · Robotics — hands-on training and custom hardware from Lebanon&apos;s AkramsLab.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <StartLearningButton>
              Start Learning <ArrowRight className="ml-1 h-4 w-4" />
            </StartLearningButton>
            <Button variant="secondary" asChild>
              <Link href="/services">
                <Play className="mr-1 h-4 w-4" /> Our Services
              </Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 md:mt-14 pt-8 border-t border-white/8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[11px] text-muted uppercase tracking-widest mb-4">Trusted by universities & partners</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
            {trustedCompanies.map((company) => (
              <span key={company} className="text-xs md:text-sm font-medium text-muted/80 hover:text-foreground transition-colors">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
