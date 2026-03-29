# Ma'at Compliance Simplifier

Ma'at is a focused compliance product that transforms dense legal and bureaucratic text into clear actions, deadlines, and risks for freelancers, expats, and small businesses.

## Current stage

This repository now contains:
- product documentation in [`docs/`](./docs)
- a Next.js app foundation for the MVP
- a first landing page
- an `/analyze` flow with a mocked analysis contract

## Getting started

Run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## MVP direction

The first version is intentionally focused:
- paste one document or notice
- understand what it means
- get actions, urgency, deadline, and risk
- keep the experience simple and fast

## Near-term roadmap

1. Replace the mocked analysis route with a real LLM integration
2. Add PDF text extraction
3. Add payment gating
4. Add production analytics and deployment flow

## Product references

- [Build roadmap](./docs/01_build_roadmap.md)
- [Compliance foundation](./docs/02_maat_compliance_foundation.md)
- [Execution plan](./docs/02_compliance_execution.md)
