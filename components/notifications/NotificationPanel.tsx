"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import { NOTIFICATIONS } from "@/lib/data";
import Image from "next/image";

interface NotificationPanelProps {
  onClose: () => void;
  isMobile?: boolean;
}

function NotifList() {
  return (
    <div className="overflow-y-auto flex-1">
      {NOTIFICATIONS.map((notif) => (
        <div
          key={notif.id}
          className="flex items-start gap-3 px-5 py-3.5 border-b border-[rgb(var(--border))]/50 hover:bg-[rgb(var(--muted))]/40 transition-colors cursor-pointer"
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full mt-1.5 shrink-0",
              notif.read
                ? "bg-[rgb(var(--muted-foreground))]/40"
                : "bg-blue-500",
            )}
          />
          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
            {/* <Image
              src="/images/logo-crop.png" // replace with notif.avatar if dynamic
              alt="User avatar"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            /> */}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-[10px] leading-snug",
                notif.read
                  ? "text-[rgb(var(--muted-foreground))] font-normal"
                  : "text-[rgb(var(--foreground))] font-normal",
              )}
            >
              {notif.title}
            </p>
            <p className="text-[8px] text-[rgb(var(--muted-foreground))] mt-0.5">
              {notif.timestamp}
            </p>
          </div>
        </div>
      ))}
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
    <>
      <div className="flex items-center justify-between px-5 py-4 border-b border-[rgb(var(--border))] shrink-0">
        <span className="text-[15px] font-bold text-[rgb(var(--foreground))]">
          Notification(22)
        </span>
        <div className="flex items-center gap-3">
          <button className="text-[12px] text-[rgb(var(--primary))] font-medium hover:underline">
            Mark as read
          </button>
          {showClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors"
            >
              <X size={16} className="text-[rgb(var(--foreground))]" />
            </button>
          )}
        </div>
      </div>
      <div className="px-5 pt-3 pb-0 shrink-0">
        <div className="inline-flex items-center gap-2 pb-3 border-b-2 border-[rgb(var(--primary))]">
          <span className="text-[13px] font-bold text-[rgb(var(--primary))]">
            All
          </span>
          <span className="bg-[rgb(var(--primary))] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            22
          </span>
        </div>
        <div className="h-px bg-[rgb(var(--border))] -mx-5" />
      </div>
    </>
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
          <NotifList />
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
      <NotifList />
    </div>
  );
}
