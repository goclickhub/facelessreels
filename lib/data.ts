import type {
  NavItem,
  StatCard,
  Notification,
  VideoItem,
  SpeechItem,
  PanelVideo,
  NicheVideo,
  SeriesItem,
  MusicTrack,
  VoiceOption,
  Language,
  SubtitleStyle,
} from "@/types";

export const SIDEBAR_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid", href: "/dashboard" },
  { id: "series", label: "Series", icon: "target", href: "/series" },
  { id: "guide", label: "Guide", icon: "book-open", href: "/guide" },
  { id: "videos", label: "Videos", icon: "film", href: "/videos" },
  { id: "settings", label: "Settings", icon: "settings", href: "/settings" },
];

export const NAVBAR_LINKS: {
  id: string;
  label: string;
  icon: string;
  href: string;
}[] = [];

export const STAT_CARDS: StatCard[] = [
  {
    id: "channels",
    label: "Channels automated",
    value: "403,787 +",
    icon: "rss",
    color: "pink",
  },
  {
    id: "videos",
    label: "Videos autoposted",
    value: "1,819,996 +",
    icon: "play",
    color: "yellow",
  },
  {
    id: "views",
    label: "Total Views",
    value: "40,774 +",
    icon: "eye",
    color: "green",
  },
];

export const CHART_DATA = [
  { month: "Jan", views: 8000 },
  { month: "Feb", views: 10000 },
  { month: "Mar", views: 18000 },
  { month: "Apr", views: 22000 },
  { month: "May", views: 36000 },
  { month: "Jun", views: 52000 },
  { month: "Jul", views: 48000 },
  { month: "Aug", views: 50000 },
];

export const NOTIFICATIONS: Notification[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: `notif-${i}`,
    title: "Video Processing and Optimizing completed",
    timestamp: "Jun 12th 2025 14:00:00",
    read: i > 5,
  }),
);

export const PANEL_VIDEOS: PanelVideo[] = [
  {
    id: "1",
    title: "Series A",
    description:
      "The American government in 1957 had a contrary areement with the UN to...",
    pinned: true,
    year: "1957",
  },
  {
    id: "2",
    title: "Series A",
    description:
      "The American government in 1957 had a contrary areement with the UN to...",
    pinned: true,
    year: "1957",
  },
  {
    id: "3",
    title: "Series A",
    description:
      "The American government in 1957 had a contrary areement with the UN to...",
    pinned: true,
    year: "1957",
  },
];

export const NICHE_VIDEOS: NicheVideo[] = [
  {
    id: "1",
    label: "zoe",
    gradient: "from-amber-800 via-orange-900 to-stone-950",
  },
  {
    id: "2",
    label: "spent",
    gradient: "from-slate-600 via-blue-900 to-slate-950",
  },
  {
    id: "3",
    label: "angel",
    gradient: "from-orange-900 via-red-900 to-amber-950",
  },
];

export const RECENT_VIDEOS: VideoItem[] = Array.from({ length: 5 }, (_, i) => ({
  id: `vid-${i}`,
  title: "Sample test video",
  timeAgo: "2 days ago",
  thumbnail: "",
}));

export const SERIES_NICHES: SeriesItem[] = [
  {
    id: "stoic",
    title: "Stoic motivation",
    description: "Viral videos about stoic philosophy and life lessons.",
    gradient: "from-stone-400 via-amber-600 to-stone-900",
  },
  {
    id: "history",
    title: "History",
    description:
      "Viral videos about history spanning from ancient times to the modern day.",
    gradient: "from-amber-300 via-yellow-600 to-amber-900",
  },
  {
    id: "gospel",
    title: "Gospel",
    description: "Viral videos about faith",
    gradient: "from-slate-500 via-slate-700 to-slate-950",
  },
  {
    id: "true-crime",
    title: "True crime",
    description: "Viral videos about true crime stories.",
    gradient: "from-emerald-600 via-teal-800 to-slate-900",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    description: "Viral videos about everyday life and personal growth.",
    gradient: "from-pink-400 via-rose-600 to-pink-900",
  },
  {
    id: "science",
    title: "Science facts",
    description: "Viral videos about fascinating science discoveries.",
    gradient: "from-cyan-500 via-blue-600 to-indigo-900",
  },
];

export const SERIES_ART_STYLES: SeriesItem[] = [
  {
    id: "selfie",
    title: "Selfie",
    description: "Casual first-person perspective style",
    gradient: "from-rose-300 via-orange-400 to-amber-600",
  },
  {
    id: "anime",
    title: "Anime",
    description: "Japanese animation inspired visuals",
    gradient: "from-green-600 via-teal-700 to-emerald-950",
  },
  {
    id: "african-legend",
    title: "African Legend",
    description: "Rich cultural and legendary aesthetics",
    gradient: "from-yellow-500 via-amber-600 to-orange-800",
  },
  {
    id: "warrior-zone",
    title: "Warrior zone",
    description: "Epic battle-ready cinematic look",
    gradient: "from-slate-600 via-blue-800 to-slate-950",
  },
  {
    id: "ancient-fairytale",
    title: "Ancient Fairytale",
    description: "Magical fantasy world aesthetics",
    gradient: "from-purple-600 via-violet-700 to-fuchsia-950",
  },
  {
    id: "black-white",
    title: "Black and White",
    description: "Classic monochrome cinematic style",
    gradient: "from-gray-300 via-gray-600 to-gray-950",
  },
  {
    id: "cinematics",
    title: "Cinematics",
    description: "Hollywood-grade cinematic visuals",
    gradient: "from-cyan-400 via-blue-600 to-indigo-950",
  },
  {
    id: "art-deco",
    title: "Art Deco",
    description: "Elegant 1920s art deco inspired aesthetics",
    gradient: "from-amber-300 via-yellow-500 to-orange-700",
  },
];

export const SERIES_EFFECTS: SeriesItem[] = [
  {
    id: "shake",
    title: "Shake Effect",
    description: "Particles of dust and water to make scene captivating",
    gradient: "from-stone-400 via-amber-600 to-stone-900",
  },
  {
    id: "animated-hook",
    title: "Animated Hook",
    description:
      "Generate a 5 seconds hook to catch viewers attention instantly",
    gradient: "from-amber-300 via-yellow-500 to-amber-900",
  },
  {
    id: "gospel-motion",
    title: "Gospel",
    description: "Subjects pop up with eerier motion, suspense is created",
    gradient: "from-slate-500 via-slate-700 to-slate-950",
  },
  {
    id: "fancy-glitch",
    title: "Fancy Glitch",
    description: "Some drops of glitch to make scene epic",
    gradient: "from-emerald-600 via-teal-800 to-slate-900",
  },
  {
    id: "cosmic",
    title: "Cosmic Effect",
    description: "Cosmic effect leading to blury visual immersion",
    gradient: "from-purple-800 via-indigo-900 to-slate-950",
  },
  {
    id: "line-ray",
    title: "Line-ray Effect",
    description: "Effect from ancient times to the modern day",
    gradient: "from-yellow-500 via-orange-600 to-red-800",
  },
  {
    id: "glitch-3",
    title: "Glitch Effect",
    description: "Digital glitch distortion for a futuristic feel",
    gradient: "from-teal-500 via-cyan-700 to-slate-900",
  },
  {
    id: "cloud-rotation",
    title: "Cloud rotation",
    description: "Smooth rotating cloud overlay for dreamy transitions",
    gradient: "from-sky-400 via-blue-500 to-indigo-800",
  },
];

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: "happy-rhythm",
    title: "Happy rhythm",
    description: "Beautiful smooth calm music",
    color: "purple",
  },
  {
    id: "quiet-storm",
    title: "Quiet before storm",
    description: "Building tension and anticipation for dramatic reveals",
    color: "red",
  },
  {
    id: "brilliant-symphony",
    title: "Brilliant Symphony",
    description: "Orchestral and majestic",
    color: "green",
  },
  {
    id: "breathing-shadows",
    title: "Breathing shadows",
    description: "Mysterious and eerie for suspense video",
    color: "yellow",
  },
  {
    id: "deep-bass",
    title: "Deep bass",
    description: "Calm and jovial voice for studio",
    color: "blue",
  },
];

export const VOICE_OPTIONS: VoiceOption[] = [
  {
    id: "john",
    name: "John",
    description: "The perfect story teller",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "adam",
    name: "Adam",
    description: "The perfect story teller",
    gradient: "from-slate-400 to-slate-600",
  },
  {
    id: "susan",
    name: "Susan",
    description: "The perfect history teller",
    gradient: "from-rose-400 to-pink-600",
  },
  {
    id: "peter",
    name: "Peter",
    description: "The perfect story teller",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: "mary",
    name: "Mary",
    description: "Calm and jovial voice for studio",
    gradient: "from-neutral-500 to-neutral-700",
  },
];

export const LANGUAGES: Language[] = [
  { id: "en", name: "English", flag: "🇺🇸" },
  { id: "fr", name: "France", flag: "🇫🇷" },
  { id: "it", name: "Italian", flag: "🇮🇹" },
  { id: "ja", name: "Japanese", flag: "🇯🇵" },
  { id: "de", name: "German", flag: "🇩🇪" },
  { id: "zh", name: "Chinese", flag: "🇨🇳" },
];

export const SUBTITLE_STYLES: SubtitleStyle[] = [
  { id: "majestic", label: "Majestic" },
  { id: "karaoke", label: "Karaoke" },
  { id: "anime", label: "Anime" },
  { id: "scripts", label: "Scripts writing" },
  { id: "bold", label: "Bold" },
  { id: "deep", label: "Deep" },
  { id: "fancy", label: "Fancy" },
  { id: "elegancy", label: "Elegancy" },
];

export const RECENT_SPEECH: SpeechItem[] = Array.from(
  { length: 3 },
  (_, i) => ({
    id: `speech-${i}`,
    filename: "Experiencing Father's Love - 1.mp3",
    timeAgo: "2 days ago",
    duration: "0:00:00",
  }),
);
