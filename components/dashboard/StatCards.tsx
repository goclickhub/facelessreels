"use client";

import { Layers, Video, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSeriesList } from "@/hooks/useSeries";
import { useVideosList } from "@/hooks/useVideos";

export default function StatCards() {
  // .total on both is the real count across all pages — a fetched .data
  // array is capped at whatever page size is requested, so counting off
  // .data.length alone would silently under-report past that many records.
  const { data: seriesData } = useSeriesList(1, 100);
  const { data: videosData } = useVideosList({ limit: 100 });
  const videos = videosData?.data ?? [];
  const readyCount = videos.filter((v) => v.status === "ready" || v.status === "published").length;

  const cards = [
    { id: "series", label: "Total Series", value: seriesData?.total ?? 0, icon: Layers, bg: "bg-[rgb(var(--stat-pink))]" },
    { id: "videos", label: "Total Videos", value: videosData?.total ?? 0, icon: Video, bg: "bg-[rgb(var(--stat-yellow))]" },
    { id: "ready", label: "Videos Ready", value: readyCount, icon: CheckCircle2, bg: "bg-[rgb(var(--stat-green))]" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className={cn("rounded-2xl p-5 flex items-center justify-between shadow-sm", card.bg)}
        >
          <div>
            <p className="text-xs font-medium mb-2 text-neutral-900 dark:text-amber-300">
              {card.label}
            </p>
            <p className="text-2xl font-black leading-none text-neutral-900 dark:text-amber-100">
              {card.value}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-neutral-700 flex items-center justify-center shrink-0">
            <card.icon size={20} className="text-white" />
          </div>
        </div>
      ))}
    </div>
  );
}
