"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { useAdminSeries } from "@/hooks/useAdmin";
import { Pagination } from "@/components/ui/Pagination";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { AdminTable } from "@/components/admin/AdminTable";
import { AdminSeriesRow } from "@/components/admin/AdminSeriesRow";

const PAGE_SIZE = 10;
const HEADERS = ["Name", "Owner", "Niche", "Platforms", "Status", ""];

export default function AdminSeriesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isPlaceholderData } = useAdminSeries(page, PAGE_SIZE);
  const series = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="px-5 md:px-6 py-5 space-y-6">
      <AdminBreadcrumb page="Series" />

      <div className="flex items-center gap-2">
        <Layers size={16} className="text-[rgb(var(--primary))]" />
        <h1 className="text-[16px] font-bold text-[rgb(var(--foreground))]">All Series ({total})</h1>
      </div>

      <AdminTable headers={HEADERS} isLoading={isLoading} isEmpty={series.length === 0} emptyMessage="No series found">
        {series.map((s) => (
          <AdminSeriesRow key={s.id} series={s} />
        ))}
      </AdminTable>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        nextDisabled={isPlaceholderData}
        label={`Page ${page} of ${totalPages} · ${total} series`}
      />
    </div>
  );
}
