"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavIcon } from "@/lib/icons";
import AppLogo from "@/components/ui/AppLogo";
import { Separator } from "@/components/ui/separator";
import { SIDEBAR_ITEMS } from "@/lib/data";
import type { NavItem } from "@/types";

/* ─── Shared upgrade section ─── */
function UpgradeSection({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("shrink-0 border-t border-[rgb(var(--border))]", compact ? "px-3 py-4" : "px-4 py-5")}>
      {!compact && (
        <p className="text-[11px] text-[rgb(var(--muted-foreground))] text-center mb-2.5">
          Get pro version
        </p>
      )}
      <Link
        href="/upgrade"
        title={compact ? "Upgrade to Pro" : undefined}
        className={cn(
          "flex items-center justify-center rounded-xl bg-[rgb(var(--primary))] text-white font-semibold hover:opacity-90 transition-opacity",
          compact ? "h-10 w-10 text-base" : "w-full py-2.5 text-[13px]",
        )}
      >
        {compact ? "↑" : "Upgrade"}
      </Link>
    </div>
  );
}

/* ─── Tablet upgrade — icon collapsed, text fades in on group-hover ─── */
function TabletUpgrade() {
  return (
    <div className="shrink-0 overflow-hidden border-t border-[rgb(var(--border))] px-3 py-4">
      <p className="mb-2 overflow-hidden text-center text-[11px] whitespace-nowrap text-[rgb(var(--muted-foreground))] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        Get pro version
      </p>
      <Link
        href="/upgrade"
        title="Upgrade to Pro"
        className="flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[rgb(var(--primary))] py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
      >
        <span className="shrink-0 text-base font-bold">↑</span>
        <span className="whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          Upgrade
        </span>
      </Link>
    </div>
  );
}

/* ─── Standard nav row (desktop + mobile) ─── */
function NavRow({ item, onClose }: { item: NavItem; onClose?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href ?? "#"}
      onClick={onClose}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors",
        isActive
          ? "bg-[rgb(var(--sidebar-active))] text-[rgb(var(--sidebar-active-text))]"
          : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--sidebar-hover))] hover:text-[rgb(var(--foreground))]",
      )}
    >
      <NavIcon name={item.icon} size={18} className="shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

/* ─── Tablet nav row — labels fade in when parent sidebar expands ─── */
function TabletNavRow({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href ?? "#"}
      title={item.label}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors",
        isActive
          ? "bg-[rgb(var(--sidebar-active))] text-[rgb(var(--sidebar-active-text))]"
          : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--sidebar-hover))] hover:text-[rgb(var(--foreground))]",
      )}
    >
      <NavIcon name={item.icon} size={18} className="shrink-0" />
      <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {item.label}
      </span>
    </Link>
  );
}

/* ─── Desktop sidebar (≥ lg) ─── */
export function DesktopSidebar() {
  return (
    <aside className="w-60 h-full flex flex-col bg-[rgb(var(--sidebar-bg))] border-r border-[rgb(var(--border))] shrink-0">
      <div className="h-16 flex items-center px-5 border-b border-[rgb(var(--border))] shrink-0">
        <Link href="/dashboard">
          <AppLogo size="md" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {SIDEBAR_ITEMS.map((item) => (
          <NavRow key={item.id} item={item} />
        ))}
      </nav>

      <UpgradeSection />
    </aside>
  );
}

/* ─── Tablet sidebar — icon-only, expands on hover as floating overlay ─── */
export function TabletSidebar() {
  return (
    <aside className="flex h-full flex-col bg-[rgb(var(--sidebar-bg))]">
      {/* Logo */}
      <div className="h-16 flex shrink-0 items-center border-b border-[rgb(var(--border))] px-3 overflow-hidden">
        <div className="shrink-0">
          <AppLogo size="md" showLabel={false} />
        </div>
        <span className="ml-2.5 text-[15px] font-semibold tracking-tight whitespace-nowrap text-[rgb(var(--foreground))] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          FacelessReels
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {SIDEBAR_ITEMS.map((item) => (
          <TabletNavRow key={item.id} item={item} />
        ))}
      </nav>

      <TabletUpgrade />
    </aside>
  );
}

/* ─── Mobile drawer (< md) ─── */
export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute left-0 top-0 h-full w-60 bg-[rgb(var(--sidebar-bg))] border-r border-[rgb(var(--border))] shadow-2xl drawer-animate flex flex-col z-10">
        <div className="h-16 flex items-center justify-between px-5 border-b border-[rgb(var(--border))] shrink-0">
          <AppLogo size="md" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors"
          >
            <X size={16} className="text-[rgb(var(--muted-foreground))]" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {SIDEBAR_ITEMS.map((item) => (
            <NavRow key={item.id} item={item} onClose={onClose} />
          ))}
        </nav>

        <UpgradeSection />
      </div>
    </div>
  );
}

/* ─── Legacy export alias so existing imports don't break ─── */
export { DesktopSidebar as Sidebar };
