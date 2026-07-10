import { FadeIn } from "@/components/shared/motion";
import { Badge } from "@/components/ui/badge";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <FadeIn>
          {badge && <Badge className="mb-4">{badge}</Badge>}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{title}</h1>
          {description && (
            <p className="text-lg text-muted max-w-2xl mx-auto">{description}</p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
