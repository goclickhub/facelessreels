"use client";

import Link from "next/link";
import { Play, Loader2, XCircle } from "lucide-react";
import { useVideosList } from "@/hooks/useVideos";
import type { Video } from "@/hooks/useVideos";

const STATUS_LABEL: Record<string, string> = {
  queued: "Queued",
  processing: "Processing…",
  ready: "Ready",
  published: "Published",
  failed: "Failed",
};

function VideoCard({ video }: { video: Video }) {
  const inProgress = video.status === "queued" || video.status === "processing";

  return (
    <div className="flex flex-col gap-2">
      {/* Thumbnail */}
      <div
        className="relative w-full rounded-xl overflow-hidden group cursor-pointer bg-linear-to-br from-neutral-800 via-stone-700 to-neutral-950"
        style={{ aspectRatio: "16/10" }}
      >
        {video.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={video.thumbnailUrl} alt={video.title} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_30%_40%,#b45309_0%,transparent_60%)]" />
        )}

        {/* Status badge */}
        <span className="absolute top-2 left-2 z-10 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
          {inProgress && <Loader2 size={9} className="animate-spin" />}
          {video.status === "failed" && <XCircle size={9} />}
          {STATUS_LABEL[video.status] ?? video.status}
        </span>

        {/* Play button */}
        {video.videoUrl && (
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play size={14} className="text-white ml-0.5" fill="white" />
            </div>
          </a>
        )}
      </div>

      {/* Meta */}
      <div>
        <p className="text-[13px] font-semibold text-[rgb(var(--foreground))] truncate">
          {video.title}
        </p>
        <p className="text-[11px] text-[rgb(var(--muted-foreground))] leading-snug mt-0.5">
          {video.seriesName}
        </p>
      </div>
    </div>
  );
}

interface RecentVideoPanelProps {
  /** When true, renders only the cards (no header); used inside a parent grid */
  gridMode?: boolean;
}

export default function RecentVideoPanel({ gridMode = false }: RecentVideoPanelProps) {
  const { data } = useVideosList();
  const recent = (data?.data ?? []).slice(0, 6);

  if (recent.length === 0) {
    return gridMode ? null : (
      <div className="p-4 flex flex-col items-center justify-center py-12 gap-2 text-center">
        <p className="text-[13px] text-[rgb(var(--muted-foreground))]">No videos yet.</p>
      </div>
    );
  }

  if (gridMode) {
    return (
      <>
        {recent.map((video) => (
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
        <Link href="/videos" className="text-[11px] text-[rgb(var(--primary))] font-medium hover:underline">
          See all
        </Link>
      </div>

      {/* Video list */}
      <div className="flex flex-col gap-5">
        {recent.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
