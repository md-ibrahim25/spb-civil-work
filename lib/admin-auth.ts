// Password protection for /admin (browser login prompt, HTTP Basic auth).
// Set ADMIN_PASSWORD in Vercel → Settings → Environment Variables. Any username works.
// Without ADMIN_PASSWORD the admin pages are switched off entirely.

export const adminEnabled = () => Boolean(process.env.ADMIN_PASSWORD);

// Compare without leaking how many characters matched.
function safeEqual(a: string, b: string) {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

export function isAdminAuthorized(authorization: string | null) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !authorization?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(authorization.slice(6));
    const given = decoded.slice(decoded.indexOf(":") + 1);
    return safeEqual(given, password);
  } catch {
    return false;
  }
}
