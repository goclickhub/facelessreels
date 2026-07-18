import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavIcon } from "@/lib/icons";
import type { SeriesItem } from "@/types";

interface PresetCardProps {
  item: SeriesItem;
  selected: boolean;
  onSelect: () => void;
}

export function PresetCard({ item, selected, onSelect }: PresetCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "group cursor-pointer rounded-xl overflow-hidden border transition-all duration-200",
        selected
          ? "border-[rgb(var(--primary))] ring-2 ring-[rgb(var(--primary))]/20"
          : "border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50 hover:shadow-md",
      )}
    >
      {/* Illustrated artwork matching the title */}
      <div
        className={cn(
          "relative w-full flex items-center justify-center",
          selected ? "bg-[rgb(var(--primary))]/10" : "bg-[rgb(var(--muted))]",
        )}
        style={{ aspectRatio: "16/10" }}
      >
        <NavIcon
          name={item.icon}
          size={48}
          className="transition-transform duration-200 group-hover:scale-110"
        />

        {selected && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center z-10 shadow-md">
            <Check size={11} className="text-white" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Text */}
      <div className="p-2.5 bg-[rgb(var(--card))]">
        <p className="text-[12px] font-semibold text-[rgb(var(--foreground))] leading-tight">
          {item.title}
        </p>
        {item.description && (
          <p className="text-[11px] text-[rgb(var(--muted-foreground))] mt-0.5 leading-snug line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
