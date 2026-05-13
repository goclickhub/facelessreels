"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import BillingToggle, { type Billing } from "@/components/upgrade/BillingToggle";
import PlanCard from "@/components/upgrade/PlanCard";
import type { Plan } from "@/types";

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Get started with automated faceless videos.",
    highlighted: false,
    features: [
      "10 videos / month",
      "3 niche presets",
      "1 platform connection",
      "720p export quality",
      "Watermarked videos",
      "Community support",
    ],
    cta: "Current plan",
    ctaHref: "#",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 29,
    annualPrice: 19,
    description: "For creators who want daily automated content.",
    highlighted: true,
    badge: "Most popular",
    features: [
      "Unlimited videos",
      "All niche presets",
      "3 platform connections",
      "1080p export quality",
      "No watermark",
      "Custom voice selection",
      "Priority processing",
      "Email support",
    ],
    cta: "Upgrade to Pro",
    ctaHref: "#",
  },
  {
    id: "business",
    name: "Business",
    monthlyPrice: 79,
    annualPrice: 55,
    description: "For agencies and power creators at scale.",
    highlighted: false,
    features: [
      "Everything in Pro",
      "Unlimited platforms",
      "4K export quality",
      "10 team seats",
      "API access",
      "Custom branding",
      "Dedicated account manager",
      "SLA-backed uptime",
    ],
    cta: "Upgrade to Business",
    ctaHref: "#",
  },
];

export default function UpgradePage() {
  const [billing, setBilling] = useState<Billing>("monthly");

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} />
        ))}
      </div>

      <p className="text-center text-[11px] text-[rgb(var(--muted-foreground))] pb-4">
        All plans include a 7-day free trial. No credit card required to start.
      </p>
    </div>
  );
}
