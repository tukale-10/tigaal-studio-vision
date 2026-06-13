
CREATE TABLE public.pipeline_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  funder TEXT,
  status TEXT NOT NULL DEFAULT 'pipeline',
  lead TEXT,
  timeline TEXT,
  contacts TEXT,
  description TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.pipeline_projects TO authenticated;
GRANT ALL ON public.pipeline_projects TO service_role;

ALTER TABLE public.pipeline_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view pipeline projects"
  ON public.pipeline_projects FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert pipeline projects"
  ON public.pipeline_projects FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update pipeline projects"
  ON public.pipeline_projects FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete pipeline projects"
  ON public.pipeline_projects FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_pipeline_projects_updated_at
  BEFORE UPDATE ON public.pipeline_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_pipeline_projects_status ON public.pipeline_projects(status);
