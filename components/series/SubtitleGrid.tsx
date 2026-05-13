import { SubtitleCard } from "./SubtitleCard";
import type { SubtitleStyle } from "@/types";

interface SubtitleGridProps {
  items: SubtitleStyle[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export function SubtitleGrid({ items, selected, onSelect }: SubtitleGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <SubtitleCard
          key={item.id}
          item={item}
          selected={selected === item.id}
          onSelect={() => onSelect(item.id)}
        />
      ))}
    </div>
  );
}
