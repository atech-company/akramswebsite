import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn, HoverLift } from "@/components/shared/motion";
import { Card } from "@/components/ui/card";
import { getProducts } from "@/lib/data/content";
import { formatPrice } from "@/lib/utils";
import { ContentImage } from "@/components/shared/content-image";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Engineering Hardware Products — Boards, Kits & Tools",
  description:
    "Professional development boards, sensor kits, and engineering tools built by AkramsLab — hardware made by engineers, for engineers.",
  path: "/products",
  keywords: ["development boards", "sensor kits", "engineering hardware", "PCB products", "AkramsLab shop"],
});

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <PageHeader badge="Products" title="Engineering Hardware" description="Professional development boards, sensor kits, and tools built by engineers, for engineers." />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.1}>
              <HoverLift>
                <Link href={`/products/${product.slug}`}>
                  <Card className="group overflow-hidden hover:border-primary/20 h-full">
                    <ContentImage src={product.thumbnail} alt={product.title} aspect="square" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{product.title}</h3>
                      <p className="text-muted text-sm mt-2">{product.excerpt}</p>
                      <p className="text-primary font-bold text-lg mt-4">{formatPrice(product.price)}</p>
                    </div>
                  </Card>
                </Link>
              </HoverLift>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
