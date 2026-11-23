import { motion } from 'motion/react'
import { TrendingUp, DollarSign, Wallet, Users, Star, Target, Building2, BarChart3 } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { NumberDisplay, NumberChangeIndicator } from '@components/ui/NumberDisplay'
import { useGameStore } from '@store/gameStore'

export function KPICards() {
  const {
    balance,
    company,
    simulationDay,
    dailyReports,
    customerSatisfaction,
    reputation,
    xp,
    level,
    employees,
    products,
  } = useGameStore()

  const latestReport = dailyReports[dailyReports.length - 1]
  const previousReport = dailyReports[dailyReports.length - 2]

  const totalRevenue = dailyReports.reduce((sum, r) => sum + r.revenue, 0)
  const previousTotalRevenue = dailyReports.slice(0, -1).reduce((sum, r) => sum + r.revenue, 0)

  const netProfit = latestReport?.profit || 0
  const previousNetProfit = previousReport?.profit || 0

  const newCustomers = latestReport?.newCustomers || 0
  const previousNewCustomers = previousReport?.newCustomers || 0

  const valuation = company?.valuation || balance
  const previousValuation = previousReport?.balance || 0

  const kpis = [
    {
      label: 'Company Valuation',
      value: valuation,
      format: 'currency' as const,
      previousValue: previousValuation,
      icon: Building2,
      color: 'champagne' as const,
      trend: valuation > previousValuation ? 'up' : valuation < previousValuation ? 'down' : 'neutral',
    },
    {
      label: 'Available Balance',
      value: balance,
      format: 'currency' as const,
      previousValue: previousReport?.balance || 0,
      icon: Wallet,
      color: balance >= 0 ? 'success' : 'danger' as const,
      trend: balance > (previousReport?.balance || 0) ? 'up' : 'down',
    },
    {
      label: 'Today\'s Revenue',
      value: latestReport?.revenue || 0,
      format: 'currency' as const,
      previousValue: previousReport?.revenue || 0,
      icon: DollarSign,
      color: 'default' as const,
      trend: (latestReport?.revenue || 0) > (previousReport?.revenue || 0) ? 'up' : 'down',
    },
    {
      label: 'Net Profit',
      value: netProfit,
      format: 'currency' as const,
      previousValue: previousNetProfit,
      icon: TrendingUp,
      color: netProfit >= 0 ? 'success' : 'danger' as const,
      trend: netProfit > previousNetProfit ? 'up' : 'down',
    },
    {
      label: 'Total Revenue',
      value: totalRevenue,
      format: 'currency' as const,
      previousValue: previousTotalRevenue,
      icon: BarChart3,
      color: 'champagne' as const,
      trend: totalRevenue > previousTotalRevenue ? 'up' : 'neutral',
    },
    {
      label: 'New Customers',
      value: newCustomers,
      format: 'number' as const,
      previousValue: previousNewCustomers,
      icon: Users,
      color: 'default' as const,
      trend: newCustomers > previousNewCustomers ? 'up' : 'down',
    },
    {
      label: 'Satisfaction',
      value: customerSatisfaction,
      format: 'percentage' as const,
      previousValue: previousReport?.customerSatisfaction || 70,
      icon: Star,
      color: customerSatisfaction >= 80 ? 'success' : customerSatisfaction >= 60 ? 'warning' : 'danger' as const,
      trend: customerSatisfaction > (previousReport?.customerSatisfaction || 70) ? 'up' : 'down',
    },
    {
      label: 'Reputation',
      value: reputation,
      format: 'number' as const,
      previousValue: previousReport?.reputation || 50,
      icon: Target,
      color: reputation >= 70 ? 'success' : reputation >= 50 ? 'warning' : 'danger' as const,
      trend: reputation > (previousReport?.reputation || 50) ? 'up' : 'down',
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <Card className="p-5 hover:border-champagne-400/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-caption text-slate-400 uppercase tracking-wider mb-2">{kpi.label}</p>
                <NumberDisplay
                  value={kpi.value}
                  format={kpi.format}
                  size="lg"
                  color={kpi.color}
                  animate
                  className="mb-1"
                />
                <NumberChangeIndicator
                  value={kpi.value}
                  previousValue={kpi.previousValue}
                  format={kpi.format}
                  size="sm"
                />
              </div>
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ml-4', `bg-${kpi.color}-400/20 text-${kpi.color}-400`)}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export function LevelProgress() {
  const { xp, level, simulationConfig } = useGameStore()

  const currentLevelXp = simulationConfig.levelXpCurve[level - 1] || 0
  const nextLevelXp = simulationConfig.levelXpCurve[level] || simulationConfig.levelXpCurve[simulationConfig.levelXpCurve.length - 1]
  const progressXp = xp - currentLevelXp
  const neededXp = nextLevelXp - currentLevelXp
  const progressPercent = neededXp > 0 ? (progressXp / neededXp) * 100 : 100

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
            <Star className="w-6 h-6 text-graphite-950" />
          </div>
          <div>
            <p className="text-caption text-slate-400">Founder Level</p>
            <p className="text-display-sm font-display font-bold text-ivory-100">{level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-body-sm text-slate-400">Total XP</p>
          <p className="text-data font-mono font-semibold text-champagne-400">{xp.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-body-sm">
          <span className="text-slate-400">Progress to Level {level + 1}</span>
          <span className="font-mono text-champagne-400">{progressXp.toLocaleString()} / {neededXp.toLocaleString()} XP</span>
        </div>
        <div className="h-2 bg-graphite-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, progressPercent)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-champagne-400 to-champagne-600 rounded-full"
          />
        </div>
      </div>
    </Card>
  )
}

export function QuickStats() {
  const { employees, products, campaigns, simulationDay } = useGameStore()

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length
  const totalProducts = products.length
  const totalEmployees = employees.length

  const stats = [
    { label: 'Days Running', value: simulationDay, format: 'number' as const, icon: '📅' },
    { label: 'Active Products', value: totalProducts, format: 'number' as const, icon: '📦' },
    { label: 'Active Campaigns', value: activeCampaigns, format: 'number' as const, icon: '📢' },
    { label: 'Team Members', value: totalEmployees, format: 'number' as const, icon: '👥' },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <Card className="p-5 text-center hover:border-champagne-400/50 transition-colors">
            <span className="text-3xl mb-2 block">{stat.icon}</span>
            <NumberDisplay
              value={stat.value}
              format={stat.format}
              size="xl"
              color="champagne"
              animate
            />
            <p className="text-caption text-slate-400 mt-1">{stat.label}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}