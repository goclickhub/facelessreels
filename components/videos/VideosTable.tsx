"use client";

import { useState } from "react";
import { Film } from "lucide-react";
import type { VideoRow as VideoRowType, VideoPlatform } from "@/types";
import VideoFilters from "./VideoFilters";
import VideoRow from "./VideoRow";

const TABLE_HEADERS = ["Title", "Series", "Platform", "Status", "Views", ""];

const VIEW_COUNTS = [1240, 8730, 320, 5100, 2890, 450, 17600, 3300, 980, 6700, 220, 4400];

const ALL_VIDEOS: VideoRowType[] = Array.from({ length: 12 }, (_, i) => {
  const platforms: VideoPlatform[] = ["tiktok", "instagram", "youtube"];
  const statuses = ["published", "published", "processing", "failed"] as const;
  const series = ["Stoic Motivation", "History", "Gospel", "True Crime", "Lifestyle"];
  const isProcessing = i % 4 === 2;
  return {
    id: `vid-${i}`,
    title: `Sample faceless video ${i + 1}`,
    series: series[i % series.length],
    platform: platforms[i % 3],
    status: statuses[i % 4],
    views: isProcessing ? "—" : `${VIEW_COUNTS[i]}`,
    postedAt: isProcessing ? "Processing…" : `${i + 1}d ago`,
  };
});

export default function VideosTable() {
  const [tab, setTab] = useState<VideoPlatform | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = ALL_VIDEOS.filter((v) => {
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

        {filtered.length === 0 ? (
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
