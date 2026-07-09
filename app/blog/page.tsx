import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/shared/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/data/mock";
import { formatDate } from "@/lib/utils";
import { ContentImage } from "@/components/shared/content-image";
import { blogImages, images } from "@/lib/data/images";

export default function BlogPage() {
  return (
    <>
      <PageHeader badge="Blog" title="Engineering Insights" description="Deep dives into embedded systems, robotics, IoT, and the future of hardware engineering." />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="group overflow-hidden hover:border-primary/20 h-full">
                  <ContentImage
                    src={post.thumbnail ?? blogImages[post.slug] ?? images.blogMicrocontroller}
                    alt={post.title}
                    aspect="video"
                  />
                  <CardContent className="p-6">
                    <p className="text-xs text-muted mb-2">{formatDate(post.published_at)} · {post.read_time} min read</p>
                    <h2 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">{post.title}</h2>
                    <p className="text-sm text-muted line-clamp-2">{post.excerpt}</p>
                    <div className="flex gap-2 mt-4">
                      {post.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
