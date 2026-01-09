import { useState } from 'react'
import {
  Shield,
  Calculator,
  WifiOff,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Plane,
  Package,
  Receipt,
  Star,
  ChevronDown,
  ChevronUp,
  Zap,
  ArrowRight,
} from 'lucide-react'

import { WaitlistForm } from '@/components/WaitlistForm'
import { SuccessScreen } from '@/components/SuccessScreen'

function App() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (isSuccess) {
    return <SuccessScreen />
  }

  const painPoints = [
    {
      icon: AlertTriangle,
      title: "Calculs manuels risqués",
      description: "Une erreur de calcul peut vous coûter des milliers de dinars en pénalités douanières."
    },
    {
      icon: Receipt,
      title: "Plafonds difficiles à suivre",
      description: "1.8M DA par voyage, 2 voyages par mois... Facile de se tromper et de dépasser."
    },
    {
      icon: Clock,
      title: "Temps perdu en paperasse",
      description: "Des heures à jongler entre factures, taux de change et déclarations fiscales."
    }
  ]

  const solutions = [
    {
      icon: Calculator,
      title: "Calculs automatiques",
      description: "Droits de douane (5%), TVA, IFU (0.5%)... Tout est calculé instantanément.",
      highlight: "Zéro erreur"
    },
    {
      icon: Shield,
      title: "Alertes plafond",
      description: "Notification automatique quand vous approchez de vos limites légales.",
      highlight: "Protection garantie"
    },
    {
      icon: TrendingUp,
      title: "Analyse rentabilité",
      description: "Identifiez vos produits les plus rentables voyage après voyage.",
      highlight: "Décisions éclairées"
    },
    {
      icon: WifiOff,
      title: "Mode hors-ligne",
      description: "Utilisable partout : à l'aéroport, au marché de Yiwu, à Dubai...",
      highlight: "Toujours disponible"
    }
  ]

  const howItWorks = [
    {
      step: "01",
      icon: Plane,
      title: "Planifiez votre voyage",
      description: "Entrez votre destination et votre budget. L'app calcule automatiquement vos marges."
    },
    {
      step: "02",
      icon: Package,
      title: "Enregistrez vos achats",
      description: "Scannez ou saisissez vos produits. Les taxes sont calculées en temps réel."
    },
    {
      step: "03",
      icon: Receipt,
      title: "Générez vos documents",
      description: "Obtenez un récapitulatif complet pour la douane et votre comptabilité."
    }
  ]

  const testimonials = [
    {
      name: "Karim B.",
      location: "Alger",
      text: "Avant, je passais 2h à calculer mes marges. Maintenant c'est fait en 2 minutes.",
      rating: 5,
      trips: "15+ voyages/an"
    },
    {
      name: "Samira M.",
      location: "Oran",
      text: "J'ai failli dépasser mon plafond sans le savoir. L'alerte m'a sauvée d'une amende.",
      rating: 5,
      trips: "8 voyages/an"
    },
    {
      name: "Youcef T.",
      location: "Constantine",
      text: "Le mode hors-ligne est génial. Je peux tout faire depuis le marché en Chine.",
      rating: 5,
      trips: "20+ voyages/an"
    }
  ]

  const faqs = [
    {
      question: "C'est quoi exactement le régime 080101 ?",
      answer: "Le régime 080101 (décret 25-170) permet aux auto-entrepreneurs algériens d'importer des marchandises jusqu'à 1.8 million DA par voyage, avec un maximum de 2 voyages par mois. Les droits de douane sont de 5% + 0.5% de forfait IFU."
    },
    {
      question: "L'application est-elle gratuite ?",
      answer: "L'inscription à la liste d'attente est 100% gratuite. Le prix final de l'abonnement sera annoncé aux premiers inscrits avec une offre de lancement exclusive."
    },
    {
      question: "Quand l'application sera-t-elle disponible ?",
      answer: "Nous sommes en phase finale de développement. Les premiers utilisateurs de la liste d'attente auront accès en avant-première dans les prochaines semaines."
    },
    {
      question: "Mes données sont-elles sécurisées ?",
      answer: "Absolument. Vos données sont chiffrées et stockées de manière sécurisée. Nous ne partageons jamais vos informations avec des tiers."
    },
    {
      question: "L'app fonctionne-t-elle vraiment hors-ligne ?",
      answer: "Oui ! Toutes les fonctionnalités de calcul et de suivi fonctionnent sans connexion internet. Les données se synchronisent automatiquement quand vous retrouvez une connexion."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-secondary-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-white font-bold text-lg">ME</span>
            </div>
            <span className="font-semibold text-secondary-800 text-lg">
              Micro-Import Elite
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-secondary-500 bg-primary-50 px-3 py-1 rounded-full">
              Régime 080101
            </span>
            <a href="#waitlist" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              S'inscrire
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient py-16 sm:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* Badge urgence */}
              <div className="inline-flex items-center gap-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
                <Zap className="w-4 h-4" />
                Places limitées - 127 inscrits cette semaine
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                Fini les calculs sur papier.{' '}
                <span className="text-primary-600 relative">
                  Importez sereinement.
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M1 5.5C47.6667 2.16667 141.4 -2.4 199 5.5" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>

              <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
                L'outil tout-en-un pour les <strong>micro-importateurs algériens</strong> :
                calculs fiscaux automatiques, suivi des plafonds et conformité au décret 25-170.
                <span className="text-primary-600 font-semibold"> Même sans internet.</span>
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
                <div className="flex items-center gap-2 text-secondary-600">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-medium">100% conforme</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-600">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-medium">Données sécurisées</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-600">
                  <CheckCircle2 className="w-5 h-5 text-primary-500" />
                  <span className="text-sm font-medium">Support en arabe</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-white/50 backdrop-blur rounded-2xl">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-primary-600">1.8M</p>
                  <p className="text-xs sm:text-sm text-secondary-500">DA max/voyage</p>
                </div>
                <div className="text-center border-x border-secondary-200">
                  <p className="text-2xl sm:text-3xl font-bold text-primary-600">5%</p>
                  <p className="text-xs sm:text-sm text-secondary-500">Droits douane</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-primary-600">2</p>
                  <p className="text-xs sm:text-sm text-secondary-500">Voyages/mois</p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:pl-8" id="waitlist">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 relative">
                {/* Badge promo */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                  Accès prioritaire pour les premiers inscrits
                </div>

                <div className="text-center mb-8 mt-4">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                    Rejoignez la liste d'attente
                  </h2>
                  <p className="text-secondary-500">
                    Gratuit et sans engagement
                  </p>
                </div>

                <WaitlistForm onSuccess={() => setIsSuccess(true)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Problème */}
      <section className="py-16 bg-secondary-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-accent-400 font-medium text-sm uppercase tracking-wider">Le problème</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              La micro-importation, c'est rentable.{' '}
              <span className="text-secondary-400">Mais c'est aussi un casse-tête.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <div key={index} className="bg-secondary-800/50 rounded-xl p-6 border border-secondary-700">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p className="text-secondary-400">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Solution */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">La solution</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-2 mb-4">
              Micro-Import Elite gère tout pour vous
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Un assistant intelligent qui vous accompagne de la planification jusqu'au passage en douane.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <div key={index} className="group bg-secondary-50 rounded-xl p-6 hover:bg-primary-50 transition-colors border-2 border-transparent hover:border-primary-200">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <solution.icon className="w-6 h-6 text-primary-600" />
                </div>
                <span className="inline-block text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-1 rounded mb-3">
                  {solution.highlight}
                </span>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {solution.title}
                </h3>
                <p className="text-secondary-600 text-sm">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Comment ça marche */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">Simple comme bonjour</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-2 mb-4">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-lg relative z-10">
                  <span className="text-6xl font-bold text-primary-100 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary-600/30">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-secondary-600">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">Ils nous font confiance</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-2 mb-4">
              Ce que disent les micro-importateurs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-secondary-50 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-secondary-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-secondary-900">{testimonial.name}</p>
                    <p className="text-sm text-secondary-500">{testimonial.location}</p>
                  </div>
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    {testimonial.trips}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Réglementation */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary-900">Réglementation 080101</h3>
                <p className="text-secondary-500 text-sm">Décret exécutif n° 25-170</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <p className="text-2xl font-bold text-primary-700">1.800.000 DA</p>
                <p className="text-secondary-600 text-sm">Maximum par voyage</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <p className="text-2xl font-bold text-primary-700">2 voyages</p>
                <p className="text-secondary-600 text-sm">Maximum par mois</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <p className="text-2xl font-bold text-primary-700">5%</p>
                <p className="text-secondary-600 text-sm">Droits de douane</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                <p className="text-2xl font-bold text-primary-700">0,5%</p>
                <p className="text-secondary-600 text-sm">Forfait fiscal IFU</p>
              </div>
            </div>

            <p className="mt-6 text-secondary-500 text-sm text-center">
              Micro-Import Elite est conçu pour vous aider à respecter ces règles automatiquement.
            </p>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-2 mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-secondary-200 rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-secondary-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-secondary-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-secondary-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-secondary-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-secondary-50 border-t border-secondary-200">
                    <p className="text-secondary-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Prêt à simplifier votre micro-importation ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Rejoignez les centaines d'entrepreneurs qui ont déjà réservé leur place.
          </p>

          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg"
          >
            Rejoindre la liste d'attente
            <ArrowRight className="w-5 h-5" />
          </a>

          <p className="mt-6 text-primary-200 text-sm">
            Inscription gratuite - Pas de carte bancaire requise
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ME</span>
                </div>
                <span className="font-semibold text-lg">Micro-Import Elite</span>
              </div>
              <p className="text-secondary-400 text-sm">
                L'outil de gestion conçu spécifiquement pour les micro-importateurs algériens sous le régime 080101.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-secondary-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Guide du régime 080101</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Calculateur de taxes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-secondary-400 text-sm">
                <li>contact@microimport-elite.dz</li>
                <li>Alger, Algérie</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-400 text-sm">
              © {new Date().getFullYear()} Micro-Import Elite. Tous droits réservés.
            </p>
            <div className="text-sm text-secondary-400">
              Fait avec amour pour les entrepreneurs algériens
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
