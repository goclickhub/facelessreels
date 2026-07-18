"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, MoreHorizontal, Pause, Play, Plus, Sparkles, SquarePen, Trash2 } from "lucide-react";
import {
  useSeriesList,
  useToggleSeries,
  useDeleteSeries,
} from "@/hooks/useSeries";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useToast } from "@/hooks/useToast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { ApiError } from "@/lib/api";
import type { Series } from "@/hooks/useSeries";

function SeriesRow({ series }: { series: Series }) {
  const router = useRouter();
  const toggleSeries = useToggleSeries();
  const deleteSeries = useDeleteSeries();
  const { success: toastSuccess, error: toastError } = useToast();

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

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
        <span
          className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            series.active
              ? "bg-[rgb(var(--stat-green))] text-green-700 dark:text-green-300"
              : "bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]"
          }`}
        >
          {series.active ? "Active" : "Paused"}
        </span>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
          >
            <MoreHorizontal size={14} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 z-30 w-40 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl shadow-xl py-1.5 notif-panel-animate">
              <button
                onClick={handleEdit}
                className="flex w-full items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors"
              >
                <SquarePen size={13} /> Edit
              </button>
              <button
                onClick={handleToggle}
                disabled={toggleSeries.isPending}
                className="flex w-full items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors disabled:opacity-60"
              >
                {series.active ? <Pause size={13} /> : <Play size={13} />}
                {series.active ? "Pause" : "Resume"}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setConfirmDelete(true);
                }}
                className="flex w-full items-center gap-2 px-3.5 py-2 text-[12px] text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {confirmDelete && (
        <ConfirmModal
          title="Delete this series?"
          message={`"${series.name}" will be permanently deleted. Videos already generated from it won't be affected.`}
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
  const { data: series, isLoading } = useSeriesList();

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
        ) : !series || series.length === 0 ? (
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
    </section>
  );
}
