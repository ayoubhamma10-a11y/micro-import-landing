import { useState, useEffect } from 'react'
import { Users, TrendingDown, Flame, Sparkles } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface SpotsCounterProps {
      className?: string
      variant?: 'badge' | 'card'
}

const MAX_SPOTS = 500

export function SpotsCounter({ className = '', variant = 'badge' }: SpotsCounterProps) {
      const [spots, setSpots] = useState<number | null>(null)
      const [recentSignups, setRecentSignups] = useState(0)
      const [loading, setLoading] = useState(true)

  useEffect(() => {
          async function fetchStats() {
                    try {
                                const { data, error } = await supabase
                                  .from('waitlist_stats')
                                  .select('total_subscribers, last_7d')
                                  .single()

                      if (error) {
                                    console.error('Error fetching stats:', error)
                                    setSpots(MAX_SPOTS)
                                    setRecentSignups(0)
                      } else if (data) {
                                    const remaining = MAX_SPOTS - (data.total_subscribers || 0)
                                    setSpots(Math.max(remaining, 0))
                                    setRecentSignups(data.last_7d || 0)
                      } else {
                                    setSpots(MAX_SPOTS)
                                    setRecentSignups(0)
                      }
                    } catch (err) {
                                console.error('Error:', err)
                                setSpots(MAX_SPOTS)
                                setRecentSignups(0)
                    } finally {
                                setLoading(false)
                    }
          }

                fetchStats()
          const interval = setInterval(fetchStats, 30000)
          return () => clearInterval(interval)
  }, [])

  if (loading || spots === null) return null

  const urgencyLevel = spots < 100 ? 'high' : spots < 200 ? 'medium' : 'low'

  if (variant === 'card') {
          return (
                    <div className={`bg-white rounded-2xl p-5 shadow-elite border-2 ${
                                urgencyLevel === 'high' ? 'border-red-300' :
                                urgencyLevel === 'medium' ? 'border-accent-300' :
                                'border-primary-200'
                    } ${className}`}>
                                <div className="flex items-center justify-between mb-4">
                                          <div className="flex items-center gap-3">
                                                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                      urgencyLevel === 'high' ? 'bg-red-100' :
                                      urgencyLevel === 'medium' ? 'bg-accent-100' :
                                      'bg-primary-100'
                    }`}>
                                                                    <Users className={`w-5 h-5 ${
                                        urgencyLevel === 'high' ? 'text-red-600' :
                                        urgencyLevel === 'medium' ? 'text-accent-600' :
                                        'text-primary-600'
                    }`} />
                                                      </div>div>
                                                      <span className="font-semibold text-secondary-700">Places restantes</span>span>
                                          </div>div>
                                    {urgencyLevel === 'high' && (
                                    <span className="flex items-center gap-1.5 text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-bold animate-pulse">
                                                  <Flame className="w-3.5 h-3.5" />
                                                  Presque complet
                                    </span>span>
                                          )}
                                </div>div>
                    
                            <div className="flex items-end gap-3 mb-3">
                                      <span className={`text-5xl font-black ${
                                    urgencyLevel === 'high' ? 'text-red-600' :
                                    urgencyLevel === 'medium' ? 'text-accent-600' :
                                    'text-gradient'
                    }`}>
                                          {spots}
                                      </span>span>
                                      <span className="text-secondary-400 text-lg mb-1 font-medium">/ {MAX_SPOTS}</span>span>
                            </div>div>
                    
                            <div className="w-full bg-secondary-100 rounded-full h-3 mb-4 overflow-hidden">
                                      <div
                                                      className={`h-3 rounded-full transition-all duration-500 ${
                                                                        urgencyLevel === 'high' ? 'bg-gradient-to-r from-red-500 to-red-400' :
                                                                        urgencyLevel === 'medium' ? 'bg-gradient-to-r from-accent-500 to-accent-400' :
                                                                        'bg-gradient-to-r from-primary-600 to-primary-400'
                                                      }`}
                                                      style={{ width: `${((MAX_SPOTS - spots) / MAX_SPOTS) * 100}%` }}
                                                    />
                            </div>div>
                    
                        {recentSignups > 0 && (
                                  <div className="flex items-center gap-2 text-sm text-secondary-500">
                                              <TrendingDown className="w-4 h-4" />
                                              <span><strong className="text-secondary-700">{recentSignups}</strong>strong> inscrits cette semaine</span>span>
                                  </div>div>
                            )}
                    </div>div>
                  )
  }
    
      return (
              <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg ${
                        urgencyLevel === 'high' ? 'bg-gradient-to-r from-red-500 to-red-400 text-white' :
                        urgencyLevel === 'medium' ? 'bg-gradient-to-r from-accent-500 to-accent-400 text-white' :
                        'bg-gradient-to-r from-primary-600 to-primary-500 text-white'
              } ${className}`}>
                    <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                          urgencyLevel === 'high' ? 'bg-white' :
                          urgencyLevel === 'medium' ? 'bg-white' :
                          'bg-white'
              }`} />
                    <span className="flex items-center gap-1.5">
                        {urgencyLevel === 'high' && <Flame className="w-4 h-4" />}
                        {urgencyLevel === 'low' && <Sparkles className="w-4 h-4" />}
                            Plus que <strong className="font-black">{spots}</strong>strong> places disponibles
                    </span>span>
              </div>div>
            )
}</div>
