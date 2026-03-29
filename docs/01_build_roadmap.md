# Ma'at Compliance — Product and Build Roadmap

## 1. Product understanding

### Core problem
People who deal with bureaucracy, regulations, legal notices, tax guidance, and compliance obligations often receive dense documents they do not understand quickly enough. The cost of misunderstanding is high: missed deadlines, fines, wrong filings, or paralysis.

### Core solution
Ma'at transforms complex legal or regulatory text into:
- a plain-language summary
- practical obligations
- risk level
- deadlines
- next actions

### Primary users for MVP
- Expats in Europe dealing with government or residency bureaucracy
- Freelancers receiving tax or regulatory communication
- Early-stage founders and micro-businesses handling compliance alone

### What the product is
- An AI-powered compliance simplifier
- A fast interpretation layer
- A decision-support interface

### What the product is not
- Not legal advice
- Not a document vault
- Not a full case-management system


## 2. Best MVP direction

The strongest MVP is not "all compliance for everyone".

The best first version is:

**Upload or paste one bureaucratic/legal text and receive one structured action report in less than 60 seconds.**

That keeps the value immediate, clear, and easy to monetize.

### MVP promise
"Understand what this document means, what you need to do, and what can go wrong if you ignore it."

### MVP output
- Summary in plain language
- Who this applies to
- What the user needs to do now
- Deadline or urgency
- Risk if ignored
- Suggested next steps
- Mandatory disclaimer


## 3. UX principles

The experience should feel calm, focused, and low-cognitive-load.

### UX rules
- One primary job per screen
- No legal jargon unless translated immediately
- Show progress clearly
- Always explain urgency visually
- Keep the final report scannable before making it detailed
- Never make users guess whether the result is advice or interpretation

### Ideal user feeling
- "I finally understand this"
- "I know what to do next"
- "This saved me time and anxiety"


## 4. Core user flow

### Flow 1: Landing to conversion
1. User lands on homepage
2. User understands the promise in under 5 seconds
3. User sees example output
4. User clicks primary CTA
5. User uploads or pastes text
6. User receives report
7. User pays before or after report access, depending on the pricing experiment

### Flow 2: Document analysis
1. User selects input mode: paste text or upload file
2. System extracts readable text
3. System analyzes content with structured AI prompt
4. System returns report in a clean, sectioned layout
5. User can copy actions or download report

### Flow 3: Trust and safety
1. User sees disclaimer before submission
2. User sees disclaimer again in output
3. Output includes confidence and ambiguity notes when needed


## 5. Recommended product scope by phase

### Phase 1: Validation MVP
Goal: prove people want the outcome and will pay for it.

Build only:
- Landing page
- Input box and file upload
- AI analysis pipeline
- Structured report UI
- Disclaimer handling
- Basic pricing/paywall experiment
- Lightweight analytics

Do not build yet:
- User accounts
- Saved history
- Complex dashboards
- Multi-country rules engine
- Team features
- Admin panel

### Phase 2: Trust and quality upgrade
Goal: improve reliability and reduce vague outputs.

Add:
- Analysis templates by document type
- Better extraction for PDFs
- Confidence signals
- "Need professional review" flag
- Prompt evaluations with test samples

### Phase 3: Monetization and retention
Goal: move from one-off utility to recurring value.

Add:
- Credit bundles or subscription
- Saved reports
- Follow-up reminders
- Repeat compliance checklist

### Phase 4: Durable product moat
Goal: become an ongoing compliance assistant.

Add:
- Country-specific guidance templates
- Recurring obligations tracker
- User workspace
- Business profile memory


## 6. Recommended technical architecture for the first build

Because the repository is still greenfield, the best setup is a simple web app with a fast iteration loop.

### Suggested stack
- Frontend: Next.js
- Styling: Tailwind CSS
- AI orchestration: server route calling an LLM API
- Parsing:
  - plain text input first
  - PDF extraction second
- Payments:
  - Stripe or manual payment gate in the first experiment
- Analytics:
  - simple event tracking

### Why this stack
- Fast to ship
- Easy deployment
- Good UX performance
- Supports a clean landing page plus app flow in one project
- Lets us add auth and storage later without rebuilding everything

### MVP architecture
Landing Page -> Analyze Flow -> Text Extraction -> Prompt Builder -> LLM -> Structured JSON -> Report UI


## 7. Output design recommendation

The report should not look like a chatbot transcript.
It should look like a decision document.

### Recommended report sections
1. What this means
2. What you need to do now
3. Deadline and urgency
4. Risks if ignored
5. Suggested next step
6. Ambiguities or missing context
7. Disclaimer

### Visual priority
- Top: urgency, actions, deadline
- Middle: summary and explanation
- Bottom: nuance, ambiguity, disclaimer


## 8. Monetization recommendation

For the first version, keep it simple.

### Best initial model
- Pay per analysis

### Good pricing experiments
- One free sample output preview + paid full report
- Fixed low-ticket analysis
- Small pack of credits

### Avoid initially
- Complex subscription plans
- Multi-tier enterprise pricing


## 9. Execution roadmap

### Step 1
Define the exact MVP promise and narrow the initial niche.

Target recommendation:
- expats + freelancers dealing with bureaucracy in Europe

### Step 2
Define the input and output contract.

We should decide:
- accepted input types
- maximum file size
- JSON schema for AI output
- disclaimer copy

### Step 3
Build the product skeleton.

Includes:
- landing page
- analysis page
- report page
- API route for analysis

### Step 4
Build the AI core.

Includes:
- prompt design
- structured output schema
- fallback handling
- ambiguity warnings

### Step 5
Design the report UX.

Includes:
- hierarchy
- urgency cards
- action checklist
- copy and download options

### Step 6
Add monetization.

Includes:
- payment decision point
- usage limits
- event tracking

### Step 7
Deploy and validate.

Includes:
- production deploy
- first sample cases
- feedback loop
- first outreach


## 10. Concrete build sequence for us

This is the sequence I recommend we follow together:

1. Confirm product framing and MVP scope
2. Scaffold the app
3. Build landing page
4. Build analysis input flow
5. Build AI analysis route
6. Build structured result page
7. Add disclaimers and trust layer
8. Add pricing experiment
9. Deploy
10. Iterate using real user feedback


## 11. Immediate recommendation

The smartest next move is:

**Start with a focused MVP web app that analyzes pasted text first, then add PDF upload right after the base experience is working.**

This reduces complexity, speeds up shipping, and helps validate the real value: clarity and actionability.


## 12. Definition of success for version 1

Version 1 succeeds if:
- a first-time user understands the value instantly
- they can submit a document in under 1 minute
- the output is more useful than the original text
- the report feels actionable, not generic
- at least some users are willing to pay for the result
