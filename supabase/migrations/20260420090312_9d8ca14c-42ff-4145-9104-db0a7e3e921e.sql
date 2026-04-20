ALTER TABLE public.news_updates
ADD COLUMN IF NOT EXISTS dispatch_type text NOT NULL DEFAULT 'news';

ALTER TABLE public.news_updates
DROP CONSTRAINT IF EXISTS news_updates_dispatch_type_check;

ALTER TABLE public.news_updates
ADD CONSTRAINT news_updates_dispatch_type_check
CHECK (dispatch_type IN ('news', 'dispatch'));

CREATE INDEX IF NOT EXISTS idx_news_updates_dispatch_type
ON public.news_updates(dispatch_type);