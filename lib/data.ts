import type {
  NavItem,
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

export const SERIES_NICHES: SeriesItem[] = [
  {
    id: "stoic",
    title: "Stoic motivation",
    description: "Viral videos about stoic philosophy and life lessons.",
    icon: "landmark",
  },
  {
    id: "history",
    title: "History",
    description:
      "Viral videos about history spanning from ancient times to the modern day.",
    icon: "scroll-text",
  },
  {
    id: "gospel",
    title: "Gospel",
    description: "Viral videos about faith",
    icon: "church",
  },
  {
    id: "true-crime",
    title: "True crime",
    description: "Viral videos about true crime stories.",
    icon: "fingerprint",
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    description: "Viral videos about everyday life and personal growth.",
    icon: "sparkles",
  },
  {
    id: "science",
    title: "Science facts",
    description: "Viral videos about fascinating science discoveries.",
    icon: "atom",
  },
  {
    id: "finance",
    title: "Finance",
    description: "Viral videos about money, investing, and financial literacy.",
    icon: "trending-up",
  },
];

export const SERIES_ART_STYLES: SeriesItem[] = [
  {
    id: "selfie",
    title: "Selfie",
    description: "Casual first-person perspective style",
    icon: "camera",
  },
  {
    id: "anime",
    title: "Anime",
    description: "Japanese animation inspired visuals",
    icon: "wand",
  },
  {
    id: "african-legend",
    title: "African Legend",
    description: "Rich cultural and legendary aesthetics",
    icon: "drama",
  },
  {
    id: "warrior-zone",
    title: "Warrior zone",
    description: "Epic battle-ready cinematic look",
    icon: "swords",
  },
  {
    id: "ancient-fairytale",
    title: "Ancient Fairytale",
    description: "Magical fantasy world aesthetics",
    icon: "castle",
  },
  {
    id: "black-white",
    title: "Black and White",
    description: "Classic monochrome cinematic style",
    icon: "contrast",
  },
  {
    id: "cinematics",
    title: "Cinematics",
    description: "Hollywood-grade cinematic visuals",
    icon: "clapperboard",
  },
  {
    id: "art-deco",
    title: "Art Deco",
    description: "Elegant 1920s art deco inspired aesthetics",
    icon: "gem",
  },
];

export const SERIES_EFFECTS: SeriesItem[] = [
  {
    id: "shake",
    title: "Shake Effect",
    description: "Particles of dust and water to make scene captivating",
    icon: "vibrate",
  },
  {
    id: "animated-hook",
    title: "Animated Hook",
    description:
      "Generate a 5 seconds hook to catch viewers attention instantly",
    icon: "zap",
  },
  {
    id: "gospel-motion",
    title: "Gospel",
    description: "Subjects pop up with eerier motion, suspense is created",
    icon: "ghost",
  },
  {
    id: "fancy-glitch",
    title: "Fancy Glitch",
    description: "Some drops of glitch to make scene epic",
    icon: "sparkles",
  },
  {
    id: "cosmic",
    title: "Cosmic Effect",
    description: "Cosmic effect leading to blury visual immersion",
    icon: "orbit",
  },
  {
    id: "line-ray",
    title: "Line-ray Effect",
    description: "Effect from ancient times to the modern day",
    icon: "radar",
  },
  {
    id: "glitch-3",
    title: "Glitch Effect",
    description: "Digital glitch distortion for a futuristic feel",
    icon: "binary",
  },
  {
    id: "cloud-rotation",
    title: "Cloud rotation",
    description: "Smooth rotating cloud overlay for dreamy transitions",
    icon: "cloud",
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
