import { useState } from 'react'
import {
  Shield,
  Calculator,
  Globe2,
  WifiOff,
  TrendingUp,
  Clock,
} from 'lucide-react'

import { WaitlistForm } from '@/components/WaitlistForm'
import { SuccessScreen } from '@/components/SuccessScreen'

function App() {
  const [isSuccess, setIsSuccess] = useState(false)

  // Si inscription réussie, afficher l'écran de succès
  if (isSuccess) {
    return <SuccessScreen />
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-secondary-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">ME</span>
            </div>
            <span className="font-semibold text-secondary-800 text-lg">
              Micro-Import Elite
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-sm text-secondary-500 bg-primary-50 px-3 py-1 rounded-full">
              Code 080101
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte principal */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Accès limité aux premiers inscrits
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6 leading-tight text-balance">
                L'outil de gestion pour{' '}
                <span className="text-primary-600">micro-importateurs</span>{' '}
                algériens
              </h1>

              <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
                Gérez vos voyages, calculez vos taxes automatiquement et restez
                conforme au décret 25-170. Simple. Fiable. Conçu pour vous.
              </p>

              {/* Points clés */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, text: 'Conformité automatique' },
                  { icon: Calculator, text: 'Calculs fiscaux précis' },
                  { icon: Globe2, text: 'Multi-devises intégré' },
                  { icon: WifiOff, text: 'Fonctionne hors ligne' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-secondary-700"
                  >
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start text-center">
                <div>
                  <p className="text-3xl font-bold text-primary-600">1.8M DA</p>
                  <p className="text-sm text-secondary-500">Plafond par voyage</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-600">5 devises</p>
                  <p className="text-sm text-secondary-500">Supportées</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-600">100%</p>
                  <p className="text-sm text-secondary-500">Conforme</p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                    Rejoignez la liste d'attente
                  </h2>
                  <p className="text-secondary-500">
                    Places limitées • Inscription gratuite
                  </p>
                </div>

                <WaitlistForm onSuccess={() => setIsSuccess(true)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Pourquoi Micro-Import Elite ?
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Un outil pensé par et pour les micro-importateurs algériens,
              conforme au décret 25-170.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Zéro risque fiscal',
                description:
                  'Vos plafonds surveillés automatiquement. Plus jamais de dépassement par inadvertance.',
              },
              {
                icon: TrendingUp,
                title: 'Rentabilité claire',
                description:
                  'Identifiez vos produits les plus rentables. Prenez les bonnes décisions.',
              },
              {
                icon: Clock,
                title: 'Gain de temps',
                description:
                  'Fini les calculs manuels. Droits de douane et taxes calculés en un clic.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-secondary-50 rounded-xl p-6 card-hover"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Légal */}
      <section className="py-12 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-secondary-800 mb-4">
              Réglementation 080101
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-primary-600 font-semibold">1.800.000 DA</p>
                <p className="text-secondary-500">Maximum par voyage</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-primary-600 font-semibold">2 voyages</p>
                <p className="text-secondary-500">Maximum par mois</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-primary-600 font-semibold">5%</p>
                <p className="text-secondary-500">Droits de douane</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-lg">
                <p className="text-primary-600 font-semibold">0,5%</p>
                <p className="text-secondary-500">Forfait fiscal IFU</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">ME</span>
              </div>
              <span className="font-semibold text-lg">Micro-Import Elite</span>
            </div>

            <p className="text-secondary-400 text-sm text-center">
              © {new Date().getFullYear()} Micro-Import Elite. Tous droits
              réservés.
            </p>

            <div className="text-sm text-secondary-400">
              Conçu pour les auto-entrepreneurs algériens 🇩🇿
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
