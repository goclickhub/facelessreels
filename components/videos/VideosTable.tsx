"use client";

import { useEffect, useState } from "react";
import { Film, Loader2 } from "lucide-react";
import type { VideoRow as VideoRowType, VideoPlatform } from "@/types";
import { useVideosList } from "@/hooks/useVideos";
import type { Video } from "@/hooks/useVideos";
import { Pagination } from "@/components/ui/Pagination";
import VideoFilters from "./VideoFilters";
import VideoRow from "./VideoRow";

const TABLE_HEADERS = ["Title", "Series", "Platform", "Status", "Views", ""];
const PAGE_SIZE = 10;
const IN_PROGRESS = new Set(["queued", "processing"]);

function toVideoRow(video: Video): VideoRowType {
  const inProgress = IN_PROGRESS.has(video.status);
  return {
    id: video.id,
    title: video.title,
    series: video.seriesName,
    platform: video.platform,
    status: video.status,
    progress: video.progress,
    canResume: video.canResume,
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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  // Debounce so typing doesn't fire a request per keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Filtering server-side now means the current page becomes invalid
  // whenever the filter changes — reset to page 1 so we don't end up
  // requesting an out-of-range page against the new, smaller result set.
  useEffect(() => {
    setPage(1);
  }, [tab, debouncedSearch]);

  const { data, isLoading, isPlaceholderData } = useVideosList({
    page,
    limit: PAGE_SIZE,
    platform: tab === "all" ? undefined : tab,
    search: debouncedSearch || undefined,
  });

  const videos = (data?.data ?? []).map(toVideoRow);
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-4">
      <VideoFilters
        tab={tab}
        search={search}
        onTabChange={setTab}
        onSearchChange={setSearch}
      />

      <div className="rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] overflow-hidden">
        {/* Header — desktop/tablet only, mobile rows are self-labeled cards */}
        <div className="hidden sm:grid grid-cols-[1fr_120px_100px_80px_80px_36px] gap-3 px-4 py-2.5 border-b border-[rgb(var(--border))] bg-[rgb(var(--muted))]">
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
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <Film size={28} className="text-[rgb(var(--muted-foreground))]" />
            <p className="text-[13px] text-[rgb(var(--muted-foreground))]">No videos found</p>
          </div>
        ) : (
          <div className="divide-y divide-[rgb(var(--border))]">
            {videos.map((video) => (
              <VideoRow key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        nextDisabled={isPlaceholderData}
        label={`Page ${page} of ${totalPages} · ${total} video${total === 1 ? "" : "s"}`}
      />
    </div>
  );
}
