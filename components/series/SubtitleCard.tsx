import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SubtitleStyle } from "@/types";

function SubtitlePreview({ id }: { id: string }) {
  switch (id) {
    case "majestic":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[11px] font-extrabold tracking-wider text-[rgb(var(--foreground))]">I AM</span>
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 leading-tight">Very Lucky</span>
        </div>
      );
    case "karaoke":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[11px] font-medium text-gray-400">I AM</span>
          <span className="bg-gray-500 text-white text-[10px] font-medium px-2 py-0.5 leading-tight">Very Lucky</span>
        </div>
      );
    case "anime":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[11px] font-medium italic text-gray-500">I AM</span>
          <span className="text-[10px] font-bold italic font-serif text-[rgb(var(--foreground))]">Very Lucky</span>
        </div>
      );
    case "scripts":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[11px] italic font-light text-gray-400">I AM</span>
          <span className="text-[10px] italic font-light text-[rgb(var(--foreground))]">Very Lucky</span>
        </div>
      );
    case "bold":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[11px] font-black text-red-800">I AM</span>
          <span className="text-[10px] font-black text-blue-600">Very Lucky</span>
        </div>
      );
    case "deep":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <span className="bg-red-700 text-white text-[11px] font-bold px-2 py-0.5">I AM</span>
          <span className="text-[10px] font-bold text-[rgb(var(--foreground))]">Very Lucky</span>
        </div>
      );
    case "fancy":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[11px] italic font-semibold text-red-500">I am</span>
          <span className="text-[10px] italic font-medium text-[rgb(var(--foreground))] font-serif">Very Lucky</span>
        </div>
      );
    case "elegancy":
      return (
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[11px] font-light tracking-widest text-[rgb(var(--foreground))]">I AM</span>
          <span className="text-[10px] font-light tracking-wide text-[rgb(var(--foreground))]">Very Lucky</span>
        </div>
      );
    default:
      return null;
  }
}

interface SubtitleCardProps {
  item: SubtitleStyle;
  selected: boolean;
  onSelect: () => void;
}

export function SubtitleCard({ item, selected, onSelect }: SubtitleCardProps) {
  return (
    <div onClick={onSelect} className="cursor-pointer group">
      <div
        className={cn(
          "relative rounded-xl border transition-all duration-200 flex items-center justify-center py-5 px-3",
          "bg-[rgb(var(--muted))]",
          selected
            ? "border-[rgb(var(--primary))] ring-2 ring-[rgb(var(--primary))]/20"
            : "border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/40",
        )}
      >
        {selected && (
          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center shadow-sm">
            <Check size={11} className="text-white" strokeWidth={3} />
          </div>
        )}
        <SubtitlePreview id={item.id} />
      </div>
      <p className="text-[11px] text-[rgb(var(--foreground))] font-medium mt-1.5 text-center leading-tight">
        {item.label}
      </p>
    </div>
  );
}
