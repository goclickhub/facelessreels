"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { MUSIC_TRACKS } from "@/lib/data";
import type { Series } from "@/hooks/useSeries";

export interface SeriesDraft {
  name: string;
  niche: string | null;
  artStyle: string | null;
  effects: string | null;
  voice: string;
  language: string;
  subtitleStyle: string;
  musicTab: "preset" | "custom";
  musicTrackId: string;
  musicUrl: string;
  platforms: string[];
  frequency: string;
  durationSeconds: number;
  scheduleTime: string;
  // Set while editing an existing series (via /series?edit=<id>) so the final
  // wizard step knows to PUT instead of POST. Null means "creating new".
  editingSeriesId: string | null;
}

const DEFAULT_DRAFT: SeriesDraft = {
  name: "",
  niche: null,
  artStyle: null,
  effects: null,
  voice: "john",
  language: "en",
  subtitleStyle: "majestic",
  musicTab: "preset",
  musicTrackId: MUSIC_TRACKS[0].id,
  musicUrl: "",
  platforms: [],
  frequency: "daily",
  durationSeconds: 35,
  scheduleTime: "12:00",
  editingSeriesId: null,
};

interface SeriesDraftCtx {
  draft: SeriesDraft;
  update: (patch: Partial<SeriesDraft>) => void;
  reset: () => void;
  loadFromSeries: (series: Series) => void;
}

const SeriesDraftContext = createContext<SeriesDraftCtx | null>(null);

export function useSeriesDraft(): SeriesDraftCtx {
  const ctx = useContext(SeriesDraftContext);
  if (!ctx) throw new Error("useSeriesDraft must be used within SeriesDraftProvider");
  return ctx;
}

export function SeriesDraftProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = useState<SeriesDraft>(DEFAULT_DRAFT);

  const update = useCallback((patch: Partial<SeriesDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => setDraft(DEFAULT_DRAFT), []);

  const loadFromSeries = useCallback((series: Series) => {
    const isPresetMusic = MUSIC_TRACKS.some((t) => t.id === series.music);
    setDraft({
      name: series.name,
      niche: series.niche,
      artStyle: series.artStyle,
      effects: series.effects,
      voice: series.voice,
      language: series.language,
      subtitleStyle: series.subtitleStyle,
      musicTab: isPresetMusic ? "preset" : "custom",
      musicTrackId: isPresetMusic ? series.music : MUSIC_TRACKS[0].id,
      musicUrl: isPresetMusic ? "" : series.music,
      platforms: series.platforms,
      frequency: series.frequency,
      durationSeconds: series.durationSeconds,
      scheduleTime: series.scheduleTime,
      editingSeriesId: series.id,
    });
  }, []);

  return (
    <SeriesDraftContext.Provider value={{ draft, update, reset, loadFromSeries }}>
      {children}
    </SeriesDraftContext.Provider>
  );
}
