import type { ReactNode, SVGProps } from "react";
import type { ServiceIcon } from "@/content/services";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function DropIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c-3.5 5-6 8.4-6 11.5a6 6 0 0 0 12 0C18 11.4 15.5 8 12 3z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  );
}

const servicePaths: Record<ServiceIcon, ReactNode> = {
  // Underground sump: ground line with a box below and water inside.
  sump: (
    <>
      <path d="M2 8h20" />
      <path d="M6 8v11h12V8" />
      <path d="M6 14c2-1.2 4 1.2 6 0s4 1.2 6 0" />
      <path d="M10 8V5h4v3" />
    </>
  ),
  // Overhead tank: cylinder with lid.
  tank: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.2" />
      <path d="M5 6v11c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2V6" />
      <path d="M5 11c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2" />
    </>
  ),
  // Pipe with flow.
  pipe: (
    <>
      <path d="M3 9h10a3 3 0 0 1 3 3v9" />
      <path d="M3 14h7a1 1 0 0 1 1 1v6" />
      <path d="M3 7v9M14 21h4" />
      <path d="M19 4c-1 1.5-2 2.6-2 3.6a2 2 0 0 0 4 0c0-1-1-2.1-2-3.6z" />
    </>
  ),
  // Trowel sealing a crack.
  grout: (
    <>
      <path d="M3 20h18" />
      <path d="M6 20l2-3 2 2 2-3" />
      <path d="M13 13l6-6 2 2-6 6z" />
      <path d="M13 13l-2 2" />
    </>
  ),
  // Paint roller.
  paint: (
    <>
      <rect x="3" y="3" width="14" height="5" rx="1.5" />
      <path d="M17 5.5h3V11h-8v3" />
      <rect x="10.5" y="14" width="3" height="7" rx="1" />
    </>
  ),
  // Toilet with sparkle.
  toilet: (
    <>
      <path d="M5 4h6v6H5z" />
      <path d="M4 10h14a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
      <path d="M8 15l-1 5h8l-1-5" />
      <path d="M19 3v4M17 5h4" />
    </>
  ),
};

export function ServiceIconSvg({ icon, ...props }: IconProps & { icon: ServiceIcon }) {
  return (
    <svg {...base} {...props}>
      {servicePaths[icon]}
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </svg>
  );
}
