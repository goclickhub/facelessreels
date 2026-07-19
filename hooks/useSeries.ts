import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { VideoStatus } from "@/types";

export interface CreateSeriesInput {
  name: string;
  niche: string;
  artStyle: string;
  effects: string;
  music: string;
  voice: string;
  subtitleStyle: string;
  language: string;
  platforms: string[];
  frequency: string;
  durationSeconds: number;
  scheduleTime: string;
}

export interface Series extends CreateSeriesInput {
  id: string;
  userId: string;
  active: boolean;
  // Status of the series' most recently generated video, if any. Used to show
  // a real outcome (Failed/Generating/Ready) instead of just Active/Paused,
  // which says nothing about whether the video actually worked.
  latestVideoStatus: VideoStatus | null;
  createdAt: string;
  updatedAt: string;
}

interface SeriesListResponse {
  data: Series[];
  total: number;
  page: number;
}

const DEFAULT_LIMIT = 20;

export function useSeriesList(page: number = 1, limit: number = DEFAULT_LIMIT) {
  return useQuery({
    queryKey: queryKeys.series.list({ page, limit }),
    queryFn: () => apiFetch<SeriesListResponse>(`/series?page=${page}&limit=${limit}`),
    placeholderData: keepPreviousData,
  });
}

// For looking up a single series by id (the edit flow) — independent of
// whatever page the Dashboard's list happens to be on, so editing works
// correctly regardless of pagination.
export function useSeriesDetail(id: string | null) {
  return useQuery({
    queryKey: queryKeys.series.detail(id ?? ""),
    queryFn: () => apiFetch<Series>(`/series/${id}`),
    enabled: id !== null,
  });
}

export function useCreateSeries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateSeriesInput) =>
      apiFetch<Series>("/series", { method: "POST", body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.series.all() }),
  });
}

export function useGenerateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (seriesId: string) => apiFetch(`/series/${seriesId}/generate`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.videos.all() }),
  });
}

export function useUpdateSeries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<CreateSeriesInput> }) =>
      apiFetch<Series>(`/series/${id}`, { method: "PUT", body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.series.all() }),
  });
}

export function useDeleteSeries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiFetch<void>(`/series/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.series.all() }),
  });
}

export function useToggleSeries() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiFetch<Series>(`/series/${id}/toggle`, { method: "POST" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.series.all() }),
  });
}
