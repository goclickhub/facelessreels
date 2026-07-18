"use client";

import { useRouter } from "next/navigation";
import { Music2, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TabSwitch, type TabValue } from "@/components/series/TabSwitch";
import { MusicList } from "@/components/series/MusicList";
import { CustomMusicInput } from "@/components/series/CustomMusicInput";
import { InlineSelect, type SelectOption } from "@/components/series/InlineSelect";
import { SubtitleGrid } from "@/components/series/SubtitleGrid";
import { FooterNav } from "@/components/series/FooterNav";
import { useSeriesDraft } from "@/providers/SeriesDraftProvider";
import { useToast } from "@/hooks/useToast";
import {
  MUSIC_TRACKS,
  VOICE_OPTIONS,
  LANGUAGES,
  SUBTITLE_STYLES,
} from "@/lib/data";

const MUSIC_TABS: [import("@/components/series/TabSwitch").TabConfig, import("@/components/series/TabSwitch").TabConfig] = [
  { value: "preset", label: "Preset music", icon: <Music2 size={14} /> },
  { value: "custom", label: "Custom", icon: <Link2 size={14} /> },
];

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-[20px] font-bold text-[rgb(var(--foreground))]">{title}</h2>
      <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5">{subtitle}</p>
    </div>
  );
}

function SubSectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-3">
      <h3 className="text-[16px] font-semibold text-[rgb(var(--foreground))]">{title}</h3>
      {subtitle && (
        <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}

export default function SeriesStylePage() {
  const router = useRouter();
  const { draft, update } = useSeriesDraft();
  const { error: toastError } = useToast();

  const musicTab = draft.musicTab;
  const setMusicTab = (tab: TabValue) => update({ musicTab: tab });
  const selectedTrack = draft.musicTrackId || MUSIC_TRACKS[0].id;
  const setSelectedTrack = (id: string) => update({ musicTrackId: id });
  const musicUrl = draft.musicUrl;
  const setMusicUrl = (url: string) => update({ musicUrl: url });
  const selectedVoice = draft.voice;
  const setSelectedVoice = (id: string) => update({ voice: id });
  const selectedLanguage = draft.language;
  const setSelectedLanguage = (id: string) => update({ language: id });
  const selectedSubtitle = draft.subtitleStyle;
  const setSelectedSubtitle = (id: string) => update({ subtitleStyle: id });

  const voiceOptions: SelectOption[] = VOICE_OPTIONS.map((v) => ({
    id: v.id,
    label: v.name,
    sublabel: v.description,
    icon: (
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-linear-to-br text-white text-xs font-bold",
          v.gradient,
        )}
      >
        {v.name[0]}
      </div>
    ),
  }));

  const languageOptions: SelectOption[] = LANGUAGES.map((l) => ({
    id: l.id,
    label: l.name,
    icon: <span className="text-xl leading-none">{l.flag}</span>,
  }));

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 px-5 md:px-8 py-6 space-y-8">

        {/* ── Section 1: Background Songs ── */}
        <section>
          <SectionHeader
            title="Background Songs"
            subtitle="Choose a background song suitable for your niche"
          />
          <TabSwitch tabs={MUSIC_TABS} active={musicTab} onChange={setMusicTab} />
          <div className="mt-4">
            {musicTab === "preset" ? (
              <MusicList
                tracks={MUSIC_TRACKS}
                selected={selectedTrack}
                onSelect={setSelectedTrack}
              />
            ) : (
              <CustomMusicInput urlValue={musicUrl} onUrlChange={setMusicUrl} />
            )}
          </div>
        </section>

        {/* ── Section 2: Voice Style + Language ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <SubSectionHeader
              title="Voice style"
              subtitle="Choose a voice style for your niche"
            />
            <InlineSelect
              options={voiceOptions}
              value={selectedVoice}
              onChange={setSelectedVoice}
            />
          </div>
          <div>
            <SubSectionHeader title="Language" subtitle="Choose a language" />
            <InlineSelect
              options={languageOptions}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
            />
          </div>
        </section>

        {/* ── Section 3: Subtitle Style ── */}
        <section>
          <SubSectionHeader title="Subtitle style" subtitle="Choose subtitle style" />
          <SubtitleGrid
            items={SUBTITLE_STYLES}
            selected={selectedSubtitle}
            onSelect={setSelectedSubtitle}
          />
        </section>
      </div>

      <FooterNav
        step={2}
        total={3}
        onBack={() =>
          router.push(draft.editingSeriesId ? `/series?edit=${draft.editingSeriesId}` : "/series")
        }
        onContinue={() => router.push("/series/effects")}
      />
    </div>
  );
}
