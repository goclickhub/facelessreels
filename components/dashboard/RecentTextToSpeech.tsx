import { Play, MoreVertical } from "lucide-react";
import { RECENT_SPEECH } from "@/lib/data";

export default function RecentTextToSpeech() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-bold text-[rgb(var(--foreground))]">
          Recent Text to Speech
        </h3>
        <button className="text-[12.5px] text-[rgb(var(--primary))] font-semibold hover:underline">
          See More
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {RECENT_SPEECH.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl px-4 py-3 hover:shadow-sm transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-[rgb(var(--secondary))] border border-[rgb(var(--border))] flex items-center justify-center shrink-0">
              <div className="w-7 h-7 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center">
                <Play size={9} className="text-white ml-0.5" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11.5px] font-semibold text-[rgb(var(--foreground))] truncate">
                {item.filename}
              </p>
              <p className="text-[10.5px] text-[rgb(var(--muted-foreground))] mt-0.5">
                {item.timeAgo}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <button className="p-1 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors">
                <MoreVertical
                  size={13}
                  className="text-[rgb(var(--muted-foreground))]"
                />
              </button>
              <span className="text-[10px] text-[rgb(var(--muted-foreground))] font-mono">
                {item.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
