import { ServiceIconSvg } from "@/components/Icons";
import { formatRupees, type PriceRow } from "@/content/pricing";
import type { ServiceIcon } from "@/content/services";

export function PriceTable({
  caption,
  captionKn,
  icon,
  rows,
}: {
  caption: string;
  captionKn: string;
  icon: ServiceIcon;
  rows: PriceRow[];
}) {
  return (
    <div className="reveal overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
      <table className="w-full text-left">
        <caption className="px-6 pt-6 text-left">
          <span className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-water-light text-brand">
              <ServiceIconSvg icon={icon} className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold text-ink">{caption}</span>
              <span lang="kn" className="block font-kannada text-sm text-brand">
                {captionKn}
              </span>
            </span>
          </span>
        </caption>
        <thead className="text-xs uppercase tracking-wider text-muted">
          <tr>
            <th scope="col" className="px-6 pb-2 pt-5 font-semibold">Capacity</th>
            <th scope="col" className="px-6 pb-2 pt-5 text-right font-semibold">Price</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-100 transition-colors hover:bg-surface">
              <td className="px-6 py-3.5 font-medium text-ink">{r.label}</td>
              <td className="px-6 py-3.5 text-right font-display text-xl font-bold text-brand">{formatRupees(r.price)}</td>
            </tr>
          ))}
          <tr className="border-t border-slate-100">
            <td className="px-6 py-3.5 text-muted">Other sizes</td>
            <td className="px-6 py-3.5 text-right font-semibold text-alert">Call for price</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
