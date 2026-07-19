import AppLogo from "@/components/ui/AppLogo";

export default function GuideBanner() {
  return (
    <div
      className="rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
      style={{
        background: "rgb(var(--primary) / 0.08)",
        border: "1px solid rgb(var(--primary) / 0.18)",
      }}
    >
      <AppLogo size="lg" showLabel={false} />
      <div className="space-y-1">
        <p className="text-[14px] font-bold text-[rgb(var(--foreground))]">
          Welcome to FacelessReels
        </p>
        <p className="text-[12px] leading-relaxed text-[rgb(var(--muted-foreground))]">
          Follow the steps below to set up your first automated channel. Most
          users publish their first video within 10 minutes of signing up.
        </p>
      </div>
    </div>
  );
}
