import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  || ''
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Warn in console instead of throwing — lets the app render so you can see the error
if (!supabaseUrl || !supabaseAnon) {
  console.error(
    '[Krowdly] Missing Supabase environment variables.\n' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables, then redeploy.'
  )
}

export const supabase = createClient(
  supabaseUrl  || 'https://placeholder.supabase.co',
  supabaseAnon || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)
