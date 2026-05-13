"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepSection } from "@/components/series/StepSection";
import { FooterNav } from "@/components/series/FooterNav";
import { SERIES_NICHES, SERIES_ART_STYLES, SERIES_EFFECTS } from "@/lib/data";
import type { SeriesStep } from "@/types";
import type { TabValue } from "@/components/series/TabSwitch";

const SECTIONS: SeriesStep[] = [
  {
    id: 1,
    title: "Choose your niche",
    subtitle: "Select or describe your niche",
    placeholder: "Type in a desired niche...",
    data: SERIES_NICHES,
  },
  {
    id: 2,
    title: "Choose a preferred art style",
    subtitle: "Select a suitable visual style for your video",
    placeholder: "Type in a desired art style....",
    data: SERIES_ART_STYLES,
  },
  {
    id: 3,
    title: "Choose an effect",
    subtitle: "Select one or more visual effects to make your videos engaging and catchy",
    placeholder: "Type in a desired effect...",
    data: SERIES_EFFECTS,
  },
];

export default function SeriesPage() {
  const router = useRouter();
  const [tabs, setTabs] = useState<Record<number, TabValue>>({ 1: "preset", 2: "preset", 3: "preset" });
  const [selections, setSelections] = useState<Record<number, string | null>>({ 1: null, 2: null, 3: null });
  const [customTexts, setCustomTexts] = useState<Record<number, string>>({ 1: "", 2: "", 3: "" });

  return (
    <>
      <div className="flex-1 px-5 md:px-8 py-6 space-y-8">
        {SECTIONS.map((section) => (
          <StepSection
            key={section.id}
            step={section}
            tab={tabs[section.id]}
            onTabChange={(tab) => setTabs((prev) => ({ ...prev, [section.id]: tab }))}
            selection={selections[section.id]}
            onSelect={(id) => setSelections((prev) => ({ ...prev, [section.id]: id }))}
            customText={customTexts[section.id]}
            onCustomTextChange={(text) =>
              setCustomTexts((prev) => ({ ...prev, [section.id]: text }))
            }
          />
        ))}
      </div>

      <FooterNav
        step={1}
        total={3}
        onBack={() => router.push("/dashboard")}
        onContinue={() => router.push("/series/style")}
      />
    </>
  );
}
