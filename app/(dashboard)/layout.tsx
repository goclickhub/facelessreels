"use client";

import { usePathname } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";
import RecentVideoPanel from "@/components/dashboard/RecentVideoPanel";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showPanel = pathname === "/dashboard";

  return (
    <DashboardShell rightPanel={showPanel ? <RecentVideoPanel /> : undefined}>
      {children}
    </DashboardShell>
  );
}
