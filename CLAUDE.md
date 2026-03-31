# Ma'at Compliance — Engineering Context

## Architecture
Next.js 16 App Router · Tailwind CSS v4 · TypeScript strict

## Key routes
| Route | Purpose |
|---|---|
| `/` | Landing page (LP) |
| `/analyze` | Main product — input + report |
| `/api/analyze` | POST: calls Claude Sonnet, returns ComplianceAnalysis JSON |
| `/api/extract-pdf` | POST: multipart/form-data, returns extracted text |
| `/api/checkout` | POST: creates Stripe Checkout session |
| `/api/webhook` | POST: Stripe webhook → issues access cookie |
| `/api/check-access` | GET: returns current access status for client |

## Access control
Cookie-based, server-enforced:
- `maat_free_used=1` — 1 free analysis consumed
- `maat_access=<base64 JSON>` — paid token with `remaining` credits

## Monetization
- €9 single analysis · €29 for 5-pack
- Access gate at `/api/analyze`: 402 → client shows `<PaywallGate />`
- Stripe Checkout → webhook → cookie issued

## Environment variables
See `.env.example`

## Design tokens
All in `src/app/globals.css` under `:root`. Dark Egyptian theme:
- `--bg`: #0d0f0e  
- `--gold`: #c9903c  
- `--teal`: #2a6b5e
- Fonts: Playfair Display (display) · DM Sans (body)

## Analytics
`src/lib/analytics.ts` — `track()` fires to Vercel Analytics.
Events: analysis_started, analysis_success, analysis_gated, checkout_started, pdf_uploaded

## Development
```bash
cp .env.example .env.local
# fill in ANTHROPIC_API_KEY at minimum
npm install
npm run dev
```

## Deployment
Push to `main` → Vercel auto-deploys (GitHub integration required).
Set env vars in Vercel dashboard before first deploy.
