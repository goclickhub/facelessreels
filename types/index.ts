export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number;
  hasDropdown?: boolean;
  children?: { id: string; label: string; href: string }[];
}

export interface SeriesItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SeriesStep {
  id: number;
  title: string;
  subtitle: string;
  placeholder: string;
  data: SeriesItem[];
}

export interface MusicTrack {
  id: string;
  title: string;
  description: string;
  color: "purple" | "red" | "green" | "yellow" | "blue";
}

export interface VoiceOption {
  id: string;
  name: string;
  description: string;
  gradient: string;
}

export interface Language {
  id: string;
  name: string;
  flag: string;
}

export interface SubtitleStyle {
  id: string;
  label: string;
}

export type VideoPlatform = "tiktok" | "instagram" | "youtube";
export type VideoStatus = "queued" | "processing" | "ready" | "published" | "failed";

export interface VideoRow {
  id: string;
  title: string;
  series: string;
  platform: VideoPlatform;
  status: VideoStatus;
  views: string;
  postedAt: string;
  videoUrl: string | null;
}

export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  highlighted: boolean;
  badge?: string;
  features: string[];
  cta: string;
  ctaHref: string;
}
