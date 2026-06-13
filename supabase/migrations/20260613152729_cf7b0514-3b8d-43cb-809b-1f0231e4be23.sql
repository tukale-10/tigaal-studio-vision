
ALTER TABLE public.pipeline_projects
  ADD COLUMN IF NOT EXISTS sector text,
  ADD COLUMN IF NOT EXISTS submission_deadline date,
  ADD COLUMN IF NOT EXISTS key_tasks text,
  ADD COLUMN IF NOT EXISTS progress_remarks text,
  ADD COLUMN IF NOT EXISTS followup_actions text,
  ADD COLUMN IF NOT EXISTS stage_flags jsonb NOT NULL DEFAULT '{"prequalification":false,"proposal_drafted":false,"submitted":false,"awarded":false}'::jsonb,
  ADD COLUMN IF NOT EXISTS opportunity_no integer;
