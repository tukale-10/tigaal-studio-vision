## Goal
Reposition TIGAAL as a **social enterprise** — one that delivers non-profit/development projects, sustained by its consulting wing as the profit-making arm — without overhauling the site.

## Approach
Light-touch copy edits only. No structural, navigation, or visual changes. Update the "who we are" framing in a handful of high-visibility places so the social-enterprise identity comes through clearly.

## Proposed copy changes

1. **Footer (`src/components/Footer.tsx`)** — About blurb
   - From: "TIGAAL is a research and analytical management firm…"
   - To: "TIGAAL is a social enterprise delivering research, analysis, and development projects across Somalia and the Horn of Africa — sustained by our consulting practice, which reinvests in our mission-driven work."

2. **Home › AboutSnapshot (`src/components/home/AboutSnapshot.tsx`)** — intro paragraph
   - Reframe opener to: "TIGAAL is a social enterprise operating at the centre of Somalia's development landscape. Our consulting practice powers and sustains the non-profit and development projects we deliver…" (rest preserved).

3. **About page (`src/pages/About.tsx`)** — Company Overview + Mission quote
   - First paragraph: lead with "TIGAAL is a social enterprise…" and add one sentence explaining the dual model (consulting funds mission delivery).
   - Optionally add a short callout line under "What Sets Us Apart" noting the social-enterprise model.

4. **Hero subtitle / tagline** (if present on `HeroSection.tsx`) — small tweak to include "social enterprise" wording. Will confirm exact line after reading the file during implementation.

5. **SEO metadata (`index.html`)** — update `<meta name="description">` and `og:description` to reflect social-enterprise positioning.

## Out of scope
- No new pages, sections, components, routes, or images.
- No design, layout, color, or navigation changes.
- No database/CMS edits.
- Services, Approach, Projects, Team pages untouched (unless you want me to include them).

## Question before I write the plan into code
Want me to keep it to **just these 5 spots**, or also sprinkle the wording into the Services and Approach page intros?
