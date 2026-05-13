"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] flex items-center justify-center overflow-hidden hover:bg-[rgb(var(--muted))] transition-colors"
      aria-label="Toggle theme"
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-300 text-[rgb(var(--foreground))]
          ${isDark ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-300 text-[rgb(var(--foreground))]
          ${isDark ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      />
    </button>
  );
}
