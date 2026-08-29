import { date, integer, jsonb, pgTable, primaryKey, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull().unique(), emailVerified: text('emailVerified').notNull().default('false'), image: text('image'), createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
})
export const session = pgTable('session', {
  id: text('id').primaryKey(), expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(), token: text('token').notNull().unique(), createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull(), ipAddress: text('ipAddress'), userAgent: text('userAgent'), userId: text('userId').notNull(),
})
export const account = pgTable('account', {
  id: text('id').primaryKey(), accountId: text('accountId').notNull(), providerId: text('providerId').notNull(), userId: text('userId').notNull(), issuer: text('issuer'), password: text('password'), accessToken: text('accessToken'), refreshToken: text('refreshToken'), idToken: text('idToken'), accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { withTimezone: true }), refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { withTimezone: true }), scope: text('scope'), createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull(),
})
export const verification = pgTable('verification', { id: text('id').primaryKey(), identifier: text('identifier').notNull(), value: text('value').notNull(), expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(), createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow() })

export const organizations = pgTable('organizations', { id: text('id').primaryKey(), name: text('name').notNull(), slug: text('slug').notNull(), logoUrl: text('logo_url'), settings: jsonb('settings').$type<Record<string, unknown>>().notNull().default({}), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow() }, (table) => ({ slugUnique: uniqueIndex('organizations_slug_unique').on(table.slug) }))
export const organizationMembers = pgTable('organization_members', { organizationId: text('organization_id').notNull(), userId: text('user_id').notNull(), role: text('role').notNull().default('member'), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow() }, (table) => ({ membershipPrimaryKey: primaryKey({ columns: [table.organizationId, table.userId] }) }))
export const leadNotes = pgTable('lead_notes', {
  id: text('id').primaryKey(), organizationId: text('organization_id').notNull(), leadId: text('lead_id').notNull(), authorId: text('author_id').notNull(), body: text('body').notNull(), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const leads = pgTable('leads', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id').notNull(),
  createdBy: text('created_by').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name'),
  email: text('email'),
  phone: text('phone'),
  company: text('company'),
  source: text('source'),
  status: text('status').notNull().default('new'),
  score: integer('score').notNull().default(0),
  valueCents: integer('value_cents').notNull().default(0),
  assignedMemberId: text('assigned_member_id'),
  campaignId: text('campaign_id'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const campaigns = pgTable('campaigns', {
  id: text('id').primaryKey(), organizationId: text('organization_id').notNull(), createdBy: text('created_by').notNull(), name: text('name').notNull(), description: text('description'), objective: text('objective'), status: text('status').notNull().default('draft'), budgetCents: integer('budget_cents').notNull().default(0), startDate: date('start_date'), endDate: date('end_date'), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
export const campaignChannels = pgTable('campaign_channels', {
  id: text('id').primaryKey(), organizationId: text('organization_id').notNull(), campaignId: text('campaign_id').notNull(), channel: text('channel').notNull(), status: text('status').notNull().default('planned'), scheduledAt: timestamp('scheduled_at', { withTimezone: true }), spendCents: integer('spend_cents').notNull().default(0), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
export const contentCalendarItems = pgTable('content_calendar_items', {
  id: text('id').primaryKey(), organizationId: text('organization_id').notNull(), createdBy: text('created_by').notNull(), campaignId: text('campaign_id'), title: text('title').notNull(), channel: text('channel').notNull(), status: text('status').notNull().default('idea'), scheduledFor: timestamp('scheduled_for', { withTimezone: true }), owner: text('owner'), brief: text('brief'), content: text('content'), notes: text('notes'), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const conversations = pgTable('conversations', {
  id: text('id').primaryKey(), organizationId: text('organization_id').notNull(), userId: text('user_id').notNull(), title: text('title').notNull().default('New conversation'), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
export const conversationMessages = pgTable('conversation_messages', {
  id: text('id').primaryKey(), organizationId: text('organization_id').notNull(), conversationId: text('conversation_id').notNull(), userId: text('user_id').notNull(), role: text('role').notNull(), content: text('content').notNull(), responseJson: jsonb('response_json').$type<Record<string, unknown>>(), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const schema = { user, session, account, verification, organizations, organizationMembers, leads, leadNotes, campaigns, campaignChannels, contentCalendarItems, conversations, conversationMessages }
export type Organization = typeof organizations.$inferSelect
export type OrganizationMember = typeof organizationMembers.$inferSelect
