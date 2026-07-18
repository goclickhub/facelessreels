"use client";

import { Check, Zap } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import type { BillingPlan } from "@/hooks/useBilling";
import type { Billing } from "./BillingToggle";

interface PlanCardProps {
  plan: BillingPlan;
  billing: Billing;
  description: string;
  highlighted: boolean;
  badge?: string;
  cta: string;
  disabled?: boolean;
}

export default function PlanCard({ plan, billing, description, highlighted, badge, cta, disabled }: PlanCardProps) {
  const { success: toastSuccess } = useToast();
  const price = billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  const hl = highlighted;

  const handleClick = () => {
    if (disabled) return;
    toastSuccess("Coming soon", "Paid plans aren't available to purchase yet.");
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-5 transition-shadow ${
        hl ? "bg-[rgb(var(--primary))] text-white shadow-xl" : "bg-[rgb(var(--card))] border border-[rgb(var(--border))]"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[rgb(var(--primary))] shadow">
            <Zap size={10} />
            {badge}
          </span>
        </div>
      )}

      <div className="space-y-1 mb-4">
        <p className={`text-[11px] font-semibold uppercase tracking-widest ${hl ? "text-white/60" : "text-[rgb(var(--muted-foreground))]"}`}>
          {plan.name}
        </p>
        <div className="flex items-end gap-1">
          <span className={`text-[32px] font-extrabold leading-none ${hl ? "text-white" : "text-[rgb(var(--foreground))]"}`}>
            ${price}
          </span>
          {price > 0 && (
            <span className={`text-[12px] mb-1 ${hl ? "text-white/60" : "text-[rgb(var(--muted-foreground))]"}`}>
              /mo
            </span>
          )}
        </div>
        <p className={`text-[11px] leading-relaxed ${hl ? "text-white/70" : "text-[rgb(var(--muted-foreground))]"}`}>
          {description}
        </p>
      </div>

      <ul className="flex-1 space-y-2 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${hl ? "bg-white/20 text-white" : "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]"}`}>
              <Check size={10} strokeWidth={3} />
            </div>
            <span className={`text-[12px] ${hl ? "text-white/90" : "text-[rgb(var(--foreground))]"}`}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleClick}
        disabled={disabled}
        className={`flex w-full items-center justify-center rounded-xl py-2.5 text-[13px] font-bold transition-opacity hover:opacity-90 ${
          hl
            ? "bg-white text-[rgb(var(--primary))]"
            : disabled
            ? "border border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] pointer-events-none opacity-60"
            : "bg-[rgb(var(--primary))] text-white"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
