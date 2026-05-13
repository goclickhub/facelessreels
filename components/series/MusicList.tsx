"use client";

import { useState } from "react";
import { Music2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MusicTrack } from "@/types";

const COLOR_MAP: Record<MusicTrack["color"], string> = {
  purple: "bg-purple-500",
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  blue: "bg-blue-500",
};

function TrackIcon({ color }: { color: MusicTrack["color"] }) {
  return (
    <div className={cn("w-9 h-9 rounded-full flex items-center justify-center shrink-0", COLOR_MAP[color])}>
      <Music2 size={15} className="text-white" />
    </div>
  );
}

interface MusicListProps {
  tracks: MusicTrack[];
  selected: string;
  onSelect: (id: string) => void;
}

export function MusicList({ tracks, selected, onSelect }: MusicListProps) {
  const [open, setOpen] = useState(false);
  const current = tracks.find((t) => t.id === selected) ?? tracks[0];

  return (
    <div className="border border-[rgb(var(--border))] rounded-xl overflow-hidden">
      {/* Trigger — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-[rgb(var(--card))] hover:bg-[rgb(var(--muted))] transition-colors text-left"
      >
        <TrackIcon color={current.color} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{current.title}</p>
          <p className="text-xs text-[rgb(var(--muted-foreground))] truncate">{current.description}</p>
        </div>
        <ChevronDown
          size={16}
          className={cn("text-[rgb(var(--muted-foreground))] transition-transform duration-200 shrink-0", open && "rotate-180")}
        />
      </button>

      {/* Expanded list */}
      {open && (
        <div className="border-t border-[rgb(var(--border))] max-h-64 overflow-y-auto">
          {tracks.map((track, i) => (
            <div key={track.id}>
              <button
                onClick={() => { onSelect(track.id); setOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors",
                  track.id === selected
                    ? "bg-[rgb(var(--secondary))]"
                    : "hover:bg-[rgb(var(--muted))]",
                )}
              >
                <TrackIcon color={track.color} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[rgb(var(--foreground))]">{track.title}</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">{track.description}</p>
                </div>
                <ChevronDown size={15} className="text-[rgb(var(--muted-foreground))] shrink-0" />
              </button>
              {i < tracks.length - 1 && (
                <div className="border-b border-[rgb(var(--border))] mx-4" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
