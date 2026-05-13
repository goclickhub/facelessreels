export type Billing = "monthly" | "annual";

interface BillingToggleProps {
  billing: Billing;
  onChange: (billing: Billing) => void;
}

export default function BillingToggle({ billing, onChange }: BillingToggleProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-xl bg-[rgb(var(--muted))] p-1 mt-3">
      {(["monthly", "annual"] as Billing[]).map((b) => (
        <button
          key={b}
          onClick={() => onChange(b)}
          className={`rounded-lg px-4 py-1.5 text-[12px] font-medium capitalize transition-colors cursor-pointer ${
            billing === b
              ? "bg-[rgb(var(--card))] text-[rgb(var(--foreground))] shadow-sm"
              : "text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
          }`}
        >
          {b}
          {b === "annual" && (
            <span className="ml-1.5 rounded-full bg-[rgb(var(--stat-green))] px-1.5 py-0.5 text-[10px] font-semibold text-green-700 dark:text-green-300">
              Save 35%
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
