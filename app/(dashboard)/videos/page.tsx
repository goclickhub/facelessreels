import { Film } from "lucide-react";
import VideosTable from "@/components/videos/VideosTable";

export default function VideosPage() {
  return (
    <div className="px-5 md:px-6 py-5 space-y-6">
      <nav className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--muted-foreground))]">
        <span>Home</span>
        <span>&gt;</span>
        <span className="text-[rgb(var(--foreground))] font-medium">Videos</span>
      </nav>

      <div className="flex items-center gap-2">
        <Film size={16} className="text-[rgb(var(--primary))]" />
        <h1 className="text-[16px] font-bold text-[rgb(var(--foreground))]">Videos</h1>
      </div>

      <VideosTable />

      <div className="h-4" />
    </div>
  );
}
