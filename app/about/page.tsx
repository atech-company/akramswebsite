import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/shared/motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTeam } from "@/lib/data/content";
import { getSiteInfo } from "@/lib/data/site";
import Image from "next/image";
import { ContentImage } from "@/components/shared/content-image";
import { resolveMediaUrl } from "@/lib/media-url";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About AkramsLab — Made in Lebanon",
  description:
    "AkramsLab specializes in AVR microcontrollers, control boards, PCB design, and hands-on electronics training for engineers in Lebanon and beyond.",
  path: "/about",
  keywords: ["about AkramsLab", "Lebanon electronics lab", "PCB design team", "AVR training Lebanon"],
});

export default async function AboutPage() {
  const [team, siteInfo] = await Promise.all([getTeam(), getSiteInfo()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader
        badge={`Founded ${siteInfo.founded}`}
        title="AkramsLab — Made in Lebanon"
        description="At the forefront of electrical and electronics engineering — specializing in AVR microcontrollers, control boards, and PCB design."
      />
      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted leading-relaxed mb-4">
                  AkramsLab offers comprehensive courses tailored to aspiring engineers and seasoned professionals. Our hands-on training programs empower individuals with the skills needed to excel in electronics — from AVR programming to custom PCB manufacturing.
                </p>
                <p className="text-muted leading-relaxed mb-4">
                  Beyond education, we collaborate with individuals, universities, and companies to develop cutting-edge projects. Whether designing intricate PCB layouts or advanced control systems, we bring ideas to life with precision.
                </p>
                <p className="text-muted leading-relaxed">
                  Founded in {siteInfo.founded} by <strong className="text-foreground">Eng. Akram Hussein</strong> — Electrical Engineer, Arduino Certified Instructor, and Microsoft Innovative Educator Expert — AkramsLab has trained 500+ students and delivered 70+ real engineering projects.
                </p>
              </div>
              {team[0]?.avatar && (
                <ContentImage src={team[0].avatar} alt={team[0].name} aspect="square" className="rounded-[24px] gradient-border" />
              )}
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-4">Leadership</h2>
            <p className="text-center text-muted mb-12 max-w-2xl mx-auto">
              Arduino Certified Instructor · Microsoft Innovative Educator Expert 2022–2023 · EdTech Syndicate Lebanon · Patent Granted
            </p>
            <div className="grid md:grid-cols-1 max-w-lg mx-auto gap-8">
              {team.map((member) => (
                <Card key={member.id} className="p-8 text-center hover:border-primary/20 transition-all">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary/30">
                    {member.avatar ? (
                      <Image
                        src={resolveMediaUrl(member.avatar)}
                        alt={member.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <Badge variant="secondary" className="mt-2">{member.role}</Badge>
                  <p className="text-sm text-muted mt-4 leading-relaxed">{member.bio}</p>
                </Card>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
