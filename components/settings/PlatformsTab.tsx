"use client";

import SettingsSectionRow from "./SettingsSectionRow";
import { useToast } from "@/hooks/useToast";

const PLATFORMS = [
  {
    id: "tiktok",
    name: "TikTok",
    description: "Auto-publish Reels and short videos",
    color: "bg-black text-white",
    letter: "T",
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Auto-publish Instagram Reels",
    color: "bg-gradient-to-br from-purple-500 to-pink-500 text-white",
    letter: "I",
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Auto-publish YouTube Shorts",
    color: "bg-red-600 text-white",
    letter: "Y",
  },
];

export default function PlatformsTab() {
  const { success: toastSuccess } = useToast();

  const handleConnect = () => {
    toastSuccess("Coming soon", "Connecting real social accounts isn't available yet.");
  };

  return (
    <div className="space-y-1">
      <p className="text-[13px] font-semibold text-[rgb(var(--foreground))] mb-4">
        Connected Platforms
      </p>

      {PLATFORMS.map((platform) => (
        <SettingsSectionRow key={platform.id} label={platform.name} description={platform.description}>
          <div className="flex items-center gap-3">
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold ${platform.color}`}>
              {platform.letter}
            </div>
            <button
              onClick={handleConnect}
              className="h-7 px-3 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]/70"
            >
              Coming soon
            </button>
          </div>
        </SettingsSectionRow>
      ))}
    </div>
  );
}
