# Capability Detail Pages

Create a dedicated, richly-designed page for each of TIGAAL's 9 capabilities, accessible from the existing Capabilities/Services grid.

## Scope

One reusable `CapabilityDetail` page component, served from a new dynamic route `/services/:slug`. Each capability gets:

- A hero with title, summary, breadcrumb, and signature image (from DB `image_url`).
- An "Overview" narrative section (long-form description from DB + curated copy).
- A "What We Offer" cards grid (4–6 service sub-areas, icon + short blurb).
- A "Our Approach" stepped list (4–5 steps, numbered timeline).
- A "By the Numbers" stats / chart strip — Recharts (bar or radial) showing illustrative impact metrics.
- A "Where We Work" mini map of the Horn of Africa highlighting Somalia, Kenya, Ethiopia, Djibouti — SVG-based, no external map lib needed.
- A "Key Focus Areas" highlight chips (from DB `highlights`).
- A "Related Capabilities" section linking 2–3 sibling pages.
- A CTA banner to /contact.

Recharts is already a viable choice (lightweight, fits design tokens). No new map library — a hand-tuned SVG of the region keeps it fast and on-brand.

## Per-capability content

Each capability gets its own content config (sub-services, approach steps, stat figures, focus regions) authored in a single typed file `src/content/capabilities.ts`, keyed by slug. Keeps DB schema unchanged. Slug derived from title.

The 9 slugs:
1. `capacity-development-and-trainings`
2. `monitoring-evaluation-and-learning`
3. `strategic-communication-and-pr`
4. `market-studies-and-assessments`
5. `climate-resilience-and-adaptation`
6. `private-sector-and-financial-inclusion`
7. `digital-solutions-mis`
8. `pcve-peacebuilding-social-cohesion`
9. `ssr-political-risk-geopolitical`

## Wiring

- Update `ServicesGrid` (home) and `Services` page so each capability card/row links to `/services/:slug` instead of `/services`.
- Add route in `App.tsx`.
- Slug helper: simple kebab-case from title with manual override map for accuracy.

## Files

New:
- `src/pages/CapabilityDetail.tsx` — the detail page (single reusable component).
- `src/content/capabilities.ts` — per-slug content config (sub-services, steps, stats, regions, related slugs).
- `src/components/capability/StatsChart.tsx` — Recharts bar/radial.
- `src/components/capability/HornOfAfricaMap.tsx` — inline SVG map with highlighted countries.
- `src/lib/slug.ts` — slug helper + title↔slug map.

Edited:
- `src/App.tsx` — add `/services/:slug` route.
- `src/pages/Services.tsx` — link rows to detail pages.
- `src/components/home/ServicesGrid.tsx` — link cards to detail pages.

## Design

Uses existing tokens (accent, primary, secondary, muted). No new colors. Display font for headings, body font for prose. Generous whitespace, asymmetric two-column blocks (image/text alternating), accent-color accents on stats and chips. Recharts styled via CSS vars. Map: dark-primary land, accent for highlighted countries, subtle dotted grid background.

## Out of scope

- No CMS UI for editing the per-capability extended content (lives in `capabilities.ts`).
- No new DB columns.
- No changes to Approach, About, Projects, Team pages.

## Question

Confirm before I build: OK to author the rich per-capability content (sub-services, approach steps, illustrative stat figures) in code rather than the database? Illustrative stats will be plausible/representative (e.g. "120+ workshops delivered", "15 countries", etc.) and easy for you to tweak later in `src/content/capabilities.ts`. If you'd rather provide exact figures, share them and I'll plug them in.
