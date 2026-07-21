"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { useSeriesList } from "@/hooks/useSeries";
import { Pagination } from "@/components/ui/Pagination";
import { SeriesRow } from "@/components/dashboard/SeriesRow";

const PAGE_SIZE = 10;

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

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
        nextDisabled={isPlaceholderData}
        label={`Page ${page} of ${totalPages} · ${total} series`}
      />
    </section>
  );
}
