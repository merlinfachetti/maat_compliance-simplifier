"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ReportPanel } from "@/components/report-panel";
import {
  documentTypes,
  sampleAnalysis,
  type ComplianceAnalysis,
} from "@/lib/analysis";

const exampleText = `Dear taxpayer,

You are required to submit the missing VAT declaration for Q4 and provide supporting documents for the period under review. Please respond within 14 days from the date of this notice to avoid penalties or further enforcement action.

Reference: VAT-2026-184`;

export default function AnalyzePage() {
  const [documentType, setDocumentType] = useState(documentTypes[0]);
  const [sourceText, setSourceText] = useState(exampleText);
  const [region, setRegion] = useState("Germany");
  const [concern, setConcern] = useState("I do not know whether this is urgent.");
  const [analysis, setAnalysis] = useState<ComplianceAnalysis | null>(sampleAnalysis);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentType,
            sourceText,
            region,
            concern,
          }),
        });

        const payload = (await response.json()) as {
          error?: string;
          analysis?: ComplianceAnalysis;
        };

        if (!response.ok || !payload.analysis) {
          setError(payload.error || "The analysis could not be generated.");
          return;
        }

        setAnalysis(payload.analysis);
      } catch {
        setError("The analysis request failed. Try again in a moment.");
      }
    });
  }

  return (
    <main className="pb-20 pt-8">
      <div className="page-shell">
        <div className="glass-panel rounded-full px-4 py-3 text-sm text-[var(--muted)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="font-semibold text-[var(--foreground)]">
              Ma&apos;at Compliance
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <span>Step 1 foundation</span>
              <span className="hidden h-1 w-1 rounded-full bg-[var(--line)] md:block" />
              <span>Mocked analysis contract</span>
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-6 md:p-8">
            <p className="section-kicker">Analyze a notice</p>
            <h1 className="mt-3 font-[family:var(--font-display)] text-4xl leading-none md:text-5xl">
              Paste the document text.
            </h1>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              This stage already models the final experience: structured input, low
              friction, and an action-first report. The AI engine will replace the mock
              logic in the next milestone.
            </p>

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                  Document type
                </span>
                <select
                  value={documentType}
                  onChange={(event) => setDocumentType(event.target.value)}
                  className="w-full rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,252,248,0.8)] px-4 py-3 text-sm outline-none"
                >
                  {documentTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                  Region or country
                </span>
                <input
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  className="w-full rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,252,248,0.8)] px-4 py-3 text-sm outline-none"
                  placeholder="Germany"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                  Paste the text
                </span>
                <textarea
                  value={sourceText}
                  onChange={(event) => setSourceText(event.target.value)}
                  className="min-h-[240px] w-full rounded-[1.4rem] border border-[var(--line)] bg-[rgba(255,252,248,0.8)] px-4 py-4 text-sm leading-7 outline-none"
                  placeholder="Paste a notice, tax message, municipality letter, or compliance request."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                  Main concern
                </span>
                <input
                  value={concern}
                  onChange={(event) => setConcern(event.target.value)}
                  className="w-full rounded-[1.2rem] border border-[var(--line)] bg-[rgba(255,252,248,0.8)] px-4 py-3 text-sm outline-none"
                  placeholder="What worries you most?"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <button type="submit" className="primary-button w-full" disabled={isPending}>
                {isPending ? "Structuring analysis..." : "Generate action report"}
              </button>
              <p className="text-sm leading-7 text-[var(--muted)]">
                Ma&apos;at explains obligations in plain language and shows urgency. It does
                not provide legal advice.
              </p>
              {error ? (
                <p className="rounded-2xl border border-[rgba(180,87,63,0.18)] bg-[rgba(180,87,63,0.08)] px-4 py-3 text-sm text-[var(--warning)]">
                  {error}
                </p>
              ) : null}
            </div>
          </form>

          <div className="space-y-5">
            <div className="data-card subtle-grid overflow-hidden p-6">
              <p className="section-kicker">Why this matters</p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-3xl font-semibold">60s</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    target time for a first clear answer
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">1 report</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    instead of a confusing wall of legal text
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">0 clutter</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    no dashboard complexity in the first MVP
                  </p>
                </div>
              </div>
            </div>

            {analysis ? <ReportPanel analysis={analysis} /> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
