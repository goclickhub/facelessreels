"use client";

import { useState } from "react";
import { Film } from "lucide-react";
import { useAdminVideos } from "@/hooks/useAdmin";
import { Pagination } from "@/components/ui/Pagination";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminVideoRow } from "@/components/admin/AdminVideoRow";

const PAGE_SIZE = 10;
const HEADERS = ["Title", "Owner", "Series", "Platform", "Status", ""];

export default function AdminVideosPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isPlaceholderData } = useAdminVideos({ page, limit: PAGE_SIZE });
  const videos = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="px-5 md:px-6 py-5 space-y-6">
      <AdminBreadcrumb page="Videos" />

      <div className="flex items-center gap-2">
        <Film size={16} className="text-[rgb(var(--primary))]" />
        <h1 className="text-[16px] font-bold text-[rgb(var(--foreground))]">All Videos ({total})</h1>
      </div>

      <AdminTable headers={HEADERS} isLoading={isLoading} isEmpty={videos.length === 0} emptyMessage="No videos found">
        {videos.map((v) => (
          <AdminVideoRow key={v.id} video={v} />
        ))}
      </AdminTable>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        nextDisabled={isPlaceholderData}
        label={`Page ${page} of ${totalPages} · ${total} video${total === 1 ? "" : "s"}`}
      />
    </div>
  );
}
