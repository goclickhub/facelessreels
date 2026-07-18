import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  views: number;
  durationSeconds: number;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
}

interface VideosListResponse {
  data: Video[];
  total: number;
  page: number;
}

const IN_PROGRESS_STATUSES: VideoStatus[] = ["queued", "processing"];

export function useVideosList() {
  return useQuery({
    queryKey: queryKeys.videos.all(),
    queryFn: () => apiFetch<VideosListResponse>("/videos"),
    // Generation runs for minutes in the background — keep polling while
    // anything is still in flight so the list updates without a manual refresh.
    refetchInterval: (query) => {
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

export function useDeleteVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: string) => apiFetch<void>(`/videos/${videoId}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.videos.all() }),
  });
}
