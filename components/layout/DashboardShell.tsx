"use client";

import { useState, useEffect } from "react";
import {
  DesktopSidebar,
  TabletSidebar,
  MobileSidebar,
} from "@/components/sidebar/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import NotificationPanel from "@/components/notifications/NotificationPanel";
import ChatbotButton from "../universal/ChatbotButton";

export default function DashboardShell({
  children,
  rightPanel,
}: {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);   // < md (768px)
  const [isTablet, setIsTablet] = useState(false);   // md–lg (768–1024px)

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[rgb(var(--background))]">
      <div className="flex flex-1 h-full max-w-365 w-full mx-auto overflow-hidden">
      {/* ── Desktop sidebar (≥ lg) ── */}
      {!isMobile && !isTablet && <DesktopSidebar />}

      {/* ── Tablet sidebar (md–lg): icon-only, floats over content on hover ── */}
      {isTablet && (
        <div className="relative w-16 shrink-0">
          <div className="group absolute inset-y-0 left-0 z-40 flex w-16 flex-col overflow-hidden border-r border-[rgb(var(--border))] bg-[rgb(var(--sidebar-bg))] transition-[width] duration-200 ease-in-out hover:w-52 hover:shadow-2xl">
            <TabletSidebar />
          </div>
        </div>
      )}

      {/* ── Mobile drawer (< md) ── */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full relative">
        <TopNavbar
          onNotifClick={() => setNotifOpen((p) => !p)}
          notifOpen={notifOpen}
          onMenuClick={() => setMobileOpen(true)}
        />

        {/* Content row */}
        <div className="flex flex-1 min-h-0">
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>

          {rightPanel && (
            <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 overflow-y-auto border-l border-[rgb(var(--border))] bg-[rgb(var(--background))]">
              {rightPanel}
            </aside>
          )}
        </div>

        {notifOpen && (
          <NotificationPanel
            onClose={() => setNotifOpen(false)}
            isMobile={isMobile}
          />
        )}
        <ChatbotButton />
      </div>
      </div>
    </div>
  );
}
