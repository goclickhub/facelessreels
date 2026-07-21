"use client";

import Link from "next/link";
import { Shield, Users, Layers, Video, Loader2 } from "lucide-react";
import { useAdminStats } from "@/hooks/useAdmin";
import { cn } from "@/lib/utils";
import type { VideoStatus } from "@/types";

const STATUS_LABELS: Record<VideoStatus, string> = {
  queued: "Queued",
  processing: "Processing",
  ready: "Ready",
  published: "Published",
  failed: "Failed",
};

export default function AdminOverviewPage() {
  const { data: stats, isLoading } = useAdminStats();

  const cards = [
    { id: "users", label: "Total Users", value: stats?.totalUsers ?? 0, icon: Users, bg: "bg-[rgb(var(--stat-pink))]", href: "/admin/users" },
    { id: "series", label: "Total Series", value: stats?.totalSeries ?? 0, icon: Layers, bg: "bg-[rgb(var(--stat-yellow))]", href: "/admin/series" },
    { id: "videos", label: "Total Videos", value: stats?.totalVideos ?? 0, icon: Video, bg: "bg-[rgb(var(--stat-green))]", href: "/admin/videos" },
  ];

  return (
    <div className="px-5 md:px-6 py-5 space-y-6">
      <nav className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--muted-foreground))]">
        <span>Home</span>
        <span>&gt;</span>
        <span className="text-[rgb(var(--foreground))] font-medium">Admin</span>
      </nav>

      <div className="flex items-center gap-2">
        <Shield size={16} className="text-[rgb(var(--primary))]" />
        <h1 className="text-[16px] font-bold text-[rgb(var(--foreground))]">Admin Overview</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="animate-spin text-[rgb(var(--muted-foreground))]" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className={cn("rounded-2xl p-5 flex items-center justify-between shadow-sm hover:opacity-90 transition-opacity", card.bg)}
              >
                <div>
                  <p className="text-xs font-medium mb-2 text-neutral-900 dark:text-amber-300">{card.label}</p>
                  <p className="text-2xl font-black leading-none text-neutral-900 dark:text-amber-100">{card.value}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-neutral-900 dark:bg-neutral-700 flex items-center justify-center shrink-0">
                  <card.icon size={20} className="text-white" />
                </div>
              </Link>
            ))}
          </div>

          <div className="rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-5">
            <p className="text-[13px] font-semibold text-[rgb(var(--foreground))] mb-4">Videos by status</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <div key={key}>
                  <p className="text-[20px] font-bold text-[rgb(var(--foreground))]">
                    {stats?.videosByStatus[key as keyof typeof STATUS_LABELS] ?? 0}
                  </p>
                  <p className="text-[11px] text-[rgb(var(--muted-foreground))]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
