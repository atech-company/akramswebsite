import type { Metadata } from "next";
import { QueryProvider } from "@/providers/query-provider";
import "./admin.css";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  title: "Admin",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
