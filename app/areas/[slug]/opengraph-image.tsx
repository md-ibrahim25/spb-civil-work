import { getArea } from "@/content/areas";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "SPB Civil Work Cleaning Service";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = getArea(slug);
  return renderOgImage({
    title: `Sump & tank cleaning in ${area?.name ?? "Bengaluru"}`,
    subtitle: "Sludge removal · Disinfection · Pressure wash · From ₹500",
  });
}
