"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, PlusCircle } from "lucide-react";
import { AccountEmptyState } from "@/components/series/AccountEmptyState";
import { AccountGroup, type AccountGroupData } from "@/components/series/AccountGroup";
import { FooterNav } from "@/components/series/FooterNav";

const MOCK_ACCOUNTS: AccountGroupData[] = [
  {
    id: "youtube",
    platform: "youtube",
    name: "Nnadozie Chukwu",
    type: "Youtube account",
    subAccounts: [
      { id: "yt-1", label: "Youtube account" },
      { id: "yt-2", label: "Youtube account" },
      { id: "yt-3", label: "Youtube account" },
    ],
  },
  {
    id: "tiktok",
    platform: "tiktok",
    name: "Nnadozie Chukwu",
    type: "TikTok account",
    subAccounts: [
      { id: "tt-1", label: "TikTok account" },
      { id: "tt-2", label: "TikTok account" },
      { id: "tt-3", label: "TikTok account" },
    ],
  },
  {
    id: "facebook",
    platform: "facebook",
    name: "Nnadozie Chukwu",
    type: "Facebook account",
    subAccounts: [
      { id: "fb-1", label: "Facebook account" },
      { id: "fb-2", label: "Facebook account" },
      { id: "fb-3", label: "Facebook account" },
    ],
  },
];

const DURATION_OPTIONS = ["15 Seconds", "30 Seconds", "60 Seconds", "90 Seconds"];
const SCHEDULE_OPTIONS = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-[20px] font-bold text-[rgb(var(--foreground))]">{title}</h2>
      <p className="text-sm text-[rgb(var(--muted-foreground))] mt-0.5">{subtitle}</p>
    </div>
  );
}

function NativeSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition appearance-none cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function SeriesEffectsPage() {
  const router = useRouter();

  const [hasAccounts, setHasAccounts] = useState(false);
  const [seriesName, setSeriesName] = useState("Interesting facts about science");
  const [duration, setDuration] = useState("30 Seconds");
  const [schedule, setSchedule] = useState("12:00");

  return (
    <div className="flex flex-col min-h-full">
      <div className="flex-1 px-5 md:px-8 py-6 space-y-8">

        {/* ── Section 1: Connect Social Accounts ── */}
        <section>
          <SectionHeader
            title="Connect social accounts"
            subtitle="Connect and select the social media account where your reels are published on"
          />

          {hasAccounts ? (
            <div className="space-y-3">
              {MOCK_ACCOUNTS.map((group) => (
                <AccountGroup key={group.id} group={group} />
              ))}
              <button
                onClick={() => {}}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-sm font-medium text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))] transition-colors"
              >
                Connect account
                <PlusCircle size={15} />
              </button>
            </div>
          ) : (
            <AccountEmptyState onConnect={() => setHasAccounts(true)} />
          )}
        </section>

        {/* ── Section 2: Series Details ── */}
        <section>
          <SectionHeader
            title="Series Details"
            subtitle="Finalize your videos before published"
          />

          <div className="space-y-5">
            {/* Series Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[rgb(var(--foreground))]">
                Series name
              </label>
              <input
                type="text"
                value={seriesName}
                onChange={(e) => setSeriesName(e.target.value)}
                className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))] text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/30 transition"
              />
            </div>

            {/* Duration + Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-sm font-semibold text-[rgb(var(--foreground))]">
                  Video Duration
                  <Clock size={14} className="text-[rgb(var(--muted-foreground))]" />
                </label>
                <NativeSelect
                  value={duration}
                  onChange={setDuration}
                  options={DURATION_OPTIONS}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-[rgb(var(--foreground))]">
                  Schedule
                </label>
                <p className="text-xs text-[rgb(var(--muted-foreground))] -mt-0.5">
                  Set when you want your reels to be published.
                </p>
                <NativeSelect
                  value={schedule}
                  onChange={setSchedule}
                  options={SCHEDULE_OPTIONS}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterNav
        step={3}
        total={3}
        onBack={() => router.push("/series/style")}
        onContinue={() => router.push("/dashboard")}
        continueLabel="Create"
      />
    </div>
  );
}
