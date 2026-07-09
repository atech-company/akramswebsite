"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAdminUser } from "@/services/admin-api";

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminHeader({ title, description }: { title: string; description?: string }) {
  const user = getAdminUser();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted text-sm mt-1">{description}</p>}
      </div>
      {user && (
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl glass text-sm">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
            {user.name?.charAt(0) ?? "A"}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted capitalize">{user.role}</p>
          </div>
        </div>
      )}
    </header>
  );
}
