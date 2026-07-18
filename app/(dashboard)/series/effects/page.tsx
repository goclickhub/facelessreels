"use client";

import { useRouter } from "next/navigation";
import { Clock, PlusCircle } from "lucide-react";
import { FooterNav } from "@/components/series/FooterNav";
import { Checkbox } from "@/components/ui/checkbox";
import { useSeriesDraft } from "@/providers/SeriesDraftProvider";
import { useCreateSeries, useUpdateSeries } from "@/hooks/useSeries";
import { useToast } from "@/hooks/useToast";
import { ApiError } from "@/lib/api";

const DURATION_OPTIONS: { label: string; seconds: number }[] = [
  { label: "30-40 seconds", seconds: 35 },
  { label: "40-50 seconds", seconds: 45 },
  { label: "50-60 seconds", seconds: 55 },
];
const SCHEDULE_OPTIONS = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
const FREQUENCY_OPTIONS = ["daily", "twice-daily", "custom"];
const PLATFORM_OPTIONS: { id: string; label: string }[] = [
  { id: "tiktok", label: "TikTok" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
];

function secondsToLabel(seconds: number): string {
  return DURATION_OPTIONS.find((o) => o.seconds === seconds)?.label ?? DURATION_OPTIONS[0].label;
}

function labelToSeconds(label: string): number {
  return DURATION_OPTIONS.find((o) => o.label === label)?.seconds ?? DURATION_OPTIONS[0].seconds;
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-[20px] font-bold text-[rgb(var(--foreground))]">{title}</h2>
      <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5">{subtitle}</p>
    </div>
  );
}

function NativeSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition appearance-none cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function SeriesEffectsPage() {
  const router = useRouter();
  const { draft, update, reset } = useSeriesDraft();
  const { error: toastError, success: toastSuccess } = useToast();
  const createSeries = useCreateSeries();
  const updateSeries = useUpdateSeries();
  const isEditing = Boolean(draft.editingSeriesId);
  const isSaving = createSeries.isPending || updateSeries.isPending;

  const seriesName = draft.name;
  const setSeriesName = (name: string) => update({ name });
  const duration = secondsToLabel(draft.durationSeconds);
  const setDuration = (label: string) => update({ durationSeconds: labelToSeconds(label) });
  const schedule = draft.scheduleTime;
  const setSchedule = (time: string) => update({ scheduleTime: time });

  const togglePlatform = (id: string) => {
    const platforms = draft.platforms.includes(id)
      ? draft.platforms.filter((p) => p !== id)
      : [...draft.platforms, id];
    update({ platforms });
  };

  const handleCreate = async () => {
    if (isSaving) return;
    if (!seriesName.trim()) {
      toastError("Series name required", "Please give your series a name.");
      return;
    }
    if (draft.platforms.length === 0) {
      toastError("Select a platform", "Please choose at least one platform to post to.");
      return;
    }
    if (!draft.niche || !draft.artStyle || !draft.effects) {
      toastError("Incomplete series", "Please go back and finish steps 1 and 2 first.");
      return;
    }

    const music = draft.musicTab === "custom" ? draft.musicUrl.trim() : draft.musicTrackId;
    if (!music) {
      toastError("Music required", "Please go back and pick a background track or enter a custom URL.");
      return;
    }

    const input = {
      name: seriesName,
      niche: draft.niche,
      artStyle: draft.artStyle,
      effects: draft.effects,
      music,
      voice: draft.voice,
      subtitleStyle: draft.subtitleStyle,
      language: draft.language,
      platforms: draft.platforms,
      frequency: draft.frequency,
      durationSeconds: draft.durationSeconds,
      scheduleTime: draft.scheduleTime,
    };

    try {
      if (draft.editingSeriesId) {
        await updateSeries.mutateAsync({ id: draft.editingSeriesId, input });
        toastSuccess("Series updated", "Your changes have been saved.");
      } else {
        await createSeries.mutateAsync(input);
      }
      reset();
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Something went wrong. Please try again.";
      toastError(isEditing ? "Couldn't save series" : "Couldn't create series", message);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 px-5 md:px-8 py-6 space-y-8">

        {/* ── Section 1: Connect Social Accounts ── */}
        <section>
          <SectionHeader
            title="Connect social accounts"
            subtitle="Connect and select the social media account where your reels are published on"
          />

          <div className="space-y-3">
            <div className="w-full rounded-xl border-2 border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))] flex items-center justify-center py-16 px-6">
              <button
                onClick={() =>
                  toastSuccess("Coming soon", "Connecting social accounts isn't available yet.")
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors"
              >
                Connect your first account
                <PlusCircle size={16} className="text-[rgb(var(--foreground))]" />
              </button>
            </div>
            <p className="text-sm text-[rgb(var(--muted-foreground))] text-center">
              You can connect your social media accounts later
            </p>
          </div>
        </section>

        {/* ── Section 2: Series Details ── */}
        <section>
          <SectionHeader
            title="Series Details"
            subtitle="Finalize your videos before published"
          />

          <div className="space-y-5">
            {/* Series Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[rgb(var(--foreground))]">
                Series name
              </label>
              <input
                type="text"
                value={seriesName}
                onChange={(e) => setSeriesName(e.target.value)}
                placeholder="e.g. Interesting facts about science"
                className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition"
              />
            </div>

            {/* Duration + Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-semibold text-[rgb(var(--foreground))]">
                  Video Duration
                  <Clock size={14} className="text-[rgb(var(--muted-foreground))]" />
                </label>
                <NativeSelect
                  value={duration}
                  onChange={setDuration}
                  options={DURATION_OPTIONS.map((o) => o.label)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[rgb(var(--foreground))]">
                  Schedule
                </label>
                <p className="text-xs text-[rgb(var(--muted-foreground))] -mt-0.5">
                  Set when you want your reels to be published.
                </p>
                <NativeSelect
                  value={schedule}
                  onChange={setSchedule}
                  options={SCHEDULE_OPTIONS}
                />
              </div>
            </div>

            {/* Posting Frequency */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[rgb(var(--foreground))]">
                Posting frequency
              </label>
              <NativeSelect
                value={draft.frequency}
                onChange={(id) => update({ frequency: id })}
                options={FREQUENCY_OPTIONS}
              />
            </div>

            {/* Platforms */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[rgb(var(--foreground))]">
                Platforms
              </label>
              <p className="text-xs text-[rgb(var(--muted-foreground))] -mt-0.5">
                Choose which platforms this series should be posted to.
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                {PLATFORM_OPTIONS.map((platform) => (
                  <label
                    key={platform.id}
                    className="flex items-center gap-2 text-sm text-[rgb(var(--foreground))] cursor-pointer"
                  >
                    <Checkbox
                      checked={draft.platforms.includes(platform.id)}
                      onCheckedChange={() => togglePlatform(platform.id)}
                    />
                    {platform.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterNav
        step={3}
        total={3}
        onBack={() => router.push("/series/style")}
        onContinue={handleCreate}
        continueLabel={
          isSaving ? (isEditing ? "Saving..." : "Creating...") : isEditing ? "Save changes" : "Create"
        }
      />
    </div>
  );
}
