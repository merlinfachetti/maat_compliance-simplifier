"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="h-16 w-16 rounded-2xl border border-[var(--danger-line)] bg-[var(--danger-bg)] flex items-center justify-center mb-6">
        <span className="text-2xl text-[#e07060]">⚠</span>
      </div>
      <p className="section-kicker mb-4">Something went wrong</p>
      <h1 className="font-[family:var(--font-display)] text-3xl md:text-4xl text-[var(--foreground)] mb-4 leading-tight">
        An unexpected error occurred.
      </h1>
      <p className="text-[var(--foreground-2)] text-sm leading-7 max-w-md mb-8">
        Ma&apos;at encountered an error it could not weigh. Please try again or return home.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={reset} className="primary-button px-8 py-3">
          Try again
        </button>
        <Link href="/" className="secondary-button px-8 py-3">
          Return home
        </Link>
      </div>
    </main>
  );
}
