"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { CHART_DATA } from "@/lib/data";

const PERIODS = ["This month", "Last month", "This year"];

function formatY(v: number) {
  if (v === 0) return "0";
  return `${v / 1000}k`;
}

export default function ChartCard() {
  const [period, setPeriod] = useState("This month");
  const [periodOpen, setPeriodOpen] = useState(false);

  return (
    <div className="bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-[15px] font-bold text-[rgb(var(--foreground))]">
            Top video performance
          </h3>
          <p className="text-[12px] text-[rgb(var(--muted-foreground))] mt-0.5">
            Monthly Overview
          </p>
        </div>

        {/* Period dropdown */}
        <div className="relative">
          <button
            onClick={() => setPeriodOpen((p) => !p)}
            className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[12px] font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors"
          >
            {period}
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${periodOpen ? "rotate-180" : ""}`}
            />
          </button>
          {periodOpen && (
            <div className="absolute right-0 top-9 z-10 w-36 bg-[rgb(var(--popover))] border border-[rgb(var(--border))] rounded-xl shadow-xl py-1 notif-panel-animate">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPeriod(p);
                    setPeriodOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-[12px] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: "100%", minHeight: 260 }}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={CHART_DATA}
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
              dataKey="month"
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
              tickFormatter={formatY}
              ticks={[0, 5000, 10000, 20000, 30000, 50000]}
              domain={[0, 56000]}
            />
            <Tooltip
              contentStyle={{
                background: "rgb(var(--popover))",
                border: "1px solid rgb(var(--border))",
                borderRadius: 10,
                fontSize: 12,
                boxShadow: "0 4px 16px rgba(0,0,0,.1)",
              }}
              formatter={(val: number) => [
                val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val,
                "Views",
              ]}
            />
            <Area
              type="monotone"
              dataKey="views"
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
