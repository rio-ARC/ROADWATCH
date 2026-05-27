INSERT INTO authorities (municipality, ward, department, authority_name, escalation_email, sla_hours)
VALUES
  ('Greater Chennai Corporation', 'Ward 177', 'Roads and Bridges', 'Assistant Engineer, Zone 13', 'zone13-roads@gcc.gov.in', 48),
  ('Greater Chennai Corporation', 'Ward 170', 'Stormwater Drains', 'Zonal Officer, Zone 13', 'stormwater-zone13@gcc.gov.in', 12)
ON CONFLICT DO NOTHING;

INSERT INTO contractors (name, performance_score)
VALUES
  ('Tamil Nadu Urban Roads JV', 88),
  ('Marina Civic Infra', 79),
  ('Coromandel Roadworks', 71)
ON CONFLICT DO NOTHING;
