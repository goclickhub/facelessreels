"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, ExternalLink, FastForward, RotateCw, Trash2 } from "lucide-react";
import type { VideoRow as VideoRowType } from "@/types";
import { useRegenerateVideo, useRetryVideo, useDeleteVideo } from "@/hooks/useVideos";
import { useToast } from "@/hooks/useToast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { REGENERATABLE_VIDEO_STATUSES } from "@/lib/statusBadges";
import { ApiError } from "@/lib/api";

export function VideoActionsMenu({ video }: { video: VideoRowType }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const regenerate = useRegenerateVideo();
  const retry = useRetryVideo();
  const deleteVideo = useDeleteVideo();
  const { success: toastSuccess, error: toastError } = useToast();

  const canRetry = video.status === "failed" && video.canResume;

  const handleRetry = async () => {
    try {
      await retry.mutateAsync(video.id);
      toastSuccess("Retrying", "Resuming from your last completed step — check back in a few minutes.");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Couldn't retry video", message);
    }
  };

  const handleRegenerate = async () => {
    try {
      await regenerate.mutateAsync(video.id);
      toastSuccess("Regeneration started", "Starting completely over — check back in a few minutes.");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Couldn't regenerate video", message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVideo.mutateAsync(video.id);
      toastSuccess("Video deleted");
      setConfirmDelete(false);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError("Couldn't delete video", message);
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
            className="z-50 w-44 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl shadow-xl py-1.5 notif-panel-animate"
          >
            {video.videoUrl && (
              <DropdownMenu.Item asChild>
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors outline-none cursor-pointer"
                >
                  <ExternalLink size={13} /> Open video
                </a>
              </DropdownMenu.Item>
            )}
            {canRetry && (
              <DropdownMenu.Item
                onSelect={handleRetry}
                className="flex items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors outline-none cursor-pointer"
              >
                <FastForward size={13} /> Retry
              </DropdownMenu.Item>
            )}
            {REGENERATABLE_VIDEO_STATUSES.includes(video.status) && (
              <DropdownMenu.Item
                onSelect={handleRegenerate}
                className="flex items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors outline-none cursor-pointer"
              >
                <RotateCw size={13} /> {canRetry ? "Regenerate (start over)" : "Regenerate"}
              </DropdownMenu.Item>
            )}
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
          title="Delete this video?"
          message="This permanently removes the video and its file. This can't be undone."
          confirmLabel="Delete"
          danger
          loading={deleteVideo.isPending}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}
