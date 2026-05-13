export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number;
  hasDropdown?: boolean;
  children?: { id: string; label: string; href: string }[];
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: "pink" | "yellow" | "green";
}

export interface Notification {
  id: string;
  title: string;
  timestamp: string;
  read: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  timeAgo: string;
  thumbnail: string;
}

export interface SpeechItem {
  id: string;
  filename: string;
  timeAgo: string;
  duration: string;
}

export interface PanelVideo {
  id: string;
  title: string;
  description: string;
  pinned: boolean;
  year: string;
}

export interface NicheVideo {
  id: string;
  label: string;
  gradient: string;
}

export interface SeriesItem {
  id: string;
  title: string;
  description: string;
  gradient: string;
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
export type VideoStatus = "published" | "processing" | "failed";

export interface VideoRow {
  id: string;
  title: string;
  series: string;
  platform: VideoPlatform;
  status: VideoStatus;
  views: string;
  postedAt: string;
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
