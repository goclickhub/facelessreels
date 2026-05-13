import type { ComponentType } from "react";

interface Tip {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
}

interface GuideTipsProps {
  tips: Tip[];
}

export default function GuideTips({ tips }: GuideTipsProps) {
  return (
    <div className="rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-4 space-y-3">
      <p className="text-[13px] font-semibold text-[rgb(var(--foreground))]">
        Pro tips
      </p>
      {tips.map((tip) => (
        <div key={tip.title} className="flex gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--secondary))]">
            <tip.icon size={13} className="text-[rgb(var(--primary))]" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[12px] font-semibold text-[rgb(var(--foreground))]">
              {tip.title}
            </p>
            <p className="text-[11px] leading-relaxed text-[rgb(var(--muted-foreground))]">
              {tip.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
