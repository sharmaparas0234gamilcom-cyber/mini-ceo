import React from 'react'
import { motion } from 'motion/react'
import { Building2, Award, TrendingUp, Calendar, Target, Star, CheckCircle, Lock } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Avatar } from '@components/ui/Avatar'
import { Badge } from '@components/ui/Badge'
import { Progress } from '@components/ui/Progress'
import { NumberDisplay } from '@components/ui/NumberDisplay'
import { Tabs, TabPanel } from '@components/ui/Tabs'
import { formatCurrency, formatDate } from '@utils/helpers'
import { useGameStore } from '@store/gameStore'
import { ACHIEVEMENT_TEMPLATES } from '@data/achievements'
import { MISSION_TEMPLATES } from '@data/missions'

const categoryIcons = {
  milestone: Target,
  mastery: TrendingUp,
  special: Star,
  secret: Award,
}

const categoryLabels = {
  milestone: 'Milestone',
  mastery: 'Mastery',
  special: 'Special',
  secret: 'Secret',
}

const rarityStyles = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  uncommon: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  rare: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-champagne-400/20 text-champagne-400 border-champagne-400/30',
}

const rarityLabels = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  legendary: 'Legendary',
}

const categoryColors = {
  milestone: 'from-blue-400 to-blue-600',
  mastery: 'from-purple-400 to-purple-600',
  special: 'from-champagne-400 to-champagne-600',
  secret: 'from-pink-400 to-pink-600',
}

export function FounderProfile() {
  const {
    founder,
    company,
    xp,
    level,
    achievements,
    completedMissions,
    activeMissions,
    simulationDay,
    balance,
    dailyReports,
    employees,
    products,
    campaigns,
    settings,
  } = useGameStore()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'missions', label: 'Missions', icon: Target },
    { id: 'history', label: 'History', icon: Calendar },
  ]

  const [activeTab, setActiveTab] = React.useState('overview')

  const totalRevenue = dailyReports.reduce((sum, r) => sum + r.revenue, 0)
  const totalProfit = dailyReports.reduce((sum, r) => sum + r.profit, 0)
  const totalCustomers = dailyReports.reduce((sum, r) => sum + r.newCustomers, 0)
  const unlockedAchievements = achievements.filter(a => a.isUnlocked).length

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <Avatar avatarId={founder?.avatarId} size="xl" />
            <div>
              <h1 className="text-display-md font-display font-bold text-ivory-100">
                {founder?.name || 'Founder'}
              </h1>
              <p className="text-body text-slate-400 mt-1">
                Founder of {company?.name || 'Your Company'}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="champagne">
                  Level {level} Founder
                </Badge>
                <Badge variant="default" className="bg-champagne-400/20 text-champagne-400 border-champagne-400/30">
                  {xp.toLocaleString()} XP
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="text-right">
            <Progress value={((xp - (level > 1 ? 500 * (level - 1) * level / 2 : 0)) / 500) * 100} size="md" variant="champagne" className="w-48" showLabel />
            <p className="text-caption text-slate-400 mt-1">Progress to Level {level + 1}</p>
          </div>
        </div>
      </motion.div>

      {/* Key Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          label="Company Valuation"
          value={company?.valuation || balance}
          format="currency"
          icon={<Building2 className="w-6 h-6" />}
          color="champagne"
        />
        <StatCard
          label="Total Revenue"
          value={totalRevenue}
          format="currency"
          icon={<TrendingUp className="w-6 h-6" />}
          color="success"
        />
        <StatCard
          label="Total Profit"
          value={totalProfit}
          format="currency"
          icon={<DollarSign className="w-6 h-6" />}
          color={totalProfit >= 0 ? 'success' : 'danger'}
        />
        <StatCard
          label="Customers Served"
          value={totalCustomers}
          format="number"
          icon={<Users className="w-6 h-6" />}
          color="default"
        />
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />

      <TabPanel id="overview" activeTab={activeTab}>
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Company Overview</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InfoRow label="Industry" value={company?.industry || 'N/A'} />
                  <InfoRow label="Strategy" value={company?.strategy || 'N/A'} />
                  <InfoRow label="Founded" value={company?.foundedAt ? formatDate(Math.floor((Date.now() - company.foundedAt) / 86400000)) : 'N/A'} />
                  <InfoRow label="Current Day" value={`Day ${simulationDay}`} />
                </div>
                {company?.description && (
                  <div className="pt-4 border-t border-graphite-800">
                    <p className="text-caption text-slate-400 mb-1">Description</p>
                    <p className="text-body text-slate-300">{company.description}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Brand Identity */}
            {company?.brandIdentity && (
              <Card className="p-6">
                <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Brand Identity</h3>
                <div className="flex items-center gap-4 p-4 bg-graphite-800/50 rounded-xl">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: company.brandIdentity.primaryColor }}>
                    <span className="text-graphite-950 font-bold text-2xl">{company.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 rounded mb-2" style={{ backgroundColor: company.brandIdentity.secondaryColor }} />
                    <p className="text-body-sm text-slate-400 italic">"{company.brandIdentity.tagline}"</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="default" className="bg-graphite-800 text-slate-300 border-graphite-700">
                        {company.brandIdentity.logoType} logo
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Current Status</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoRow label="Balance" value={formatCurrency(balance)} color={balance >= 0 ? 'success' : 'danger'} />
                <InfoRow label="Employees" value={employees.length.toString()} />
                <InfoRow label="Products" value={products.length.toString()} />
                <InfoRow label="Active Campaigns" value={campaigns.filter(c => c.status === 'active').length.toString()} />
                <InfoRow label="Achievements" value={`${unlockedAchievements}/${ACHIEVEMENT_TEMPLATES.length}`} color="champagne" />
                <InfoRow label="Missions Complete" value={completedMissions.length.toString()} />
              </div>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Level Progress */}
            <Card className="p-6">
              <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Founder Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
                      <Star className="w-5 h-5 text-graphite-950" />
                    </div>
                    <div>
                      <p className="text-caption text-slate-400">Current Level</p>
                      <p className="text-display-sm font-display font-bold text-ivory-100">{level}</p>
                    </div>
                  </div>
                  <NumberDisplay value={xp} format="number" size="md" color="champagne" />
                </div>
                <Progress
                  value={((xp % 500) / 500) * 100}
                  size="md"
                  variant="champagne"
                  showLabel
                  label={`XP to Level ${level + 1}`}
                />
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card className="p-6">
              <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                {achievements
                  .filter(a => a.isUnlocked)
                  .sort((a, b) => (b.unlockedAt || 0) - (a.unlockedAt || 0))
                  .slice(0, 5)
                  .map(achievement => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-graphite-800/50 rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-champagne-400/20 flex items-center justify-center text-champagne-400">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-ivory-100 truncate">{achievement.title}</p>
                        <p className="text-caption text-slate-400">{achievement.description}</p>
                      </div>
                      <Badge variant="default" className={rarityStyles[achievement.rarity]}>
                        {rarityLabels[achievement.rarity]}
                      </Badge>
                    </div>
                  ))}
                {achievements.filter(a => a.isUnlocked).length === 0 && (
                  <p className="text-body-sm text-slate-400 text-center py-4">No achievements unlocked yet</p>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </TabPanel>

      <TabPanel id="achievements" activeTab={activeTab}>
        <div className="mt-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'milestone', 'mastery', 'special', 'secret'].map(cat => (
              <button
                key={cat}
                onClick={() => {}}
                className={cn(
                  'px-3 py-1.5 rounded-full text-body-sm font-medium transition-colors',
                  cat === 'all'
                    ? 'bg-champagne-400 text-graphite-950'
                    : 'bg-graphite-800 text-slate-400 hover:text-ivory-100 hover:bg-graphite-700'
                )}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ACHIEVEMENT_TEMPLATES.map((achievement, index) => {
              const userAchievement = achievements.find(a => a.id === achievement.id)
              const isUnlocked = userAchievement?.isUnlocked || false

              return (
                <motion.article
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className={cn('card-hover p-4 relative group', isUnlocked ? '' : 'opacity-50')}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
                      background: isUnlocked
                        ? `linear-gradient(135deg, ${categoryColors[achievement.category] || 'from-champagne-400 to-champagne-600'})`
                        : 'linear-gradient(135deg, #384250 0%, #2A323C 100%)'
                    }}>
                      {(() => {
                        const Icon = categoryIcons[achievement.category]
                        return Icon ? <Icon className={cn('w-6 h-6', isUnlocked ? 'text-graphite-950' : 'text-slate-500')} /> : null
                      })()}
                    </div>
                    <Badge variant="default" className={rarityStyles[achievement.rarity]}>
                      {rarityLabels[achievement.rarity]}
                    </Badge>
                  </div>

                  <h4 className={cn('font-medium text-ivory-100 mb-1', !isUnlocked && 'text-slate-500 line-through')}>
                    {achievement.title}
                  </h4>
                  <p className={cn('text-body-sm mb-3', isUnlocked ? 'text-slate-400' : 'text-slate-500')}>
                    {achievement.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-graphite-800">
                    <span className={cn('text-caption', isUnlocked ? 'text-champagne-400' : 'text-slate-500')}>
                      +{achievement.xpReward} XP
                    </span>
                    {isUnlocked && (
                      <CheckCircle className="w-5 h-5 text-success-400" />
                    )}
                  </div>

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-graphite-950/80 flex items-center justify-center rounded-xl">
                      <Lock className="w-8 h-8 text-slate-500" />
                    </div>
                  )}
                </motion.article>
              )
            })}
          </div>
        </div>
      </TabPanel>

      <TabPanel id="missions" activeTab={activeTab}>
        <div className="mt-6 space-y-6">
          {['beginner', 'intermediate', 'advanced'].map(category => {
            const categoryMissions = MISSION_TEMPLATES.filter(m => m.category === category)
            const activeInCategory = activeMissions.filter(m => m.category === category)
            const completedInCategory = completedMissions.filter(id =>
              categoryMissions.some(m => m.id === id)
            )

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 capitalize">{category}</h3>
                <div className="space-y-3">
                  {categoryMissions.map(mission => {
                    const isCompleted = completedMissions.includes(mission.id)
                    const isActive = activeMissions.some(m => m.id === mission.id)
                    const progress = isCompleted ? 100 : activeMissions.find(m => m.id === mission.id)?.objectives.reduce((acc, obj) => {
                      const current = activeMissions.find(m => m.id === mission.id)?.progress[obj.id] || 0
                      return acc + Math.min(1, current / obj.target)
                    }, 0) / mission.objectives.length * 100 || 0

                    return (
                      <Card key={mission.id} className={cn('p-4', isCompleted && 'opacity-60')}>
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h4 className={cn('font-medium text-ivory-100', isCompleted && 'line-through text-slate-500')}>
                              {mission.title}
                            </h4>
                            <p className={cn('text-body-sm mt-1', isCompleted ? 'text-slate-500' : 'text-slate-400')}>
                              {mission.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="default" className={cn('text-caption',
                              category === 'beginner' && 'bg-green-500/20 text-green-400 border-green-500/30',
                              category === 'intermediate' && 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                              category === 'advanced' && 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                            )}>
                              {categoryLabels[category as keyof typeof categoryLabels]}
                            </Badge>
                            {isCompleted && <Badge variant="success" className="text-caption">Completed</Badge>}
                          </div>
                        </div>
                        <Progress value={progress} size="md" variant="champagne" className="mb-3" />
                        {isActive && !isCompleted && (
                          <div className="space-y-2">
                            {mission.objectives.map(objective => {
                              const current = activeMissions.find(m => m.id === mission.id)?.progress[objective.id] || 0
                              const objProgress = Math.min(100, (current / objective.target) * 100)
                              return (
                                <div key={objective.id} className="flex items-center justify-between text-body-sm">
                                  <span className={cn(current >= objective.target ? 'text-slate-400 line-through' : 'text-ivory-100')}>
                                    {objective.description}
                                  </span>
                                  <Progress value={objProgress} size="sm" variant={current >= objective.target ? 'success' : 'champagne'} className="w-32" />
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </TabPanel>

      <TabPanel id="history" activeTab={activeTab}>
        <div className="mt-6">
          <Card className="p-6">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Daily History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-graphite-800">
                    {['Day', 'Date', 'Revenue', 'Expenses', 'Profit', 'Balance', 'Customers', 'Satisfaction'].map(h => (
                      <th key={h} className="text-left p-3 text-caption text-slate-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite-800/50">
                  {dailyReports.slice().reverse().map(report => (
                    <tr key={report.day} className="hover:bg-graphite-800/50">
                      <td className="p-3 text-body-sm font-mono text-ivory-100">Day {report.day}</td>
                      <td className="p-3 text-body-sm text-slate-400">{report.date}</td>
                      <td className="p-3 text-body-sm font-mono text-success-400">{formatCurrency(report.revenue)}</td>
                      <td className="p-3 text-body-sm font-mono text-danger-400">{formatCurrency(report.expenses)}</td>
                      <td className="p-3 text-body-sm font-mono">
                        {report.profit >= 0 ? '+' : ''}{formatCurrency(report.profit)}
                      </td>
                      <td className="p-3 text-body-sm font-mono text-champagne-400">{formatCurrency(report.balance)}</td>
                      <td className="p-3 text-body-sm text-slate-300">{report.newCustomers}</td>
                      <td className="p-3 text-body-sm">{report.customerSatisfaction}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </TabPanel>
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

function InfoRow({ label, value, color = 'default' }: { label: string; value: string; color?: string }) {
  const colors: Record<string, string> = {
    default: 'text-ivory-100',
    champagne: 'text-champagne-400',
    success: 'text-success-400',
    danger: 'text-danger-400',
  }

  return (
    <div>
      <p className="text-caption text-slate-400">{label}</p>
      <p className={cn('font-medium', colors[color] || colors.default)}>{value}</p>
    </div>
  )
}