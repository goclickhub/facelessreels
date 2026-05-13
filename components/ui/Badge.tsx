import { cn } from "@/lib/utils";

interface BadgeProps {
  count: number;
  active?: boolean;
  className?: string;
}

export function Badge({ count, active, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-[10px] font-bold px-1.5 py-1 rounded-md min-w-4.5 text-center leading-none",
        active
          ? "bg-white/25 text-white"
          : "bg-[rgb(var(--foreground))] text-[rgb(var(--card))]",
        className,
      )}
    >
      {count}
    </span>
  );
}
