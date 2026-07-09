"use client";

import Link from "next/link";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { FadeIn, HoverLift } from "@/components/shared/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/data/mock";
import { formatPrice } from "@/lib/utils";
import { ContentImage } from "@/components/shared/content-image";
import { courseImages, images } from "@/lib/data/images";
import type { Course } from "@/types";

function CourseCard({ course }: { course: Course }) {
  const img = course.thumbnail ?? courseImages[course.slug] ?? images.coursePcb;
  return (
    <HoverLift>
      <Card className="group relative overflow-hidden hover:border-primary/20 h-full">
        <ContentImage src={img} alt={course.title} aspect="video" />
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge className="capitalize">{course.difficulty}</Badge>
            <span className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-primary fill-primary" />
              {course.rating}
            </span>
            <span className="text-muted text-sm">({course.students_count.toLocaleString()} students)</span>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted mb-4 line-clamp-2">{course.excerpt}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {course.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/8">
            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration_hours}h</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.lessons_count} lessons</span>
            </div>
            <span className="font-bold text-primary">{formatPrice(course.price)}</span>
          </div>
        </CardContent>
        <Link href={`/courses/${course.slug}`} className="absolute inset-0" aria-label={course.title} />
      </Card>
    </HoverLift>
  );
}

export function FeaturedCoursesSection() {
  const featured = courses.filter((c) => c.is_featured);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge variant="accent" className="mb-4">Training Programs</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Courses</h2>
            <p className="text-muted mt-4 max-w-xl">Hands-on training designed by industry veterans. From firmware to PCB design.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/courses">View All Courses <ArrowRight className="ml-1" /></Link>
          </Button>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course, i) => (
            <FadeIn key={course.id} delay={i * 0.1} className="relative">
              <CourseCard course={course} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
