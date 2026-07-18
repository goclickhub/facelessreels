"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, ChevronDown, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { LogoutModal } from "@/components/ui/LogoutModal";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAuth } from "@/hooks/useAuth";

const MENU_ITEMS = [
  { id: "account", label: "Account", icon: User, href: "/my-account" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export function ProfileDropdown() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logoutMutation } = useAuth();
  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  const handleLogout = () => {
    setLogoutOpen(false);
    logoutMutation.mutateAsync().finally(() => router.push("/sign-in"));
  };

  return (
    <>
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex items-center gap-2 focus:outline-none cursor-pointer"
          aria-expanded={open}
          aria-label="Profile menu"
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center shrink-0 overflow-hidden">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-[12px] font-bold select-none">{initials}</span>
            )}
          </div>

          {/* Name + plan */}
          <div className="hidden sm:block text-left leading-tight">
            <p className="text-[13px] font-semibold text-[rgb(var(--foreground))]">
              {user?.name ?? ""}
            </p>
            <p className="text-[11px] text-[rgb(var(--muted-foreground))]">
              {user?.plan ?? ""}
            </p>
          </div>

          <ChevronDown
            size={13}
            className={cn(
              "hidden sm:block text-[rgb(var(--muted-foreground))] transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        {open && (
          <div className="absolute right-0 top-12 z-50 w-52 bg-[rgb(var(--popover))] border border-[rgb(var(--border))] rounded-2xl shadow-2xl py-2 notif-panel-animate">
            {/* Theme toggle */}
            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="text-[12px] text-[rgb(var(--muted-foreground))]">
                Theme
              </span>
              <ModeToggle />
            </div>

            <Separator className="my-1" />

            {/* Menu items */}
            {MENU_ITEMS.map(({ id, label, icon: Icon, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={id}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium transition-colors",
                    isActive
                      ? "bg-[rgb(var(--primary))] text-white mx-1.5 rounded-md"
                      : "text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]",
                  )}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}

            <Separator className="my-1" />

            <button
              onClick={() => {
                setOpen(false);
                setLogoutOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </div>
        )}
      </div>

      {logoutOpen && (
        <LogoutModal onConfirm={handleLogout} onCancel={() => setLogoutOpen(false)} />
      )}
    </>
  );
}
