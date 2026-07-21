"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useAdminDeleteSeries } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/useToast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { ApiError } from "@/lib/api";
import type { Series } from "@/hooks/useSeries";

export function AdminSeriesActionsMenu({ series }: { series: Series }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteSeries = useAdminDeleteSeries();
  const { success: toastSuccess, error: toastError } = useToast();

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
    <>
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
              onSelect={() => setConfirmDelete(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-[12px] text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors outline-none cursor-pointer"
            >
              <Trash2 size={13} /> Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {confirmDelete && (
        <ConfirmModal
          title="Delete this series?"
          message={`"${series.name}" (owned by ${series.ownerEmail ?? "this user"}) and every video it generated will be permanently deleted.`}
          confirmLabel="Delete"
          danger
          loading={deleteSeries.isPending}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}
