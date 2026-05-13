import { MoreHorizontal, Play } from "lucide-react";
import type { VideoRow as VideoRowType, VideoPlatform, VideoStatus } from "@/types";

const PLATFORM_COLORS: Record<VideoPlatform, string> = {
  tiktok: "bg-black text-white",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  youtube: "bg-red-600 text-white",
};

const STATUS_STYLES: Record<VideoStatus, string> = {
  published: "bg-[rgb(var(--stat-green))] text-green-700 dark:text-green-300",
  processing: "bg-[rgb(var(--stat-yellow))] text-yellow-700 dark:text-yellow-300",
  failed: "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400",
};

export default function VideoRow({ video }: { video: VideoRowType }) {
  return (
    <div className="grid grid-cols-[1fr_120px_100px_80px_80px_36px] gap-3 items-center px-4 py-3 hover:bg-[rgb(var(--muted))] transition-colors">
      {/* Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex h-9 w-14 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--muted))] border border-[rgb(var(--border))]">
          <Play size={14} className="text-[rgb(var(--primary))]" />
        </div>
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-[rgb(var(--foreground))] truncate">
            {video.title}
          </p>
          <p className="text-[11px] text-[rgb(var(--muted-foreground))]">
            {video.postedAt}
          </p>
        </div>
      </div>

      {/* Series */}
      <p className="text-[11px] text-[rgb(var(--muted-foreground))] truncate">
        {video.series}
      </p>

      {/* Platform */}
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${PLATFORM_COLORS[video.platform]}`}>
        {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
      </span>

      {/* Status */}
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[video.status]}`}>
        {video.status}
      </span>

      {/* Views */}
      <p className="text-[12px] text-[rgb(var(--foreground))]">{video.views}</p>

      {/* Actions */}
      <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]">
        <MoreHorizontal size={14} />
      </button>
    </div>
  );
}
