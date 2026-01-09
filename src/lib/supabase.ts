import { createClient } from '@supabase/supabase-js'

// Ces valeurs seront remplacées par tes vraies clés dans le .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
