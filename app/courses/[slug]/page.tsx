import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Users, Star, CheckCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { courses } from "@/lib/data/mock";
import { formatPrice } from "@/lib/utils";
import { ContentImage } from "@/components/shared/content-image";
import { EnrollButton } from "@/components/course-registration/enroll-button";
import { courseImages, images } from "@/lib/data/images";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const curriculum = course.curriculum || [
    { title: "Module 1: Fundamentals", lessons: 12 },
    { title: "Module 2: Advanced Implementation", lessons: 24 },
    { title: "Module 3: Capstone Project", lessons: 8 },
  ];

  const faq = course.faq || [
    { question: "Do I get a certificate?", answer: "Yes, upon successful completion of all modules and the capstone project." },
    { question: "Is there lifetime access?", answer: "Yes, all course materials are available forever with free updates." },
  ];

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href="/courses"><ArrowLeft className="h-4 w-4" /> Back to Courses</Link>
          </Button>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Badge className="mb-4 capitalize">{course.difficulty}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted mb-6">{course.excerpt}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted mb-8">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 text-primary fill-primary" />{course.rating} rating</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{course.students_count.toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration_hours} hours</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-12">
                {course.technologies.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>

              <h2 className="text-2xl font-bold mb-6">Curriculum</h2>
              <div className="space-y-4 mb-12">
                {curriculum.map((mod, i) => (
                  <Card key={i} className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{mod.title}</span>
                      <span className="text-sm text-muted">{mod.lessons} lessons</span>
                    </div>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6">FAQ</h2>
              <div className="space-y-4">
                {faq.map((item, i) => (
                  <Card key={i} className="p-6">
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted text-sm">{item.answer}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Card className="sticky top-28 p-8 gradient-border">
                <ContentImage
                  src={course.thumbnail ?? courseImages[course.slug] ?? images.coursePcb}
                  alt={course.title}
                  aspect="video"
                  className="rounded-[24px] mb-6"
                />
                <p className="text-3xl font-bold text-primary mb-2">{formatPrice(course.price)}</p>
                <p className="text-sm text-muted mb-6">Instructor: {course.instructor}</p>
                <EnrollButton slug={course.slug} className="w-full mb-3" />
                <Button variant="secondary" className="w-full" size="lg">Preview Course</Button>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  {["Lifetime access", "Certificate of completion", "Hands-on labs", "Community support"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />{item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
