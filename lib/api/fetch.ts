const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://akramlab.atechleb.com/api/v1";

/** Seconds — public CMS data is fresh enough within this window */
const DEFAULT_REVALIDATE = 120;

/**
 * Fetch CMS data with ISR caching (default 2 min).
 * Pass `revalidate: 0` or `cache: "no-store"` only when live data is required.
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: { revalidate?: number | false }
): Promise<T | null> {
  try {
    const revalidate = options?.revalidate;
    const init: RequestInit & { next?: { revalidate?: number } } =
      revalidate === 0 || revalidate === false
        ? { cache: "no-store" }
        : { next: { revalidate: revalidate ?? DEFAULT_REVALIDATE } };

    const res = await fetch(`${API_URL}${endpoint}`, init);
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
