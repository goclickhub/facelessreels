"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Pause, Play, SquarePen, Trash2 } from "lucide-react";
import { useToggleSeries, useDeleteSeries } from "@/hooks/useSeries";
import { useToast } from "@/hooks/useToast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { getSeriesStatusBadge } from "@/lib/statusBadges";
import { ApiError } from "@/lib/api";
import type { Series } from "@/hooks/useSeries";

export function SeriesRow({ series }: { series: Series }) {
  const router = useRouter();
  const toggleSeries = useToggleSeries();
  const deleteSeries = useDeleteSeries();
  const { success: toastSuccess, error: toastError } = useToast();

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const badge = getSeriesStatusBadge(series);

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
