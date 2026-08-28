import Link from 'next/link'
import AuthForm from '@/components/auth-form'

export default function SignInPage() { return <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12"><section className="flex w-full max-w-md flex-col gap-8"><div><p className="font-mono text-sm text-primary">NEXORA ONE</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Welcome back</h1><p className="mt-2 text-muted-foreground">Sign in to your workspace.</p></div><AuthForm mode="sign-in" /><p className="text-sm text-muted-foreground">New to Nexora? <Link className="font-medium text-primary hover:underline" href="/sign-up">Create an account</Link></p></section></main> }
