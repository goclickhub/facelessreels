import { getSeriesStatusBadge } from "@/lib/statusBadges";
import { AdminSeriesActionsMenu } from "@/components/admin/AdminSeriesActionsMenu";
import type { Series } from "@/hooks/useSeries";

export function AdminSeriesRow({ series }: { series: Series }) {
  const badge = getSeriesStatusBadge(series);

  return (
    <tr className="hover:bg-[rgb(var(--muted))] transition-colors">
      <td className="px-4 py-3 text-[12px] font-medium text-[rgb(var(--foreground))] truncate max-w-[200px]">{series.name}</td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--muted-foreground))]">{series.ownerEmail}</td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--foreground))] capitalize">{series.niche}</td>
      <td className="px-4 py-3 text-[12px] text-[rgb(var(--muted-foreground))]">{series.platforms.join(", ")}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.className}`}>
          {badge.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <AdminSeriesActionsMenu series={series} />
      </td>
    </tr>
  );
}
