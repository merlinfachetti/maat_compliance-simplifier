import Image from "next/image";
import Link from "next/link";
import { ReportPanel } from "@/components/report-panel";
import { sampleAnalysis } from "@/lib/analysis";

export default function Home() {
  const problemPoints = [
    {
      title: "Dense legal language hides the real task",
      copy: "People often receive a notice full of jargon but still do not know what they need to do today, tomorrow, or this week.",
    },
    {
      title: "Urgency is unclear until it is too late",
      copy: "Deadlines, sanctions, and escalation risks are easy to miss when buried inside bureaucratic language and administrative references.",
    },
    {
      title: "The cost of misunderstanding is high",
      copy: "A missed response, wrong filing, or incomplete answer can trigger penalties, delays, or a second round of bureaucracy.",
    },
  ];

  const deliverables = [
    {
      title: "Plain-language summary",
      copy: "Explains what the document means without forcing the user to decode legal wording first.",
    },
    {
      title: "Immediate actions",
      copy: "Shows what needs to be done now, in order, with the practical next step clearly visible.",
    },
    {
      title: "Deadline and urgency",
      copy: "Highlights time sensitivity so the user can prioritize correctly instead of guessing.",
    },
    {
      title: "Risk if ignored",
      copy: "Makes the consequence of inaction explicit, which is often the main source of anxiety.",
    },
    {
      title: "Ambiguity flags",
      copy: "Calls out where the text is incomplete, unclear, or risky enough to deserve professional review.",
    },
    {
      title: "Trust layer",
      copy: "Keeps the output honest with disclaimers and clear boundaries around what the product does not claim.",
    },
  ];

  const steps = [
    "User pastes text or uploads a notice",
    "Ma'at extracts the real obligation, urgency, and possible deadline",
    "The system returns one structured report instead of a chat transcript",
    "The user leaves knowing what to do next and where professional help may still be needed",
  ];

  const whatItIs = [
    "A compliance simplifier for legal and bureaucratic text",
    "An action-first interpretation layer",
    "A product designed to reduce confusion, delay, and paralysis",
  ];

  const whatItIsNot = [
    "Not a law firm",
    "Not legal advice",
    "Not a document storage vault in the MVP",
    "Not a full compliance management suite on day one",
  ];

  const useCases = [
    "Freelancers reading tax, VAT, insurance, or registration notices",
    "Expats receiving residency, municipality, or immigration-related letters",
    "Founders and micro-businesses handling compliance without internal legal support",
  ];

  const faqItems = [
    {
      question: "What problem does Ma'at solve?",
      answer:
        "It solves the moment when someone receives a dense legal or regulatory message and cannot quickly tell what it means, what to do now, how urgent it is, and what may happen if they ignore it.",
    },
    {
      question: "What does the product actually deliver?",
      answer:
        "A structured action report with summary, urgency, deadline, actions, risks, ambiguity notes, and a clear disclaimer.",
    },
    {
      question: "Is this legal advice?",
      answer:
        "No. Ma'at is designed to simplify and structure information, not replace a licensed professional. The product must always be explicit about this boundary.",
    },
    {
      question: "Who is the first version built for?",
      answer:
        "The MVP is strongest for expats, freelancers, and very small businesses dealing with bureaucracy and compliance alone.",
    },
    {
      question: "Why start with pay-per-analysis?",
      answer:
        "Because the fastest signal is whether someone will pay for immediate clarity in a high-stakes moment. A simple transaction is better than a complex subscription model in the first validation phase.",
    },
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
              <a href="#problem">Problem</a>
              <a href="#solution">Solution</a>
              <a href="#works">How it works</a>
              <a href="#faq">FAQ</a>
              <a href="#pricing">Pricing</a>
              <Link href="/analyze" className="primary-button px-5 py-2.5">
                Open product
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
                Understand the notice before it becomes a mistake.
              </h1>
              <p className="section-copy mt-6 max-w-2xl">
                Ma&apos;at helps people who receive legal, regulatory, or bureaucratic text
                and need clarity fast. Instead of forcing users to decode jargon, the
                product turns the document into a structured report with meaning, urgency,
                actions, deadlines, and risk.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/analyze" className="primary-button">
                  Go to product
                </Link>
                <a href="#solution" className="secondary-button">
                  Understand the offer
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                <span className="rounded-full border border-[var(--line)] bg-[rgba(255,251,246,0.76)] px-4 py-2">
                  Not legal advice
                </span>
                <span className="rounded-full border border-[var(--line)] bg-[rgba(255,251,246,0.76)] px-4 py-2">
                  Action-first output
                </span>
                <span className="rounded-full border border-[var(--line)] bg-[rgba(255,251,246,0.76)] px-4 py-2">
                  Clear scope and limits
                </span>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="data-card p-4">
                  <p className="text-3xl font-semibold">Meaning</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    what the notice is really asking for
                  </p>
                </div>
                <div className="data-card p-4">
                  <p className="text-3xl font-semibold">Priority</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    what must be done now and by when
                  </p>
                </div>
                <div className="data-card p-4">
                  <p className="text-3xl font-semibold">Trust</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    honest scope, risk, and escalation signals
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
                      &quot;I received an official notice, I am not fully sure what it means,
                      and I need to know what happens if I do nothing.&quot;
                    </p>
                  </div>
                </div>
              </div>
              <ReportPanel analysis={sampleAnalysis} />
            </div>
          </div>
        </section>

        <section id="problem" className="mt-20">
          <div className="max-w-3xl">
            <p className="section-kicker">The problem</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              Bureaucracy is expensive when it is confusing.
            </h2>
            <p className="section-copy mt-5">
              Most users are not looking for a legal platform. They are looking for fast
              orientation in a high-stakes moment. The real pain is not just the document.
              It is the uncertainty around what to do, how urgent it is, and what the risk
              of inaction might be.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {problemPoints.map((item) => (
              <article key={item.title} className="glass-panel rounded-[2rem] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Pain point
                </p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="solution" className="mt-20">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-panel rounded-[2rem] p-6 md:p-8">
              <p className="section-kicker">What the product is</p>
              <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
                A focused layer of interpretation and action.
              </h2>
              <ul className="mt-8 space-y-4">
                {whatItIs.map((item) => (
                  <li
                    key={item}
                    className="rounded-[1.5rem] border border-[var(--line)] bg-[rgba(255,251,246,0.72)] px-5 py-4 text-sm leading-7 text-[var(--foreground)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-[2rem] p-6 md:p-8">
              <p className="section-kicker">What the product is not</p>
              <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
                Clear boundaries create trust.
              </h2>
              <ul className="mt-8 space-y-4">
                {whatItIsNot.map((item) => (
                  <li
                    key={item}
                    className="rounded-[1.5rem] border border-[rgba(180,87,63,0.18)] bg-[rgba(180,87,63,0.06)] px-5 py-4 text-sm leading-7 text-[var(--foreground)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="max-w-3xl">
            <p className="section-kicker">What it delivers</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              The value is not the AI. The value is clarity with direction.
            </h2>
            <p className="section-copy mt-5">
              Ma&apos;at should answer the questions users actually have in the moment of
              stress: What does this mean? What do I need to do? How urgent is it? What
              happens if I ignore it? Where is the uncertainty?
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {deliverables.map((item) => (
              <article key={item.title} className="glass-panel rounded-[2rem] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Output
                </p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="works" className="mt-20 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <p className="section-kicker">How it works</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              One path in, one clear report out.
            </h2>
            <div className="mt-8 space-y-4">
              {steps.map((step, index) => (
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
            <p className="section-kicker">Who it serves best</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              Built for people who have to act, not just browse.
            </h2>
            <ul className="mt-8 space-y-4">
              {useCases.map((audience) => (
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
                <p className="section-kicker">Commercial logic</p>
                <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
                  Start simple: one useful answer, one paid moment.
                </h2>
                <p className="section-copy mt-5 max-w-2xl">
                  The first goal is to validate whether users will pay for immediate clarity
                  in a high-stakes moment. Complex subscriptions and heavy dashboards can
                  come later, after the value is proven.
                </p>
              </div>

              <div className="data-card p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  Initial pricing hypothesis
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

        <section id="faq" className="mt-20">
          <div className="max-w-3xl">
            <p className="section-kicker">FAQ</p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
              The landing page should remove uncertainty before the user clicks.
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="glass-panel rounded-[1.8rem] p-6">
                <summary className="cursor-pointer list-none text-lg font-semibold">
                  {item.question}
                </summary>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2.5rem] border border-[var(--line)] bg-[rgba(25,53,43,0.96)] px-6 py-10 text-[#f6efe4] md:px-10 md:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="section-kicker text-[rgba(246,239,228,0.68)]">
                Ready to explore the product
              </p>
              <h2 className="mt-4 font-[family:var(--font-display)] text-5xl leading-none">
                The landing explains the promise. The product shows the experience.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[rgba(246,239,228,0.74)]">
                This page is here to qualify the click. The `/analyze` flow is where the
                user experiences the product logic directly and sees how Ma&apos;at turns a
                confusing notice into an action report.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/analyze"
                className="primary-button bg-[#f6efe4] text-[var(--primary)]"
              >
                Open product
              </Link>
              <a
                href="#faq"
                className="secondary-button border-white/15 bg-white/6 text-[#f6efe4]"
              >
                Review FAQ
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
