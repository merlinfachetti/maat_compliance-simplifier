import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { ComplianceAnalysis } from "@/lib/analysis";
import {
  COOKIE_FREE,
  COOKIE_ACCESS,
  parseAccessToken,
  serializeAccessToken,
} from "@/lib/access";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You are Ma'at, an expert compliance interpreter. Your role is to transform dense legal, regulatory, and bureaucratic documents into clear, actionable intelligence.

You respond ONLY with a valid JSON object — no markdown, no prose, no explanation outside the JSON structure.

The JSON must match this exact schema:
{
  "summary": "Plain-language explanation of what this document means and what is being asked. 2-4 sentences max.",
  "appliesTo": "Who this notice is addressed to or most relevant for. 1 sentence.",
  "urgency": "High" or "Medium" or "Low",
  "deadline": "The specific deadline extracted from the text, or 'No explicit deadline found' if none.",
  "actions": ["Action 1", "Action 2", "Action 3"],
  "risks": ["Risk 1 if ignored", "Risk 2 if applicable"],
  "nextStep": "The single most important thing to do right now. 1-2 sentences.",
  "ambiguities": ["Ambiguity or gap 1", "Ambiguity or gap 2"],
  "confidence": "Confidence level with brief reason.",
  "disclaimer": "Ma'at simplifies compliance language into structured actions. This is not legal advice and does not replace a licensed professional."
}

Rules:
- Be direct. If the document is clearly a tax notice, say so.
- Actions must be concrete ("Submit VAT declaration for Q4 via the tax portal" not "respond to the notice").
- Urgency is High if there is a deadline within 30 days, sanctions, or enforcement language.
- Extract the actual deadline text verbatim if present.
- ambiguities should flag what the user should verify professionally or what is unclear from the text alone.
- Never invent facts. If the text is ambiguous, say so in ambiguities.
- The disclaimer is always exactly: "Ma'at simplifies compliance language into structured actions. This is not legal advice and does not replace a licensed professional."`;

export async function POST(request: Request) {
  // ── Access control ──────────────────────────────────────
  const cookieStore = await cookies();
  const freeUsedCookie = cookieStore.get(COOKIE_FREE)?.value;
  const accessCookie = cookieStore.get(COOKIE_ACCESS)?.value;

  const freeAlreadyUsed = freeUsedCookie === "1";
  const accessToken = parseAccessToken(accessCookie);
  const hasPaidAccess = accessToken !== null && accessToken.remaining > 0;

  if (freeAlreadyUsed && !hasPaidAccess) {
    return NextResponse.json(
      {
        error: "free_limit_reached",
        message: "You have used your free analysis. Purchase a credit pack to continue.",
      },
      { status: 402 }
    );
  }

  // ── Validate input ───────────────────────────────────────
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "Analysis service is not configured." }, { status: 503 });
  }

  let body: {
    documentType?: string;
    sourceText?: string;
    region?: string;
    concern?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const sourceText = body.sourceText?.trim();
  if (!sourceText) {
    return NextResponse.json(
      { error: "Please paste or upload the document text to analyze." },
      { status: 400 }
    );
  }
  if (sourceText.length < 30) {
    return NextResponse.json(
      { error: "The text is too short. Please paste the full document." },
      { status: 400 }
    );
  }

  // ── Call Claude ──────────────────────────────────────────
  const userMessage = `Document type: ${body.documentType || "Unknown"}
Region/Country: ${body.region || "Not specified"}
User concern: ${body.concern || "Not specified"}

Document text:
"""
${sourceText.slice(0, 8000)}
"""

Analyze this document and return the structured JSON report.`;

  let analysis: ComplianceAnalysis;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1500,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      console.error("Anthropic API error:", response.status);
      return NextResponse.json(
        { error: "The analysis engine returned an error. Try again in a moment." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawText = data?.content?.[0]?.text ?? "";

    try {
      const cleaned = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      analysis = JSON.parse(cleaned);
    } catch {
      return NextResponse.json(
        { error: "The analysis could not be structured. Please try again." },
        { status: 500 }
      );
    }

    if (!analysis.summary || !analysis.urgency || !analysis.actions?.length) {
      return NextResponse.json(
        { error: "The analysis was incomplete. Please try again." },
        { status: 500 }
      );
    }

    const validUrgency = ["High", "Medium", "Low"];
    if (!validUrgency.includes(analysis.urgency)) analysis.urgency = "Medium";
  } catch (err) {
    console.error("Analysis route error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }

  // ── Deduct credit / mark free used ──────────────────────
  const res = NextResponse.json({ analysis });

  const cookieOpts = {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  };

  if (!freeAlreadyUsed) {
    // Mark free analysis as consumed
    res.cookies.set(COOKIE_FREE, "1", {
      ...cookieOpts,
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  } else if (accessToken) {
    // Decrement paid credit
    const updated = { ...accessToken, remaining: accessToken.remaining - 1 };
    res.cookies.set(COOKIE_ACCESS, serializeAccessToken(updated), {
      ...cookieOpts,
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return res;
}
