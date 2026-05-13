"use client";

import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CHART_DATA } from "@/lib/data";

export default function ViewStatistic() {
  return (
    <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl p-5 md:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-[14px] font-bold text-[rgb(var(--foreground))] mb-1.5">View Statistic</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-[30px] font-black text-[rgb(var(--foreground))] leading-none tracking-tight">483,025</span>
            <span className="text-[12px] text-[rgb(var(--muted-foreground))]">Total Viewers</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-px h-10 bg-[rgb(var(--border))]" />
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[rgb(var(--primary))]" />
            <span className="text-[12px] text-[rgb(var(--muted-foreground))] font-medium">Jan – Jun</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-emerald-300 bg-[rgb(var(--card))]" />
            <span className="text-[12px] text-[rgb(var(--muted-foreground))] font-medium">Last 6 months</span>
          </div>
        </div>
      </div>

      {/* Chart - minHeight fixes the recharts 0 height warning */}
      <div style={{ width: "100%", minHeight: 260 }}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={CHART_DATA} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(var(--primary))" stopOpacity={0.18} />
                <stop offset="95%" stopColor="rgb(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgb(var(--muted-foreground))", fontSize: 11 }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgb(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} ticks={[0, 25, 50, 100]} />
            <Tooltip
              contentStyle={{ background: "rgb(var(--popover))", border: "1px solid rgb(var(--border))", borderRadius: 10, fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,.1)" }}
              formatter={(val) => [`${val}%`]}
            />
            <Area type="monotone" dataKey="current" stroke="rgb(var(--primary))" strokeWidth={2.5} fill="url(#gradCurrent)" dot={false} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="previous" stroke="#6ee7b7" strokeWidth={1.5} strokeDasharray="5 4" dot={false} activeDot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
