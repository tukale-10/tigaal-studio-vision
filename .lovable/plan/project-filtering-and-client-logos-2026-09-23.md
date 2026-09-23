# Project filtering and client logos

## What will change
- Replace the public “Past Projects” and “Current” tabs with clearer “2026 Projects” and “All Projects” views.
- Add compact filters for year, status, and category so visitors can quickly narrow the full portfolio.
- Use project start/end dates to determine the displayed year, with sensible handling when a date is missing.
- Add a client-logo field to project records.
- Add a dedicated client-logo uploader in the admin project editor, separate from the cover image.
- Show the uploaded logo beneath the client name on public project cards and in project details, while keeping cards tidy when no logo exists.
- Show the logo in the admin project grid and table for quick recognition.

## Technical details
- Add a nullable `client_logo` URL column to the existing projects data.
- Reuse the existing image upload control and image storage.
- Update project data types and public/admin queries to support the new field.
- Keep existing project statuses and project content unchanged.

## Validation
- Check the project page on desktop and mobile.
- Confirm year/status/category filters work together.
- Confirm an uploaded client logo saves and displays without affecting projects that have no logo.
