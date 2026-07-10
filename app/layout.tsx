import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ChunkErrorRecovery } from "@/components/shared/chunk-error-recovery";
import { SiteShell } from "@/components/layout/site-shell";
import { RegistrationProvider } from "@/components/course-registration/registration-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryProvider } from "@/providers/query-provider";
import { getSiteInfo } from "@/lib/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://akramslab.computechsleb.com"),
  title: {
    default: "AkramsLab — Embedded Systems, Robotics & IoT Engineering",
    template: "%s | AkramsLab",
  },
  description:
    "Premium embedded systems engineering, robotics, IoT, and PCB design services. World-class training for engineers who build the future.",
  keywords: ["embedded systems", "robotics", "IoT", "PCB design", "firmware", "engineering training"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AkramsLab",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://akramslab.computechsleb.com",
  },
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteInfo = await getSiteInfo();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ChunkErrorRecovery />
        <ThemeProvider>
          <QueryProvider>
            <RegistrationProvider>
              <SiteShell siteInfo={siteInfo}>{children}</SiteShell>
            </RegistrationProvider>
            <Toaster theme="dark" position="bottom-right" richColors />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
