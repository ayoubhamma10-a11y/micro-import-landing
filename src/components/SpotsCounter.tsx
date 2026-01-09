import { useState, useEffect } from 'react'
import { Users, TrendingDown, Flame, Sparkles } from 'lucide-react'

interface SpotsCounterProps {
  className?: string
  variant?: 'badge' | 'card'
}

export function SpotsCounter({ className = '', variant = 'badge' }: SpotsCounterProps) {
  const [spots, setSpots] = useState<number | null>(null)
  const [recentSignups, setRecentSignups] = useState(0)

  useEffect(() => {
    // Simuler un nombre de places base sur la date (pour avoir de la coherence)
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)

    // Base de 500 places, diminue progressivement
    const baseSpots = 500
    const taken = Math.floor(dayOfYear * 1.7) + Math.floor(today.getHours() * 0.3)
    const remaining = Math.max(baseSpots - taken, 47) // Ne jamais descendre sous 47

    setSpots(remaining)

    // Nombre d'inscrits cette semaine (simule)
    const weekSignups = Math.floor(Math.random() * 30) + 85
    setRecentSignups(weekSignups)

    // Mise a jour periodique pour simuler l'activite
    const interval = setInterval(() => {
      setSpots(prev => {
        if (prev === null || prev <= 47) return prev
        // 20% de chance de perdre une place toutes les 30 secondes
        return Math.random() > 0.8 ? prev - 1 : prev
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (spots === null) return null

  const urgencyLevel = spots < 100 ? 'high' : spots < 200 ? 'medium' : 'low'

  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-2xl p-5 shadow-elite border-2 ${
        urgencyLevel === 'high' ? 'border-red-300' :
        urgencyLevel === 'medium' ? 'border-accent-300' : 'border-primary-200'
      } ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              urgencyLevel === 'high' ? 'bg-red-100' :
              urgencyLevel === 'medium' ? 'bg-accent-100' : 'bg-primary-100'
            }`}>
              <Users className={`w-5 h-5 ${
                urgencyLevel === 'high' ? 'text-red-600' :
                urgencyLevel === 'medium' ? 'text-accent-600' : 'text-primary-600'
              }`} />
            </div>
            <span className="font-semibold text-secondary-700">Places restantes</span>
          </div>
          {urgencyLevel === 'high' && (
            <span className="flex items-center gap-1.5 text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-bold animate-pulse">
              <Flame className="w-3.5 h-3.5" />
              Presque complet
            </span>
          )}
        </div>

        <div className="flex items-end gap-3 mb-3">
          <span className={`text-5xl font-black ${
            urgencyLevel === 'high' ? 'text-red-600' :
            urgencyLevel === 'medium' ? 'text-accent-600' : 'text-gradient'
          }`}>
            {spots}
          </span>
          <span className="text-secondary-400 text-lg mb-1 font-medium">/ 500</span>
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-secondary-100 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              urgencyLevel === 'high' ? 'bg-gradient-to-r from-red-500 to-red-400' :
              urgencyLevel === 'medium' ? 'bg-gradient-to-r from-accent-500 to-accent-400' : 'bg-gradient-to-r from-primary-600 to-primary-400'
            }`}
            style={{ width: `${((500 - spots) / 500) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-secondary-500">
          <TrendingDown className="w-4 h-4" />
          <span><strong className="text-secondary-700">{recentSignups}</strong> inscrits cette semaine</span>
        </div>
      </div>
    )
  }

  // Badge variant (par defaut)
  return (
    <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg ${
      urgencyLevel === 'high'
        ? 'bg-gradient-to-r from-red-500 to-red-400 text-white'
        : urgencyLevel === 'medium'
        ? 'bg-gradient-to-r from-accent-500 to-accent-400 text-white'
        : 'bg-gradient-to-r from-primary-600 to-primary-500 text-white'
    } ${className}`}>
      <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
        urgencyLevel === 'high' ? 'bg-white' :
        urgencyLevel === 'medium' ? 'bg-white' : 'bg-white'
      }`} />
      <span className="flex items-center gap-1.5">
        {urgencyLevel === 'high' && <Flame className="w-4 h-4" />}
        {urgencyLevel === 'low' && <Sparkles className="w-4 h-4" />}
        Plus que <strong className="font-black">{spots}</strong> places disponibles
      </span>
    </div>
  )
}
