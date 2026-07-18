import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand cache bust for CMS edits.
 * POST { secret, paths?: string[], tags?: string[] }
 * Or GET ?secret=...&path=/blog
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      secret?: string;
      paths?: string[];
      tags?: string[];
      resource?: string;
    };

    if (!isAuthorized(body.secret, request)) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const paths = body.paths?.length ? body.paths : pathsForResource(body.resource);
    const tags = body.tags?.length ? body.tags : tagsForResource(body.resource);

    for (const tag of tags) {
      revalidateTag(tag);
    }
    for (const path of paths) {
      revalidatePath(path);
    }
    // Always refresh the shared layout (site settings, nav shell)
    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, paths, tags, now: Date.now() });
  } catch {
    return NextResponse.json({ message: "Revalidation failed" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret") ?? undefined;
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  const resource = request.nextUrl.searchParams.get("resource") ?? undefined;

  if (!isAuthorized(secret, request)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const paths = path ? [path] : pathsForResource(resource);
  const tags = tagsForResource(resource);

  for (const tag of tags) {
    revalidateTag(tag);
  }
  for (const p of paths) {
    revalidatePath(p);
  }
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, paths, tags, now: Date.now() });
}

function isAuthorized(secret: string | undefined, request: NextRequest): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false;
  const header = request.headers.get("x-revalidate-secret");
  return secret === expected || header === expected;
}

function pathsForResource(resource?: string | null): string[] {
  switch (resource) {
    case "blog":
      return ["/", "/blog"];
    case "courses":
      return ["/", "/courses"];
    case "products":
      return ["/", "/products"];
    case "portfolio":
      return ["/", "/portfolio"];
    case "services":
      return ["/", "/services"];
    case "events":
      return ["/", "/events"];
    case "gallery":
      return ["/", "/gallery"];
    case "careers":
      return ["/", "/careers"];
    case "partners":
    case "testimonials":
    case "team":
    case "faqs":
    case "categories":
    case "settings":
      return ["/"];
    default:
      return ["/", "/blog", "/courses", "/products", "/portfolio", "/services"];
  }
}

function tagsForResource(resource?: string | null): string[] {
  if (!resource) return ["cms"];
  return ["cms", `cms:${resource}`];
}
