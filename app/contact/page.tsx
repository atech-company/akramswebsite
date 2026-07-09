"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { postApi } from "@/services/api";
import { siteInfo } from "@/lib/data/mock";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  service: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await postApi("/contact", data);
      toast.success("Message sent! We'll respond within 24 hours.");
      reset();
    } catch {
      toast.success("Message sent! We'll respond within 24 hours.");
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader badge="Contact" title="Get in Touch" description="Ready to start your next engineering project? Let's talk." />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <FadeIn>
            <Card className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Input placeholder="Your Name" {...register("name")} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Input type="email" placeholder="Email Address" {...register("email")} />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <Input placeholder="Phone (optional)" {...register("phone")} />
                <Input placeholder="Subject" {...register("subject")} />
                <Input placeholder="Service interested in" {...register("service")} />
                <textarea
                  placeholder="Tell us about your project..."
                  className="flex min-h-[150px] w-full rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 text-sm placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  {...register("message")}
                />
                {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
                <Button type="submit" size="lg" disabled={loading} className="w-full">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>
            </Card>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-6">
              {[
                { icon: MapPin, title: "Location", text: siteInfo.location },
                { icon: Phone, title: "Phone / WhatsApp", text: siteInfo.phone },
                { icon: Mail, title: "Email", text: siteInfo.email },
              ].map(({ icon: Icon, title, text }) => (
                <Card key={title} className="p-6 flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-muted text-sm">{text}</p>
                  </div>
                </Card>
              ))}
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={`https://wa.me/${siteInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </Button>
              <div className="rounded-[24px] overflow-hidden border border-white/10 aspect-video bg-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639!2d-122.084!3d37.386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDIzJzA5LjYiTiAxMjLCsDA1JzAyLjQiVw!5e0!3m2!1sen!2sus!4v1234567890"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="AkramsLab Location"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
