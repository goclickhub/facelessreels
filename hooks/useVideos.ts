import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { VideoStatus, VideoPlatform } from "@/types";

export interface Video {
  id: string;
  userId: string;
  seriesId: string;
  seriesName: string;
  title: string;
  platform: VideoPlatform;
  status: VideoStatus;
  progress: number;
  views: number;
  durationSeconds: number;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  // Whether a failed video has a completed script/audio stage saved, so Retry
  // can resume instead of redoing them.
  canResume: boolean;
  publishedAt: string | null;
  // Only populated by the admin cross-user list.
  ownerEmail?: string;
  createdAt: string;
}

export interface VideosListResponse {
  data: Video[];
  total: number;
  page: number;
}

const IN_PROGRESS_STATUSES: VideoStatus[] = ["queued", "processing"];
const DEFAULT_LIMIT = 20;

interface UseVideosListParams {
  page?: number;
  limit?: number;
  platform?: VideoPlatform;
  search?: string;
}

export function useVideosList(params: UseVideosListParams = {}) {
  const { page = 1, limit = DEFAULT_LIMIT, platform, search } = params;

  return useQuery({
    queryKey: queryKeys.videos.list({ page, limit, platform, search }),
    queryFn: () => {
      const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (platform) qs.set("platform", platform);
      if (search) qs.set("search", search);
      return apiFetch<VideosListResponse>(`/videos?${qs.toString()}`);
    },
    // Keeps showing the previous page's data while the next page loads,
    // instead of flashing the loading state on every page/filter change.
    placeholderData: keepPreviousData,
    // Generation runs for minutes in the background — keep polling while
    // anything is still in flight so the list updates without a manual refresh.
    // Only polls off a successful fetch: if a request is failing (e.g. an
    // expired session), stale cached data could still show an in-progress
    // video forever, which would otherwise keep this interval firing every
    // 5s indefinitely — hammering a broken endpoint instead of backing off.
    refetchInterval: (query) => {
      if (query.state.status !== "success") return false;
      const videos = query.state.data?.data ?? [];
      return videos.some((v) => IN_PROGRESS_STATUSES.includes(v.status)) ? 5000 : false;
    },
  });
}

export function useRegenerateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => apiFetch<Video>(`/videos/${videoId}/regenerate`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.videos.all() }),
  });
}

// Resumes from the last completed stage instead of redoing script/audio —
// only offered in the UI when video.canResume is true.
export function useRetryVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => apiFetch<Video>(`/videos/${videoId}/retry`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.videos.all() }),
  });
}

export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => apiFetch<void>(`/videos/${videoId}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.videos.all() }),
  });
}
