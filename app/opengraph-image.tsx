import { ogSize, renderOgImage } from "@/lib/og";
import { prices } from "@/content/pricing";

export const alt = "SPB Civil Work Cleaning Service: sump & tank cleaning in Bengaluru";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Sump & tank cleaning in Varthur, Bengaluru",
    subtitle: `Sludge removal · Disinfection · Pressure wash · From ${prices.from}`,
  });
}
