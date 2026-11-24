import React from 'react'
import { motion } from 'motion/react'
import { Trophy, TrendingUp, Star, Target, User, Building2, Award, ChevronRight, Info } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Avatar } from '@components/ui/Avatar'
import { Badge } from '@components/ui/Badge'
import { NumberDisplay } from '@components/ui/NumberDisplay'
import { Tabs, TabPanel } from '@components/ui/Tabs'
import { formatCurrency, formatNumber } from '@utils/helpers'
import { DEMO_LEADERBOARD } from '@data/demoData'

const leaderboardTabs = [
  { id: 'valuation', label: 'Valuation', icon: TrendingUp },
  { id: 'xp', label: 'XP', icon: Star },
  { id: 'growth', label: 'Growth', icon: Target },
  { id: 'achievements', label: 'Achievements', icon: Award },
]

const categoryColors = {
  valuation: 'from-champagne-400 to-champagne-600',
  xp: 'from-purple-400 to-purple-600',
  growth: 'from-green-400 to-green-600',
  achievements: 'from-blue-400 to-blue-600',
}

export function Leaderboard() {
  const [activeTab, setActiveTab] = React.useState('valuation')

  const sortedLeaderboard = React.useMemo(() => {
    const sorted = [...DEMO_LEADERBOARD]
    switch (activeTab) {
      case 'valuation':
        return sorted.sort((a, b) => b.valuation - a.valuation)
      case 'xp':
        return sorted.sort((a, b) => b.xp - a.xp)
      case 'growth':
        return sorted.sort((a, b) => b.valuation / Math.max(1, a.valuation) - a.valuation / Math.max(1, b.valuation))
      case 'achievements':
        return sorted.sort((a, b) => b.achievements - a.achievements)
      default:
        return sorted
    }
  }, [activeTab])

  const currentUser = DEMO_LEADERBOARD.find(u => u.founderName === 'Alex Chen')
  const currentUserRank = sortedLeaderboard.findIndex(u => u.founderName === 'Alex Chen') + 1

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-display-md font-display font-bold text-ivory-100">Leaderboard</h1>
          <p className="text-body text-slate-400 mt-1">
            Compete with founders worldwide. Demo mode - fictional data.
          </p>
        </div>
        <div className="flex items-center gap-3 p-3 bg-graphite-800/50 rounded-xl border border-graphite-700">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-graphite-950" />
          </div>
          <div>
            <p className="text-caption text-slate-400">Your Rank</p>
            <p className="text-heading-lg font-display font-bold text-champagne-400">#{currentUserRank}</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={leaderboardTabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />

      {/* Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-graphite-800 bg-graphite-800/50">
                <th className="text-left p-4 text-caption text-slate-400 font-medium">Rank</th>
                <th className="text-left p-4 text-caption text-slate-400 font-medium">Founder</th>
                <th className="text-left p-4 text-caption text-slate-400 font-medium">Company</th>
                <th className="text-right p-4 text-caption text-slate-400 font-medium">
                  {activeTab === 'valuation' && 'Valuation'}
                  {activeTab === 'xp' && 'Total XP'}
                  {activeTab === 'growth' && 'Growth Rate'}
                  {activeTab === 'achievements' && 'Achievements'}
                </th>
                <th className="text-right p-4 text-caption text-slate-400 font-medium">Level</th>
                <th className="text-right p-4 text-caption text-slate-400 font-medium">Industry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-800/50">
              {sortedLeaderboard.map((entry, index) => {
                const rank = index + 1
                const isCurrentUser = entry.founderName === 'Alex Chen'

                let metricValue: string
                let metricColor: string
                switch (activeTab) {
                  case 'valuation':
                    metricValue = formatCurrency(entry.valuation)
                    metricColor = 'text-champagne-400'
                    break
                  case 'xp':
                    metricValue = formatNumber(entry.xp)
                    metricColor = 'text-purple-400'
                    break
                  case 'growth':
                    metricValue = `${((entry.valuation / 100000 - 1) * 100).toFixed(1)}%`
                    metricColor = 'text-success-400'
                    break
                  case 'achievements':
                    metricValue = entry.achievements.toString()
                    metricColor = 'text-blue-400'
                    break
                  default:
                    metricValue = ''
                    metricColor = ''
                }

                return (
                  <motion.tr
                    key={entry.founderName}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={cn('hover:bg-graphite-800/50 transition-colors', isCurrentUser && 'bg-champagne-400/5')}
                  >
                    <td className="p-4">
                      {rank <= 3 ? (
                        <div className={cn('flex items-center gap-2', `bg-gradient-to-r ${categoryColors[activeTab as keyof typeof categoryColors]} text-graphite-950 px-3 py-1 rounded-full font-bold`)}>
                          {rank === 1 && <Trophy className="w-4 h-4" />}
                          {rank === 2 && <Award className="w-4 h-4" />}
                          {rank === 3 && <Star className="w-4 h-4" />}
                          <span>#{rank}</span>
                        </div>
                      ) : (
                        <span className="font-mono text-body text-slate-400">#{rank}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar avatarId={entry.avatarId} size="md" />
                        <div>
                          <p className={cn('font-medium text-ivory-100', isCurrentUser && 'font-bold')}>
                            {entry.founderName}
                            {isCurrentUser && <span className="ml-2 text-caption text-champagne-400">(You)</span>}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-ivory-100">{entry.companyName}</p>
                    </td>
                    <td className="p-4 text-right">
                      <span className={cn('font-mono font-semibold', metricColor)}>{metricValue}</span>
                    </td>
                    <td className="p-4 text-right">
                      <Badge variant="champagne" className="text-caption">Lvl {entry.level}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Badge variant="default" className="bg-graphite-800 text-slate-300 border-graphite-700 text-capitalize">
                        {entry.industry.replace('-', ' ')}
                      </Badge>
                    </td>
                  </motion.tr>
                )}
            </tbody>
          </table>
        </div>

        {/* Current User Highlight */}
        {currentUser && currentUserRank > 10 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-graphite-800 p-4 bg-champagne-400/5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar avatarId={currentUser.avatarId} size="md" />
                <div>
                  <p className="font-medium text-ivory-100">{currentUser.founderName}</p>
                  <p className="text-caption text-slate-400">{currentUser.companyName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-champagne-400">#{currentUserRank}</p>
                <p className="text-caption text-slate-400">Your Position</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-4 border-champagne-400/20 bg-champagne-400/5"
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-champagne-400/20 flex items-center justify-center text-champagne-400 flex-shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-ivory-100 mb-1">Demo Mode Leaderboard</h3>
            <p className="text-body-sm text-slate-400">
              This leaderboard shows fictional sample profiles for demonstration purposes. In a future multiplayer version,
              this would display real founders competing globally. Your progress is saved locally in your browser.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard label="Total Founders" value={DEMO_LEADERBOARD.length} format="number" icon={<User className="w-6 h-6" />} />
        <StatCard label="Avg. Valuation" value={Math.round(DEMO_LEADERBOARD.reduce((sum, u) => sum + u.valuation, 0) / DEMO_LEADERBOARD.length)} format="currency" icon={<Building2 className="w-6 h-6" />} color="champagne" />
        <StatCard label="Avg. Level" value={Math.round(DEMO_LEADERBOARD.reduce((sum, u) => sum + u.level, 0) / DEMO_LEADERBOARD.length)} format="number" icon={<Star className="w-6 h-6" />} color="success" />
        <StatCard label="Total Achievements" value={DEMO_LEADERBOARD.reduce((sum, u) => sum + u.achievements, 0)} format="number" icon={<Award className="w-6 h-6" />} color="champagne" />
      </motion.div>
    </div>
  )
}

function StatCard({ label, value, format = 'currency', icon, color = 'default' }: { label: string; value: number; format?: 'currency' | 'number'; icon: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    default: 'text-ivory-100',
    champagne: 'text-champagne-400',
    success: 'text-success-400',
    danger: 'text-danger-400',
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption text-slate-400">{label}</p>
          <NumberDisplay value={value} format={format as any} size="lg" color={color as any} className="block" />
        </div>
        <div className="text-champagne-400">{icon}</div>
      </div>
    </Card>
  )
}
