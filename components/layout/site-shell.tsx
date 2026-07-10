"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { SiteInfo } from "@/lib/data/site";

export function SiteShell({ children, siteInfo }: { children: React.ReactNode; siteInfo: SiteInfo }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer siteInfo={siteInfo} />
    </>
  );
}
