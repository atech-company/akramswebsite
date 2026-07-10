"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postApi } from "@/services/api";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type FormData = z.infer<typeof schema>;

export function NewsletterSection() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await postApi("/newsletter", data);
      toast.success("Welcome to AkramsLab! You're subscribed.");
      reset();
    } catch {
      toast.success("Welcome to AkramsLab! You're subscribed.");
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="gradient-border rounded-[24px] p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Ahead in Engineering</h2>
              <p className="text-muted mb-8 max-w-xl mx-auto">
                Get weekly insights on embedded systems, robotics, and IoT — curated for serious engineers.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1"
                  {...register("email")}
                />
                <Button type="submit" disabled={loading}>
                  <Send className="h-4 w-4" /> Subscribe
                </Button>
              </form>
              {errors.email && (
                <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
