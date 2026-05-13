import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, { box: string; icon: number }> = {
  sm: { box: "h-7 w-7 rounded-lg", icon: 20 },
  md: { box: "h-8 w-8 rounded-lg", icon: 24 },
  lg: { box: "h-10 w-10 rounded-xl", icon: 28 },
};

function FreereelsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <rect
        width={21.748}
        height={33.645}
        x={13.156}
        y={6.847}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        rx={5.877}
        ry={5.877}
        strokeWidth={1}
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="m13.466 10.853l-3.524.563c-2.851.453-4.807 3.15-4.343 6l2.542 16a5.22 5.22 0 0 0 5.944 4.353m20.51-26.916l3.525.563c2.851.453 4.807 3.15 4.343 6l-2.542 16a5.22 5.22 0 0 1-5.944 4.353M28.743 22.58l-6.84-4.148a1.08 1.08 0 0 0-1.64.924v8.294c0 .842.92 1.36 1.64.924l6.84-4.147a1.08 1.08 0 0 0 0-1.848Z"
      />
    </svg>
  );
}

interface AppLogoProps {
  size?: Size;
  showLabel?: boolean;
  labelClassName?: string;
  className?: string;
  inverted?: boolean;
}

export default function AppLogo({
  size = "md",
  showLabel = true,
  labelClassName,
  className,
  inverted = false,
}: AppLogoProps) {
  const { box, icon } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "bg-[rgb(var(--primary))] flex shrink-0 items-center justify-center text-white",
          box,
        )}
      >
        <FreereelsIcon width={icon} height={icon} />
      </div>
      {showLabel && (
        <span
          className={cn(
            "text-[15px] font-semibold tracking-tight",
            !inverted && "text-[rgb(var(--foreground))]",
            labelClassName,
          )}
          style={inverted ? { color: "rgb(var(--auth-panel-text))" } : undefined}
        >
          FacelessReels
        </span>
      )}
    </div>
  );
}
