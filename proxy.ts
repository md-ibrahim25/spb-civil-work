import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { areas } from "@/content/areas";
import { services } from "@/content/services";
import { adminEnabled, isAdminAuthorized } from "@/lib/admin-auth";

const known = {
  services: new Set(services.map((s) => s.slug)),
  areas: new Set(areas.map((a) => a.slug)),
};

const notFound = (request: NextRequest) => NextResponse.rewrite(new URL("/__not-found", request.url));

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");

  // /admin: ask for the password (browser login prompt). Off entirely without ADMIN_PASSWORD.
  if (section === "admin") {
    if (!adminEnabled()) return notFound(request);
    if (isAdminAuthorized(request.headers.get("authorization"))) return NextResponse.next();
    return new NextResponse("Login required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="SPB admin", charset="UTF-8"' },
    });
  }

  // Unknown /services/<slug> and /areas/<slug> addresses would otherwise stream the
  // "not found" page with a 200 status. Rewriting to a route that doesn't exist makes
  // Next.js serve the not-found page with a real 404, which search engines expect.
  if (known[section as keyof typeof known]?.has(slug)) return NextResponse.next();
  return notFound(request);
}

export const config = {
  matcher: ["/services/:slug", "/areas/:slug", "/admin/:path*"],
};
