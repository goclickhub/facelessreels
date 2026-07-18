import StatCards from "@/components/dashboard/StatCards";
import ChartCard from "@/components/dashboard/ChartCardClient";
import RecentVideoPanel from "@/components/dashboard/RecentVideoPanel";
import YourSeriesSection from "@/components/dashboard/YourSeriesSection";

export default function DashboardPage() {
  return (
    <div className="px-5 md:px-6 py-5 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[12px] text-[rgb(var(--muted-foreground))]">
        <span>Home</span>
        <span>&gt;</span>
        <span className="text-[rgb(var(--foreground))] font-medium">Dashboard</span>
      </nav>

      <StatCards />
      <ChartCard />
      <YourSeriesSection />

      {/* Recent videos — grid visible on mobile; hidden on lg+ (shown in right panel) */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-[rgb(var(--foreground))]">
            Recent videos
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <RecentVideoPanel gridMode />
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
