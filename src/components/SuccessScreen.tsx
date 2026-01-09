import { CheckCircle2, Mail, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function SuccessScreen() {
  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <Card className="max-w-lg w-full border-0 shadow-xl animate-fade-in">
        <CardContent className="pt-12 pb-12 text-center">
          {/* Icône de succès */}
          <div className="mx-auto w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-primary-600" />
          </div>

          {/* Titre */}
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Inscription confirmée !
          </h1>

          {/* Sous-titre en arabe */}
          <p className="text-xl text-primary-600 font-arabic mb-6">
            مرحبا بك
          </p>

          {/* Message principal */}
          <p className="text-secondary-600 mb-8 leading-relaxed">
            Vous faites désormais partie des premiers utilisateurs de{' '}
            <span className="font-semibold text-primary-700">Micro-Import Elite</span>.
          </p>

          {/* Étapes suivantes */}
          <div className="bg-secondary-50 rounded-xl p-6 text-left mb-8">
            <h2 className="font-semibold text-secondary-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary-600" />
              Prochaines étapes
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-secondary-600 text-sm">
                  Un email de confirmation vous a été envoyé
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-secondary-600 text-sm">
                  Vous recevrez votre invitation personnelle dès que votre accès sera activé
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-secondary-600 text-sm">
                  Pensez à vérifier vos spams
                </span>
              </li>
            </ul>
          </div>

          {/* Message de confidentialité */}
          <p className="text-sm text-secondary-400">
            Vos informations restent strictement confidentielles.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
