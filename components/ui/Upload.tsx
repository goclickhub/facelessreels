import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";

export function UploadDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative shrink-0">
      {/* Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md border border-[rgb(var(--primary))] text-[13px] font-semibold text-[rgb(var(--primary))] hover:bg-[rgb(var(--secondary))] transition-colors"
        aria-expanded={open}
      >
        <span>Upload</span>

        <ChevronDown
          size={14}
          className={cn(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 top-12 w-40 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded-xl shadow-xl z-50 notif-panel-animate">
          <Link
            href="/videos/upload"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-[13px] font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] rounded-xl transition-colors"
          >
            Add Video
          </Link>
        </div>
      )}
    </div>
  );
}
