import { Play } from "lucide-react";
import { RECENT_VIDEOS } from "@/lib/data";

export default function RecentVideos() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-bold text-[rgb(var(--foreground))]">
          Recent Videos
        </h3>
        <button className="text-[12.5px] text-[rgb(var(--primary))] font-semibold hover:underline">
          See More
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {RECENT_VIDEOS.map((video) => (
          <div key={video.id} className="shrink-0 w-52.5">
            <div className="video-thumb-bg w-full h-31.5 rounded-xl overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 p-2 opacity-70">
                <div className="w-full h-3 bg-white/10 rounded mb-2" />
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-1 h-1.5 bg-white/10 rounded" />
                  ))}
                </div>
                <div className="w-full h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Play size={10} className="text-white ml-0.5" />
                  </div>
                </div>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex-1 h-1.5 bg-[rgb(var(--primary))]/40 rounded"
                    />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Play
                    size={14}
                    className="text-[rgb(var(--primary))] ml-0.5"
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-[rgb(var(--foreground))] truncate">
                {video.title}
              </span>
              <span className="text-[11px] text-[rgb(var(--muted-foreground))] ml-2 shrink-0">
                {video.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
