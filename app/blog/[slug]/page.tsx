import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBlogPost, getBlogPosts } from "@/lib/data/content";
import { formatDate } from "@/lib/utils";
import { ContentImage } from "@/components/shared/content-image";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, breadcrumbJsonLd, buildPageMetadata, SITE_NAME, toAbsoluteImage } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Article Not Found" };

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt || `Read ${post.title} on the ${SITE_NAME} engineering blog.`,
    path: `/blog/${post.slug}`,
    image: post.thumbnail,
    type: "article",
    keywords: [...(post.tags ?? []), "embedded systems", "engineering blog", SITE_NAME],
    publishedTime: post.published_at,
    authors: post.author?.name ? [post.author.name] : [SITE_NAME],
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const content = post.content || `# ${post.title}\n\n${post.excerpt}`;

  const allPosts = await getBlogPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="pt-32 pb-24">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: toAbsoluteImage(post.thumbnail),
            datePublished: post.published_at,
            author: {
              "@type": "Person",
              name: post.author?.name || SITE_NAME,
            },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              url: absoluteUrl("/"),
            },
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            keywords: post.tags?.join(", "),
            wordCount: content.split(/\s+/).length,
            timeRequired: `PT${post.read_time || 5}M`,
          },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/blog"><ArrowLeft className="h-4 w-4" /> Back to Blog</Link>
        </Button>
        <div className="flex gap-2 mb-4">
          {post.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-muted mb-8">
          {formatDate(post.published_at)} · {post.read_time} min read · {post.author?.name}
        </p>
        <ContentImage src={post.thumbnail} alt={post.title} aspect="video" className="rounded-[24px] mb-12" />
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-code:text-primary">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>

        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/8">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="text-primary hover:underline">{r.title}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
