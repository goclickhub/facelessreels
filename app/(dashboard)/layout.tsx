"use client";

import { usePathname } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";
import RecentVideoPanel from "@/components/dashboard/RecentVideoPanel";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showPanel = pathname === "/dashboard";
  const { isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <DashboardShell rightPanel={showPanel ? <RecentVideoPanel /> : undefined}>
      {children}
    </DashboardShell>
  );
}
