"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import SettingsSectionRow from "./SettingsSectionRow";
import SettingsToggle from "./SettingsToggle";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { useToast } from "@/hooks/useToast";
import { ApiError } from "@/lib/api";

export default function NotificationsTab() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const { success: toastSuccess, error: toastError } = useToast();

  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [videoPublished, setVideoPublished] = useState(true);
  const [videoFailed, setVideoFailed] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  useEffect(() => {
    if (!settings) return;
    setWeeklyDigest(settings.notifications.weeklyDigest);
    setVideoPublished(settings.notifications.videoPublished);
    setVideoFailed(settings.notifications.videoFailed);
    setProductUpdates(settings.notifications.productUpdates);
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync({
        notifications: {
          weeklyDigest,
          videoPublished,
          videoFailed,
          productUpdates,
        },
      });
      toastSuccess("Preferences saved", "Your notification preferences have been updated.");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Couldn't save preferences", message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={20} className="animate-spin text-[rgb(var(--muted-foreground))]" />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <p className="text-[13px] font-semibold text-[rgb(var(--foreground))] mb-4">
        Notification Preferences
      </p>

      <SettingsSectionRow label="Weekly digest email" description="Receive a weekly summary email of your activity">
        <SettingsToggle enabled={weeklyDigest} onToggle={() => setWeeklyDigest((p) => !p)} />
      </SettingsSectionRow>

      <SettingsSectionRow label="Video ready" description="Notify when a video finishes generating">
        <SettingsToggle enabled={videoPublished} onToggle={() => setVideoPublished((p) => !p)} />
      </SettingsSectionRow>

      <SettingsSectionRow label="Failed posts" description="Alert when auto-posting to a platform fails">
        <SettingsToggle enabled={videoFailed} onToggle={() => setVideoFailed((p) => !p)} />
      </SettingsSectionRow>

      <SettingsSectionRow label="Marketing & tips" description="Receive tips and product updates from FacelessReels">
        <SettingsToggle enabled={productUpdates} onToggle={() => setProductUpdates((p) => !p)} />
      </SettingsSectionRow>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="flex items-center gap-2 h-9 px-6 rounded-lg bg-[rgb(var(--primary))] text-white text-[12px] font-bold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
        >
          {updateSettings.isPending && <Loader2 size={13} className="animate-spin" />}
          Save preferences
        </button>
      </div>
    </div>
  );
}
