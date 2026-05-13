import { Play, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { PANEL_VIDEOS } from "@/lib/data";
import type { PanelVideo } from "@/types";

function VideoCard({ video }: { video: PanelVideo }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Thumbnail */}
      <div
        className="relative w-full rounded-xl overflow-hidden group cursor-pointer"
        style={{ aspectRatio: "16/10" }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-neutral-800 via-stone-700 to-neutral-950" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_30%_40%,#b45309_0%,transparent_60%)]" />

        {/* Pinned badge */}
        {video.pinned && (
          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded">
            Pinned
          </span>
        )}

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <Play size={14} className="text-white ml-0.5" fill="white" />
          </div>
        </div>

        {/* Year */}
        <span className="absolute bottom-2 right-2 text-white text-[10px] font-semibold drop-shadow">
          {video.year}
        </span>
      </div>

      {/* Meta */}
      <div>
        <p className="text-[13px] font-semibold text-[rgb(var(--foreground))]">
          {video.title}
        </p>
        <p className="text-[11px] text-[rgb(var(--muted-foreground))] leading-snug mt-0.5 line-clamp-2">
          {video.description}
        </p>
        <button className="text-[11px] text-[rgb(var(--primary))] font-medium mt-1 hover:underline">
          See more
        </button>
      </div>
    </div>
  );
}

interface RecentVideoPanelProps {
  /** When true, renders only the cards (no header); used inside a parent grid */
  gridMode?: boolean;
}

export default function RecentVideoPanel({ gridMode = false }: RecentVideoPanelProps) {
  if (gridMode) {
    return (
      <>
        {PANEL_VIDEOS.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </>
    );
  }

  return (
    <div className="p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-[15px] font-bold text-[rgb(var(--foreground))]">
          Recent videos
        </h3>
        <button className="p-1.5 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors">
          <SlidersHorizontal
            size={16}
            className="text-[rgb(var(--muted-foreground))]"
          />
        </button>
      </div>

      {/* Video list */}
      <div className="flex flex-col gap-5">
        {PANEL_VIDEOS.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
