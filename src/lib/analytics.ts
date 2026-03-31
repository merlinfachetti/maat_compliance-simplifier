/**
 * Lightweight analytics — fires to Vercel Analytics (if enabled) and logs to
 * a simple internal endpoint for custom event capture.
 *
 * No external SDK needed for the MVP. Vercel Analytics is enabled by adding
 * @vercel/analytics to the project and <Analytics /> to layout.tsx.
 *
 * Events tracked:
 *   - analysis_started    { documentType, region, mode: paste|upload }
 *   - analysis_success    { urgency, documentType }
 *   - analysis_gated      { } — user hit free limit
 *   - checkout_started    { product: single|pack5 }
 *   - payment_success     { product }
 *   - pdf_uploaded        { pages }
 */

export type AnalyticsEvent =
  | { name: "analysis_started"; props: { documentType: string; mode: string } }
  | { name: "analysis_success"; props: { urgency: string; documentType: string } }
  | { name: "analysis_gated"; props: Record<string, never> }
  | { name: "checkout_started"; props: { product: string } }
  | { name: "payment_success"; props: { product: string } }
  | { name: "pdf_uploaded"; props: { pages: number } };

/** Call this from client components */
export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;

  // Vercel Analytics — available if @vercel/analytics is installed
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const va = (window as any).va;
    if (typeof va === "function") {
      va("event", { name: event.name, ...event.props });
    }
  } catch {
    // not critical
  }

  // Console in dev
  if (process.env.NODE_ENV !== "production") {
    console.log(`[analytics] ${event.name}`, event.props);
  }
}
