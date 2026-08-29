ALTER TABLE leads ADD COLUMN IF NOT EXISTS campaign_id text;
CREATE INDEX IF NOT EXISTS leads_org_created_idx ON leads (organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS leads_org_campaign_idx ON leads (organization_id, campaign_id);
