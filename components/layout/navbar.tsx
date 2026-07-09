"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StartLearningButton } from "@/components/course-registration/start-learning-button";
import { navLinks } from "@/lib/data/mock";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3 glass shadow-lg" : "py-5 bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 group-hover:glow-primary transition-all">
            <Cpu className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Akrams<span className="text-primary">Lab</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 text-sm rounded-2xl transition-all duration-300",
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/contact">Get Quote</Link>
          </Button>
          <StartLearningButton size="sm">Start Learning</StartLearningButton>
        </div>

        <button
          className="lg:hidden p-2 rounded-2xl hover:bg-white/5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/8 mt-3"
          >
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-2xl text-sm transition-colors",
                    pathname === link.href ? "text-primary bg-primary/10" : "text-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <StartLearningButton className="mt-4" onClick={() => setMobileOpen(false)}>
                Start Learning
              </StartLearningButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
