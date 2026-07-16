const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://akramlab.atechleb.com/api/v1";

/** Always fetch live CMS data — no stale cache after admin edits/deletes */
export async function apiFetch<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (typeof value === "string" && value.trim()) {
    return value.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
  }
  return [];
}
