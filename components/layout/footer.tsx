import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { BrandWordmark } from "@/components/shared/brand-wordmark";
import { navLinks } from "@/lib/config/navigation";
import type { SiteInfo } from "@/lib/data/site";

const footerLinks = {
  company: [
    { href: "/about", label: "About" },
    { href: "/careers", label: "Careers" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
  ],
  resources: [
    { href: "/courses", label: "Courses" },
    { href: "/blog", label: "Blog" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/products", label: "Products" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer({ siteInfo }: { siteInfo: SiteInfo }) {
  const socialLinks = [
    siteInfo.links.linkedin,
    siteInfo.links.bio,
    siteInfo.links.instructables,
    siteInfo.email ? `mailto:${siteInfo.email}` : null,
  ].filter(Boolean) as string[];

  return (
    <footer className="border-t border-white/8 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <BrandLogo size={72} className="border border-primary/20 shrink-0" />
              <BrandWordmark size="lg" />
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-sm mb-6">
              {siteInfo.tagline} — hands-on robotics training since {siteInfo.founded}.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((href) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all"
                  aria-label="Social link"
                >
                  <Mail className="h-4 w-4 text-muted hover:text-primary" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 capitalize">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                {siteInfo.location}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {siteInfo.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {siteInfo.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {navLinks.slice(0, 4).map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-muted hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
