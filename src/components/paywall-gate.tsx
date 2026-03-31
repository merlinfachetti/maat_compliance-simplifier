"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

type PaywallGateProps = {
  onClose?: () => void;
};

export function PaywallGate({ onClose }: PaywallGateProps) {
  const [loading, setLoading] = useState<"single" | "pack5" | null>(null);
  const [error, setError] = useState("");

  async function handleCheckout(product: "single" | "pack5") {
    setLoading(product);
    setError("");
    track({ name: "checkout_started", props: { product } });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Could not start checkout. Try again.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Payment service unavailable. Try again in a moment.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.72)] backdrop-blur-sm">
      <div className="glass-panel-raised rounded-[var(--radius-xl)] w-full max-w-lg p-8 border border-[var(--gold-line)] relative">
        {/* Close */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors text-xl"
          >
            ×
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--gold-glow)] border border-[var(--gold-line)] mb-4">
            <span className="text-[var(--gold)] text-2xl">⚖</span>
          </div>
          <h2 className="font-[family:var(--font-display)] text-2xl text-[var(--foreground)] mb-2">
            Continue with Ma&apos;at
          </h2>
          <p className="text-sm text-[var(--foreground-2)] leading-6">
            You&apos;ve used your free analysis. Choose a plan to continue getting structured compliance reports.
          </p>
        </div>

        {/* Plans */}
        <div className="space-y-3 mb-6">
          {/* Single */}
          <button
            onClick={() => handleCheckout("single")}
            disabled={loading !== null}
            className="w-full rounded-[var(--radius)] border border-[var(--line-strong)] bg-[var(--surface)] hover:border-[var(--gold-line)] hover:bg-[var(--gold-glow)] transition-all p-4 text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[var(--foreground)] text-sm">Single analysis</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">One structured action report</p>
              </div>
              <div className="text-right">
                <p className="font-[family:var(--font-display)] text-2xl text-[var(--gold)]">€9</p>
                <p className="text-xs text-[var(--muted)]">one-time</p>
              </div>
            </div>
            {loading === "single" && (
              <div className="mt-2 h-0.5 rounded-full bg-[var(--line)] overflow-hidden">
                <div className="h-full bg-[var(--gold)] animate-pulse rounded-full" style={{ width: "60%" }} />
              </div>
            )}
          </button>

          {/* Pack 5 — best value */}
          <button
            onClick={() => handleCheckout("pack5")}
            disabled={loading !== null}
            className="w-full rounded-[var(--radius)] border border-[var(--gold-line)] bg-[var(--gold-glow)] hover:bg-[rgba(201,144,60,0.16)] transition-all p-4 text-left relative"
          >
            <div className="absolute top-3 right-3">
              <span className="rounded-full bg-[var(--gold)] text-[#0d0f0e] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
                Best value
              </span>
            </div>
            <div className="flex items-center justify-between pr-20">
              <div>
                <p className="font-semibold text-[var(--foreground)] text-sm">5-analysis pack</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">€5.80 per analysis</p>
              </div>
              <div className="text-right">
                <p className="font-[family:var(--font-display)] text-2xl text-[var(--gold)]">€29</p>
                <p className="text-xs text-[var(--muted)]">one-time</p>
              </div>
            </div>
            {loading === "pack5" && (
              <div className="mt-2 h-0.5 rounded-full bg-[var(--line)] overflow-hidden">
                <div className="h-full bg-[var(--gold)] animate-pulse rounded-full" style={{ width: "60%" }} />
              </div>
            )}
          </button>
        </div>

        {error && (
          <p className="rounded-[var(--radius-sm)] border border-[var(--danger-line)] bg-[var(--danger-bg)] px-4 py-2.5 text-xs text-[#e07060] mb-4">
            {error}
          </p>
        )}

        <p className="text-center text-xs text-[var(--muted)] leading-5">
          Secure payment via Stripe · No account required · Not legal advice
        </p>
      </div>
    </div>
  );
}
