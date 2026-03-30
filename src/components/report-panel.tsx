"use client";

import { useState } from "react";
import type { ComplianceAnalysis } from "@/lib/analysis";

type ReportPanelProps = {
  analysis: ComplianceAnalysis;
};

const urgencyConfig = {
  High: { cls: "badge-high", label: "HIGH URGENCY", icon: "⚠" },
  Medium: { cls: "badge-medium", label: "MEDIUM URGENCY", icon: "◈" },
  Low: { cls: "badge-low", label: "LOW URGENCY", icon: "✦" },
} as const;

export function ReportPanel({ analysis }: ReportPanelProps) {
  const [copied, setCopied] = useState(false);
  const cfg = urgencyConfig[analysis.urgency] ?? urgencyConfig.Medium;

  function copyActions() {
    const text = [
      `MA'AT COMPLIANCE REPORT`,
      `Urgency: ${analysis.urgency}`,
      `Deadline: ${analysis.deadline}`,
      ``,
      `WHAT THIS MEANS`,
      analysis.summary,
      ``,
      `ACTIONS`,
      ...analysis.actions.map((a, i) => `${i + 1}. ${a}`),
      ``,
      `RISKS IF IGNORED`,
      ...analysis.risks.map((r) => `• ${r}`),
      ``,
      `NEXT STEP`,
      analysis.nextStep,
      ``,
      `DISCLAIMER`,
      analysis.disclaimer,
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }

  return (
    <section className="fade-up-1 space-y-4">
      {/* Header bar */}
      <div className="glass-panel-raised rounded-[var(--radius-lg)] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10 shrink-0">
            <div className="absolute inset-0 rounded-xl bg-[var(--gold-glow)] border border-[var(--gold-line)] flex items-center justify-center">
              <span className="text-[var(--gold)] text-base">⚖</span>
            </div>
          </div>
          <div>
            <p className="font-[family:var(--font-display)] text-lg text-[var(--foreground)] leading-tight">Action Report</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">Applies to: {analysis.appliesTo}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-widest ${cfg.cls}`}>
            <span>{cfg.icon}</span> {cfg.label}
          </span>
          <button
            onClick={copyActions}
            className="rounded-full border border-[var(--line-strong)] bg-[var(--faint)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--gold-line)] transition-all"
          >
            {copied ? "✓ Copied" : "Copy report"}
          </button>
        </div>
      </div>

      {/* Deadline + Confidence row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="data-card p-4 rounded-[var(--radius)]">
          <p className="field-label">Deadline</p>
          <p className="mt-2 text-sm font-semibold text-[var(--foreground)] leading-6">{analysis.deadline}</p>
        </div>
        <div className="data-card p-4 rounded-[var(--radius)]">
          <p className="field-label">Confidence</p>
          <p className="mt-2 text-xs text-[var(--foreground-2)] leading-6">{analysis.confidence}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="data-card rounded-[var(--radius)] p-5 border-l-2 border-l-[var(--gold)]">
        <p className="field-label mb-3">What this means</p>
        <p className="text-sm leading-7 text-[var(--foreground)]">{analysis.summary}</p>
      </div>

      {/* Next step */}
      <div className="rounded-[var(--radius)] border border-[var(--teal-glow)] bg-[rgba(42,107,94,0.08)] p-5">
        <p className="field-label mb-3" style={{ color: "#4aad97" }}>Next step</p>
        <p className="text-sm leading-7 text-[var(--foreground)]">{analysis.nextStep}</p>
      </div>

      {/* Actions + Risks */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="data-card rounded-[var(--radius)] p-5">
          <p className="field-label mb-3">Actions required</p>
          <ul className="space-y-3">
            {analysis.actions.map((action, i) => (
              <li key={i} className="flex gap-3 text-sm leading-6 text-[var(--foreground)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold-glow)] border border-[var(--gold-line)] text-[var(--gold)] text-[10px] font-bold">
                  {i + 1}
                </span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="data-card rounded-[var(--radius)] p-5">
          <p className="field-label mb-3" style={{ color: "#e07060" }}>Risks if ignored</p>
          <ul className="space-y-3">
            {analysis.risks.map((risk, i) => (
              <li key={i} className="flex gap-3 text-sm leading-6 text-[var(--foreground-2)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--danger)]" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ambiguities + Disclaimer */}
      <div className="grid gap-3 md:grid-cols-[1.3fr_1fr]">
        <div className="data-card rounded-[var(--radius)] p-5">
          <p className="field-label mb-3">Ambiguities & gaps</p>
          <ul className="space-y-2">
            {analysis.ambiguities.map((item, i) => (
              <li key={i} className="flex gap-3 text-xs leading-6 text-[var(--foreground-2)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--muted)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[var(--radius)] border border-[var(--danger-line)] bg-[var(--danger-bg)] p-5">
          <p className="field-label mb-3" style={{ color: "#e07060" }}>Disclaimer</p>
          <p className="text-xs leading-6 text-[var(--foreground-2)]">{analysis.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
