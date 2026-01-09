import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Ces valeurs seront remplacées par tes vraies clés dans le .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create client if environment variables are configured
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Log warning if Supabase is not configured
if (!supabase) {
  console.warn(
    '[Supabase] Missing environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  )
}

// Types pour la table waitlist
export interface WaitlistEntry {
  id?: string
  email: string
  profil: 'debutant' | 'quelques_voyages' | 'actif_regulier'
  marches: string[]
  budget: string
  investissement: string
  created_at?: string
  email_sent?: boolean
}
