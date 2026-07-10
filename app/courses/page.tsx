import { PageHeader } from "@/components/shared/page-header";
import { getCourses } from "@/lib/data/content";
import { CoursesList } from "@/features/courses/courses-list";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
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
