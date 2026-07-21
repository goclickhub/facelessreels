import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { VideoPlatform, VideoStatus } from "@/types";
import type { Series } from "@/hooks/useSeries";
import type { Video } from "@/hooks/useVideos";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  plan: string;
  emailVerified: boolean;
  createdAt: string;
  seriesCount: number;
  videoCount: number;
}

export interface AdminStats {
  totalUsers: number;
  totalSeries: number;
  totalVideos: number;
  videosByStatus: Record<VideoStatus, number>;
}

interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
}

export function useAdminStats() {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: () => apiFetch<AdminStats>("/admin/stats"),
  });
}

export function useAdminUsers(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: queryKeys.admin.users({ page, limit }),
    queryFn: () => apiFetch<Paginated<AdminUser>>(`/admin/users?page=${page}&limit=${limit}`),
    placeholderData: keepPreviousData,
  });
}

export function useAdminDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiFetch<void>(`/admin/users/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin"] }),
  });
}

export function useAdminSeries(page: number = 1, limit: number = 20) {
  return useQuery({
    queryKey: queryKeys.admin.series({ page, limit }),
    queryFn: () => apiFetch<Paginated<Series>>(`/admin/series?page=${page}&limit=${limit}`),
    placeholderData: keepPreviousData,
  });
}

export function useAdminDeleteSeries() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiFetch<void>(`/admin/series/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "series"] }),
  });
}

interface AdminVideosParams {
  page?: number;
  limit?: number;
  platform?: VideoPlatform;
  search?: string;
}

export function useAdminVideos(params: AdminVideosParams = {}) {
  const { page = 1, limit = 20, platform, search } = params;
  return useQuery({
    queryKey: queryKeys.admin.videos({ page, limit, platform, search }),
    queryFn: () => {
      const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (platform) qs.set("platform", platform);
      if (search) qs.set("search", search);
      return apiFetch<Paginated<Video>>(`/admin/videos?${qs.toString()}`);
    },
    placeholderData: keepPreviousData,
  });
}

export function useAdminRegenerateVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (videoId: string) => apiFetch<Video>(`/admin/videos/${videoId}/regenerate`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "videos"] }),
  });
}

// Resumes from the last completed stage instead of redoing script/audio —
// only offered in the UI when video.canResume is true.
export function useAdminRetryVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (videoId: string) => apiFetch<Video>(`/admin/videos/${videoId}/retry`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "videos"] }),
  });
}

export function useAdminDeleteVideo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (videoId: string) => apiFetch<void>(`/admin/videos/${videoId}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "videos"] }),
  });
}
