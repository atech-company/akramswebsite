import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProduct } from "@/lib/data/content";
import { formatPrice } from "@/lib/utils";
import { ContentImage } from "@/components/shared/content-image";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const specs = product.specifications ?? {};

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/products"><ArrowLeft className="h-4 w-4" /> All Products</Link>
        </Button>
        <div className="grid lg:grid-cols-2 gap-16">
          <ContentImage src={product.thumbnail} alt={product.title} aspect="square" className="rounded-[24px] gradient-border" />
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-3xl font-bold text-primary mb-6">{formatPrice(product.price)}</p>
            <p className="text-muted leading-relaxed mb-8">{product.excerpt}</p>
            <div className="flex gap-4 mb-12">
              {product.buy_url ? (
                <Button size="lg" asChild>
                  <a href={product.buy_url} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="h-4 w-4" /> Buy Now
                  </a>
                </Button>
              ) : (
                <Button size="lg"><ShoppingCart className="h-4 w-4" /> Buy Now</Button>
              )}
              <Button size="lg" variant="secondary"><Download className="h-4 w-4" /> Datasheet</Button>
            </div>
            {Object.keys(specs).length > 0 && (
              <>
                <h2 className="text-xl font-bold mb-4">Specifications</h2>
                <Card className="divide-y divide-white/8">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-4 text-sm">
                      <span className="text-muted">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
