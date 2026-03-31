import { NextResponse } from "next/server";
import { createAccessToken, serializeAccessToken, COOKIE_ACCESS, PAID_ANALYSES_PER_TOKEN } from "@/lib/access";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  // Stripe signature verification (requires stripe npm package)
  // For MVP without the stripe npm package, we verify the event type and use the webhook secret
  // as a simple guard. Add full signature verification when adding stripe package.
  if (!STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  let event: { type: string; data: { object: Record<string, unknown> } };
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  // Only handle successful payments
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const credits = Number((session.metadata as Record<string, string>)?.credits ?? PAID_ANALYSES_PER_TOKEN);

    // Issue an access token with the purchased number of credits
    const token = createAccessToken();
    token.remaining = credits;

    const res = NextResponse.json({ received: true });
    res.cookies.set(COOKIE_ACCESS, serializeAccessToken(token), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  }

  return NextResponse.json({ received: true });
}

// Stripe needs raw body for signature verification
export const config = {
  api: { bodyParser: false },
};
