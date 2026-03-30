import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(13,15,14,0.88)] backdrop-blur-2xl">
        <div className="page-shell flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl">
              <Image src="/maat.png" alt="Ma'at" fill className="object-cover" priority />
            </div>
            <div className="leading-none">
              <span className="font-[family:var(--font-display)] text-xl text-[var(--foreground)]">
                Ma&apos;at
              </span>
              <span className="ml-2 text-xs text-[var(--muted)] tracking-widest uppercase">
                Compliance
              </span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-[var(--muted)]">
            <a href="#how" className="hover:text-[var(--foreground)] transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-[var(--foreground)] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[var(--foreground)] transition-colors">FAQ</a>
            <Link href="/analyze" className="primary-button px-5 py-2 text-sm">
              Analyze a document →
            </Link>
          </div>
          <Link href="/analyze" className="primary-button px-4 py-2 text-sm md:hidden">
            Analyze →
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,144,60,0.07)_0%,transparent_70%)]" />
          <div className="absolute bottom-[-5%] right-[5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(42,107,94,0.06)_0%,transparent_70%)]" />
        </div>

        <div className="page-shell relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold-line)] bg-[var(--gold-glow)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--gold)] mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] pulse-gold" />
              AI-powered compliance intelligence
            </div>

            <h1 className="font-[family:var(--font-display)] text-5xl md:text-7xl leading-[1.0] tracking-tight text-[var(--foreground)] mb-6">
              Stop guessing what{" "}
              <span className="text-[var(--gold)]">bureaucracy</span>{" "}
              actually wants from you.
            </h1>

            <p className="section-copy text-lg md:text-xl max-w-2xl mb-10">
              Ma&apos;at reads your legal notices, tax letters, and compliance requests — then tells you exactly what to do, by when, and what happens if you don&apos;t.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/analyze" className="primary-button text-base px-8 py-4">
                Analyze a document now →
              </Link>
              <a href="#how" className="secondary-button text-base px-8 py-4">
                See how it works
              </a>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-[var(--muted)]">
              {["Not legal advice", "No account required", "Results in under 60s", "PDF & text supported"].map((tag) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="text-[var(--gold)]">✦</span> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sample report preview */}
          <div className="mt-16 grid gap-3 md:grid-cols-4">
            {[
              { label: "Urgency", value: "High", sub: "deadline in 14 days", accent: "var(--danger)" },
              { label: "Actions", value: "3", sub: "concrete steps", accent: "var(--gold)" },
              { label: "Risks", value: "2", sub: "if ignored", accent: "#e07060" },
              { label: "Confidence", value: "Medium", sub: "from text pattern", accent: "var(--teal-2)" },
            ].map((stat) => (
              <div key={stat.label} className="data-card p-5 rounded-[var(--radius)]">
                <p className="field-label">{stat.label}</p>
                <p className="font-[family:var(--font-display)] text-2xl mt-2" style={{ color: stat.accent }}>
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ─── PROBLEM ─── */}
      <section className="py-24">
        <div className="page-shell">
          <div className="max-w-2xl mb-14">
            <p className="section-kicker mb-4">The real problem</p>
            <h2 className="font-[family:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)] leading-tight">
              Legal documents are designed for lawyers, not for you.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "⚖",
                title: "Dense language hides the real task",
                copy: "Jargon and references obscure what you actually need to do — and by when. Most people read three times and still aren't sure.",
              },
              {
                icon: "⏰",
                title: "Urgency is invisible until it's too late",
                copy: "Deadlines, fines, and escalation risks are buried in administrative language. You only notice them after the window has closed.",
              },
              {
                icon: "💸",
                title: "Misunderstanding is expensive",
                copy: "Wrong filing, missed response, incomplete answer. Each mistake can trigger penalties, delays, or a second round of bureaucracy.",
              },
            ].map((card) => (
              <div key={card.title} className="glass-panel rounded-[var(--radius-lg)] p-7">
                <span className="text-3xl">{card.icon}</span>
                <h3 className="font-semibold text-lg mt-4 mb-3 text-[var(--foreground)]">{card.title}</h3>
                <p className="text-sm leading-7 text-[var(--foreground-2)]">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-24">
        <div className="page-shell">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-kicker mb-4">How Ma&apos;at works</p>
              <h2 className="font-[family:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)] leading-tight mb-6">
                One document in. One clear report out.
              </h2>
              <p className="section-copy mb-10">
                No chat interface. No vague summaries. Ma&apos;at reads the document and returns a decision report structured for action — not for reading.
              </p>
              <div className="space-y-4">
                {[
                  { n: "01", title: "Paste text or upload a PDF", desc: "Drop your notice, tax letter, or any legal communication." },
                  { n: "02", title: "Ma'at interprets the document", desc: "The AI extracts obligations, urgency, deadlines, and risks." },
                  { n: "03", title: "Receive your action report", desc: "A structured report with what to do, when, and what's at stake." },
                  { n: "04", title: "Act with confidence", desc: "Copy actions, download the report, or seek professional review where flagged." },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5 items-start p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]">
                    <span className="font-[family:var(--font-display)] text-[var(--gold)] text-xl font-bold shrink-0 w-8">{step.n}</span>
                    <div>
                      <p className="font-semibold text-[var(--foreground)] text-sm">{step.title}</p>
                      <p className="text-xs text-[var(--foreground-2)] mt-1 leading-6">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-panel rounded-[var(--radius-lg)] p-6 border border-[var(--gold-line)]">
                <p className="section-kicker mb-4">Sample output</p>
                <div className="space-y-4">
                  <div className="rounded-[var(--radius-sm)] bg-[var(--danger-bg)] border border-[var(--danger-line)] px-4 py-3">
                    <p className="text-xs uppercase tracking-widest text-[#e07060] font-semibold mb-1">Urgency</p>
                    <p className="text-[var(--foreground)] font-semibold">High — deadline within 14 days</p>
                  </div>
                  <div className="data-card p-4">
                    <p className="field-label">What this means</p>
                    <p className="text-sm text-[var(--foreground-2)] mt-2 leading-6">
                      You have received a formal VAT compliance request. The authority requires your Q4 declaration and supporting documents within the stated period.
                    </p>
                  </div>
                  <div className="data-card p-4">
                    <p className="field-label">Actions</p>
                    <ul className="mt-2 space-y-2">
                      {[
                        "Prepare Q4 VAT declaration with all invoice records",
                        "Submit via the official tax portal before the deadline",
                        "Save confirmation of submission as evidence",
                      ].map((a) => (
                        <li key={a} className="flex gap-2 text-xs text-[var(--foreground-2)] leading-5">
                          <span className="text-[var(--gold)] mt-0.5 shrink-0">→</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ─── WHO IT'S FOR ─── */}
      <section className="py-24">
        <div className="page-shell">
          <div className="max-w-2xl mb-14">
            <p className="section-kicker mb-4">Who it serves</p>
            <h2 className="font-[family:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)] leading-tight">
              Built for people who handle compliance alone.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "✈",
                who: "Expats in Europe",
                copy: "Residency letters, municipality registrations, immigration notices, Anmeldung, tax obligations in a foreign language.",
              },
              {
                icon: "💼",
                who: "Freelancers & self-employed",
                copy: "VAT notices, income tax requests, insurance requirements, social security obligations — without an accountant on speed dial.",
              },
              {
                icon: "🚀",
                who: "Early-stage founders",
                copy: "Business compliance requests, regulatory filings, government correspondence — without a legal team to decode them.",
              },
            ].map((card) => (
              <div key={card.who} className="glass-panel rounded-[var(--radius-lg)] p-7 group hover:border-[var(--gold-line)] transition-colors">
                <span className="text-3xl">{card.icon}</span>
                <h3 className="font-[family:var(--font-display)] text-xl mt-4 mb-3 text-[var(--foreground)]">{card.who}</h3>
                <p className="text-sm leading-7 text-[var(--foreground-2)]">{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ─── WHAT IT DELIVERS ─── */}
      <section className="py-24">
        <div className="page-shell">
          <div className="max-w-2xl mb-14">
            <p className="section-kicker mb-4">Every report includes</p>
            <h2 className="font-[family:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)] leading-tight">
              Everything you need to act. Nothing you don&apos;t.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Plain-language summary", desc: "What the document is actually asking, without jargon." },
              { label: "Deadline & urgency level", desc: "How time-sensitive the situation is and when you need to act." },
              { label: "Concrete action list", desc: "Step-by-step: what to do, in order, right now." },
              { label: "Risks if ignored", desc: "What happens if you do nothing — fines, escalation, status impact." },
              { label: "Ambiguity flags", desc: "Where the text is unclear or where professional review makes sense." },
              { label: "Confidence indicator", desc: "Honest signal on how certain the interpretation is." },
            ].map((item) => (
              <div key={item.label} className="data-card p-5 rounded-[var(--radius)]">
                <p className="text-[var(--gold)] text-xs uppercase tracking-widest font-semibold mb-2">Output</p>
                <p className="font-semibold text-[var(--foreground)] mb-2">{item.label}</p>
                <p className="text-xs text-[var(--foreground-2)] leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-24">
        <div className="page-shell">
          <div className="max-w-xl mx-auto text-center mb-12">
            <p className="section-kicker mb-4">Pricing</p>
            <h2 className="font-[family:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)] leading-tight">
              Simple. One report, one price.
            </h2>
          </div>

          <div className="max-w-md mx-auto">
            <div className="glass-panel-raised rounded-[var(--radius-xl)] p-8 border border-[var(--gold-line)] text-center">
              <p className="field-label mb-4">Pay per analysis</p>
              <div className="flex items-end justify-center gap-1 mb-2">
                <span className="font-[family:var(--font-display)] text-6xl text-[var(--gold)]">€9</span>
                <span className="text-[var(--muted)] pb-2">per report</span>
              </div>
              <p className="text-sm text-[var(--foreground-2)] mb-8 leading-6">
                One structured action report — summary, urgency, actions, deadline, risks, and disclaimer. No subscription. No account required.
              </p>
              <Link href="/analyze" className="primary-button w-full text-base py-4 justify-center">
                Analyze your document →
              </Link>
              <p className="mt-4 text-xs text-[var(--muted)]">
                Credit packs and recurring compliance features coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24">
        <div className="page-shell max-w-3xl mx-auto">
          <p className="section-kicker mb-4 text-center">FAQ</p>
          <h2 className="font-[family:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)] leading-tight text-center mb-12">
            Common questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "Is this legal advice?",
                a: "No. Ma'at interprets and structures information to help you understand what a document is asking. It does not replace a licensed legal professional. The disclaimer is always explicit in every report.",
              },
              {
                q: "What types of documents can I analyze?",
                a: "Tax notices, residency and immigration letters, VAT requests, government compliance letters, insurance and payroll requirements, business registration notices — any text-based legal or regulatory communication.",
              },
              {
                q: "How accurate is the analysis?",
                a: "Ma'at uses a large language model to interpret documents. Accuracy depends on the quality and completeness of the input text. Every report includes a confidence indicator and ambiguity flags to guide you on when professional review is advisable.",
              },
              {
                q: "Is my document stored?",
                a: "No. Documents are processed ephemerally and not stored. Ma'at does not retain your text after the analysis is returned.",
              },
              {
                q: "Why pay per analysis instead of a subscription?",
                a: "Most people don't receive compliance notices daily. Pay-per-analysis means you only pay when you actually need clarity — no idle subscription charges.",
              },
            ].map((item) => (
              <details key={item.q} className="glass-panel rounded-[var(--radius)] p-5 group cursor-pointer">
                <summary className="list-none flex items-center justify-between font-semibold text-[var(--foreground)] select-none">
                  {item.q}
                  <span className="text-[var(--gold)] text-lg ml-4 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-sm text-[var(--foreground-2)] leading-7">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 mb-0">
        <div className="page-shell">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--gold-line)] bg-[var(--gold-glow)] px-8 py-14 text-center">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 subtle-grid opacity-30" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-40" />
            </div>
            <div className="relative">
              <p className="section-kicker mb-4">Ready to understand your document?</p>
              <h2 className="font-[family:var(--font-display)] text-4xl md:text-5xl text-[var(--foreground)] leading-tight mb-6 max-w-2xl mx-auto">
                Get your action report in under 60 seconds.
              </h2>
              <p className="section-copy max-w-xl mx-auto mb-8">
                Paste the text. Ma&apos;at does the rest.
              </p>
              <Link href="/analyze" className="primary-button text-base px-10 py-4">
                Analyze a document now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[var(--line)] py-8">
        <div className="page-shell flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <Image src="/maat.png" alt="Ma'at" width={20} height={20} className="opacity-60" />
            <span>Ma&apos;at — Compliance Simplifier</span>
          </div>
          <p>Not legal advice. Results do not replace a licensed professional.</p>
          <div className="flex gap-4">
            <a href="#faq" className="hover:text-[var(--foreground)] transition-colors">FAQ</a>
            <a href="#pricing" className="hover:text-[var(--foreground)] transition-colors">Pricing</a>
            <Link href="/analyze" className="hover:text-[var(--gold)] transition-colors">Analyze</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
