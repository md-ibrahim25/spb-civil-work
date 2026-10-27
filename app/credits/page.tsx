import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHero } from "@/components/Section";
import { credits } from "@/content/credits";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Photo credits",
  description: `Credits for openly licensed photos used on the ${site.name} website.`,
  alternates: { canonical: "/credits" },
  robots: { index: false, follow: true },
};

export default function CreditsPage() {
  return (
    <>
      <PageHero
        title="Photo credits"
        intro="Our before/after and gallery photos are from our own jobs. These other photos are openly licensed. Thank you to their photographers."
      />
      <section className="py-16">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2">
            {credits.map((c) => (
              <li key={c.file} className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <Image src={c.file} alt="" width={120} height={80} className="h-20 w-28 shrink-0 rounded-lg object-cover" />
                <p className="text-sm text-muted">
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:underline">
                    {c.title}
                  </a>
                  <br />
                  by {c.creator},{" "}
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license" className="text-brand hover:underline">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                  <br />
                  <span className="text-xs">Resized and colour-overlaid for this site.</span>
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
