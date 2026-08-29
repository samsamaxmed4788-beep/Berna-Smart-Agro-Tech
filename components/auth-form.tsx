'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export default function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter(); const [error, setError] = useState(''); const [pending, setPending] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setError(''); setPending(true); const form = new FormData(event.currentTarget); const email = String(form.get('email') ?? '').trim(); const password = String(form.get('password') ?? ''); const name = String(form.get('name') ?? '').trim()
    if (!email.includes('@') || password.length < 8 || (mode === 'sign-up' && name.length < 2)) { setError('Please enter valid account details. Passwords must be at least 8 characters.'); setPending(false); return }
    const result = mode === 'sign-up' ? await authClient.signUp.email({ email, password, name }) : await authClient.signIn.email({ email, password })
    if (result.error) setError('Authentication failed. Check your details and try again.'); else { router.push('/'); router.refresh() }; setPending(false)
  }
  return <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-4">{mode === 'sign-up' && <input name="name" required minLength={2} placeholder="Full name" className="h-12 rounded-lg border border-border bg-card px-4 text-base" />}{<input name="email" type="email" required placeholder="Email address" className="h-12 rounded-lg border border-border bg-card px-4 text-base" />}<input name="password" type="password" required minLength={8} placeholder="Password (8+ characters)" className="h-12 rounded-lg border border-border bg-card px-4 text-base" />{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<button disabled={pending} className="min-h-12 rounded-lg bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60">{pending ? 'Please wait…' : mode === 'sign-up' ? 'Create workspace' : 'Sign in'}</button></form>
}
