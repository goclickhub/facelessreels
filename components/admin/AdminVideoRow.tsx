import { VIDEO_STATUS_STYLES } from "@/lib/statusBadges";
import { AdminVideoActionsMenu } from "@/components/admin/AdminVideoActionsMenu";
import { VideoProgressBar } from "@/components/videos/VideoProgressBar";
import type { Video } from "@/hooks/useVideos";

export function AdminVideoRow({ video }: { video: Video }) {
  return (
    <tr className="hover:bg-[rgb(var(--muted))] transition-colors">
      <td className="px-4 py-3 text-[12px] font-medium text-[rgb(var(--foreground))] truncate max-w-[220px]">{video.title}</td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--muted-foreground))]">{video.ownerEmail}</td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--muted-foreground))]">{video.seriesName}</td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--foreground))] capitalize">{video.platform}</td>
      <td className="px-4 py-3">
        {video.status === "processing" ? (
          <VideoProgressBar progress={video.progress} />
        ) : (
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${VIDEO_STATUS_STYLES[video.status]}`}>
            {video.status}
          </span>
        )}
      </td>
      <td className="px-4 py-3">
        <AdminVideoActionsMenu video={video} />
      </td>
    </tr>
  );
}
