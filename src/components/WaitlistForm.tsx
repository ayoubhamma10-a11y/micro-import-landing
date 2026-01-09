import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, User, Globe, Wallet, CreditCard } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'

import { supabase } from '@/lib/supabase'
import {
  waitlistSchema,
  type WaitlistFormData,
  profilLabels,
  marchesOptions,
  budgetLabels,
  investissementLabels,
} from '@/lib/schema'

interface WaitlistFormProps {
  onSuccess: () => void
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      marches: [],
    },
  })

  const selectedMarches = watch('marches') || []
  const selectedProfil = watch('profil')
  const selectedBudget = watch('budget')
  const selectedInvestissement = watch('investissement')

  const toggleMarche = (marche: string) => {
    const current = selectedMarches
    const updated = current.includes(marche)
      ? current.filter((m) => m !== marche)
      : [...current, marche]
    setValue('marches', updated, { shouldValidate: true })
  }

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Insertion dans Supabase
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([
          {
            email: data.email,
            profil: data.profil,
            marches: data.marches,
            budget: data.budget,
            investissement: data.investissement,
          },
        ])

      if (insertError) {
        // Vérifier si c'est un doublon d'email
        if (insertError.code === '23505') {
          setError('Cette adresse email est déjà inscrite.')
        } else {
          throw insertError
        }
        return
      }

      onSuccess()
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err)
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Question 1 - Email */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>
            <Label className="text-lg font-semibold text-secondary-800">
              Votre adresse email
            </Label>
          </div>
          <Input
            type="email"
            placeholder="votre@email.com"
            {...register('email')}
            className="text-base"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Question 2 - Profil */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <Label className="text-lg font-semibold text-secondary-800">
              Où en êtes-vous dans la micro-importation ?
            </Label>
          </div>
          <RadioGroup
            value={selectedProfil}
            onValueChange={(value) => setValue('profil', value as WaitlistFormData['profil'], { shouldValidate: true })}
            className="space-y-3"
          >
            {Object.entries(profilLabels).map(([value, label]) => (
              <div
                key={value}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedProfil === value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-secondary-200 hover:border-primary-300'
                }`}
                onClick={() => setValue('profil', value as WaitlistFormData['profil'], { shouldValidate: true })}
              >
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value} className="cursor-pointer flex-1">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.profil && (
            <p className="mt-2 text-sm text-red-500">{errors.profil.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Question 3 - Marchés */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Globe className="w-5 h-5 text-primary-600" />
            </div>
            <Label className="text-lg font-semibold text-secondary-800">
              Où vous approvisionnez-vous ?
            </Label>
          </div>
          <p className="text-sm text-secondary-500 mb-4">
            Plusieurs choix possibles
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {marchesOptions.map((option) => (
              <div
                key={option.value}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedMarches.includes(option.value)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-secondary-200 hover:border-primary-300'
                }`}
                onClick={() => toggleMarche(option.value)}
              >
                <Checkbox
                  checked={selectedMarches.includes(option.value)}
                  onCheckedChange={() => toggleMarche(option.value)}
                />
                <Label className="cursor-pointer">{option.label}</Label>
              </div>
            ))}
          </div>
          {errors.marches && (
            <p className="mt-2 text-sm text-red-500">{errors.marches.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Question 4 - Budget */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Wallet className="w-5 h-5 text-primary-600" />
            </div>
            <Label className="text-lg font-semibold text-secondary-800">
              Quel est votre budget par voyage ?
            </Label>
          </div>
          <RadioGroup
            value={selectedBudget}
            onValueChange={(value) => setValue('budget', value as WaitlistFormData['budget'], { shouldValidate: true })}
            className="grid gap-3 sm:grid-cols-2"
          >
            {Object.entries(budgetLabels).map(([value, label]) => (
              <div
                key={value}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedBudget === value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-secondary-200 hover:border-primary-300'
                }`}
                onClick={() => setValue('budget', value as WaitlistFormData['budget'], { shouldValidate: true })}
              >
                <RadioGroupItem value={value} id={`budget-${value}`} />
                <Label htmlFor={`budget-${value}`} className="cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.budget && (
            <p className="mt-2 text-sm text-red-500">{errors.budget.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Question 5 - Investissement */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-primary-600" />
            </div>
            <Label className="text-lg font-semibold text-secondary-800">
              Combien seriez-vous prêt à investir pour cet outil ?
            </Label>
          </div>
          <p className="text-sm text-secondary-500 mb-4">
            Un outil qui gère vos calculs fiscaux et votre conformité
          </p>
          <RadioGroup
            value={selectedInvestissement}
            onValueChange={(value) => setValue('investissement', value as WaitlistFormData['investissement'], { shouldValidate: true })}
            className="grid gap-3 sm:grid-cols-2"
          >
            {Object.entries(investissementLabels).map(([value, label]) => (
              <div
                key={value}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedInvestissement === value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-secondary-200 hover:border-primary-300'
                }`}
                onClick={() => setValue('investissement', value as WaitlistFormData['investissement'], { shouldValidate: true })}
              >
                <RadioGroupItem value={value} id={`invest-${value}`} />
                <Label htmlFor={`invest-${value}`} className="cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.investissement && (
            <p className="mt-2 text-sm text-red-500">{errors.investissement.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Erreur globale */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Bouton de soumission */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full text-lg py-6"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Inscription en cours...
          </>
        ) : (
          "Rejoindre la liste d'attente"
        )}
      </Button>

      <p className="text-center text-sm text-secondary-500">
        Vos informations restent strictement confidentielles.
      </p>
    </form>
  )
}
