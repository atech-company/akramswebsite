"use client";

import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { FadeIn, HoverLift } from "@/components/shared/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { portfolio, products, testimonials, blogPosts, partners } from "@/lib/data/mock";
import { formatDate, formatPrice } from "@/lib/utils";
import { ContentImage } from "@/components/shared/content-image";
import { portfolioImages, productImages, blogImages, images } from "@/lib/data/images";
import Image from "next/image";

export function PortfolioSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Badge variant="accent" className="mb-4">Our Work</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Projects</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/portfolio">View Portfolio <ArrowRight className="ml-1" /></Link>
          </Button>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolio.filter((p) => p.is_featured).map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <HoverLift>
                <Link href={`/portfolio/${project.slug}`}>
                  <Card className="group overflow-hidden hover:border-primary/20 h-full">
                    <ContentImage
                      src={project.thumbnail ?? portfolioImages[project.slug] ?? images.roboticChassis}
                      alt={project.title}
                      aspect="4/3"
                    />
                    <CardContent className="p-6">
                      <p className="text-xs text-primary mb-2">{project.client}</p>
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-sm text-muted line-clamp-2">{project.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              </HoverLift>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductsSection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <Badge className="mb-4">Hardware Products</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Engineering Tools</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.filter((p) => p.is_featured).map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.1}>
              <HoverLift>
                <Link href={`/products/${product.slug}`}>
                  <Card className="group hover:border-primary/20 h-full p-6">
                    <ContentImage
                      src={product.thumbnail ?? productImages[product.slug] ?? images.easyboard}
                      alt={product.title}
                      aspect="square"
                      className="rounded-[24px] mb-4"
                    />
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{product.title}</h3>
                    <p className="text-sm text-muted mt-2">{product.excerpt}</p>
                    <p className="text-primary font-bold mt-4">{formatPrice(product.price)}</p>
                  </Card>
                </Link>
              </HoverLift>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What Engineers Say</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.1}>
              <Card className="p-8 h-full">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted">{t.role}, {t.company}</p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section className="py-16 border-y border-white/8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-xs text-muted uppercase tracking-widest mb-8">Technology Partners</p>
        <div className="flex flex-wrap justify-center gap-12 items-center opacity-70">
          {partners.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              {"logo" in p && p.logo ? (
                <Image src={p.logo} alt={p.name} width={40} height={40} className="rounded-lg object-contain" />
              ) : null}
              <span className="text-sm font-semibold">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogPreviewSection() {
  return (
    <section className="py-24 bg-card/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-bold tracking-tight">Latest Insights</h2>
          <Button variant="outline" asChild>
            <Link href="/blog">View Blog <ArrowRight className="ml-1" /></Link>
          </Button>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="group hover:border-primary/20 h-full overflow-hidden">
                  <ContentImage
                    src={post.thumbnail ?? blogImages[post.slug] ?? images.blogMicrocontroller}
                    alt={post.title}
                    aspect="video"
                  />
                  <CardContent className="p-6">
                    <p className="text-xs text-muted mb-2">{formatDate(post.published_at)}</p>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted mt-2 line-clamp-2">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
