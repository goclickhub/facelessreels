interface FAQ {
  q: string;
  a: string;
}

interface GuideFAQProps {
  faqs: FAQ[];
}

export default function GuideFAQ({ faqs }: GuideFAQProps) {
  return (
    <div className="rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] p-4 space-y-3">
      <p className="text-[13px] font-semibold text-[rgb(var(--foreground))]">
        FAQ
      </p>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="border-b border-[rgb(var(--border))] pb-3 last:border-0 last:pb-0"
          >
            <p className="text-[12px] font-medium text-[rgb(var(--foreground))] mb-1">
              {faq.q}
            </p>
            <p className="text-[11px] leading-relaxed text-[rgb(var(--muted-foreground))]">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
