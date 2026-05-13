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
} from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconComponent = React.ComponentType<LucideProps>;

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
};

interface NavIconProps extends LucideProps {
  name: string;
}

export function NavIcon({ name, ...props }: NavIconProps) {
  const IconComp = ICON_MAP[name] ?? LayoutGrid;
  return <IconComp {...props} />;
}
