import { NextResponse } from "next/server";
import { buildMockAnalysis } from "@/lib/analysis";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    documentType?: string;
    sourceText?: string;
    region?: string;
    concern?: string;
  };

  if (!body.sourceText?.trim()) {
    return NextResponse.json(
      { error: "Please paste the text you want Ma'at to analyze." },
      { status: 400 },
    );
  }

  const analysis = buildMockAnalysis({
    documentType: body.documentType?.trim() || "Something else",
    sourceText: body.sourceText,
    region: body.region?.trim() || "",
    concern: body.concern?.trim() || "",
  });

  return NextResponse.json({ analysis });
}
