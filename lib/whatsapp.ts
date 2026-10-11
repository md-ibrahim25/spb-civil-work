import { site } from "@/content/site";

// Builds a wa.me link that opens WhatsApp with `message` pre-filled.
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/91${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
