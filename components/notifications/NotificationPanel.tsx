"use client";

import { useRef } from "react";
import { Bell, X } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";

interface NotificationPanelProps {
  onClose: () => void;
  isMobile?: boolean;
}

function ComingSoonState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 py-12 px-5 text-center">
      <Bell size={24} className="text-[rgb(var(--muted-foreground))]" />
      <p className="text-[13px] font-medium text-[rgb(var(--foreground))]">Coming soon</p>
      <p className="text-[11px] text-[rgb(var(--muted-foreground))]">
        Notifications for video status and platform activity aren&apos;t available yet.
      </p>
    </div>
  );
}

function PanelHeader({
  onClose,
  showClose,
}: {
  onClose: () => void;
  showClose?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))] shrink-0">
      <span className="text-[15px] font-bold text-[rgb(var(--foreground))]">
        Notifications
      </span>
      {showClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors"
        >
          <X size={16} className="text-[rgb(var(--foreground))]" />
        </button>
      )}
    </div>
  );
}

export default function NotificationPanel({
  onClose,
  isMobile = false,
}: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useClickOutside(panelRef, onClose);

  /* ── Mobile: centered overlay modal ── */
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div
          ref={panelRef}
          className="relative z-10 w-full max-w-90 max-h-[80vh] bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-2xl flex flex-col notif-panel-animate"
        >
          <PanelHeader onClose={onClose} showClose />
          <ComingSoonState />
        </div>
      </div>
    );
  }

  /* ── Desktop: floating dropdown ── */
  return (
    <div
      ref={panelRef}
      className="notif-panel-animate absolute top-17.5 right-4 w-85 max-h-[calc(100vh-90px)] z-50 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl shadow-2xl flex flex-col"
    >
      <PanelHeader onClose={onClose} />
      <ComingSoonState />
    </div>
  );
}
