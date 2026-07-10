"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Cpu, Loader2 } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLogin } from "@/services/admin-api";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: { email: "admin@akramslab.com", password: "password" } });

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      await adminLogin(data.email.trim(), data.password);
      toast.success("Welcome back!");
      router.push("/admin");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          toast.error("Cannot reach the API. Start the backend: php artisan serve");
        } else if (err.response.status === 422) {
          toast.error("Invalid email or password");
        } else if (err.response.status === 419) {
          toast.error("Session expired. Please refresh and try again.");
        } else {
          toast.error(err.response.data?.message ?? "Login failed");
        }
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 border border-primary/25 mb-4 glow-primary">
            <Cpu className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">AkramsLab <span className="text-primary">CMS</span></h1>
          <p className="text-muted text-sm mt-2">Sign in to manage your content</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass rounded-[24px] p-8 space-y-5">
          <div>
            <label className="text-sm text-muted mb-2 block">Email</label>
            <Input type="email" {...register("email")} placeholder="admin@akramslab.com" />
          </div>
          <div>
            <label className="text-sm text-muted mb-2 block">Password</label>
            <Input type="password" {...register("password")} placeholder="••••••••" />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
          </Button>
          <p className="text-xs text-muted text-center pt-1">
            Default: admin@akramslab.com / password — backend must run on port 8000
          </p>
        </form>
      </div>
    </div>
  );
}
