-- =====================================================
-- Table WAITLIST pour Micro-Import Elite
-- À exécuter dans Supabase SQL Editor
-- =====================================================

-- Création de la table waitlist
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    profil TEXT NOT NULL CHECK (profil IN ('debutant', 'quelques_voyages', 'actif_regulier')),
    marches TEXT[] NOT NULL DEFAULT '{}',
    budget TEXT NOT NULL CHECK (budget IN ('moins_2000', '2000_4000', '4000_6000', '6000_8000', '8000_10000', '10000_12000', 'plus_12000')),
    investissement TEXT NOT NULL CHECK (investissement IN ('moins_500', '500_1000', '1000_2000', 'plus_2000')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email_sent BOOLEAN DEFAULT FALSE,
    notes TEXT
);

-- Index pour recherche rapide par email
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Index pour filtrer par date d'inscription
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);

-- Activer RLS (Row Level Security)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Politique : Permettre l'insertion publique (pour le formulaire)
CREATE POLICY "Permettre insertion publique" ON public.waitlist
    FOR INSERT
    WITH CHECK (true);

-- Politique : Lecture uniquement pour les admins (via service_role)
-- Les utilisateurs anonymes ne peuvent pas lire les données

-- Commentaires sur les colonnes
COMMENT ON TABLE public.waitlist IS 'Liste d''attente des utilisateurs Micro-Import Elite';
COMMENT ON COLUMN public.waitlist.profil IS 'Niveau d''expérience: debutant, quelques_voyages, actif_regulier';
COMMENT ON COLUMN public.waitlist.marches IS 'Pays d''approvisionnement sélectionnés';
COMMENT ON COLUMN public.waitlist.budget IS 'Tranche de budget par voyage en euros';
COMMENT ON COLUMN public.waitlist.investissement IS 'Tranche d''investissement mensuel acceptée en DA';
COMMENT ON COLUMN public.waitlist.email_sent IS 'Indique si l''email de bienvenue a été envoyé';

-- =====================================================
-- Fonction pour envoyer l'email de bienvenue (webhook)
-- Tu peux connecter cette fonction à un Edge Function
-- =====================================================

CREATE OR REPLACE FUNCTION notify_new_signup()
RETURNS TRIGGER AS $$
BEGIN
    -- Cette fonction peut être connectée à un webhook
    -- pour envoyer automatiquement l'email de bienvenue
    -- via Resend, SendGrid, ou autre service
    PERFORM pg_notify('new_waitlist_signup', json_build_object(
        'id', NEW.id,
        'email', NEW.email,
        'profil', NEW.profil
    )::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour notifier à chaque nouvelle inscription
DROP TRIGGER IF EXISTS on_waitlist_signup ON public.waitlist;
CREATE TRIGGER on_waitlist_signup
    AFTER INSERT ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION notify_new_signup();

-- =====================================================
-- Vue pour les statistiques (optionnel)
-- =====================================================

CREATE OR REPLACE VIEW public.waitlist_stats AS
SELECT 
    COUNT(*) as total_inscrits,
    COUNT(*) FILTER (WHERE profil = 'debutant') as debutants,
    COUNT(*) FILTER (WHERE profil = 'quelques_voyages') as intermediaires,
    COUNT(*) FILTER (WHERE profil = 'actif_regulier') as actifs,
    COUNT(*) FILTER (WHERE 'chine' = ANY(marches)) as marche_chine,
    COUNT(*) FILTER (WHERE 'turquie' = ANY(marches)) as marche_turquie,
    COUNT(*) FILTER (WHERE 'emirats' = ANY(marches)) as marche_emirats,
    COUNT(*) FILTER (WHERE 'europe' = ANY(marches)) as marche_europe,
    COUNT(*) FILTER (WHERE email_sent = true) as emails_envoyes
FROM public.waitlist;
