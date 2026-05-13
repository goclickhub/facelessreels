import { ToggleLeft, ToggleRight } from "lucide-react";

interface SettingsToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function SettingsToggle({ enabled, onToggle }: SettingsToggleProps) {
  return (
    <button onClick={onToggle} className="cursor-pointer" type="button">
      {enabled ? (
        <ToggleRight size={28} className="text-[rgb(var(--primary))]" />
      ) : (
        <ToggleLeft size={28} className="text-[rgb(var(--muted-foreground))]" />
      )}
    </button>
  );
}
