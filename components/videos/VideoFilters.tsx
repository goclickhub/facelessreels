import { Search } from "lucide-react";
import type { VideoPlatform } from "@/types";

const TABS: { label: string; value: VideoPlatform | "all" }[] = [
  { label: "All", value: "all" },
  { label: "TikTok", value: "tiktok" },
  { label: "Instagram", value: "instagram" },
  { label: "YouTube", value: "youtube" },
];

interface VideoFiltersProps {
  tab: VideoPlatform | "all";
  search: string;
  onTabChange: (tab: VideoPlatform | "all") => void;
  onSearchChange: (value: string) => void;
}

export default function VideoFilters({
  tab,
  search,
  onTabChange,
  onSearchChange,
}: VideoFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1 rounded-xl bg-[rgb(var(--muted))] p-1">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => onTabChange(t.value)}
            className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors cursor-pointer ${
              tab === t.value
                ? "bg-[rgb(var(--card))] text-[rgb(var(--foreground))] shadow-sm"
                : "text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]"
        />
        <input
          type="text"
          placeholder="Search videos…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 w-48 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--input-bg))] pl-8 pr-3 text-[12px] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] outline-none focus:border-[rgb(var(--primary))] transition-colors"
        />
      </div>
    </div>
  );
}
