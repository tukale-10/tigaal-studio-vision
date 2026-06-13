
-- 1. Lock down SECURITY DEFINER helper functions — revoke EXECUTE from PUBLIC/anon/authenticated.
-- has_role is invoked by RLS expressions (evaluated as the function owner), so revoking client EXECUTE is safe.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;

-- 2. Set fixed search_path on email helper functions.
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;

-- 3. Public storage buckets: drop broad SELECT policies that allow LISTING all files.
-- Public buckets remain readable via /object/public/<bucket>/<path> URLs (which don't require RLS).
DROP POLICY IF EXISTS "Public can view cms images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view cms documents" ON storage.objects;

-- 4. Replace permissive WITH CHECK (true) on contact_submissions with input validation.
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(subject)) BETWEEN 1 AND 200
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND (organization IS NULL OR length(organization) <= 200)
);
