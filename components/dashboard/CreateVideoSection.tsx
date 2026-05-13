import { Play, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { NICHE_VIDEOS } from "@/lib/data";

export default function CreateVideoSection() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-[rgb(var(--foreground))]">
            Create another video
          </h3>
          <p className="text-[12px] text-[rgb(var(--muted-foreground))] mt-0.5">
            Choose any niche lets get started
          </p>
        </div>
        <button className="w-9 h-9 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] flex items-center justify-center hover:bg-[rgb(var(--muted))] transition-colors shrink-0">
          <Plus size={16} className="text-[rgb(var(--foreground))]" />
        </button>
      </div>

      {/* Cards — horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
        {NICHE_VIDEOS.map((video) => (
          <div key={video.id} className="shrink-0 w-48 sm:w-auto group cursor-pointer">
            <div
              className={cn(
                "relative w-full rounded-xl overflow-hidden",
                "bg-linear-to-b",
                video.gradient,
              )}
              style={{ aspectRatio: "9/14" }}
            >
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play size={18} className="text-white ml-0.5" fill="white" />
                </div>
              </div>

              {/* Label overlay */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <span className="text-white text-[11px] font-bold uppercase tracking-widest drop-shadow">
                  {video.label}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
