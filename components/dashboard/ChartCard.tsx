"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useVideosList } from "@/hooks/useVideos";

function lastSevenDays(videos: { createdAt: string }[]) {
  const days: { key: string; label: string; date: Date }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    days.push({ key: d.toDateString(), label: d.toLocaleDateString(undefined, { weekday: "short" }), date: d });
  }

  return days.map(({ key, label }) => ({
    day: label,
    videos: videos.filter((v) => new Date(v.createdAt).toDateString() === key).length,
  }));
}

export default function ChartCard() {
  const { data } = useVideosList();
  const chartData = lastSevenDays(data?.data ?? []);
  const maxVideos = Math.max(1, ...chartData.map((d) => d.videos));

  return (
    <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-[15px] font-bold text-[rgb(var(--foreground))]">
            Videos generated
          </h3>
          <p className="text-[12px] text-[rgb(var(--muted-foreground))] mt-0.5">
            Last 7 days
          </p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", minHeight: 260 }}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 8, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d946ef" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgb(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgb(var(--muted-foreground))",
                fontSize: 11,
              }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgb(var(--muted-foreground))", fontSize: 11 }}
              allowDecimals={false}
              domain={[0, maxVideos]}
            />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--popover))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 10,
                fontSize: 12,
                boxShadow: "0 4px 16px rgba(0,0,0,.1)",
              }}
              formatter={(val: number) => [val, "Videos"]}
            />
            <Area
              type="monotone"
              dataKey="videos"
              stroke="#d946ef"
              strokeWidth={2.5}
              fill="url(#chartGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#d946ef", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
