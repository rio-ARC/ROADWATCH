CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT UNIQUE NOT NULL,
  display_name TEXT,
  preferred_locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS authorities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  municipality TEXT NOT NULL,
  ward TEXT NOT NULL,
  department TEXT NOT NULL,
  authority_name TEXT NOT NULL,
  escalation_email TEXT NOT NULL,
  sla_hours INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS contractors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  performance_score INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS road_projects (
  id TEXT PRIMARY KEY,
  road_name TEXT NOT NULL,
  contractor_id UUID REFERENCES contractors(id),
  authority_id UUID REFERENCES authorities(id),
  budget_crore NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL,
  started_at DATE,
  due_at DATE
);

CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  description TEXT NOT NULL,
  status TEXT NOT NULL,
  media_url TEXT,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  ward TEXT,
  municipality TEXT,
  road_name TEXT,
  authority_id UUID REFERENCES authorities(id),
  project_id TEXT REFERENCES road_projects(id),
  duplicate_cluster_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS complaints_location_idx ON complaints USING GIST(location);
CREATE INDEX IF NOT EXISTS complaints_status_idx ON complaints(status);
CREATE INDEX IF NOT EXISTS complaints_duplicate_idx ON complaints(duplicate_cluster_id);

CREATE TABLE IF NOT EXISTS ai_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  damage_type TEXT NOT NULL,
  severity_score INTEGER NOT NULL CHECK (severity_score BETWEEN 0 AND 100),
  confidence_score NUMERIC(4,3) NOT NULL CHECK (confidence_score BETWEEN 0 AND 1),
  model_version TEXT NOT NULL,
  raw_output JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS civic_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source_url TEXT,
  body TEXT NOT NULL,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT now()
);
