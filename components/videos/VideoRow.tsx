"use client";

import { Play } from "lucide-react";
import type { VideoRow as VideoRowType } from "@/types";
import { PLATFORM_COLORS, VIDEO_STATUS_STYLES } from "@/lib/statusBadges";
import { VideoActionsMenu } from "@/components/videos/VideoActionsMenu";
import { VideoProgressBar } from "@/components/videos/VideoProgressBar";

function Thumbnail({ video }: { video: VideoRowType }) {
  return (
    <a
      href={video.videoUrl ?? undefined}
      target="_blank"
      rel="noreferrer"
      className={`flex h-9 w-14 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--muted))] border border-[rgb(var(--border))] ${
        video.videoUrl ? "hover:border-[rgb(var(--primary))] transition-colors" : "pointer-events-none opacity-50"
      }`}
    >
      <Play size={14} className="text-[rgb(var(--primary))]" />
    </a>
  );
}

function StatusCell({ video }: { video: VideoRowType }) {
  if (video.status === "processing") return <VideoProgressBar progress={video.progress} />;
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${VIDEO_STATUS_STYLES[video.status]}`}>
      {video.status}
    </span>
  );
}

export default function VideoRow({ video }: { video: VideoRowType }) {
  return (
    <>
      {/* Desktop / tablet: table row */}
      <div className="hidden sm:grid grid-cols-[1fr_120px_100px_80px_80px_36px] gap-3 items-center px-4 py-3 hover:bg-[rgb(var(--muted))] transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <Thumbnail video={video} />
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-[rgb(var(--foreground))] truncate">{video.title}</p>
            <p className="text-[11px] text-[rgb(var(--muted-foreground))]">{video.postedAt}</p>
          </div>
        </div>

        <p className="text-[11px] text-[rgb(var(--muted-foreground))] truncate">{video.series}</p>

        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${PLATFORM_COLORS[video.platform]}`}>
          {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
        </span>

        <StatusCell video={video} />

        <p className="text-[12px] text-[rgb(var(--foreground))]">{video.views}</p>

        <VideoActionsMenu video={video} />
      </div>

      {/* Mobile: stacked card */}
      <div className="flex sm:hidden gap-3 px-4 py-3 hover:bg-[rgb(var(--muted))] transition-colors">
        <Thumbnail video={video} />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[12px] font-medium text-[rgb(var(--foreground))] truncate">{video.title}</p>
            <VideoActionsMenu video={video} />
          </div>
          <p className="text-[11px] text-[rgb(var(--muted-foreground))] truncate">
            {video.series} · {video.postedAt}
          </p>
          <div className="flex items-center flex-wrap gap-1.5">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${PLATFORM_COLORS[video.platform]}`}>
              {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
            </span>
            <StatusCell video={video} />
            <span className="text-[11px] text-[rgb(var(--muted-foreground))]">{video.views} views</span>
          </div>
        </div>
      </div>
    </>
  );
}
