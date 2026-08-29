import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import NexoraWorkspace from '@/components/nexora-workspace'
import ProfilePanel from '@/components/profile-panel'
import { auth } from '@/lib/auth'
import { ensureDefaultOrganization, getMembership } from '@/lib/organization'
import { listLeads } from '@/app/actions/leads'
import { listMarketingData } from '@/app/actions/marketing'

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')
  await ensureDefaultOrganization(session.user.id, session.user.name)
  const membership = await getMembership(session.user.id)
  const initialLeads = await listLeads()
  const initialMarketing = await listMarketingData()
  return <><header className="fixed right-4 top-4 z-50"><ProfilePanel name={session.user.name} email={session.user.email} organization={membership[0]?.organization.name ?? 'Workspace'} /></header><NexoraWorkspace initialLeads={initialLeads} initialMarketing={initialMarketing} /></>
}
