import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getPortfolioProject } from "@/lib/data/content";
import { ContentImage } from "@/components/shared/content-image";

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);
  if (!project) notFound();

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/portfolio"><ArrowLeft className="h-4 w-4" /> Back to Portfolio</Link>
        </Button>
        <ContentImage src={project.thumbnail} alt={project.title} aspect="video" className="rounded-[24px] mb-12" />
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-primary mb-2">{project.client}</p>
            <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg text-muted leading-relaxed mb-8">{project.excerpt}</p>
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
            {project.result && (
              <>
                <h2 className="text-2xl font-bold mb-4">Result</h2>
                <Card className="p-6 border-primary/20">
                  <p className="text-lg">{project.result}</p>
                </Card>
              </>
            )}
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Project Details</h3>
              <dl className="space-y-3 text-sm">
                <div><dt className="text-muted">Client</dt><dd className="font-medium">{project.client}</dd></div>
                {project.category && (
                  <div><dt className="text-muted">Category</dt><dd className="font-medium">{project.category.name}</dd></div>
                )}
              </dl>
            </Card>
            <Button className="w-full" asChild><Link href="/contact">Start Your Project</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
