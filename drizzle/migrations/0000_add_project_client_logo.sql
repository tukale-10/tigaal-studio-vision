ALTER TABLE public.projects
ADD COLUMN client_logo TEXT;

COMMENT ON COLUMN public.projects.client_logo IS 'Public URL for the client or commissioning organisation logo.';