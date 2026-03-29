import type { ComplianceAnalysis } from "@/lib/analysis";

type ReportPanelProps = {
  analysis: ComplianceAnalysis;
};

const urgencyTone = {
  High: "bg-[rgba(180,87,63,0.14)] text-[var(--warning)] border-[rgba(180,87,63,0.22)]",
  Medium:
    "bg-[rgba(203,139,62,0.16)] text-[color:var(--accent)] border-[rgba(203,139,62,0.24)]",
  Low: "bg-[rgba(25,53,43,0.12)] text-[var(--primary)] border-[rgba(25,53,43,0.18)]",
} as const;

export function ReportPanel({ analysis }: ReportPanelProps) {
  return (
    <section className="glass-panel rounded-[2rem] p-6 md:p-8">
      <div className="flex flex-col gap-4 border-b border-[var(--line)] pb-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <p className="section-kicker">Structured output</p>
          <h2 className="font-[family:var(--font-display)] text-3xl leading-tight md:text-4xl">
            Action report
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)] md:text-base">
            Ma&apos;at should feel like a decision document, not a chat transcript. The
            highest priority is always what this means, what to do next, and how much
            urgency exists.
          </p>
        </div>

        <div
          className={`inline-flex w-fit items-center rounded-full border px-4 py-2 text-sm font-semibold ${
            urgencyTone[analysis.urgency]
          }`}
        >
          {analysis.urgency} urgency
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="data-card p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Deadline
          </p>
          <p className="mt-3 text-lg font-semibold leading-7">{analysis.deadline}</p>
        </div>
        <div className="data-card p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Applies to
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            {analysis.appliesTo}
          </p>
        </div>
        <div className="data-card p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Confidence
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            {analysis.confidence}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="data-card p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            What this means
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--foreground)]">
            {analysis.summary}
          </p>
        </div>
        <div className="data-card p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Next step
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--foreground)]">
            {analysis.nextStep}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="data-card p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Actions
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--foreground)]">
            {analysis.actions.map((action) => (
              <li key={action} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="data-card p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Risks if ignored
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--foreground)]">
            {analysis.risks.map((risk) => (
              <li key={risk} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--warning)]" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="data-card p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Ambiguities
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
            {analysis.ambiguities.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[rgba(25,53,43,0.24)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] border border-[rgba(180,87,63,0.18)] bg-[rgba(180,87,63,0.08)] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--warning)]">
            Disclaimer
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">
            {analysis.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
