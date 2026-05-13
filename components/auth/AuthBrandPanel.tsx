import AppLogo from "@/components/ui/AppLogo";

const stats = [
  { label: "Channels automated", value: "403K+" },
  { label: "Videos autoposted", value: "1.8M+" },
  { label: "Total views", value: "40K+" },
];

export default function AuthBrandPanel() {
  return (
    <div
      className="relative hidden flex-col justify-between overflow-hidden lg:flex lg:w-[46%]"
      style={{ background: "rgb(var(--auth-panel-bg))" }}
    >
      {/* Glow orbs */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full blur-[80px]"
        style={{ background: "rgb(var(--primary) / 0.28)" }}
      />
      <div
        className="pointer-events-none absolute -right-10 -bottom-16 h-64 w-64 rounded-full blur-[70px]"
        style={{ background: "rgb(var(--stat-pink) / 0.18)" }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgb(var(--auth-panel-text)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 p-10">
        <AppLogo size="md" inverted />
      </div>

      {/* Hero copy */}
      <div className="relative z-10 space-y-5 px-10">
        <div className="space-y-3">
          <h1
            className="text-[2.6rem] leading-tight font-bold"
            style={{ color: "rgb(var(--auth-panel-text))" }}
          >
            Create viral faceless
            <br />
            <span style={{ color: "rgb(var(--primary))" }}>reels on autopilot</span>
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgb(var(--auth-panel-text) / 0.45)" }}
          >
            AI generates and posts faceless videos to TikTok, Instagram &amp; YouTube — while you
            sleep.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl px-4 py-2.5 backdrop-blur-sm"
              style={{
                border: "1px solid rgb(var(--auth-panel-text) / 0.10)",
                background: "rgb(var(--auth-panel-text) / 0.05)",
              }}
            >
              <p
                className="text-[11px]"
                style={{ color: "rgb(var(--auth-panel-text) / 0.40)" }}
              >
                {s.label}
              </p>
              <p
                className="text-sm font-bold"
                style={{ color: "rgb(var(--auth-panel-text))" }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div
        className="relative z-10 mx-10 mb-10 rounded-2xl p-5 backdrop-blur-sm"
        style={{
          border: "1px solid rgb(var(--auth-panel-text) / 0.10)",
          background: "rgb(var(--auth-panel-text) / 0.05)",
        }}
      >
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgb(var(--auth-panel-text) / 0.65)" }}
        >
          &ldquo;FacelessReels changes content game completely. Your channels grow while you sleep
          — You can post daily without ever appearing on camera.&rdquo;
        </p>
      </div>
    </div>
  );
}
