ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "assigned_member_id" text;
CREATE TABLE IF NOT EXISTS "lead_notes" (
  "id" text PRIMARY KEY NOT NULL,
  "organization_id" text NOT NULL,
  "lead_id" text NOT NULL,
  "author_id" text NOT NULL,
  "body" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);
