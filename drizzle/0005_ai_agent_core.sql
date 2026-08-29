CREATE TABLE IF NOT EXISTS conversations (id text PRIMARY KEY, organization_id text NOT NULL, user_id text NOT NULL, title text NOT NULL DEFAULT 'New conversation', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS conversation_messages (id text PRIMARY KEY, organization_id text NOT NULL, conversation_id text NOT NULL, user_id text NOT NULL, role text NOT NULL, content text NOT NULL, response_json jsonb, created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS conversations_org_updated_idx ON conversations (organization_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS conversation_messages_org_conversation_idx ON conversation_messages (organization_id, conversation_id, created_at ASC);
