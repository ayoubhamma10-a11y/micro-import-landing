import { useState, useEffect, useRef } from 'react'
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
  ArrowRight,
  Sparkles,
  Crown,
  Zap,
} from 'lucide-react'

import { WaitlistForm } from '@/components/WaitlistForm'
import { SuccessScreen } from '@/components/SuccessScreen'
import { SpotsCounter } from '@/components/SpotsCounter'

// Hook pour les animations au scroll
function useScrollAnimation() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return visibleElements
}

function App() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const visibleElements = useScrollAnimation()

  if (isSuccess) {
    return <SuccessScreen />
  }

  const painPoints = [
    {
      icon: AlertTriangle,
      title: "Calculs manuels risques",
      description: "Une erreur de calcul peut vous couter des milliers de dinars en penalites douanieres."
    },
    {
      icon: Receipt,
      title: "Plafonds difficiles a suivre",
      description: "1.8M DA par voyage, 2 voyages par mois... Facile de se tromper et de depasser."
    },
    {
      icon: Clock,
      title: "Temps perdu en paperasse",
      description: "Des heures a jongler entre factures, taux de change et declarations fiscales."
    }
  ]

  const solutions = [
    {
      icon: Calculator,
      title: "Calculs automatiques",
      description: "Droits de douane (5%), TVA, IFU (0.5%)... Tout est calcule instantanement.",
      highlight: "Zero erreur"
    },
    {
      icon: Shield,
      title: "Alertes plafond",
      description: "Notification automatique quand vous approchez de vos limites legales.",
      highlight: "Protection garantie"
    },
    {
      icon: TrendingUp,
      title: "Analyse rentabilite",
      description: "Identifiez vos produits les plus rentables voyage apres voyage.",
      highlight: "Decisions eclairees"
    },
    {
      icon: WifiOff,
      title: "Mode hors-ligne",
      description: "Utilisable partout : a l'aeroport, au marche de Yiwu, a Dubai...",
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
      description: "Scannez ou saisissez vos produits. Les taxes sont calculees en temps reel."
    },
    {
      step: "03",
      icon: Receipt,
      title: "Generez vos documents",
      description: "Obtenez un recapitulatif complet pour la douane et votre comptabilite."
    }
  ]

  const testimonials = [
    {
      name: "Karim B.",
      location: "Alger",
      text: "Avant, je passais 2h a calculer mes marges. Maintenant c'est fait en 2 minutes.",
      rating: 5,
      trips: "15+ voyages/an"
    },
    {
      name: "Samira M.",
      location: "Oran",
      text: "J'ai failli depasser mon plafond sans le savoir. L'alerte m'a sauvee d'une amende.",
      rating: 5,
      trips: "8 voyages/an"
    },
    {
      name: "Youcef T.",
      location: "Constantine",
      text: "Le mode hors-ligne est genial. Je peux tout faire depuis le marche en Chine.",
      rating: 5,
      trips: "20+ voyages/an"
    }
  ]

  const faqs = [
    {
      question: "C'est quoi exactement le regime 080101 ?",
      answer: "Le regime 080101 (decret 25-170) permet aux auto-entrepreneurs algeriens d'importer des marchandises jusqu'a 1.8 million DA par voyage, avec un maximum de 2 voyages par mois. Les droits de douane sont de 5% + 0.5% de forfait IFU."
    },
    {
      question: "L'application est-elle gratuite ?",
      answer: "L'inscription a la liste d'attente est 100% gratuite. Le prix final de l'abonnement sera annonce aux premiers inscrits avec une offre de lancement exclusive."
    },
    {
      question: "Quand l'application sera-t-elle disponible ?",
      answer: "Nous sommes en phase finale de developpement. Les premiers utilisateurs de la liste d'attente auront acces en avant-premiere dans les prochaines semaines."
    },
    {
      question: "Mes donnees sont-elles securisees ?",
      answer: "Absolument. Vos donnees sont chiffrees et stockees de maniere securisee. Nous ne partageons jamais vos informations avec des tiers."
    },
    {
      question: "L'app fonctionne-t-elle vraiment hors-ligne ?",
      answer: "Oui ! Toutes les fonctionnalites de calcul et de suivi fonctionnent sans connexion internet. Les donnees se synchronisent automatiquement quand vous retrouvez une connexion."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-primary-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 icon-gradient rounded-xl flex items-center justify-center shadow-lg animate-pulse-glow">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-secondary-900 text-lg leading-tight">
                Micro-Import
              </span>
              <span className="text-xs font-semibold text-gradient uppercase tracking-wider">
                Elite
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-2 text-sm text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-200">
              <Sparkles className="w-4 h-4" />
              Regime 080101
            </span>
            <a href="#waitlist" className="btn-elite text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-shadow">
              S'inscrire
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient py-16 sm:py-24 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl floating" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl floating-delayed" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              {/* Badge urgence dynamique */}
              <SpotsCounter className="mb-6" />

              {/* Elite Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-elite-600 text-white rounded-full text-sm font-medium mb-6 shadow-lg badge-shine">
                <Crown className="w-4 h-4" />
                <span>Experience Premium</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                Fini les calculs sur papier.{' '}
                <span className="text-gradient relative inline-block">
                  Importez sereinement.
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M1 5.5C47.6667 2.16667 141.4 -2.4 199 5.5" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                        <stop offset="0%" stopColor="#6366f1"/>
                        <stop offset="50%" stopColor="#a855f7"/>
                        <stop offset="100%" stopColor="#f59e0b"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
                L'outil tout-en-un pour les <strong className="text-primary-700">micro-importateurs algeriens</strong> :
                calculs fiscaux automatiques, suivi des plafonds et conformite au decret 25-170.
                <span className="text-gradient font-semibold"> Meme sans internet.</span>
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
                <div className="flex items-center gap-2 text-secondary-600 group">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium">100% conforme</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-600 group">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium">Donnees securisees</span>
                </div>
                <div className="flex items-center gap-2 text-secondary-600 group">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium">Support en arabe</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-5 glass-card rounded-2xl border border-primary-100">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gradient">1.8M</p>
                  <p className="text-xs sm:text-sm text-secondary-500">DA max/voyage</p>
                </div>
                <div className="text-center border-x border-primary-100">
                  <p className="text-2xl sm:text-3xl font-bold text-gradient">5%</p>
                  <p className="text-xs sm:text-sm text-secondary-500">Droits douane</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gradient">2</p>
                  <p className="text-xs sm:text-sm text-secondary-500">Voyages/mois</p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:pl-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }} id="waitlist">
              <div className="bg-white rounded-2xl shadow-elite p-6 sm:p-8 relative border border-primary-100">
                {/* Badge promo */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 btn-gold text-white px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap shadow-gold badge-shine">
                  <Zap className="w-4 h-4 inline mr-1" />
                  Acces prioritaire pour les premiers inscrits
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

              {/* Compteur de places */}
              <SpotsCounter variant="card" className="mt-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Section Probleme */}
      <section
        id="problem-section"
        data-animate
        className={`py-16 elite-dark-gradient text-white relative overflow-hidden transition-all duration-700 ${
          visibleElements.has('problem-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent-400 font-medium text-sm uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Le probleme
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              La micro-importation, c'est rentable.{' '}
              <span className="text-primary-300">Mais c'est aussi un casse-tete.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="glass-card-dark rounded-xl p-6 card-hover group"
              >
                <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <point.icon className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p className="text-primary-200/80">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Solution */}
      <section
        id="solution-section"
        data-animate
        className={`py-20 bg-white relative overflow-hidden transition-all duration-700 ${
          visibleElements.has('solution-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              La solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-3 mb-4">
              Micro-Import <span className="text-gradient">Elite</span> gere tout pour vous
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Un assistant intelligent qui vous accompagne de la planification jusqu'au passage en douane.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="group bg-secondary-50 rounded-xl p-6 card-hover-glow border-2 border-transparent hover:border-primary-200 hover:bg-primary-50/50"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary-600/30">
                  <solution.icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <span className="inline-block text-xs font-bold text-primary-700 bg-primary-100 px-3 py-1 rounded-full mb-3 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {solution.highlight}
                </span>
                <h3 className="text-lg font-bold text-secondary-900 mb-2">
                  {solution.title}
                </h3>
                <p className="text-secondary-600 text-sm">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Comment ca marche */}
      <section
        id="how-section"
        data-animate
        className={`py-20 gradient-bg relative overflow-hidden transition-all duration-700 ${
          visibleElements.has('how-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-accent-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-primary-400/10 rounded-full blur-2xl" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              Simple comme bonjour
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-3 mb-4">
              Comment ca marche ?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-2xl p-6 shadow-elite relative z-10 card-hover border border-primary-100">
                  <span className="text-7xl font-black text-primary-100/50 absolute top-2 right-4 group-hover:text-primary-200/50 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-16 h-16 icon-gradient rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-secondary-600">{item.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-primary-400 to-primary-200 rounded z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Temoignages */}
      <section
        id="testimonials-section"
        data-animate
        className={`py-20 bg-white relative transition-all duration-700 ${
          visibleElements.has('testimonials-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm uppercase tracking-wider">
              <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
              Ils nous font confiance
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-3 mb-4">
              Ce que disent les micro-importateurs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-secondary-50 to-primary-50/30 rounded-2xl p-6 card-hover border border-primary-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-secondary-700 mb-4 italic text-lg">"{testimonial.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-primary-100">
                  <div>
                    <p className="font-bold text-secondary-900">{testimonial.name}</p>
                    <p className="text-sm text-secondary-500">{testimonial.location}</p>
                  </div>
                  <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1.5 rounded-full font-semibold">
                    {testimonial.trips}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Reglementation */}
      <section
        id="regulation-section"
        data-animate
        className={`py-20 gradient-bg transition-all duration-700 ${
          visibleElements.has('regulation-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-elite border border-primary-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 icon-gradient rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary-900">Reglementation 080101</h3>
                <p className="text-secondary-500">Decret executif n 25-170</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 card-hover group">
                <p className="text-2xl font-black text-gradient">1.800.000 DA</p>
                <p className="text-secondary-600 text-sm mt-1">Maximum par voyage</p>
              </div>
              <div className="p-5 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 card-hover group">
                <p className="text-2xl font-black text-gradient">2 voyages</p>
                <p className="text-secondary-600 text-sm mt-1">Maximum par mois</p>
              </div>
              <div className="p-5 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 card-hover group">
                <p className="text-2xl font-black text-gradient">5%</p>
                <p className="text-secondary-600 text-sm mt-1">Droits de douane</p>
              </div>
              <div className="p-5 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 card-hover group">
                <p className="text-2xl font-black text-gradient">0,5%</p>
                <p className="text-secondary-600 text-sm mt-1">Forfait fiscal IFU</p>
              </div>
            </div>

            <p className="mt-8 text-secondary-500 text-sm text-center">
              Micro-Import Elite est concu pour vous aider a respecter ces regles automatiquement.
            </p>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section
        id="faq-section"
        data-animate
        className={`py-20 bg-white transition-all duration-700 ${
          visibleElements.has('faq-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mt-3 mb-4">
              Questions frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'border-primary-300 shadow-lg' : 'border-secondary-200 hover:border-primary-200'
                }`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between bg-white hover:bg-primary-50/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-bold text-secondary-900">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    openFaq === index ? 'bg-primary-600 rotate-180' : 'bg-primary-100'
                  }`}>
                    <ChevronDown className={`w-5 h-5 transition-colors ${
                      openFaq === index ? 'text-white' : 'text-primary-600'
                    }`} />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-6 py-5 bg-primary-50/50 border-t border-primary-100">
                    <p className="text-secondary-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="py-20 elite-dark-gradient text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl floating" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl floating-delayed" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-white/20">
            <Crown className="w-4 h-4 text-accent-400" />
            <span>Offre de lancement limitee</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Pret a simplifier votre <span className="text-gradient-gold">micro-importation</span> ?
          </h2>
          <p className="text-xl text-primary-200 mb-10">
            Rejoignez les centaines d'entrepreneurs qui ont deja reserve leur place.
          </p>

          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 btn-gold text-secondary-900 px-10 py-5 rounded-xl text-lg font-bold hover:shadow-gold transition-all shadow-lg group"
          >
            Rejoindre la liste d'attente
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="mt-8 text-primary-300 text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Inscription gratuite - Pas de carte bancaire requise
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 icon-gradient rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg leading-tight">Micro-Import</span>
                  <span className="text-xs font-semibold text-primary-400 uppercase tracking-wider">Elite</span>
                </div>
              </div>
              <p className="text-secondary-400 text-sm">
                L'outil de gestion concu specifiquement pour les micro-importateurs algeriens sous le regime 080101.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-secondary-400 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Guide du regime 080101</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Calculateur de taxes</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-secondary-400 text-sm">
                <li>contact@microimport-elite.dz</li>
                <li>Alger, Algerie</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-400 text-sm">
              {new Date().getFullYear()} Micro-Import Elite. Tous droits reserves.
            </p>
            <div className="flex items-center gap-2 text-sm text-secondary-400">
              <Sparkles className="w-4 h-4 text-accent-400" />
              Fait avec passion pour les entrepreneurs algeriens
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
