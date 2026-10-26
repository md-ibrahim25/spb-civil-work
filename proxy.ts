import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { areas } from "@/content/areas";
import { services } from "@/content/services";

const known = {
  services: new Set(services.map((s) => s.slug)),
  areas: new Set(areas.map((a) => a.slug)),
};

// Unknown /services/<slug> and /areas/<slug> addresses would otherwise stream the
// "not found" page with a 200 status. Rewriting to a route that doesn't exist makes
// Next.js serve the not-found page with a real 404, which search engines expect.
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (known[section as keyof typeof known]?.has(slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/services/:slug", "/areas/:slug"],
};
