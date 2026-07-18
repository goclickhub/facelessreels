"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import SettingsSectionRow from "./SettingsSectionRow";
import { useSettings, useUpdateSettings } from "@/hooks/useSettings";
import { useToast } from "@/hooks/useToast";
import { ApiError } from "@/lib/api";

const TIMEZONES = ["UTC-8", "UTC-5", "UTC+0", "UTC+1", "UTC+3", "UTC+5:30", "UTC+8"];
const LANGUAGES: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "it", label: "Italian" },
  { code: "de", label: "German" },
  { code: "ja", label: "Japanese" },
  { code: "zh", label: "Chinese" },
];
const PLATFORMS: { code: string; label: string }[] = [
  { code: "tiktok", label: "TikTok" },
  { code: "instagram", label: "Instagram" },
  { code: "youtube", label: "YouTube" },
];

export default function GeneralTab() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const { success: toastSuccess, error: toastError } = useToast();

  const [timezone, setTimezone] = useState("UTC+0");
  const [language, setLanguage] = useState("en");
  const [platform, setPlatform] = useState("tiktok");

  useEffect(() => {
    if (!settings) return;
    setTimezone(settings.timezone);
    setLanguage(settings.interfaceLanguage);
    setPlatform(settings.defaultPlatform);
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync({
        timezone,
        interfaceLanguage: language,
        defaultPlatform: platform,
      });
      toastSuccess("Settings saved", "Your general settings have been updated.");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Couldn't save settings", message);
    }
  };

  const selectCls =
    "h-8 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--input-bg))] px-2 text-[12px] text-[rgb(var(--foreground))] outline-none focus:border-[rgb(var(--primary))] cursor-pointer";

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
        General Settings
      </p>

      <SettingsSectionRow label="Timezone" description="Used for scheduling auto-posts">
        <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className={selectCls}>
          {TIMEZONES.map((tz) => <option key={tz}>{tz}</option>)}
        </select>
      </SettingsSectionRow>

      <SettingsSectionRow label="Interface language" description="Language for the dashboard UI">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className={selectCls}>
          {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </SettingsSectionRow>

      <SettingsSectionRow label="Auto-post default platform" description="Platform selected by default when creating a new series">
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={selectCls}>
          {PLATFORMS.map((p) => <option key={p.code} value={p.code}>{p.label}</option>)}
        </select>
      </SettingsSectionRow>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="flex items-center gap-2 h-9 px-6 rounded-lg bg-[rgb(var(--primary))] text-white text-[12px] font-bold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60"
        >
          {updateSettings.isPending && <Loader2 size={13} className="animate-spin" />}
          Save changes
        </button>
      </div>
    </div>
  );
}
