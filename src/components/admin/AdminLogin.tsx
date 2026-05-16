import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/admin',
      },
    })

    setLoading(false)
    alert('Magic link sent to your email')
  }

  return (
    <form onSubmit={handleLogin} className="rounded-xl border p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Admin Login</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Login securely using Supabase Auth.
        </p>
      </div>

      <input
        type="email"
        placeholder="Enter admin email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border px-4 py-3"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-black text-white px-4 py-3 w-full"
      >
        {loading ? 'Sending...' : 'Send Magic Link'}
      </button>
    </form>
  )
}
