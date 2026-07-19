"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Play, ExternalLink, RotateCw, Trash2 } from "lucide-react";
import type { VideoRow as VideoRowType, VideoPlatform, VideoStatus } from "@/types";
import { useRegenerateVideo, useDeleteVideo } from "@/hooks/useVideos";
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

function VideoActionsMenu({ video }: { video: VideoRowType }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const regenerate = useRegenerateVideo();
  const deleteVideo = useDeleteVideo();
  const { success: toastSuccess, error: toastError } = useToast();

  const handleRegenerate = async () => {
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
            {REGENERATABLE.includes(video.status) && (
              <DropdownMenu.Item
                onSelect={handleRegenerate}
                className="flex items-center gap-2 px-3.5 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors outline-none cursor-pointer"
              >
                <RotateCw size={13} /> Regenerate
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

function Thumbnail({ video }: { video: VideoRowType }) {
  return (
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
  );
}

export default function VideoRow({ video }: { video: VideoRowType }) {
  return (
    <>
      {/* Desktop / tablet: table row */}
      <div className="hidden sm:grid grid-cols-[1fr_120px_100px_80px_80px_36px] gap-3 items-center px-4 py-3 hover:bg-[rgb(var(--muted))] transition-colors">
        <div className="flex items-center gap-2.5 min-w-0">
          <Thumbnail video={video} />
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-[rgb(var(--foreground))] truncate">{video.title}</p>
            <p className="text-[11px] text-[rgb(var(--muted-foreground))]">{video.postedAt}</p>
          </div>
        </div>

        <p className="text-[11px] text-[rgb(var(--muted-foreground))] truncate">{video.series}</p>

        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${PLATFORM_COLORS[video.platform]}`}>
          {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
        </span>

        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[video.status]}`}>
          {video.status}
        </span>

        <p className="text-[12px] text-[rgb(var(--foreground))]">{video.views}</p>

        <VideoActionsMenu video={video} />
      </div>

      {/* Mobile: stacked card */}
      <div className="flex sm:hidden gap-3 px-4 py-3 hover:bg-[rgb(var(--muted))] transition-colors">
        <Thumbnail video={video} />
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[12px] font-medium text-[rgb(var(--foreground))] truncate">{video.title}</p>
            <VideoActionsMenu video={video} />
          </div>
          <p className="text-[11px] text-[rgb(var(--muted-foreground))] truncate">
            {video.series} · {video.postedAt}
          </p>
          <div className="flex items-center flex-wrap gap-1.5">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${PLATFORM_COLORS[video.platform]}`}>
              {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
            </span>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLES[video.status]}`}>
              {video.status}
            </span>
            <span className="text-[11px] text-[rgb(var(--muted-foreground))]">{video.views} views</span>
          </div>
        </div>
      </div>
    </>
  );
}
