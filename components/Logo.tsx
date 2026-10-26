import Image from "next/image";
import { images } from "@/content/images";

// Round emblem from the client's badge, with the business name beside it.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Image src={images.emblem} alt="" width={44} height={44} className="h-11 w-11" />
      <span className="leading-tight">
        <span className={`block text-sm font-extrabold tracking-tight ${light ? "text-white" : "text-brand"}`}>
          SPB CIVIL WORK
        </span>
        <span className={`block text-[11px] font-semibold uppercase tracking-wider ${light ? "text-water" : "text-alert"}`}>
          Cleaning Service
        </span>
      </span>
    </span>
  );
}
