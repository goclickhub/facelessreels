"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import BillingToggle, { type Billing } from "@/components/upgrade/BillingToggle";
import PlanCard from "@/components/upgrade/PlanCard";
import { usePlans } from "@/hooks/useBilling";
import { useAuth } from "@/hooks/useAuth";

const PLAN_PRESENTATION: Record<string, { description: string; highlighted: boolean; badge?: string; cta: string }> = {
  free: {
    description: "Get started with automated faceless videos.",
    highlighted: false,
    cta: "Current plan",
  },
  pro: {
    description: "For creators who want daily automated content.",
    highlighted: true,
    badge: "Most popular",
    cta: "Upgrade to Pro",
  },
  business: {
    description: "For agencies and power creators at scale.",
    highlighted: false,
    cta: "Upgrade to Business",
  },
};

export default function UpgradePage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const { data: plans, isLoading } = usePlans();
  const { user } = useAuth();

  return (
    <div className="px-5 md:px-6 py-5 space-y-6">
      <nav className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--muted-foreground))]">
        <span>Home</span>
        <span>&gt;</span>
        <span className="text-[rgb(var(--foreground))] font-medium">Upgrade</span>
      </nav>

      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-[rgb(var(--primary))]" />
        <h1 className="text-[16px] font-bold text-[rgb(var(--foreground))]">
          Choose your plan
        </h1>
      </div>

      <div className="text-center space-y-2 py-2">
        <p className="text-[22px] font-bold text-[rgb(var(--foreground))] leading-tight">
          Scale your faceless content
        </p>
        <p className="text-[13px] text-[rgb(var(--muted-foreground))] max-w-md mx-auto">
          Upgrade to generate unlimited videos, connect more platforms, and remove the watermark.
        </p>
        <BillingToggle billing={billing} onChange={setBilling} />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={24} className="animate-spin text-[rgb(var(--muted-foreground))]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {(plans ?? []).map((plan) => {
            const presentation = PLAN_PRESENTATION[plan.id] ?? {
              description: "",
              highlighted: false,
              cta: `Upgrade to ${plan.name}`,
            };
            const isCurrent = user?.plan === plan.id;
            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                {...presentation}
                cta={isCurrent ? "Current plan" : presentation.cta}
                disabled={isCurrent}
              />
            );
          })}
        </div>
      )}

      <p className="text-center text-[11px] text-[rgb(var(--muted-foreground))] pb-4">
        All plans include a 7-day free trial. No credit card required to start.
      </p>
    </div>
  );
}
