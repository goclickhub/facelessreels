"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Sparkles,
  SquarePen,
  Trash2,
} from "lucide-react";
import {
  useSeriesList,
  useToggleSeries,
  useDeleteSeries,
} from "@/hooks/useSeries";
import { useToast } from "@/hooks/useToast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { ApiError } from "@/lib/api";
import type { Series } from "@/hooks/useSeries";

const PAGE_SIZE = 10;

// Active/Paused alone doesn't tell you whether the series' video actually
// worked — a paused-looking "Active" badge on a series whose only video
// failed is misleading. Paused (a deliberate user action) still wins when
// set; otherwise the badge reflects the real outcome of the latest video.
function statusBadge(series: Series): { label: string; className: string } {
  if (!series.active) {
    return { label: "Paused", className: "bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]" };
  }
  switch (series.latestVideoStatus) {
    case "failed":
      return { label: "Failed", className: "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400" };
    case "queued":
    case "processing":
      return { label: "Generating", className: "bg-[rgb(var(--stat-yellow))] text-yellow-700 dark:text-yellow-300" };
    default:
      return { label: "Active", className: "bg-[rgb(var(--stat-green))] text-green-700 dark:text-green-300" };
  }
}

function SeriesRow({ series }: { series: Series }) {
  const router = useRouter();
  const toggleSeries = useToggleSeries();
  const deleteSeries = useDeleteSeries();
  const { success: toastSuccess, error: toastError } = useToast();

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const badge = statusBadge(series);

  const handleEdit = () => {
    setMenuOpen(false);
    router.push(`/series?edit=${series.id}`);
  };

  const handleToggle = async () => {
    setMenuOpen(false);
    try {
      await toggleSeries.mutateAsync(series.id);
      toastSuccess(series.active ? "Series paused" : "Series resumed");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Couldn't update series", message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSeries.mutateAsync(series.id);
      toastSuccess("Series deleted");
      setConfirmDelete(false);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Couldn't delete series", message);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0 flex items-center gap-2">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-[rgb(var(--foreground))] truncate">{series.name}</p>
          <p className="text-[11px] text-[rgb(var(--muted-foreground))] capitalize">
            {series.niche} · {series.platforms.join(", ")}
          </p>
        </div>
        <span className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.className}`}>
          {badge.label}
        </span>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenu.Trigger asChild>
            <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]">
              <MoreHorizontal size={14} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={4}
              collisionPadding={8}
              className="z-50 w-40 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl shadow-xl py-1.5 notif-panel-animate"
            >
              <DropdownMenu.Item
                onSelect={handleEdit}
                className="flex items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors outline-none cursor-pointer"
              >
                <SquarePen size={13} /> Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={handleToggle}
                className="flex items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors outline-none cursor-pointer"
              >
                {series.active ? <Pause size={13} /> : <Play size={13} />}
                {series.active ? "Pause" : "Resume"}
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => setConfirmDelete(true)}
                className="flex items-center gap-2 px-3.5 py-2 text-[12px] text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors outline-none cursor-pointer"
              >
                <Trash2 size={13} /> Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {confirmDelete && (
        <ConfirmModal
          title="Delete this series?"
          message={`"${series.name}" and every video it generated will be permanently deleted. This can't be undone.`}
          confirmLabel="Delete"
          danger
          loading={deleteSeries.isPending}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}

export default function YourSeriesSection() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isPlaceholderData } = useSeriesList(page, PAGE_SIZE);
  const series = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-[rgb(var(--foreground))]">Your Series</h3>
        <Link
          href="/series"
          className="flex items-center gap-1.5 rounded-lg bg-[rgb(var(--primary))] px-3 py-1.5 text-[12px] font-semibold text-white hover:opacity-90 transition-opacity"
        >
          <Plus size={14} /> New Series
        </Link>
      </div>

      <div className="rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <Loader2 size={24} className="text-[rgb(var(--muted-foreground))] animate-spin" />
            <p className="text-[13px] text-[rgb(var(--muted-foreground))]">Loading series…</p>
          </div>
        ) : series.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2 px-4 text-center">
            <Sparkles size={24} className="text-[rgb(var(--muted-foreground))]" />
            <p className="text-[13px] text-[rgb(var(--muted-foreground))]">
              No series yet — create one to start generating videos.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[rgb(var(--border))]">
            {series.map((s) => (
              <SeriesRow key={s.id} series={s} />
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] text-[rgb(var(--muted-foreground))]">
            Page {page} of {totalPages} · {total} series
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 h-8 px-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[12px] font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <button
              onClick={() => setPage((p) => (isPlaceholderData ? p : Math.min(totalPages, p + 1)))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 h-8 px-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[12px] font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
