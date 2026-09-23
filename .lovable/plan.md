# Match client logos to projects

## What will change
- Create one shared client-logo list using the logos already displayed on the Clients page.
- Match project client names and common variants, such as “ACTED Somalia,” “Netherlands Embassy,” and “UNOPS / World Bank,” to the correct existing logo.
- Show the matched logo on public project cards, project details, and the admin project list.
- Keep any logo manually uploaded for a project as the first choice, with the shared client logo as the fallback.
- Keep projects without a matching Clients-page logo unchanged rather than assigning an incorrect logo.

## Technical details
- Move the existing client names, aliases, and imported logo assets into a reusable client-logo registry.
- Reuse the same resolver across the Clients page, homepage client strip, public Projects page, and admin Projects page.
- No new uploads or database changes are required.

## Validation
- Confirm every project with a known client displays the correct logo.
- Confirm manually uploaded project logos remain unchanged.
- Check public project cards and details on desktop and mobile.
