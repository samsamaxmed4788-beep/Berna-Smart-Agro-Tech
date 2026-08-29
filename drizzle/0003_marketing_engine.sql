ALTER TABLE campaigns ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE content_calendar_items ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE content_calendar_items ADD COLUMN IF NOT EXISTS notes text;
CREATE INDEX IF NOT EXISTS campaigns_org_updated_idx ON campaigns (organization_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS campaign_channels_org_campaign_idx ON campaign_channels (organization_id, campaign_id);
CREATE INDEX IF NOT EXISTS content_calendar_org_scheduled_idx ON content_calendar_items (organization_id, scheduled_for);
