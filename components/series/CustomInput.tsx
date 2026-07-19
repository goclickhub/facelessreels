import { Sparkles } from "lucide-react";

const MAX_CHARS = 5500;

interface CustomInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function CustomInput({ placeholder, value, onChange }: CustomInputProps) {
  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
        placeholder={placeholder}
        rows={6}
        className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] text-sm px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition"
      />
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1.5 bg-[rgb(var(--primary))] text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
          <Sparkles size={14} />
          Generate with AI
        </button>
        <span className="text-[13px] text-[rgb(var(--muted-foreground))]">
          {value.length}/{MAX_CHARS}
        </span>
      </div>
    </div>
  );
}
