import { BookOpen, Lightbulb, PlayCircle, Zap } from "lucide-react";
import GuideBanner from "@/components/guide/GuideBanner";
import GuideStepList from "@/components/guide/GuideStepList";
import GuideTips from "@/components/guide/GuideTips";
import GuideFAQ from "@/components/guide/GuideFAQ";

const STEPS = [
  {
    id: 1,
    title: "Create your first Series",
    description:
      "Head to the Series tab and pick a niche — Stoic, History, Gospel, True Crime and more. Choose a visual art style and add effects to make your videos stand out.",
  },
  {
    id: 2,
    title: "Configure voice & music",
    description:
      "Pick a narrator voice (John, Adam, Susan…) and pair it with a background track. The AI will script, narrate, and sync everything automatically.",
  },
  {
    id: 3,
    title: "Set subtitles & language",
    description:
      "Choose a subtitle style (Majestic, Karaoke, Bold…) and a target language. FacelessReels supports English, French, Italian, Japanese, German, and Chinese.",
  },
  {
    id: 4,
    title: "Connect your platforms",
    description:
      "Go to Settings → Platforms and link your TikTok, Instagram, and YouTube accounts. Grant the publishing permissions so videos post automatically.",
  },
  {
    id: 5,
    title: "Activate auto-posting",
    description:
      "Set a posting schedule — daily, every 12 hours, or custom. Once active, FacelessReels generates and publishes your videos while you sleep.",
  },
];

const TIPS = [
  {
    icon: Zap,
    title: "Start with a proven niche",
    body: "Stoic Motivation and True Crime consistently generate the most views. Start there and branch out once you have traction.",
  },
  {
    icon: Lightbulb,
    title: "Use the Animated Hook effect",
    body: "The first 5 seconds are critical on short-form platforms. The Animated Hook effect is specifically designed to stop the scroll.",
  },
  {
    icon: PlayCircle,
    title: "Post at least once daily",
    body: "Algorithm boost on TikTok and Instagram Reels favors consistent daily posting. Let the auto-schedule handle it for you.",
  },
];

const FAQS = [
  {
    q: "How long does it take to generate a video?",
    a: "Most videos are ready in 2–4 minutes depending on length and effects chosen.",
  },
  {
    q: "Can I edit a video after it's generated?",
    a: "There's no in-app video editor. If a video isn't quite right, you can regenerate it from the same series to get a fresh take with the same style and settings.",
  },
  {
    q: "Which platforms can I publish to?",
    a: "TikTok, Instagram Reels, and YouTube Shorts are fully supported. More platforms are coming soon.",
  },
  {
    q: "Is there a limit on how many videos I can create?",
    a: "Limits depend on your plan — check the Upgrade page for current details.",
  },
];

export default function GuidePage() {
  return (
    <div className="px-5 md:px-6 py-5 space-y-6">
      <nav className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--muted-foreground))]">
        <span>Home</span>
        <span>&gt;</span>
        <span className="text-[rgb(var(--foreground))] font-medium">Guide</span>
      </nav>

      <div className="flex items-center gap-2">
        <BookOpen size={16} className="text-[rgb(var(--primary))]" />
        <h1 className="text-[16px] font-bold text-[rgb(var(--foreground))]">
          Getting Started Guide
        </h1>
      </div>

      <GuideBanner />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <GuideStepList steps={STEPS} />
        <div className="space-y-4">
          <GuideTips tips={TIPS} />
          <GuideFAQ faqs={FAQS} />
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
