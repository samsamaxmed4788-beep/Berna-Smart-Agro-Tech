import { jsonb, pgTable, primaryKey, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(), name: text('name').notNull(), email: text('email').notNull().unique(), emailVerified: text('emailVerified').notNull().default('false'), image: text('image'), createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
})
export const session = pgTable('session', {
  id: text('id').primaryKey(), expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(), token: text('token').notNull().unique(), createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull(), ipAddress: text('ipAddress'), userAgent: text('userAgent'), userId: text('userId').notNull(),
})
export const account = pgTable('account', {
  id: text('id').primaryKey(), accountId: text('accountId').notNull(), providerId: text('providerId').notNull(), userId: text('userId').notNull(), password: text('password'), accessToken: text('accessToken'), refreshToken: text('refreshToken'), idToken: text('idToken'), accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { withTimezone: true }), refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { withTimezone: true }), scope: text('scope'), createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull(),
})
export const verification = pgTable('verification', { id: text('id').primaryKey(), identifier: text('identifier').notNull(), value: text('value').notNull(), expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(), createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow() })

export const organizations = pgTable('organizations', { id: text('id').primaryKey(), name: text('name').notNull(), slug: text('slug').notNull(), logoUrl: text('logo_url'), settings: jsonb('settings').$type<Record<string, unknown>>().notNull().default({}), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow() }, (table) => ({ slugUnique: uniqueIndex('organizations_slug_unique').on(table.slug) }))
export const organizationMembers = pgTable('organization_members', { organizationId: text('organization_id').notNull(), userId: text('user_id').notNull(), role: text('role').notNull().default('member'), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow() }, (table) => ({ membershipPrimaryKey: primaryKey({ columns: [table.organizationId, table.userId] }) }))
export const schema = { user, session, account, verification, organizations, organizationMembers }
export type Organization = typeof organizations.$inferSelect
export type OrganizationMember = typeof organizationMembers.$inferSelect
