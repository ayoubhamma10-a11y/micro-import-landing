import { z } from 'zod'

// Schéma de validation du formulaire d'inscription
export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Veuillez entrer une adresse email valide"),
  
  profil: z.enum(['debutant', 'quelques_voyages', 'actif_regulier'], {
    required_error: "Veuillez sélectionner votre profil",
  }),
  
  marches: z
    .array(z.string())
    .min(1, "Veuillez sélectionner au moins un marché"),
  
  budget: z.enum([
    'moins_2000',
    '2000_4000',
    '4000_6000',
    '6000_8000',
    '8000_10000',
    '10000_12000',
    'plus_12000'
  ], {
    required_error: "Veuillez sélectionner votre budget",
  }),
  
  investissement: z.enum([
    'moins_500',
    '500_1000',
    '1000_2000',
    'plus_2000'
  ], {
    required_error: "Veuillez sélectionner votre investissement",
  }),
})

export type WaitlistFormData = z.infer<typeof waitlistSchema>

// Labels pour l'affichage
export const profilLabels: Record<string, string> = {
  debutant: "Je débute (aucun voyage effectué)",
  quelques_voyages: "J'ai déjà fait quelques voyages",
  actif_regulier: "Je suis actif et régulier",
}

export const marchesOptions = [
  { value: 'chine', label: 'Chine' },
  { value: 'turquie', label: 'Turquie' },
  { value: 'emirats', label: 'Émirats Arabes Unis' },
  { value: 'europe', label: 'Europe' },
  { value: 'autre', label: 'Autre' },
]

export const budgetLabels: Record<string, string> = {
  moins_2000: "Moins de 2 000 €",
  '2000_4000': "2 000 € à 4 000 €",
  '4000_6000': "4 000 € à 6 000 €",
  '6000_8000': "6 000 € à 8 000 €",
  '8000_10000': "8 000 € à 10 000 €",
  '10000_12000': "10 000 € à 12 000 €",
  plus_12000: "Plus de 12 000 €",
}

export const investissementLabels: Record<string, string> = {
  moins_500: "Moins de 500 DA/mois",
  '500_1000': "500 à 1 000 DA/mois",
  '1000_2000': "1 000 à 2 000 DA/mois",
  plus_2000: "Plus de 2 000 DA/mois",
}
