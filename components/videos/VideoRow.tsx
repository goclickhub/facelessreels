"use client";

import { useRef, useState } from "react";
import { MoreHorizontal, Play, ExternalLink, RotateCw, Trash2 } from "lucide-react";
import type { VideoRow as VideoRowType, VideoPlatform, VideoStatus } from "@/types";
import { useRegenerateVideo, useDeleteVideo } from "@/hooks/useVideos";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useToast } from "@/hooks/useToast";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { ApiError } from "@/lib/api";

const PLATFORM_COLORS: Record<VideoPlatform, string> = {
  tiktok: "bg-black text-white",
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  youtube: "bg-red-600 text-white",
};

const STATUS_STYLES: Record<VideoStatus, string> = {
  queued: "bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]",
  processing: "bg-[rgb(var(--stat-yellow))] text-yellow-700 dark:text-yellow-300",
  ready: "bg-[rgb(var(--stat-green))] text-green-700 dark:text-green-300",
  published: "bg-[rgb(var(--stat-green))] text-green-700 dark:text-green-300",
  failed: "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400",
};

const REGENERATABLE: VideoStatus[] = ["ready", "published", "failed"];

export default function VideoRow({ video }: { video: VideoRowType }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  const regenerate = useRegenerateVideo();
  const deleteVideo = useDeleteVideo();
  const { success: toastSuccess, error: toastError } = useToast();

  const handleRegenerate = async () => {
    setMenuOpen(false);
    try {
      await regenerate.mutateAsync(video.id);
      toastSuccess("Regeneration started", "Check back in a few minutes.");
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
    <div className="grid grid-cols-[1fr_120px_100px_80px_80px_36px] gap-3 items-center px-4 py-3 hover:bg-[rgb(var(--muted))] transition-colors">
      {/* Title */}
      <div className="flex items-center gap-2.5 min-w-0">
        <a
          href={video.videoUrl ?? undefined}
          target="_blank"
          rel="noreferrer"
          className={`flex h-9 w-14 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--muted))] border border-[rgb(var(--border))] ${
            video.videoUrl ? "hover:border-[rgb(var(--primary))] transition-colors" : "pointer-events-none opacity-50"
          }`}
        >
          <Play size={14} className="text-[rgb(var(--primary))]" />
        </a>
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-[rgb(var(--foreground))] truncate">
            {video.title}
          </p>
          <p className="text-[11px] text-[rgb(var(--muted-foreground))]">
            {video.postedAt}
          </p>
        </div>
      </div>

      {/* Series */}
      <p className="text-[11px] text-[rgb(var(--muted-foreground))] truncate">
        {video.series}
      </p>

      {/* Platform */}
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${PLATFORM_COLORS[video.platform]}`}>
        {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
      </span>

      {/* Status */}
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[video.status]}`}>
        {video.status}
      </span>

      {/* Views */}
      <p className="text-[12px] text-[rgb(var(--foreground))]">{video.views}</p>

      {/* Actions */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-[rgb(var(--muted))] transition-colors cursor-pointer text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
        >
          <MoreHorizontal size={14} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-8 z-30 w-44 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl shadow-xl py-1.5 notif-panel-animate">
            {video.videoUrl && (
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors"
              >
                <ExternalLink size={13} /> Open video
              </a>
            )}
            {REGENERATABLE.includes(video.status) && (
              <button
                onClick={handleRegenerate}
                disabled={regenerate.isPending}
                className="flex w-full items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors disabled:opacity-60"
              >
                <RotateCw size={13} /> Regenerate
              </button>
            )}
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
    </div>
  );
}
