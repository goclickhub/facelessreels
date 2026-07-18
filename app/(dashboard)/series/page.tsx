"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { StepSection } from "@/components/series/StepSection";
import { FooterNav } from "@/components/series/FooterNav";
import { SERIES_NICHES, SERIES_ART_STYLES, SERIES_EFFECTS } from "@/lib/data";
import { useSeriesDraft } from "@/providers/SeriesDraftProvider";
import { useSeriesList } from "@/hooks/useSeries";
import { useToast } from "@/hooks/useToast";
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

function LoadingState() {
  return (
    <div className="flex-1 flex items-center justify-center py-24">
      <Loader2 size={28} className="animate-spin text-[rgb(var(--muted-foreground))]" />
    </div>
  );
}

export default function SeriesPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SeriesPageGate />
    </Suspense>
  );
}

// Resolves ?edit=<id> against the already-fetched series list before the wizard
// form mounts, so the form's local state (seeded once via useState initializers)
// reads the loaded draft instead of stale defaults. The `key` below forces a
// fresh mount once loading finishes.
function SeriesPageGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { draft, update, loadFromSeries } = useSeriesDraft();
  const { data: seriesList, isLoading: seriesLoading } = useSeriesList();
  const { error: toastError } = useToast();

  // True once the draft already holds this exact series' data — stays true across
  // in-wizard back/forward navigation so re-visiting step 1 doesn't clobber edits
  // made on later steps by re-fetching and overwriting the draft.
  const alreadyLoaded = editId !== null && draft.editingSeriesId === editId;

  useEffect(() => {
    if (!editId) {
      if (draft.editingSeriesId) update({ editingSeriesId: null });
      return;
    }
    if (alreadyLoaded || !seriesList) return;

    const existing = seriesList.find((s) => s.id === editId);
    if (existing) {
      loadFromSeries(existing);
    } else if (!seriesLoading) {
      toastError("Series not found", "That series doesn't exist or was removed.");
      router.replace("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, seriesList, seriesLoading, alreadyLoaded]);

  const ready = !editId || alreadyLoaded;
  if (!ready) return <LoadingState />;

  return <SeriesWizardStep1 key={editId ?? "new"} />;
}

function SeriesWizardStep1() {
  const router = useRouter();
  const { draft, update } = useSeriesDraft();
  const { error: toastError } = useToast();
  const [tabs, setTabs] = useState<Record<number, TabValue>>({ 1: "preset", 2: "preset", 3: "preset" });
  // Preset choice and custom text are tracked separately (and locally) so switching
  // between the "Preset" and "Custom" tabs doesn't clobber whichever one isn't active.
  const [presetSelections, setPresetSelections] = useState<Record<number, string | null>>({
    1: draft.niche,
    2: draft.artStyle,
    3: draft.effects,
  });
  const [customTexts, setCustomTexts] = useState<Record<number, string>>({ 1: "", 2: "", 3: "" });

  const handleContinue = () => {
    const resolved: Record<number, string | null> = {};
    for (const section of SECTIONS) {
      resolved[section.id] =
        tabs[section.id] === "custom"
          ? customTexts[section.id].trim() || null
          : presetSelections[section.id];
    }

    if (!resolved[1] || !resolved[2] || !resolved[3]) {
      toastError("Incomplete selection", "Please pick or type a niche, art style, and effect to continue.");
      return;
    }

    update({
      niche: resolved[1],
      artStyle: resolved[2],
      effects: resolved[3],
    });
    router.push("/series/style");
  };

  return (
    <>
      <div className="flex-1 px-5 md:px-8 py-6 space-y-8">
        {SECTIONS.map((section) => (
          <StepSection
            key={section.id}
            step={section}
            tab={tabs[section.id]}
            onTabChange={(tab) => setTabs((prev) => ({ ...prev, [section.id]: tab }))}
            selection={presetSelections[section.id]}
            onSelect={(id) => setPresetSelections((prev) => ({ ...prev, [section.id]: id }))}
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
        onContinue={handleContinue}
      />
    </>
  );
}
