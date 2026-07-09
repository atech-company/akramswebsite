/**
 * Resolve image URLs from the Laravel API for display on the frontend/admin.
 * Handles relative /storage paths and fixes localhost URLs in production.
 */
export function getApiOrigin(): string {
  const api = process.env.NEXT_PUBLIC_API_URL || "https://akramlab.atechleb.com/api/v1";
  return api.replace(/\/api\/v1\/?$/, "");
}

export function resolveMediaUrl(src?: string | null): string {
  if (!src) return "";

  const trimmed = src.trim();
  const apiOrigin = getApiOrigin();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (
      (trimmed.includes("localhost") || trimmed.includes("127.0.0.1")) &&
      apiOrigin &&
      !apiOrigin.includes("localhost")
    ) {
      try {
        const path = new URL(trimmed).pathname;
        return `${apiOrigin}${path}`;
      } catch {
        return trimmed;
      }
    }
    return trimmed;
  }

  if (trimmed.startsWith("/storage/")) {
    return `${apiOrigin}${trimmed}`;
  }

  if (trimmed.startsWith("storage/")) {
    return `${apiOrigin}/${trimmed}`;
  }

  return `${apiOrigin}/storage/${trimmed.replace(/^\/+/, "")}`;
}

export function isMediaUrl(src?: string | null): boolean {
  if (!src) return false;
  return src.includes("/storage/") || resolveMediaUrl(src).includes("/storage/");
}
