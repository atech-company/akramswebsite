import { apiFetch } from "@/lib/api/fetch";

type SettingValue = { text?: string } | string | Record<string, string>;

export interface SiteInfo {
  name: string;
  tagline: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  founded: number;
  links: {
    linkedin?: string;
    instructables?: string;
    pcbway?: string;
    bio?: string;
  };
}

function readSetting(settings: Record<string, SettingValue>, key: string, fallback = ""): string {
  const value = settings[key];
  if (!value) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "text" in value && typeof value.text === "string") {
    return value.text;
  }
  return fallback;
}

export async function getSiteInfo(): Promise<SiteInfo> {
  const settings = await apiFetch<Record<string, SettingValue>>("/settings");
  const social = (settings?.social_links ?? {}) as Record<string, string>;

  return {
    name: readSetting(settings ?? {}, "site_name", "AkramsLab"),
    tagline: readSetting(settings ?? {}, "site_tagline", "Embedded Systems · Robotics · IoT · PCB Design"),
    location: readSetting(settings ?? {}, "contact_location", "Lebanon"),
    phone: readSetting(settings ?? {}, "contact_phone", process.env.NEXT_PUBLIC_WHATSAPP || "+961 81 470 538"),
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || "96181470538",
    email: readSetting(settings ?? {}, "contact_email", "hello@akramslab.com"),
    founded: 2021,
    links: {
      linkedin: social.linkedin,
      instructables: social.instructables,
      bio: social.bio,
      pcbway: social.pcbway,
    },
  };
}
