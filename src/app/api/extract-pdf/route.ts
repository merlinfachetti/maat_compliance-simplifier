import { NextResponse } from "next/server";
import * as pdfParseModule from "pdf-parse";

// pdf-parse may export as default or named; handle both
const pdfParse = (pdfParseModule as unknown as { default?: (b: Buffer) => Promise<{ text: string; numpages: number }> }).default ?? (pdfParseModule as unknown as (b: Buffer) => Promise<{ text: string; numpages: number }>);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are supported." },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdfParse(buffer);
    const text = data.text?.trim();

    if (!text || text.length < 20) {
      return NextResponse.json(
        { error: "Could not extract readable text from this PDF. It may be scanned or image-only." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      text: text.slice(0, 12000),
      pages: data.numpages,
      chars: text.length,
    });
  } catch (err) {
    console.error("PDF extraction error:", err);
    return NextResponse.json(
      { error: "Failed to read the PDF. Please try a different file or paste the text directly." },
      { status: 500 }
    );
  }
}
