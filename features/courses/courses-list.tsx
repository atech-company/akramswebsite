"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, Users, Star } from "lucide-react";
import { FadeIn, HoverLift } from "@/components/shared/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { ContentImage } from "@/components/shared/content-image";
import type { Course } from "@/types";

const difficulties = ["all", "beginner", "intermediate", "advanced"];

export function CoursesList({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("all");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchDiff = difficulty === "all" || c.difficulty === difficulty;
      return matchSearch && matchDiff;
    });
  }, [courses, search, difficulty]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            placeholder="Search courses..."
            className="pl-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-4 py-2 rounded-[24px] text-sm capitalize transition-all ${
                difficulty === d
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-white/5 text-muted border border-white/10 hover:border-white/20"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course, i) => (
          <FadeIn key={course.id} delay={i * 0.05}>
            <HoverLift>
              <Link href={`/courses/${course.slug}`}>
                <Card className="group relative overflow-hidden hover:border-primary/20 h-full">
                  <ContentImage src={course.thumbnail} alt={course.title} aspect="video" />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="capitalize">{course.difficulty}</Badge>
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 text-primary fill-primary" />
                        {course.rating}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-sm text-muted line-clamp-2 mb-4">{course.excerpt}</p>
                    <p className="text-xs text-muted mb-2">Instructor: {course.instructor}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/8">
                      <div className="flex gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration_hours}h</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.lessons_count}</span>
                      </div>
                      <span className="font-bold text-primary">{formatPrice(course.price)}</span>
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
