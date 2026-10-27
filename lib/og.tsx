import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { images } from "@/content/images";
import { site, formatPhone } from "@/content/site";

// Share preview image (WhatsApp, Facebook, Google): job photo, dark overlay, title and phone.
export const ogSize = { width: 1200, height: 630 };

export async function renderOgImage({ title, subtitle }: { title: string; subtitle: string }) {
  const [photo, emblem, archivo] = await Promise.all([
    readFile(join(process.cwd(), "public", images.hero.home)),
    readFile(join(process.cwd(), "public", images.emblem)),
    readFile(join(process.cwd(), "node_modules/@fontsource/archivo/files/archivo-latin-800-normal.woff")),
  ]);
  // Archivo has no ₹ glyph, so spell it out in the image.
  const rupees = (text: string) => text.replace(/₹/g, "Rs. ");
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const emblemSrc = `data:image/png;base64,${emblem.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Archivo" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img src={photoSrc} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, rgba(6,20,43,0.97) 0%, rgba(6,20,43,0.88) 55%, rgba(6,20,43,0.3) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
            <img src={emblemSrc} alt="" width={84} height={84} />
            <div style={{ display: "flex", flexDirection: "column", color: "white", fontSize: 24, lineHeight: 1.1 }}>
              <span>SPB CIVIL WORK</span>
              <span style={{ color: "#22d3ee", fontSize: 18 }}>CLEANING SERVICE</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div style={{ color: "white", fontSize: 68, lineHeight: 1.05, letterSpacing: -1.5 }}>{rupees(title)}</div>
            <div style={{ color: "#bae6fd", fontSize: 30, marginTop: 20 }}>{rupees(subtitle)}</div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ display: "flex", background: "#16a34a", color: "white", fontSize: 28, padding: "12px 24px", borderRadius: 14 }}>
              WhatsApp / Call {formatPhone(site.contact.whatsapp)}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }],
    },
  );
}
