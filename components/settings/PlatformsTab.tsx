"use client";

import { useState } from "react";
import SettingsSectionRow from "./SettingsSectionRow";

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
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setConnected((prev) => ({ ...prev, [id]: !prev[id] }));

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
              onClick={() => toggle(platform.id)}
              className={`h-7 px-3 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                connected[platform.id]
                  ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400"
                  : "bg-[rgb(var(--primary))] text-white hover:opacity-90"
              }`}
            >
              {connected[platform.id] ? "Disconnect" : "Connect"}
            </button>
          </div>
        </SettingsSectionRow>
      ))}
    </div>
  );
}
