import { Calendar, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/shared/motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEvents } from "@/lib/data/content";
import { formatDate, formatPrice } from "@/lib/utils";
import { ContentImage } from "@/components/shared/content-image";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader badge="Events" title="Upcoming Events" description="Workshops, summits, and hands-on sessions for the engineering community." />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-6">
          {events.map((event, i) => (
            <FadeIn key={event.id} delay={i * 0.1}>
              <Card className="p-8 flex flex-col md:flex-row gap-6 hover:border-primary/20 transition-all group">
                <ContentImage
                  src={event.thumbnail}
                  alt={event.title}
                  aspect="video"
                  className="w-full md:w-48 shrink-0 rounded-[24px]"
                />
                <div className="flex-1">
                  {event.is_featured && <Badge className="mb-2">Featured</Badge>}
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{event.title}</h2>
                  <p className="text-muted mt-2">{event.excerpt}</p>
                  <div className="flex gap-6 mt-4 text-sm text-muted">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(event.starts_at)}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{event.location}</span>
                    <span className="text-primary font-medium">{Number(event.price) === 0 ? "Free" : formatPrice(Number(event.price))}</span>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
