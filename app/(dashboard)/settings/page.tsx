"use client";

import { useState } from "react";
import { Bell, Link2, Settings, Shield } from "lucide-react";
import SettingsNav from "@/components/settings/SettingsNav";
import GeneralTab from "@/components/settings/GeneralTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import PlatformsTab from "@/components/settings/PlatformsTab";
import DangerZoneTab from "@/components/settings/DangerZoneTab";
import type { SettingsTab } from "@/components/settings/types";

const TABS = [
  { id: "general" as SettingsTab, label: "General", icon: Settings },
  { id: "notifications" as SettingsTab, label: "Notifications", icon: Bell },
  { id: "platforms" as SettingsTab, label: "Platforms", icon: Link2 },
  { id: "danger" as SettingsTab, label: "Danger Zone", icon: Shield },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("general");

  return (
    <div className="px-5 md:px-6 py-5 space-y-6">
      <nav className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--muted-foreground))]">
        <span>Home</span>
        <span>&gt;</span>
        <span className="text-[rgb(var(--foreground))] font-medium">Settings</span>
      </nav>

      <div className="flex items-center gap-2">
        <Settings size={16} className="text-[rgb(var(--primary))]" />
        <h1 className="text-[16px] font-bold text-[rgb(var(--foreground))]">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5">
        <SettingsNav tabs={TABS} active={tab} onChange={setTab} />

        <div className="rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-5">
          {tab === "general" && <GeneralTab />}
          {tab === "notifications" && <NotificationsTab />}
          {tab === "platforms" && <PlatformsTab />}
          {tab === "danger" && <DangerZoneTab />}
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
