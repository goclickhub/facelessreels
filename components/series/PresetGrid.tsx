import { PresetCard } from "./PresetCard";
import type { SeriesItem } from "@/types";

interface PresetGridProps {
  items: SeriesItem[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export function PresetGrid({ items, selected, onSelect }: PresetGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:flex-nowrap md:gap-4 md:overflow-x-auto md:pb-1 -mx-0.5 px-0.5">
      {items.map((item) => (
        <div key={item.id} className="md:w-44 md:shrink-0">
          <PresetCard
            item={item}
            selected={selected === item.id}
            onSelect={() => onSelect(item.id)}
          />
        </div>
      ))}
    </div>
  );
}
