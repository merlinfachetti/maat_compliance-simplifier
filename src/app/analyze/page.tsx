"use client";

import { useState, useTransition, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReportPanel } from "@/components/report-panel";
import { documentTypes, type ComplianceAnalysis } from "@/lib/analysis";

type InputMode = "paste" | "upload";

export default function AnalyzePage() {
  const [mode, setMode] = useState<InputMode>("paste");
  const [documentType, setDocumentType] = useState(documentTypes[0]);
  const [sourceText, setSourceText] = useState("");
  const [region, setRegion] = useState("");
  const [concern, setConcern] = useState("");
  const [analysis, setAnalysis] = useState<ComplianceAnalysis | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isDragging, setIsDragging] = useState(false);
  const [pdfInfo, setPdfInfo] = useState<{ name: string; pages: number } | null>(null);
  const [extracting, setExtracting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handlePdfFile(file: File) {
    if (!file.name.endsWith(".pdf") && file.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    setExtracting(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/extract-pdf", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.text) {
        setError(json.error || "Could not extract text from PDF.");
        return;
      }
      setSourceText(json.text);
      setPdfInfo({ name: file.name, pages: json.pages });
    } catch {
      setError("Failed to read the PDF. Try pasting the text directly.");
    } finally {
      setExtracting(false);
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handlePdfFile(file);
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setAnalysis(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentType, sourceText, region, concern }),
        });
        const payload = await res.json() as { error?: string; analysis?: ComplianceAnalysis };
        if (!res.ok || !payload.analysis) {
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
    <main className="min-h-screen pb-20">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(13,15,14,0.92)] backdrop-blur-2xl">
        <div className="page-shell flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-sm">
            <span>←</span>
            <span className="hidden sm:inline">Back</span>
            <span className="mx-2 text-[var(--line-strong)]">|</span>
            <Image src="/maat.png" alt="Ma'at" width={22} height={22} className="opacity-80" />
            <span className="font-[family:var(--font-display)] text-[var(--foreground)] text-base">Ma&apos;at</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
            <span className="hidden sm:inline">Compliance Simplifier</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] pulse-gold" />
            <span className="text-[var(--gold)]">AI Analysis</span>
          </div>
        </div>
      </nav>

      <div className="page-shell pt-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* ── INPUT PANEL ── */}
          <div className="glass-panel rounded-[var(--radius-xl)] p-6 md:p-8 sticky top-[4rem]">
            <div className="mb-6">
              <p className="section-kicker mb-2">Document analysis</p>
              <h1 className="font-[family:var(--font-display)] text-3xl md:text-4xl text-[var(--foreground)] leading-tight">
                Paste or upload your document.
              </h1>
              <p className="text-sm text-[var(--foreground-2)] mt-3 leading-6">
                Ma&apos;at returns a structured action report — urgency, deadline, concrete steps, and risks.
              </p>
            </div>

            {/* Mode toggle */}
            <div className="flex gap-1 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--faint)] p-1 mb-6">
              {(["paste", "upload"] as InputMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(""); if (m === "paste") { setPdfInfo(null); } }}
                  className={`flex-1 rounded-[calc(var(--radius-sm)-2px)] py-2 text-sm font-semibold transition-all ${
                    mode === m
                      ? "bg-[var(--surface-raised)] text-[var(--foreground)] shadow-sm border border-[var(--gold-line)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground-2)]"
                  }`}
                >
                  {m === "paste" ? "✎  Paste text" : "⬆  Upload PDF"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Document type */}
              <div>
                <label className="field-label">Document type</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="field-input"
                >
                  {documentTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="field-label">Country / Region</label>
                <input
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="field-input"
                  placeholder="e.g. Germany, Netherlands, Portugal…"
                />
              </div>

              {/* Text input / PDF upload */}
              {mode === "paste" ? (
                <div>
                  <label className="field-label">Document text</label>
                  <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    className="field-input min-h-[220px] resize-y"
                    placeholder="Paste the full text of your notice, letter, or compliance request here…"
                  />
                  {sourceText.length > 0 && (
                    <p className="mt-1 text-right text-xs text-[var(--muted)]">{sourceText.length} chars</p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="field-label">PDF file</label>
                  {pdfInfo ? (
                    <div className="rounded-[var(--radius-sm)] border border-[var(--gold-line)] bg-[var(--gold-glow)] p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">{pdfInfo.name}</p>
                        <p className="text-xs text-[var(--muted)] mt-0.5">{pdfInfo.pages} page{pdfInfo.pages !== 1 ? "s" : ""} extracted</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setPdfInfo(null); setSourceText(""); }}
                        className="text-xs text-[var(--muted)] hover:text-[var(--danger)] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileRef.current?.click()}
                      className={`min-h-[140px] rounded-[var(--radius-sm)] border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                        isDragging
                          ? "border-[var(--gold)] bg-[var(--gold-glow)]"
                          : "border-[var(--line-strong)] bg-[rgba(240,232,214,0.02)] hover:border-[var(--gold-line)] hover:bg-[var(--gold-glow)]"
                      }`}
                    >
                      {extracting ? (
                        <>
                          <span className="text-2xl pulse-gold">⚙</span>
                          <p className="text-sm text-[var(--muted)]">Extracting text from PDF…</p>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl text-[var(--muted)]">📄</span>
                          <p className="text-sm font-semibold text-[var(--foreground)]">Drop PDF here or click to browse</p>
                          <p className="text-xs text-[var(--muted)]">Max 10MB · Text-based PDFs only</p>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handlePdfFile(f);
                      e.target.value = "";
                    }}
                  />
                </div>
              )}

              {/* Concern */}
              <div>
                <label className="field-label">Main concern <span className="normal-case tracking-normal font-normal text-[var(--muted)]">(optional)</span></label>
                <input
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  className="field-input"
                  placeholder="What worries you most about this document?"
                />
              </div>

              {error && (
                <div className="rounded-[var(--radius-sm)] border border-[var(--danger-line)] bg-[var(--danger-bg)] px-4 py-3 text-sm text-[#e07060]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending || !sourceText.trim() || extracting}
                className="primary-button w-full py-4 text-base"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-[rgba(13,15,14,0.3)] border-t-[rgba(13,15,14,0.9)] animate-spin" />
                    Analyzing document…
                  </span>
                ) : (
                  "Generate action report →"
                )}
              </button>

              <p className="text-xs text-center text-[var(--muted)] leading-5">
                Ma&apos;at simplifies documents for interpretation purposes only.{" "}
                <strong className="text-[var(--foreground-2)]">Not legal advice.</strong>
              </p>
            </form>
          </div>

          {/* ── OUTPUT PANEL ── */}
          <div>
            {isPending ? (
              <div className="glass-panel rounded-[var(--radius-xl)] p-10 flex flex-col items-center justify-center gap-6 min-h-[400px]">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-2 border-[var(--gold-line)] animate-spin" style={{ borderTopColor: "var(--gold)" }} />
                  <div className="absolute inset-3 rounded-full border border-[var(--gold-line)] animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.4s", borderTopColor: "var(--gold)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl">⚖</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-[family:var(--font-display)] text-xl text-[var(--foreground)] mb-2">Interpreting document…</p>
                  <p className="text-sm text-[var(--muted)]">Extracting obligations, urgency, and action requirements</p>
                </div>
                <div className="w-full max-w-xs rounded-full bg-[var(--line)] h-1 overflow-hidden">
                  <div className="h-full bg-[var(--gold)] rounded-full scan-line" style={{ width: "40%" }} />
                </div>
              </div>
            ) : analysis ? (
              <ReportPanel analysis={analysis} />
            ) : (
              <div className="glass-panel rounded-[var(--radius-xl)] p-8 flex flex-col items-center justify-center gap-5 min-h-[400px] border-dashed border-[var(--line-strong)]">
                <div className="h-16 w-16 rounded-2xl bg-[var(--gold-glow)] border border-[var(--gold-line)] flex items-center justify-center">
                  <span className="text-[var(--gold)] text-3xl">⚖</span>
                </div>
                <div className="text-center max-w-sm">
                  <p className="font-[family:var(--font-display)] text-xl text-[var(--foreground)] mb-2">Your report appears here</p>
                  <p className="text-sm text-[var(--muted)] leading-6">
                    Paste your document text or upload a PDF, then click Generate to receive your structured action report.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs mt-2">
                  {[
                    { icon: "⏱", label: "Under 60 seconds" },
                    { icon: "⚡", label: "Real AI analysis" },
                    { icon: "📋", label: "Concrete actions" },
                    { icon: "🔒", label: "Not stored" },
                  ].map((f) => (
                    <div key={f.label} className="data-card p-3 flex items-center gap-2">
                      <span className="text-sm">{f.icon}</span>
                      <span className="text-xs text-[var(--foreground-2)]">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
