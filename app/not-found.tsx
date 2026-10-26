import Link from "next/link";
import { Container, PageHero } from "@/components/Section";
import { services } from "@/content/services";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        title="Page not found"
        intro="The page you're looking for doesn't exist or has moved. These might help:"
      />
      <section className="py-16">
        <Container>
          <ul className="flex flex-wrap gap-3">
            {[{ href: "/", label: "Home" }, ...services.slice(0, 2).map((s) => ({ href: `/services/${s.slug}`, label: s.title })), { href: "/pricing", label: "Prices" }, { href: "/contact", label: "Book a cleaning" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block rounded-2xl bg-surface px-5 py-3 font-semibold text-brand ring-1 ring-slate-200 hover:bg-water-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
