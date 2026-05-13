"use client";

import { useState } from "react";
import SettingsSectionRow from "./SettingsSectionRow";

const TIMEZONES = ["UTC-8", "UTC-5", "UTC+0", "UTC+1", "UTC+3", "UTC+5:30", "UTC+8"];
const LANGUAGES = ["English", "French", "Italian", "German", "Japanese", "Chinese"];
const PLATFORMS = ["TikTok", "Instagram", "YouTube"];

export default function GeneralTab() {
  const [timezone, setTimezone] = useState("UTC+0");
  const [language, setLanguage] = useState("English");
  const [platform, setPlatform] = useState("TikTok");

  const selectCls =
    "h-8 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--input-bg))] px-2 text-[12px] text-[rgb(var(--foreground))] outline-none focus:border-[rgb(var(--primary))] cursor-pointer";

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
          {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
        </select>
      </SettingsSectionRow>

      <SettingsSectionRow label="Auto-post default platform" description="Platform selected by default when creating a new series">
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} className={selectCls}>
          {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
        </select>
      </SettingsSectionRow>

      <div className="flex justify-end pt-4">
        <button className="h-9 px-6 rounded-lg bg-[rgb(var(--primary))] text-white text-[12px] font-bold hover:opacity-90 transition-opacity cursor-pointer">
          Save changes
        </button>
      </div>
    </div>
  );
}
