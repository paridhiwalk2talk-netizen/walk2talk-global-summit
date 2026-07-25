
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  designation TEXT NOT NULL,
  organization TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  country TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.registrations TO anon, authenticated;
GRANT ALL ON public.registrations TO service_role;

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register"
  ON public.registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
