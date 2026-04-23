import { useState } from 'react'
import { useAuth } from '../lib/AuthContext'
import { useToast } from './Toast'

export default function AuthModal({ onClose }) {
  const { signIn, signUp } = useAuth()
  const toast = useToast()
  const [tab,     setTab]     = useState('signin')
  const [loading, setLoading] = useState(false)
  const [form,    setForm]    = useState({ email: '', password: '', username: '' })
  const [errors,  setErrors]  = useState({})
  const [banner,  setBanner]  = useState(null) // inline error banner

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.email.includes('@'))   e.email    = 'Enter a valid email'
    if (form.password.length < 6)    e.password = 'Password must be 6+ characters'
    if (tab === 'signup' && form.username.trim().length < 3)
                                     e.username = 'Username must be 3+ characters'
    setErrors(e)
    return !Object.keys(e).length
  }

  const friendlyError = (err) => {
    if (!err) return 'Something went wrong — try again'
    const msg = err.message || String(err)
    // "Failed to fetch" = Supabase URL misconfigured or network issue
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('fetch'))
      return 'Cannot reach the server. Check your internet connection and try again. If the problem persists, the Supabase project may need its Site URL configured.'
    if (msg.includes('Invalid login'))        return 'Wrong email or password'
    if (msg.includes('Email not confirmed'))  return 'Check your inbox — confirm your email first'
    if (msg.includes('already registered') || msg.includes('already been registered'))
                                              return 'That email is already registered — try signing in'
    if (msg.includes('Password should'))      return 'Password must be at least 6 characters'
    if (msg.includes('rate limit'))           return 'Too many attempts — wait a minute and try again'
    return msg
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setBanner(null)
    if (!validate()) return
    setLoading(true)

    try {
      if (tab === 'signin') {
        const { error } = await signIn(form.email, form.password)
        if (error) { setBanner(friendlyError(error)); setLoading(false); return }
        toast('Welcome back! 👋')
        onClose()
      } else {
        const { data, error } = await signUp(form.email, form.password, form.username.trim())
        if (error) { setBanner(friendlyError(error)); setLoading(false); return }
        // Supabase may auto-confirm or require email confirm depending on project settings
        if (data?.session) {
          toast('Account created! Welcome to Krowdly 🎉')
          onClose()
        } else {
          toast('Account created! Check your email to confirm before signing in.')
          onClose()
        }
      }
    } catch (err) {
      setBanner(friendlyError(err))
    }
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="form-card modal-card" style={{ width: '100%', maxWidth: 420 }}>

        {/* Tabs */}
        <div style={{ display:'flex', marginBottom:22, borderBottom:'1px solid var(--border)' }}>
          {['signin','signup'].map(t => (
            <button key={t} onClick={() => { setTab(t); setErrors({}); setBanner(null) }}
              style={{
                flex:1, padding:'10px 0', background:'none', border:'none',
                borderBottom: tab===t ? '2px solid var(--accent)' : '2px solid transparent',
                marginBottom:-1,
                color: tab===t ? 'var(--ink)' : 'var(--ink3)',
                fontWeight: tab===t ? 700 : 500,
                fontSize:'.86rem', cursor:'pointer', transition:'var(--T)',
              }}>
              {t === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <p style={{ fontFamily:'var(--font-head)', fontSize:'1.2rem', fontWeight:800, color:'var(--ink)', marginBottom:18 }}>
          {tab === 'signin' ? 'Welcome back' : 'Join Krowdly'}
        </p>

        {/* Inline error banner */}
        {banner && (
          <div style={{
            background:'rgba(247,129,102,.12)', border:'1px solid rgba(247,129,102,.35)',
            borderRadius:'var(--r2)', padding:'10px 14px', marginBottom:14,
            fontSize:'.82rem', color:'#f78166', lineHeight:1.5,
          }}>
            ⚠ {banner}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <div className="field">
              <label>Username</label>
              <input placeholder="your_username" value={form.username}
                onChange={e => set('username', e.target.value)} autoFocus />
              {errors.username && <span className="field-error">{errors.username}</span>}
            </div>
          )}

          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={e => set('email', e.target.value)} autoFocus={tab==='signin'} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={form.password}
              onChange={e => set('password', e.target.value)} />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary"
            style={{ width:'100%', justifyContent:'center', marginTop:10 }} disabled={loading}>
            {loading
              ? <span className="spinner" style={{ width:16, height:16, margin:0 }} />
              : tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Supabase email-confirm note */}
        {tab === 'signup' && (
          <p style={{ fontSize:'.72rem', color:'var(--ink3)', marginTop:12, lineHeight:1.5 }}>
            By signing up you agree to our terms. A confirmation email may be sent — check your spam folder.
          </p>
        )}

        <p className="text-muted text-center mt-2">
          {tab === 'signin'
            ? <span>No account? <button onClick={() => { setTab('signup'); setBanner(null) }}
                style={{ background:'none',border:'none',color:'var(--blue)',cursor:'pointer',fontSize:'inherit' }}>Sign up</button></span>
            : <span>Have an account? <button onClick={() => { setTab('signin'); setBanner(null) }}
                style={{ background:'none',border:'none',color:'var(--blue)',cursor:'pointer',fontSize:'inherit' }}>Sign in</button></span>
          }
        </p>
      </div>
    </div>
  )
}
