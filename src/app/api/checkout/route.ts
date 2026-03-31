import { NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

/**
 * Creates a Stripe Checkout session.
 * Products:
 *   - single: €9 — 1 analysis (used for first-time buyers)
 *   - pack5:  €29 — 5 analyses
 */
export async function POST(request: Request) {
  if (!STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Payments are not configured." }, { status: 503 });
  }

  const host = request.headers.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  let body: { product?: string } = {};
  try {
    body = await request.json();
  } catch {
    // default to single
  }

  const product = body.product === "pack5" ? "pack5" : "single";

  // Stripe price config — replace with your real price IDs after creating them in the dashboard
  const priceConfig = {
    single: {
      unit_amount: 900, // €9.00
      name: "Ma'at — 1 Compliance Analysis",
      metadata: { credits: "1" },
    },
    pack5: {
      unit_amount: 2900, // €29.00
      name: "Ma'at — 5 Analysis Credit Pack",
      metadata: { credits: "5" },
    },
  };

  const cfg = priceConfig[product];

  try {
    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "payment_method_types[]": "card",
        "line_items[0][price_data][currency]": "eur",
        "line_items[0][price_data][unit_amount]": String(cfg.unit_amount),
        "line_items[0][price_data][product_data][name]": cfg.name,
        "line_items[0][quantity]": "1",
        mode: "payment",
        success_url: `${baseUrl}/analyze?payment=success`,
        cancel_url: `${baseUrl}/analyze?payment=cancelled`,
        "metadata[product]": product,
        "metadata[credits]": cfg.metadata.credits,
      }),
    });

    const session = await stripeRes.json();

    if (!stripeRes.ok || !session.url) {
      console.error("Stripe error:", session);
      return NextResponse.json(
        { error: "Could not create payment session." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Payment service unavailable." }, { status: 500 });
  }
}
