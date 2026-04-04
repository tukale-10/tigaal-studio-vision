## CMS Build Plan

### Phase 1: Database Schema
Create tables for all content types:
- `services` — title, description, icon, image, highlights, order
- `projects` — title, subtitle, client, description, category, status
- `team_members` — name, title, bio, image, order, social links
- `news_updates` — title, excerpt, content (JSON blocks), category, date, published
- `publications` — title, description, type, year, file_url, published
- `user_roles` — admin role system (invite-only)
- `media` — file storage tracking table

All with RLS policies (admins full CRUD, public read for published content).

### Phase 2: Admin Auth & Layout
- Admin login page at `/admin`
- Protected admin routes with auth guard
- Admin layout with sidebar navigation and dashboard
- Invite-only: first admin created via Supabase dashboard, can invite others

### Phase 3: Admin CRUD Pages
- **Dashboard** — content stats overview
- **Services Manager** — CRUD with image upload, drag-to-reorder
- **Projects Manager** — CRUD with category/status management
- **Team Manager** — CRUD with photo upload, bio editor
- **News & Updates** — CRUD with Notion-like block editor
- **Publications** — CRUD with PDF/file upload
- **Users** — view admins, invite new admins

### Phase 4: Rich Editor & File Uploads
- Install `@blocknote/react` for Notion-like block editor
- Supabase Storage buckets for images, documents
- Image upload component with preview
- File/PDF upload for publications

### Phase 5: Dynamic Public Site
- Replace static content on Services, Projects, Team, News, Publications pages with database queries
- Loading states and error handling
- Keep current design, just swap data source
