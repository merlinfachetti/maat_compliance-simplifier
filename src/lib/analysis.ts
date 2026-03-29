export type UrgencyLevel = "High" | "Medium" | "Low";

export type ComplianceAnalysis = {
  summary: string;
  appliesTo: string;
  urgency: UrgencyLevel;
  deadline: string;
  actions: string[];
  risks: string[];
  nextStep: string;
  ambiguities: string[];
  confidence: string;
  disclaimer: string;
};

export type AnalyzeInput = {
  documentType: string;
  sourceText: string;
  region: string;
  concern: string;
};

export const documentTypes = [
  "Tax notice",
  "Residency or visa notice",
  "Business compliance request",
  "Government letter",
  "Insurance or payroll requirement",
  "Something else",
];

export const sampleAnalysis: ComplianceAnalysis = {
  summary:
    "This looks like a formal notice asking the recipient to complete a compliance-related action, likely with supporting documents and a response deadline.",
  appliesTo:
    "Freelancers, expats, or small businesses who received a request from a public authority, tax office, or regulated service provider.",
  urgency: "High",
  deadline: "Within 14 days from the notice date",
  actions: [
    "Confirm who issued the notice and which legal or administrative reference it mentions.",
    "Collect the documents or confirmations requested before the response window closes.",
    "Reply using the official channel mentioned in the notice and keep evidence of submission.",
  ],
  risks: [
    "Missed deadlines can trigger penalties, service interruption, or escalation to a formal review.",
    "Submitting incomplete information can create a second notice and delay resolution.",
  ],
  nextStep:
    "Turn the notice into a short response checklist and verify the exact submission path before sending anything.",
  ambiguities: [
    "The legal basis and exact deadline should still be checked against the original document.",
    "If the notice includes sanctions, appeal language, or immigration status impacts, professional review is safer.",
  ],
  confidence: "Medium confidence until the sender, jurisdiction, and original deadline are confirmed.",
  disclaimer:
    "Ma'at explains obligations in plain language, but it does not provide legal advice or replace a licensed professional.",
};

function extractDeadline(text: string) {
  const withinDaysMatch = text.match(/\bwithin\s+(\d{1,3})\s+days\b/i);
  if (withinDaysMatch) {
    return `Within ${withinDaysMatch[1]} days from the document date`;
  }

  const slashDateMatch = text.match(/\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/);
  if (slashDateMatch) {
    return slashDateMatch[0];
  }

  const writtenDateMatch = text.match(
    /\b\d{1,2}\s+(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{4}\b/i,
  );
  if (writtenDateMatch) {
    return writtenDateMatch[0];
  }

  return "No explicit deadline detected automatically";
}

function detectUrgency(text: string): UrgencyLevel {
  if (
    /(urgent|final notice|fine|penalty|suspension|termination|enforcement|breach|within\s+\d{1,3}\s+days)/i.test(
      text,
    )
  ) {
    return "High";
  }

  if (/(must|required|submit|renewal|tax|residency|compliance)/i.test(text)) {
    return "Medium";
  }

  return "Low";
}

function buildSummary(documentType: string, region: string, text: string) {
  if (/tax|vat|fiscal|declaration/i.test(text) || documentType === "Tax notice") {
    return `This appears to be a tax-related compliance message${
      region ? ` connected to ${region}` : ""
    }, likely asking for a filing, correction, or response.`;
  }

  if (
    /visa|residence|permit|immigration|municipality|registration/i.test(text) ||
    documentType === "Residency or visa notice"
  ) {
    return `This looks like an administrative notice about residency, registration, or immigration status${
      region ? ` in ${region}` : ""
    }.`;
  }

  if (/insurance|social security|payroll|employment/i.test(text)) {
    return `This appears to concern a workforce, payroll, or insurance obligation${
      region ? ` in ${region}` : ""
    }.`;
  }

  return `This looks like a formal compliance communication${
    region ? ` tied to ${region}` : ""
  } that requires a response, confirmation, or supporting documents.`;
}

function buildRisks(text: string) {
  const risks = new Set<string>();

  if (/(fine|penalty|late fee)/i.test(text)) {
    risks.add("The document may carry financial penalties if you miss the required action.");
  }

  if (/(visa|residence|permit|immigration)/i.test(text)) {
    risks.add("Ignoring this could affect residency status, renewals, or future administrative approvals.");
  }

  if (/(tax|vat|declaration|fiscal)/i.test(text)) {
    risks.add("Tax notices can escalate into additional scrutiny, fees, or frozen processes if not answered properly.");
  }

  if (risks.size === 0) {
    risks.add("If the request is ignored, the sender may escalate the matter or assume non-compliance.");
  }

  risks.add("If key facts are misunderstood, you may respond incorrectly or miss an important exception.");

  return Array.from(risks);
}

function buildActions(input: AnalyzeInput, urgency: UrgencyLevel, deadline: string) {
  const actions = [
    "Verify the sender, case number, and the exact obligation described in the document.",
    "List the evidence or documents you may need before responding.",
    `Prepare your reply around the deadline: ${deadline}.`,
  ];

  if (input.concern.trim()) {
    actions.push(`Review this concern first: ${input.concern.trim()}.`);
  }

  if (urgency === "High") {
    actions.push("Treat this as time-sensitive and avoid waiting for the last day to act.");
  }

  return actions;
}

export function buildMockAnalysis(input: AnalyzeInput): ComplianceAnalysis {
  const normalizedText = input.sourceText.trim();
  const deadline = extractDeadline(normalizedText);
  const urgency = detectUrgency(normalizedText);

  return {
    summary: buildSummary(input.documentType, input.region, normalizedText),
    appliesTo:
      input.documentType === "Residency or visa notice"
        ? "Most relevant for expats, residents, or founders handling relocation bureaucracy alone."
        : "Most relevant for freelancers, solo operators, and small teams managing compliance without legal support.",
    urgency,
    deadline,
    actions: buildActions(input, urgency, deadline),
    risks: buildRisks(normalizedText),
    nextStep:
      urgency === "High"
        ? "Turn this into a same-day checklist and validate the submission route before sending anything."
        : "Convert the notice into a practical checklist, then confirm any unclear legal references.",
    ambiguities: [
      "The exact legal meaning still depends on the sender, jurisdiction, and full original text.",
      "If the document contains sanctions, appeal rights, or immigration consequences, professional review is recommended.",
    ],
    confidence:
      normalizedText.length > 280
        ? "Medium confidence from the text pattern and detected obligations."
        : "Low-to-medium confidence because the input is still short or missing context.",
    disclaimer:
      "Ma'at simplifies complex compliance language into actions and risks. It does not provide legal advice.",
  };
}
