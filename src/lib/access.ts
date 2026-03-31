/**
 * Access control for Ma'at analyses.
 *
 * Strategy:
 *   - 1 free analysis per browser session (cookie-based)
 *   - After free use: Stripe checkout required
 *   - On successful payment: access token issued (cookie, 30-day TTL)
 *   - Each paid token allows N analyses (default: 5)
 *
 * This runs server-side only (Next.js route handlers).
 */

export const FREE_ANALYSES_PER_SESSION = 1;
export const PAID_ANALYSES_PER_TOKEN = 5;
export const ANALYSIS_PRICE_EUR = 9;

export const COOKIE_FREE = "maat_free_used";
export const COOKIE_ACCESS = "maat_access";

export type AccessToken = {
  /** UUID issued after payment */
  id: string;
  /** How many analyses remain */
  remaining: number;
  /** ISO expiry */
  expiresAt: string;
};

/** Parse the access cookie value */
export function parseAccessToken(raw: string | undefined): AccessToken | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
    if (!parsed.id || typeof parsed.remaining !== "number") return null;
    if (new Date(parsed.expiresAt) < new Date()) return null;
    return parsed as AccessToken;
  } catch {
    return null;
  }
}

/** Serialize an access token for the cookie */
export function serializeAccessToken(token: AccessToken): string {
  return Buffer.from(JSON.stringify(token), "utf8").toString("base64");
}

/** Create a fresh access token */
export function createAccessToken(): AccessToken {
  const exp = new Date();
  exp.setDate(exp.getDate() + 30);
  return {
    id: crypto.randomUUID(),
    remaining: PAID_ANALYSES_PER_TOKEN,
    expiresAt: exp.toISOString(),
  };
}
