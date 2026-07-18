const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://akramlab.atechleb.com/api/v1";

/** Fallback TTL — admin mutations also trigger on-demand revalidation */
const DEFAULT_REVALIDATE = 30;

/**
 * Fetch CMS data with short ISR + cache tags.
 * Admin save/delete calls /api/revalidate so changes show immediately.
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: { revalidate?: number | false; tags?: string[] }
): Promise<T | null> {
  try {
    const revalidate = options?.revalidate;
    const tags = options?.tags ?? tagsFromEndpoint(endpoint);

    const init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } =
      revalidate === 0 || revalidate === false
        ? { cache: "no-store" }
        : {
            next: {
              revalidate: revalidate ?? DEFAULT_REVALIDATE,
              tags,
            },
          };

    const res = await fetch(`${API_URL}${endpoint}`, init);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function tagsFromEndpoint(endpoint: string): string[] {
  const path = endpoint.split("?")[0] ?? endpoint;
  const segment = path.replace(/^\//, "").split("/")[0] || "cms";
  return ["cms", `cms:${segment}`];
}

export function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (typeof value === "string" && value.trim()) {
    return value.split(/[,|]/).map((s) => s.trim()).filter(Boolean);
  }
  return [];
}
