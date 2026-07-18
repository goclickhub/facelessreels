"use client";

import { useState } from "react";
import { Film, Loader2 } from "lucide-react";
import type { VideoRow as VideoRowType, VideoPlatform } from "@/types";
import { useVideosList } from "@/hooks/useVideos";
import type { Video } from "@/hooks/useVideos";
import VideoFilters from "./VideoFilters";
import VideoRow from "./VideoRow";

const TABLE_HEADERS = ["Title", "Series", "Platform", "Status", "Views", ""];

const IN_PROGRESS = new Set(["queued", "processing"]);

function toVideoRow(video: Video): VideoRowType {
  const inProgress = IN_PROGRESS.has(video.status);
  return {
    id: video.id,
    title: video.title,
    series: video.seriesName,
    platform: video.platform,
    status: video.status,
    views: inProgress ? "—" : String(video.views),
    postedAt: inProgress
      ? "Processing…"
      : new Date(video.publishedAt ?? video.createdAt).toLocaleDateString(),
    videoUrl: video.videoUrl,
  };
}

export default function VideosTable() {
  const [tab, setTab] = useState<VideoPlatform | "all">("all");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useVideosList();

  const allVideos = (data?.data ?? []).map(toVideoRow);
  const filtered = allVideos.filter((v) => {
    const matchPlatform = tab === "all" || v.platform === tab;
    const matchSearch = v.title.toLowerCase().includes(search.toLowerCase());
    return matchPlatform && matchSearch;
  });

  return (
    <div className="space-y-4">
      <VideoFilters
        tab={tab}
        search={search}
        onTabChange={setTab}
        onSearchChange={setSearch}
      />

      <div className="rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_120px_100px_80px_80px_36px] gap-3 px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--muted))]">
          {TABLE_HEADERS.map((h, i) => (
            <span key={i} className="text-[11px] font-medium text-[rgb(var(--muted-foreground))]">
              {h}
            </span>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <Loader2 size={28} className="text-[rgb(var(--muted-foreground))] animate-spin" />
            <p className="text-[13px] text-[rgb(var(--muted-foreground))]">Loading videos…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <Film size={28} className="text-[rgb(var(--muted-foreground))]" />
            <p className="text-[13px] text-[rgb(var(--muted-foreground))]">No videos found</p>
          </div>
        ) : (
          <div className="divide-y divide-[rgb(var(--border))]">
            {filtered.map((video) => (
              <VideoRow key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
