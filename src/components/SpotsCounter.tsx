import { useState, useEffect } from 'react'
import { Users, TrendingDown } from 'lucide-react'

interface SpotsCounterProps {
  className?: string
  variant?: 'badge' | 'card'
}

export function SpotsCounter({ className = '', variant = 'badge' }: SpotsCounterProps) {
  const [spots, setSpots] = useState<number | null>(null)
  const [recentSignups, setRecentSignups] = useState(0)

  useEffect(() => {
    // Simuler un nombre de places basé sur la date (pour avoir de la cohérence)
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)

    // Base de 500 places, diminue progressivement
    const baseSpots = 500
    const taken = Math.floor(dayOfYear * 1.7) + Math.floor(today.getHours() * 0.3)
    const remaining = Math.max(baseSpots - taken, 47) // Ne jamais descendre sous 47

    setSpots(remaining)

    // Nombre d'inscrits cette semaine (simulé)
    const weekSignups = Math.floor(Math.random() * 30) + 85
    setRecentSignups(weekSignups)

    // Mise à jour périodique pour simuler l'activité
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
      <div className={`bg-white rounded-xl p-4 shadow-lg border-2 ${
        urgencyLevel === 'high' ? 'border-red-200' :
        urgencyLevel === 'medium' ? 'border-accent-200' : 'border-primary-200'
      } ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className={`w-5 h-5 ${
              urgencyLevel === 'high' ? 'text-red-500' :
              urgencyLevel === 'medium' ? 'text-accent-500' : 'text-primary-500'
            }`} />
            <span className="text-sm font-medium text-secondary-600">Places restantes</span>
          </div>
          {urgencyLevel === 'high' && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full animate-pulse">
              Presque complet
            </span>
          )}
        </div>

        <div className="flex items-end gap-2 mb-2">
          <span className={`text-4xl font-bold ${
            urgencyLevel === 'high' ? 'text-red-600' :
            urgencyLevel === 'medium' ? 'text-accent-600' : 'text-primary-600'
          }`}>
            {spots}
          </span>
          <span className="text-secondary-500 mb-1">/ 500</span>
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-secondary-100 rounded-full h-2 mb-3">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              urgencyLevel === 'high' ? 'bg-red-500' :
              urgencyLevel === 'medium' ? 'bg-accent-500' : 'bg-primary-500'
            }`}
            style={{ width: `${((500 - spots) / 500) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-1 text-xs text-secondary-500">
          <TrendingDown className="w-3 h-3" />
          <span>{recentSignups} inscrits cette semaine</span>
        </div>
      </div>
    )
  }

  // Badge variant (par défaut)
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
      urgencyLevel === 'high'
        ? 'bg-red-100 text-red-700'
        : urgencyLevel === 'medium'
        ? 'bg-accent-100 text-accent-700'
        : 'bg-primary-100 text-primary-700'
    } ${className}`}>
      <span className={`w-2 h-2 rounded-full animate-pulse ${
        urgencyLevel === 'high' ? 'bg-red-500' :
        urgencyLevel === 'medium' ? 'bg-accent-500' : 'bg-primary-500'
      }`} />
      <span>Plus que <strong>{spots}</strong> places disponibles</span>
    </div>
  )
}
