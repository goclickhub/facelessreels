"use client";

import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";
import AppLogo from "@/components/ui/AppLogo";

interface TopNavbarProps {
  onNotifClick: () => void;
  notifOpen: boolean;
  onMenuClick: () => void;
}

export default function TopNavbar({
  onNotifClick,
  notifOpen,
  onMenuClick,
}: TopNavbarProps) {
  return (
    <header className="h-16 bg-[rgb(var(--navbar-bg))] border-b border-[rgb(var(--border))] flex items-center px-4 md:px-6 shrink-0 relative z-40 gap-3">
      {/* Mobile: hamburger */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-md hover:bg-[rgb(var(--muted))] transition-colors shrink-0"
        aria-label="Open menu"
      >
        <Menu size={20} className="text-[rgb(var(--foreground))]" />
      </button>

      {/* Mobile: logo */}
      <div className="md:hidden shrink-0">
        <Link href="/dashboard">
          <AppLogo size="md" />
        </Link>
      </div>

      {/* Search bar */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[600px]">
          <Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 pl-10 pr-4 rounded-full bg-[rgb(var(--muted))] border border-[rgb(var(--border))] text-[13px] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition"
          />
        </div>
      </div>

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNotifClick();
          }}
          aria-label="Notifications"
          aria-expanded={notifOpen}
          className={cn(
            "relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer",
            notifOpen
              ? "bg-[rgb(var(--primary))] text-white"
              : "bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--border))]",
          )}
        >
          <Bell size={18} />
        </button>

        <ProfileDropdown />
      </div>
    </header>
  );
}
