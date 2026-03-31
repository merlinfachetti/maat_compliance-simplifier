"use client";

import { useState, useTransition, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReportPanel } from "@/components/report-panel";
import { PaywallGate } from "@/components/paywall-gate";
import { documentTypes, type ComplianceAnalysis } from "@/lib/analysis";
import { track } from "@/lib/analytics";

type InputMode = "paste" | "upload";

type AccessStatus = {
  freeUsed: boolean;
  hasPaidAccess: boolean;
  paidRemaining: number;
};

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
  const [showPaywall, setShowPaywall] = useState(false);
  const [access, setAccess] = useState<AccessStatus | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "cancelled" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Check access status on mount + handle payment redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") setPaymentStatus("success");
    if (params.get("payment") === "cancelled") setPaymentStatus("cancelled");
    // Clean URL
    if (params.has("payment")) {
      window.history.replaceState({}, "", "/analyze");
    }

    fetch("/api/check-access")
      .then((r) => r.json())
      .then((data) => setAccess(data as AccessStatus))
      .catch(() => {});
  }, []);

  // Refresh access after paywall closes (user may have paid)
  function handlePaywallClose() {
    setShowPaywall(false);
    fetch("/api/check-access")
      .then((r) => r.json())
      .then((data) => setAccess(data as AccessStatus))
      .catch(() => {});
  }

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
      track({ name: "pdf_uploaded", props: { pages: json.pages } });
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
      track({ name: "analysis_started", props: { documentType, mode } });
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documentType, sourceText, region, concern }),
        });

        const payload = await res.json() as {
          error?: string;
          message?: string;
          analysis?: ComplianceAnalysis;
        };

        // Hit free limit — show paywall
        if (res.status === 402 || payload.error === "free_limit_reached") {
          track({ name: "analysis_gated", props: {} });
          setShowPaywall(true);
          return;
        }

        if (!res.ok || !payload.analysis) {
          setError(payload.message ?? payload.error ?? "The analysis could not be generated.");
          return;
        }

        setAnalysis(payload.analysis);
        track({ name: "analysis_success", props: { urgency: payload.analysis.urgency, documentType } });

        // Refresh access status to reflect credit deduction
        fetch("/api/check-access")
          .then((r) => r.json())
          .then((data) => setAccess(data as AccessStatus))
          .catch(() => {});
      } catch {
        setError("The analysis request failed. Try again in a moment.");
      }
    });
  }

  const canAnalyze = !isPending && sourceText.trim().length >= 30 && !extracting;

  return (
    <main className="min-h-screen pb-20">
      {/* Paywall modal */}
      {showPaywall && <PaywallGate onClose={handlePaywallClose} />}

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(13,15,14,0.94)] backdrop-blur-2xl">
        <div className="page-shell flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-sm">
            <span>←</span>
            <span className="hidden sm:inline">Home</span>
            <span className="mx-2 opacity-20">|</span>
            <Image src="/maat.png" alt="Ma'at" width={22} height={22} className="opacity-80" />
            <span className="font-[family:var(--font-display)] text-[var(--foreground)] text-base">Ma&apos;at</span>
          </Link>

          {/* Credit indicator */}
          <div className="flex items-center gap-3 text-xs">
            {access === null ? (
              <span className="text-[var(--muted)]">…</span>
            ) : access.hasPaidAccess ? (
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--gold-line)] bg-[var(--gold-glow)] px-3 py-1 text-[var(--gold)] font-semibold">
                <span>✦</span> {access.paidRemaining} analysis{access.paidRemaining !== 1 ? "es" : ""} remaining
              </span>
            ) : access.freeUsed ? (
              <button
                onClick={() => setShowPaywall(true)}
                className="flex items-center gap-1.5 rounded-full border border-[var(--danger-line)] bg-[var(--danger-bg)] px-3 py-1 text-[#e07060] font-semibold hover:opacity-80 transition-opacity"
              >
                <span>⚠</span> Free used · Get credits
              </button>
            ) : (
              <span className="flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3 py-1 text-[var(--muted)]">
                1 free analysis available
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Payment status banners */}
      {paymentStatus === "success" && (
        <div className="border-b border-[var(--gold-line)] bg-[var(--gold-glow)] px-4 py-3 text-center text-sm font-semibold text-[var(--gold)]">
          ✦ Payment confirmed — your credits are ready. Analyze your document below.
        </div>
      )}
      {paymentStatus === "cancelled" && (
        <div className="border-b border-[var(--danger-line)] bg-[var(--danger-bg)] px-4 py-3 text-center text-sm text-[#e07060]">
          Payment was not completed. Your free analysis is still available.
        </div>
      )}

      <div className="page-shell pt-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">

          {/* ── INPUT PANEL ── */}
          <div className="glass-panel rounded-[var(--radius-xl)] p-6 md:p-8 lg:sticky lg:top-[4.5rem]">
            <div className="mb-6">
              <p className="section-kicker mb-2">Document analysis</p>
              <h1 className="font-[family:var(--font-display)] text-3xl md:text-4xl text-[var(--foreground)] leading-tight">
                Paste or upload your document.
              </h1>
              <p className="text-sm text-[var(--foreground-2)] mt-3 leading-6">
                Ma&apos;at returns a structured action report — urgency, deadline, concrete steps, and risks. Under 60 seconds.
              </p>
            </div>

            {/* Mode toggle */}
            <div className="flex gap-1 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[rgba(240,232,214,0.03)] p-1 mb-6">
              {(["paste", "upload"] as InputMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
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
                  {documentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
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

              {/* Text / PDF */}
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
                        <p className="text-xs text-[var(--muted)] mt-0.5">
                          {pdfInfo.pages} page{pdfInfo.pages !== 1 ? "s" : ""} · {sourceText.length} chars extracted
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setPdfInfo(null); setSourceText(""); }}
                        className="text-xs text-[var(--muted)] hover:text-[#e07060] transition-colors"
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
                <label className="field-label">
                  Main concern{" "}
                  <span className="normal-case tracking-normal font-normal text-[var(--muted)]">(optional)</span>
                </label>
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
                disabled={!canAnalyze}
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
                Ma&apos;at interprets documents only.{" "}
                <strong className="text-[var(--foreground-2)]">Not legal advice.</strong>
              </p>
            </form>
          </div>

          {/* ── OUTPUT PANEL ── */}
          <div>
            {isPending ? (
              <div className="glass-panel rounded-[var(--radius-xl)] p-10 flex flex-col items-center justify-center gap-6 min-h-[480px]">
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 rounded-full border-2 border-[var(--line-strong)] animate-spin" style={{ borderTopColor: "var(--gold)", animationDuration: "1s" }} />
                  <div className="absolute inset-3 rounded-full border border-[var(--line)] animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.6s", borderTopColor: "var(--teal-2)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">⚖</span>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="font-[family:var(--font-display)] text-xl text-[var(--foreground)]">Interpreting document…</p>
                  <p className="text-sm text-[var(--muted)]">Extracting obligations, urgency, deadline, and risks</p>
                </div>
                <div className="w-full max-w-xs space-y-2 text-xs text-[var(--muted)]">
                  {["Reading document structure", "Identifying obligations", "Assessing urgency & risks", "Structuring action report"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] pulse-gold" style={{ animationDelay: `${i * 0.4}s` }} />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ) : analysis ? (
              <ReportPanel analysis={analysis} />
            ) : (
              <div className="glass-panel rounded-[var(--radius-xl)] p-8 flex flex-col items-center justify-center gap-6 min-h-[480px]">
                <div className="h-20 w-20 rounded-2xl bg-[var(--gold-glow)] border border-[var(--gold-line)] flex items-center justify-center">
                  <span className="text-[var(--gold)] text-4xl">⚖</span>
                </div>
                <div className="text-center max-w-sm">
                  <p className="font-[family:var(--font-display)] text-2xl text-[var(--foreground)] mb-3">
                    Your report appears here
                  </p>
                  <p className="text-sm text-[var(--foreground-2)] leading-7">
                    Paste your document text or upload a PDF, then click Generate to receive your structured action report.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                  {[
                    { icon: "⏱", label: "Under 60 seconds" },
                    { icon: "⚡", label: "Real AI analysis" },
                    { icon: "📋", label: "Concrete actions" },
                    { icon: "🔒", label: "Not stored" },
                  ].map((f) => (
                    <div key={f.label} className="data-card p-3 rounded-[var(--radius-sm)] flex items-center gap-2">
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
