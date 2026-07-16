import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { getCourses } from "@/lib/data/content";
import { CoursesList } from "@/features/courses/courses-list";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Courses — Embedded Systems, Robotics & IoT",
  description:
    "Master embedded systems, robotics, IoT, and PCB design with hands-on labs led by industry experts at AkramsLab.",
  path: "/courses",
  keywords: [
    "embedded systems courses",
    "robotics training",
    "IoT courses",
    "PCB design course",
    "AVR programming course",
    "engineering training Lebanon",
  ],
});

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Courses", path: "/courses" },
        ])}
      />
      <PageHeader
        badge="Training"
        title="Engineering Courses"
        description="Master embedded systems, robotics, IoT, and PCB design with hands-on labs led by industry experts."
      />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CoursesList courses={courses} />
        </div>
      </section>
    </>
  );
}
