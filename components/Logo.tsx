// Text logo with a water-drop mark. Swap for the client's logo file when available.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden>
        <rect width="64" height="64" rx="14" fill="#0b3d91" />
        <path d="M32 8 C24 20 16 29 16 38 a16 16 0 0 0 32 0 C48 29 40 20 32 8z" fill="#38bdf8" />
        <text x="32" y="45" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#fff">
          SPB
        </text>
      </svg>
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
