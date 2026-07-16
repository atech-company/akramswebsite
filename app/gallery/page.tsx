import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/shared/motion";
import { ContentImage } from "@/components/shared/content-image";
import { getGalleryItems } from "@/lib/data/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery — Boards, Workshops & Engineering Projects",
  description:
    "See inside AkramsLab: custom boards, workshops, university webinars, and engineering projects from Lebanon.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <>
      <PageHeader badge="Gallery" title="Inside AkramsLab" description="Our boards, workshops, university webinars, and engineering projects in Lebanon." />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.03}>
                <div className="group relative rounded-[24px] overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
                  <ContentImage src={item.image} alt={item.title} aspect="square" overlay={false} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted capitalize">{item.category}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
