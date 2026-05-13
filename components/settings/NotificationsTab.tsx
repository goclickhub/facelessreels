"use client";

import { useState } from "react";
import SettingsSectionRow from "./SettingsSectionRow";
import SettingsToggle from "./SettingsToggle";

export default function NotificationsTab() {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifVideoReady, setNotifVideoReady] = useState(true);
  const [notifFailed, setNotifFailed] = useState(true);
  const [notifMarketing, setNotifMarketing] = useState(false);

  return (
    <div className="space-y-1">
      <p className="text-[13px] font-semibold text-[rgb(var(--foreground))] mb-4">
        Notification Preferences
      </p>

      <SettingsSectionRow label="Email notifications" description="Receive a summary email for important events">
        <SettingsToggle enabled={notifEmail} onToggle={() => setNotifEmail((p) => !p)} />
      </SettingsSectionRow>

      <SettingsSectionRow label="Video ready" description="Notify when a video finishes generating">
        <SettingsToggle enabled={notifVideoReady} onToggle={() => setNotifVideoReady((p) => !p)} />
      </SettingsSectionRow>

      <SettingsSectionRow label="Failed posts" description="Alert when auto-posting to a platform fails">
        <SettingsToggle enabled={notifFailed} onToggle={() => setNotifFailed((p) => !p)} />
      </SettingsSectionRow>

      <SettingsSectionRow label="Marketing & tips" description="Receive tips and product updates from FacelessReels">
        <SettingsToggle enabled={notifMarketing} onToggle={() => setNotifMarketing((p) => !p)} />
      </SettingsSectionRow>

      <div className="flex justify-end pt-4">
        <button className="h-9 px-6 rounded-lg bg-[rgb(var(--primary))] text-white text-[12px] font-bold hover:opacity-90 transition-opacity cursor-pointer">
          Save preferences
        </button>
      </div>
    </div>
  );
}
