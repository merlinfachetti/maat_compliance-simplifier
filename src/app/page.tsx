import Image from "next/image";
import Link from "next/link";
import { ReportPanel } from "@/components/report-panel";
import { sampleAnalysis } from "@/lib/analysis";

export default function Home() {
  const pillars = [
    {
      title: "Translate legal density",
      copy: "Turn dense letters, regulatory messages, and compliance notices into plain language you can act on immediately.",
    },
    {
      title: "Show what matters first",
      copy: "Lead with urgency, deadlines, actions, and risk before nuance, so users do not drown in detail.",
    },
    {
      title: "Stay honest about limits",
      copy: "Build trust through clear disclaimers, ambiguity notes, and escalation signals when professional review is safer.",
    },
  ];

  const journey = [
    "Paste a notice or upload a document",
    "Ma'at extracts the core obligation and urgency",
    "Receive one scannable report with actions, risk, and next step",
  ];

  const audiences = [
    "Freelancers navigating tax and registration bureaucracy",
    "Expats trying to understand residency or government notices",
    "Founders handling early compliance without an internal legal team",
  ];

  return (
    <main className="pb-24 pt-6 md:pb-32">
      <div className="page-shell">
        <header className="glass-panel rounded-full px-4 py-3 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/maat.png" alt="Ma'at logo" width={42} height={42} priority />
              <div>
                <p className="font-[family:var(--font-display)] text-2xl leading-none">
                  Ma&apos;at
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Compliance Simplifier
                </p>
              </div>
            </Link>

            <nav className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <a href="#product">Product</a>
              <a href="#experience">Experience</a>
              <a href="#pricing">Pricing</a>
              <Link href="/analyze" className="primary-button px-5 py-2.5">
                Try the flow
              </Link>
            </nav>
          </div>
        </header>

        <section className="relative mt-8 overflow-hidden rounded-[2.5rem] border border-[var(--line)] bg-[rgba(255,250,242,0.76)] px-6 py-10 shadow-[var(--shadow)] md:px-10 md:py-14">
          <div className="absolute inset-0 subtle-grid opacity-40" />
          <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="section-kicker">Compliance clarity for real life</p>
              <h1 className="section-title mt-5 max-w-3xl">
                Turn bureaucracy into one clear next step.
              </h1>
              <p className="section-copy mt-6 max-w-2xl">
                Ma&apos;at is designed for people who receive a legal or regulatory text and
                need clarity fast. Instead of jargon and anxiety, the product returns one
                structured report with meaning, urgency, actions, and risk.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/analyze" className="primary-button">
                  Get report prototype
                </Link>
                <a href="#product" className="secondary-button">
                  See how it works
                </a>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="data-card p-4">
                  <p className="text-3xl font-semibold">Plain</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    language first, legal nuance second
                  </p>
                </div>
                <div className="data-card p-4">
                  <p className="text-3xl font-semibold">Action</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    lead with what to do now and by when
                  </p>
                </div>
                <div className="data-card p-4">
                  <p className="text-3xl font-semibold">Trust</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    clear limits, disclaimers, and escalation signals
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-panel rounded-[2rem] p-5">
                <div className="flex items-center gap-4">
                  <div className="overflow-hidden rounded-2xl border border-[var(--line)]">
                    <Image src="/user.jpg" alt="User portrait" width={72} height={72} />
                  </div>
                  <div>
                    <p className="font-semibold">Typical user moment</p>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                      &quot;I got a formal notice, I do not fully understand it, and I need
                      to know what happens if I ignore it.&quot;
                    </p>
                  </div>
                </div>
              </div>
              <ReportPanel analysis={sampleAnalysis} />
            </div>
          </div>
        </section>

        <section id="product" className="mt-20">
          <div className="max-w-2xl">
            <p className="section-kicker">Product framing</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              A calm layer between the user and the bureaucracy.
            </h2>
            <p className="section-copy mt-5">
              The MVP should not feel like a legal-tech dashboard. It should feel like an
              intelligent translation layer that makes dense obligations legible and
              actionable in under a minute.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="glass-panel rounded-[2rem] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Pillar
                </p>
                <h3 className="mt-4 text-2xl font-semibold">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {pillar.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="mt-20 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <p className="section-kicker">Experience flow</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              One job per screen. No cognitive overload.
            </h2>
            <div className="mt-8 space-y-4">
              {journey.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-4 rounded-[1.5rem] border border-[var(--line)] bg-[rgba(255,251,246,0.72)] p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-[#f6efe4]">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-[var(--foreground)]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <p className="section-kicker">Built for</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              The users most likely to pay for immediate clarity.
            </h2>
            <ul className="mt-8 space-y-4">
              {audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(255,251,246,0.72)] px-5 py-4 text-sm leading-7 text-[var(--foreground)]"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="pricing" className="mt-20">
          <div className="glass-panel rounded-[2.4rem] px-6 py-8 md:px-8 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
              <div>
                <p className="section-kicker">Monetization path</p>
                <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
                  Start with a simple pay-per-analysis model.
                </h2>
                <p className="section-copy mt-5 max-w-2xl">
                  The first business goal is not to build a huge suite. It is to prove
                  that people will pay to understand a high-stakes document faster and with
                  less anxiety.
                </p>
              </div>

              <div className="data-card p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  First pricing experiment
                </p>
                <p className="mt-4 font-[family:var(--font-display)] text-6xl leading-none">
                  €9
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  One structured report with summary, actions, deadline, risks, and
                  disclaimer. Credit packs and recurring compliance features come later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[2.5rem] border border-[var(--line)] bg-[rgba(25,53,43,0.96)] px-6 py-10 text-[#f6efe4] md:px-10 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="section-kicker text-[rgba(246,239,228,0.68)]">Next move</p>
              <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
                The foundation is live. Next comes the real AI engine.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[rgba(246,239,228,0.74)]">
                This first milestone establishes the product shape, UX logic, structured
                output, and MVP positioning. The next milestone replaces the mock route with
                a real prompt pipeline.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href="/analyze" className="primary-button bg-[#f6efe4] text-[var(--primary)]">
                Explore prototype
              </Link>
              <a href="#product" className="secondary-button border-white/15 bg-white/6 text-[#f6efe4]">
                Review product frame
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
