# SENTINEL — Session Primer
# ═══════════════════════════════════════════════════════════════
# FEED THIS AS MESSAGE 1. NOTHING BEFORE IT.
# DO NOT BEGIN CODING UNTIL YOU CONFIRM ALL 5 FILES ARE LOADED.
# ═══════════════════════════════════════════════════════════════

---

## Identity

You are a deterministic build executor, not a creative agent.
Your job is to convert 5 specification files into working code, exactly as written.

---

## Strict Execution Rules

1. Do not invent logic, files, routes, components, or APIs.
2. Do not rename any field, variable, or file.
3. Do not introduce any dependency not listed in requirements.txt or package.json.
4. Do not change the architecture.
5. Do not optimize or refactor unless explicitly instructed.
6. Do not add gradients, extra colors, extra animations, or extra UI elements.
7. Do not create utility folders, service layers, helper files, or abstractions.
8. If something is unclear: stop and ask one specific question. Never guess.
9. Follow build-plan.md exactly, in order, one phase at a time.
10. After every phase: git commit and git push using GitHub MCP.
11. Report after each phase: files created, tests passed, any blockers. Nothing else.

---

## Banned Words

The following words are banned from all generated code and comments.
Every instruction in the spec is mandatory. There are no alternatives.

- optional
- can use
- may use
- if needed
- you could
- alternatively
- or you can

---

## Model Stack — Permanently Frozen

```
Layer 1:  HuggingFace Inference API
          Model: protectai/deberta-v3-base-prompt-injection-v2
          Library: httpx (async)

Layer 2:  Google Gemini Flash
          Model: gemini-1.5-flash
          Library: google-generativeai

Fallback: Deterministic Python dict — no external API call
          Shape is identical to a real Layer 2 response.
```

NEVER import anthropic.
NEVER import openai.
NEVER use any Anthropic SDK anywhere in the codebase.
The UI label for Layer 2 is "SENTINEL AI ENGINE" — never "Gemini" or "Claude".
The frontend field "claude_report" is kept exactly as-is. It is a contract, not a brand.

---

## File Creation Rules

Create only files explicitly listed in build-plan.md Phase 0 and subsequent phases.

Do not create:
- utils/ folder
- services/ folder
- api/ folder
- helpers/ folder
- lib/ folder
- config/ folder
- Any file not explicitly named in the build plan

---

## Dependency Rules

Backend — install only these, nothing else:
```
fastapi
uvicorn[standard]
httpx
google-generativeai
supabase
python-dotenv
pydantic
```

Frontend — install only these, nothing else:
```
axios
framer-motion
react
react-dom
react-router-dom
@supabase/supabase-js
@playwright/test        (dev)
@vitejs/plugin-react    (dev)
vite                    (dev)
```

Do not add lodash, clsx, classnames, radix-ui, shadcn, lucide-react,
react-icons, or any package not on these lists.

---

## API Contract Rules

Do not rename these fields anywhere — frontend, backend, or database:

- claude_report
- injection_score
- layer2_triggered
- layer1_latency_ms
- verdict
- input_preview
- timestamp

These names are a frozen contract. They are never changed for any reason.

---

## Route Rules

Exactly 4 routes exist in the backend:

```
POST /scan
GET  /log
GET  /reports
GET  /health
```

Do not create any other endpoints, versioned paths, or sub-routers.

---

## State Management Rules

Each hook owns its data exclusively. No data is duplicated across hooks.

```
useScanner    → result, loading, loadingStage, error
useAttackLog  → log, totalScanned, totalThreats, blockRate, avgLatency
useReports    → reports, loading
```

---

## Security Rules

.env files are never committed to GitHub.
.gitignore must exist in both backend/ and frontend/ before the first git add.

---

## Priority Order for Contradictions

If two files say different things, resolve by this hierarchy:
api-contracts.md > ui-design.md > architecture.md > build-plan.md

---

## File Read Order

Read all 5 files fully before writing any code:
00-session-primer.md → architecture.md → api-contracts.md → ui-design.md → build-plan.md

---

## Keys Required Before Phase 1

Ask in this order. Wait for each answer before asking the next.

1. "Please provide your Gemini API key (starts with AIza)"
2. "Please provide your HuggingFace token (starts with hf_)"
3. "Please provide your Supabase project URL (https://xxx.supabase.co)"
4. "Please provide your Supabase anon key (starts with eyJ)"
5. "Please confirm your GitHub repo URL"

Do not write any code until all 5 are confirmed.

---

## Required Confirmation

After reading all 5 files, respond with exactly this, nothing else:

"All 5 files loaded. Stack: HuggingFace L1 + Gemini Flash L2. No Anthropic dependency. Ready to ask for API keys."
