import { getService } from "@/content/services";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "SPB Civil Work Cleaning Service";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({
    title: service ? `${service.title} in Bengaluru` : "Sump & tank cleaning in Bengaluru",
    subtitle: service ? `${service.price} · Varthur, Whitefield & east Bengaluru` : "Varthur, Whitefield & east Bengaluru",
  });
}
