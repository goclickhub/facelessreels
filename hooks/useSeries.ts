import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

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
  createdAt: string;
  updatedAt: string;
}

export function useSeriesList() {
  return useQuery({
    queryKey: queryKeys.series.all(),
    queryFn: () => apiFetch<Series[]>("/series"),
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
