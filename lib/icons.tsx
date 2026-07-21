import { Icon } from "@iconify/react";
import {
  LayoutGrid,
  Video,
  Monitor,
  Folder,
  Image,
  Mail,
  PlusCircle,
  Link,
  Settings,
  Users,
  Users2,
  HelpCircle,
  Gift,
  BarChart2,
  User,
  CreditCard,
  Zap,
  LogOut,
  Target,
  BookOpen,
  Film,
  Rss,
  Eye,
  Play,
  Globe,
  Shield,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconComponent = React.ComponentType<LucideProps>;

// Wraps an Iconify illustrated icon so it still honors the `size`/`className`
// props NavIcon forwards, the same way a lucide component would.
function illustrated(iconName: string): IconComponent {
  return function IllustratedIcon({ size = 20, className }: LucideProps) {
    return <Icon icon={iconName} width={size} height={size} className={className} />;
  };
}

export const ICON_MAP: Record<string, IconComponent> = {
  grid: LayoutGrid,
  video: Video,
  monitor: Monitor,
  "play-circle": () => (
    <Icon icon="hugeicons:video-camera-ai" width="20" height="20" />
  ),
  folder: Folder,
  image: Image,
  mail: Mail,
  "plus-circle": PlusCircle,
  link: Link,
  settings: Settings,
  users: Users,
  "users-2": Users2,
  "help-circle": HelpCircle,
  "ai-magic": () => <Icon icon="hugeicons:ai-magic" width="20" height="20" />,
  gift: Gift,
  beaker: () => <Icon icon="hugeicons:atom-02" width="20" height="20" />,
  "bar-chart": BarChart2,
  user: User,
  "credit-card": CreditCard,
  zap: Zap,
  logout: LogOut,
  target: Target,
  "book-open": BookOpen,
  film: Film,
  rss: Rss,
  eye: Eye,
  play: Play,
  globe: Globe,
  shield: Shield,

  // Series wizard presets — illustrated (not flat line icons), so each card
  // reads as a small drawing matching its title rather than an abstract mark.
  landmark: illustrated("noto:classical-building"),
  "scroll-text": illustrated("noto:scroll"),
  church: illustrated("noto:church"),
  fingerprint: illustrated("noto:detective"),
  sparkles: illustrated("noto:sparkles"),
  atom: illustrated("noto:atom-symbol"),
  "trending-up": illustrated("noto:chart-increasing"),
  camera: illustrated("noto:selfie"),
  wand: illustrated("noto:paintbrush"),
  drama: illustrated("noto:performing-arts"),
  swords: illustrated("noto:crossed-swords"),
  castle: illustrated("noto:castle"),
  contrast: illustrated("noto:film-frames"),
  clapperboard: illustrated("noto:clapper-board"),
  gem: illustrated("noto:gem-stone"),
  vibrate: illustrated("noto:vibration-mode"),
  ghost: illustrated("noto:ghost"),
  orbit: illustrated("noto:milky-way"),
  radar: illustrated("noto:satellite-antenna"),
  binary: illustrated("noto:cyclone"),
  cloud: illustrated("noto:cloud"),
};

interface NavIconProps extends LucideProps {
  name: string;
}

export function NavIcon({ name, ...props }: NavIconProps) {
  const IconComp = ICON_MAP[name] ?? LayoutGrid;
  return <IconComp {...props} />;
}
