# Unified Clients and Reach Page

## Goal
Turn the Clients page into a single, clean logo wall and add an Our Reach section beneath it, while keeping the existing TIGAAL visual identity.

## Changes
- Remove the visible client category sections and combine every client into one responsive logo grid.
- Keep every existing full-colour logo and show the text-only client where no logo exists.
- Add a staggered reveal effect as logos enter the viewport, with a reduced-motion fallback.
- Add an Our Reach section using the existing TIGAAL map, focused on Somalia, Kenya, and Ethiopia.
- Preserve the existing page introduction and contact call-to-action, with spacing adjusted to match the unified layout.
- Verify the page on desktop and mobile and check that the site still builds cleanly.

## Technical details
- Update only the Clients page and scoped animation styles.
- Use an Intersection Observer for a one-time reveal, avoiding additional packages.
- Reuse the shared client registry and existing reach-map component so future logo updates continue to appear automatically.
