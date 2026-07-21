import type { VideoPlatform, VideoStatus } from "@/types";

// Shared across VideoRow (user Videos page) and the admin Videos page — was
// previously copy-pasted in both, risking the two drifting apart.
export const PLATFORM_COLORS: Record<VideoPlatform, string> = {
  tiktok: "bg-black text-white",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  youtube: "bg-red-600 text-white",
};

export const VIDEO_STATUS_STYLES: Record<VideoStatus, string> = {
  queued: "bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]",
  processing: "bg-[rgb(var(--stat-yellow))] text-yellow-700 dark:text-yellow-300",
  ready: "bg-[rgb(var(--stat-green))] text-green-700 dark:text-green-300",
  published: "bg-[rgb(var(--stat-green))] text-green-700 dark:text-green-300",
  failed: "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400",
};

export const REGENERATABLE_VIDEO_STATUSES: VideoStatus[] = ["ready", "published", "failed"];

export interface SeriesStatusBadge {
  label: string;
  className: string;
}

// Shared across YourSeriesSection (Dashboard) and the admin Series page.
// Paused (a deliberate user action) wins over the video outcome; otherwise
// the badge reflects what actually happened to the series' latest video,
// instead of a bare Active/Paused flag that says nothing about the outcome.
export function getSeriesStatusBadge(series: {
  active: boolean;
  latestVideoStatus: VideoStatus | null;
}): SeriesStatusBadge {
  if (!series.active) {
    return { label: "Paused", className: "bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]" };
  }
  switch (series.latestVideoStatus) {
    case "failed":
      return { label: "Failed", className: "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400" };
    case "queued":
    case "processing":
      return { label: "Generating", className: "bg-[rgb(var(--stat-yellow))] text-yellow-700 dark:text-yellow-300" };
    default:
      return { label: "Active", className: "bg-[rgb(var(--stat-green))] text-green-700 dark:text-green-300" };
  }
}
