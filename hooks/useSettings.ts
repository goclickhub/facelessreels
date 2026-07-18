import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export interface NotificationSettings {
  videoPublished: boolean;
  videoFailed: boolean;
  weeklyDigest: boolean;
  productUpdates: boolean;
}

export interface UserSettings {
  userId: string;
  timezone: string;
  interfaceLanguage: string;
  defaultPlatform: string;
  notifications: NotificationSettings;
}

export type UpdateSettingsInput = Partial<
  Omit<UserSettings, "userId" | "notifications"> & { notifications: NotificationSettings }
>;

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings.all(),
    queryFn: () => apiFetch<UserSettings>("/settings"),
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateSettingsInput) =>
      apiFetch<UserSettings>("/settings", { method: "PUT", body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.settings.all() }),
  });
}
