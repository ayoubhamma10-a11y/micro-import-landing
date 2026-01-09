import { CheckCircle2, Mail, ArrowRight, Crown, Sparkles, PartyPopper } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function SuccessScreen() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl floating" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl floating-delayed" />

      <Card className="max-w-lg w-full border-0 shadow-elite animate-fade-in-up relative">
        {/* Confetti effect badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 btn-gold text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-gold flex items-center gap-2">
          <PartyPopper className="w-4 h-4" />
          Felicitations !
        </div>

        <CardContent className="pt-14 pb-12 text-center">
          {/* Icone de succes */}
          <div className="mx-auto w-24 h-24 icon-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-scale-in">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>

          {/* Titre */}
          <h1 className="text-3xl font-black text-secondary-900 mb-4">
            Inscription confirmee !
          </h1>

          {/* Sous-titre en arabe */}
          <p className="text-2xl text-gradient font-arabic mb-6 font-bold">
            مرحبا بك
          </p>

          {/* Message principal */}
          <p className="text-secondary-600 mb-8 leading-relaxed text-lg">
            Vous faites desormais partie des premiers utilisateurs de{' '}
            <span className="font-bold text-gradient inline-flex items-center gap-1">
              <Crown className="w-4 h-4" />
              Micro-Import Elite
            </span>.
          </p>

          {/* Etapes suivantes */}
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 text-left mb-8 border border-primary-100">
            <h2 className="font-bold text-secondary-800 mb-5 flex items-center gap-3 text-lg">
              <div className="p-2 icon-gradient rounded-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              Prochaines etapes
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-secondary-600">
                  Un email de confirmation vous a ete envoye
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-secondary-600">
                  Vous recevrez votre invitation personnelle des que votre acces sera active
                </span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-secondary-600">
                  Pensez a verifier vos spams
                </span>
              </li>
            </ul>
          </div>

          {/* Message de confidentialite */}
          <p className="text-sm text-secondary-400 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-500" />
            Vos informations restent strictement confidentielles.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
