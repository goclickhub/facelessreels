import { Upload } from "lucide-react";

interface CustomMusicInputProps {
  urlValue: string;
  onUrlChange: (v: string) => void;
}

export function CustomMusicInput({ urlValue, onUrlChange }: CustomMusicInputProps) {
  return (
    <div className="space-y-5">
      {/* TikTok URL textarea */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-[rgb(var(--foreground))]">
          TikTok Sound URL&apos;s &nbsp;
          <span className="font-normal text-[rgb(var(--muted-foreground))]">
            (Copy+ Paste link to TikTok sound)
          </span>
        </p>
        <textarea
          value={urlValue}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="Enter song URL , One per line"
          rows={5}
          className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] text-sm px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition"
        />
      </div>

      {/* File upload box */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-[rgb(var(--foreground))]">Upload your files</p>
        <label className="flex flex-col items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))] py-10 cursor-pointer hover:bg-[rgb(var(--muted))] transition-colors">
          <Upload size={24} className="text-[rgb(var(--muted-foreground))]" />
          <p className="text-sm text-[rgb(var(--foreground))] font-medium text-center">
            Click to upload sound files or drag and drop
          </p>
          <p className="text-xs text-[rgb(var(--muted-foreground))]">MP3, WAV up to 10MB</p>
          <input type="file" accept=".mp3,.wav" className="hidden" multiple />
        </label>
      </div>
    </div>
  );
}
