# SENTINEL — System Architecture
# Feed order: 2nd
# Every statement is a requirement. Nothing here is a suggestion.

---

## Product Statement

SENTINEL is a real-time AI security middleware that intercepts prompt injection
attacks before they reach an AI agent.

One-line answer: "We stop hackers from hijacking your AI agents. One line of code."

---

## Detection Pipeline

```
Layer 1:  HuggingFace Inference API
          protectai/deberta-v3-base-prompt-injection-v2
          Library: httpx (async), Timeout: 8s
          Output: INJECTION score, float 0.0–1.0, clamped to [0,1]
          On failure: return THREAT + FALLBACK_REPORT, skip Layer 2

Layer 2:  Google Gemini Flash (gemini-1.5-flash)
          Library: google-generativeai
          Trigger: injection_score >= 0.75 only
          Output: JSON with 5 fields
          On failure: return THREAT + FALLBACK_REPORT

Fallback: Deterministic Python dict — identical shape to real Layer 2 output
          Used when either layer fails for any reason
```

BANNED runtime imports: anthropic, openai, cohere, mistral. No exceptions.

---

## Application Routes

```
/            → pages/LandingPage.jsx
/loading     → pages/LoadingScreen.jsx  (3.2s boot animation → navigate /dashboard)
/dashboard   → pages/Dashboard.jsx
```

No other routes exist. Do not create any others.

---

## Tech Stack

```
FRONTEND
  React 18 (plain JSX — no TypeScript)
  Vite
  react-router-dom v6
  framer-motion
  axios
  @supabase/supabase-js
  Tailwind CSS via CDN in index.html (no PostCSS, no config file)
  Google Fonts via CDN in index.html (IBM Plex Mono + DM Sans)
  Deploy: Vercel

BACKEND
  fastapi
  uvicorn[standard]
  httpx
  google-generativeai
  supabase
  python-dotenv
  pydantic
  Deploy: Render (free tier)

DATABASE
  Supabase PostgreSQL — one table: reports
```

---

## Complete Folder Structure

```
sentinel/
├── 00-session-primer.md
├── architecture.md
├── api-contracts.md
├── ui-design.md
├── build-plan.md
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── Procfile
│   ├── .env                    ← NEVER commit
│   ├── .gitignore
│   └── routes/
│       ├── __init__.py
│       ├── scan.py
│       ├── reports.py
│       └── health.py
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── vercel.json
│   ├── .env                    ← NEVER commit
│   ├── .env.production         ← NEVER commit
│   ├── .gitignore
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── ErrorBoundary.jsx
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   ├── LoadingScreen.jsx
│       │   └── Dashboard.jsx
│       ├── components/
│       │   ├── landing/
│       │   │   ├── NavbarLanding.jsx
│       │   │   ├── GlobeHero.jsx
│       │   │   ├── LayerDiagram.jsx
│       │   │   ├── IntegrationCards.jsx
│       │   │   └── MarketProof.jsx
│       │   └── dashboard/
│       │       ├── NavbarDashboard.jsx
│       │       ├── DemoBanner.jsx
│       │       ├── MetricCards.jsx
│       │       ├── GlobeBackground.jsx
│       │       ├── ScanInput.jsx
│       │       ├── DemoPayloadButtons.jsx
│       │       ├── LayerAnimation.jsx
│       │       ├── ResultCard.jsx
│       │       ├── ForensicReport.jsx
│       │       ├── AttackFeed.jsx
│       │       └── PreviousReports.jsx
│       ├── hooks/
│       │   ├── useScanner.js
│       │   ├── useAttackLog.js
│       │   └── useReports.js
│       ├── data/
│       │   └── payloads.js
│       └── styles/
│           └── globals.css
│
├── testing/
│   ├── demo-capture.spec.js
│   └── component-tests.spec.js
│
└── sentinel-sdk/
    ├── index.js
    └── README.md
```

No files outside this list are created.

---

## Environment Variables

```
backend/.env
  HF_TOKEN=hf_...
  GEMINI_API_KEY=AIza...
  SUPABASE_URL=https://xxx.supabase.co
  SUPABASE_KEY=eyJ...

frontend/.env
  VITE_API_URL=http://localhost:8000
  VITE_SUPABASE_URL=https://xxx.supabase.co
  VITE_SUPABASE_KEY=eyJ...

frontend/.env.production
  VITE_API_URL=https://sentinel-api.onrender.com
  VITE_SUPABASE_URL=https://xxx.supabase.co
  VITE_SUPABASE_KEY=eyJ...
```

Variable names are frozen. Do not rename them.

---

## Supabase Schema

Run once in Supabase SQL Editor before Phase 1:

```sql
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  verdict TEXT NOT NULL,
  injection_score FLOAT,
  layer1_latency_ms INT,
  layer2_triggered BOOLEAN,
  attack_type TEXT,
  severity TEXT,
  malicious_intent TEXT,
  sanitized_output TEXT,
  explanation TEXT,
  input_preview TEXT
);

CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
```

Do not alter this schema. Do not add tables. One table only.

---

## Pre-Seeded Counters

```python
total_scanned = 247   # module-level int in routes/scan.py
total_threats  = 189  # module-level int in routes/scan.py
```

Increment total_scanned on every response.
Increment total_threats when verdict is THREAT.

---

## Branding Rule

```
UI text shown to users:   "SENTINEL AI ENGINE"
Backend variable name:    gemini_model
Frontend field name:      claude_report  ← frozen, never renamed

Never display in UI: Gemini, Claude, Google, Anthropic, HuggingFace
```

---

## .gitignore Contents

backend/.gitignore:
```
.env
venv/
__pycache__/
*.pyc
*.pyo
.DS_Store
```

frontend/.gitignore:
```
.env
.env.production
node_modules/
dist/
.DS_Store
```

Both files must exist before the first git add.
