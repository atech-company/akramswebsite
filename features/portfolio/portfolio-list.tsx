"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { FadeIn, HoverLift } from "@/components/shared/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ContentImage } from "@/components/shared/content-image";
import type { PortfolioProject } from "@/types";

export function PortfolioList({ projects }: { projects: PortfolioProject[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.technologies.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      ),
    [projects, search]
  );

  return (
    <>
      <div className="relative max-w-md mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <Input placeholder="Filter by technology..." className="pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <FadeIn key={project.id} delay={i * 0.05}>
            <HoverLift>
              <Link href={`/portfolio/${project.slug}`}>
                <Card className="group overflow-hidden hover:border-primary/20 h-full">
                  <ContentImage src={project.thumbnail} alt={project.title} aspect="4/3" />
                  <CardContent className="p-6">
                    <p className="text-xs text-primary mb-2">{project.client}</p>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">{project.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((t) => (
                        <Badge key={t} variant="secondary">{t}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </HoverLift>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
