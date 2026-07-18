"use client";

import { usePathname } from "next/navigation";
import { ProgressBar } from "@/components/series/ProgressBar";
import { SeriesDraftProvider } from "@/providers/SeriesDraftProvider";

const STEP_MAP: Record<string, number> = {
  "/series": 1,
  "/series/style": 2,
  "/series/effects": 3,
};

const TOTAL_STEPS = 3;

export default function SeriesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const step = STEP_MAP[pathname] ?? 1;

  return (
    <SeriesDraftProvider>
      <div className="flex flex-col min-h-full">
        <ProgressBar step={step} total={TOTAL_STEPS} />
        {children}
      </div>
    </SeriesDraftProvider>
  );
}
