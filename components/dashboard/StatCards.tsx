import { cn } from "@/lib/utils";
import { NavIcon } from "@/lib/icons";
import { STAT_CARDS } from "@/lib/data";
import type { StatCard } from "@/types";

const colorMap: Record<
  StatCard["color"],
  { bg: string; label: string; value: string }
> = {
  pink: {
    bg: "bg-[rgb(var(--stat-pink))]",
    label: "text-neutral-900 dark:text-rose-300",
    value: "text-neutral-900 dark:text-rose-100",
  },
  yellow: {
    bg: "bg-[rgb(var(--stat-yellow))]",
    label: "text-neutral-900 dark:text-amber-300",
    value: "text-neutral-900 dark:text-amber-100",
  },
  green: {
    bg: "bg-[rgb(var(--stat-green))]",
    label: "text-neutral-900 dark:text-green-300",
    value: "text-neutral-900 dark:text-green-100",
  },
};

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {STAT_CARDS.map((card) => {
        const colors = colorMap[card.color];
        return (
          <div
            key={card.id}
            className={cn(
              "rounded-2xl p-5 flex items-center justify-between shadow-sm",
              colors.bg,
            )}
          >
            <div>
              <p
                className={`text-xs font-medium mb-2 text-neutral-900 dark:text-amber-300`}
              >
                {card.label}
              </p>
              <p className={`text-2xl font-black leading-none ${colors.value}`}>
                {card.value}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-neutral-700 flex items-center justify-center shrink-0">
              <NavIcon name={card.icon} size={20} className="text-white" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
