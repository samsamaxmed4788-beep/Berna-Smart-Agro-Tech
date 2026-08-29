ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "issuer" text;
ALTER TABLE "campaign_channels" ADD COLUMN IF NOT EXISTS "organization_id" text;
UPDATE "campaign_channels" cc SET "organization_id" = c."organization_id" FROM "campaigns" c WHERE cc."campaign_id" = c."id" AND cc."organization_id" IS NULL;
ALTER TABLE "campaign_channels" ALTER COLUMN "organization_id" SET NOT NULL;
