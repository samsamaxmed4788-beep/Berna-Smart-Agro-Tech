'use client'

import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function ProfilePanel({ name, email, organization }: { name: string; email: string; organization: string }) { const router = useRouter(); async function logout() { await authClient.signOut(); router.push('/sign-in'); router.refresh() }; return <div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-medium">{name}</p><p className="text-xs text-muted-foreground">{email} · {organization}</p></div><button onClick={logout} className="min-h-11 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted">Log out</button></div> }
