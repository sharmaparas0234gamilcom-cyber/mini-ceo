import { motion } from 'motion/react'
import { Building2, TrendingUp, Shield, Users, DollarSign, Lightbulb, ChevronRight, Check } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Badge } from '@components/ui/Badge'
import { Progress } from '@components/ui/Progress'
import { NumberDisplay } from '@components/ui/NumberDisplay'
import { formatCurrency } from '@utils/helpers'
import { useGameStore } from '@store/gameStore'

const departmentConfigs = {
  product: {
    label: 'Product Development',
    icon: Lightbulb,
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Build better products faster. Unlocks productivity, quality, and innovation bonuses.',
    benefits: [
      { level: 1, name: 'Basic Process', bonus: '+5% dev speed', cost: 25000 },
      { level: 2, name: 'Agile Workflow', bonus: '+10% dev speed, +3% quality', cost: 37500 },
      { level: 3, name: 'DevOps Pipeline', bonus: '+15% dev speed, +6% quality, +2% innovation', cost: 56250 },
      { level: 4, name: 'AI-Assisted Dev', bonus: '+20% dev speed, +10% quality, +5% innovation', cost: 84375 },
      { level: 5, name: 'Innovation Lab', bonus: '+25% dev speed, +15% quality, +10% innovation', cost: 126562 },
    ],
  },
  marketing: {
    label: 'Marketing',
    icon: TrendingUp,
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    description: 'Reach more customers efficiently. Unlocks campaign efficiency and brand perception bonuses.',
    benefits: [
      { level: 1, name: 'Basic Campaigns', bonus: '+4% campaign efficiency', cost: 20000 },
      { level: 2, name: 'A/B Testing', bonus: '+8% campaign efficiency, +2% brand perception', cost: 30000 },
      { level: 3, name: 'Marketing Automation', bonus: '+12% campaign efficiency, +4% brand perception', cost: 45000 },
      { level: 4, name: 'Predictive Analytics', bonus: '+16% campaign efficiency, +6% brand perception', cost: 67500 },
      { level: 5, name: 'AI Marketing Suite', bonus: '+20% campaign efficiency, +10% brand perception', cost: 101250 },
    ],
  },
  finance: {
    label: 'Finance',
    icon: DollarSign,
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    description: 'Optimize costs and financial efficiency. Unlocks cost reduction and financial productivity bonuses.',
    benefits: [
      { level: 1, name: 'Basic Accounting', bonus: '-3% operating costs', cost: 20000 },
      { level: 2, name: 'Cost Optimization', bonus: '-6% operating costs, +2% financial efficiency', cost: 30000 },
      { level: 3, name: 'Strategic Planning', bonus: '-9% operating costs, +5% financial efficiency', cost: 45000 },
      { level: 4, name: 'Treasury Management', bonus: '-12% operating costs, +8% financial efficiency', cost: 67500 },
      { level: 5, name: 'CFO Office', bonus: '-15% operating costs, +12% financial efficiency', cost: 101250 },
    ],
  },
  operations: {
    label: 'Operations',
    icon: Shield,
    color: 'from-amber-400 to-amber-600',
    bgColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'Streamline operations and delivery. Unlocks operational cost reduction and quality bonuses.',
    benefits: [
      { level: 1, name: 'Process Mapping', bonus: '-2% operational costs', cost: 15000 },
      { level: 2, name: 'Lean Operations', bonus: '-4% operational costs, +2% delivery quality', cost: 22500 },
      { level: 3, name: 'Supply Chain Opt.', bonus: '-6% operational costs, +5% delivery quality', cost: 33750 },
      { level: 4, name: 'Automated Logistics', bonus: '-8% operational costs, +8% delivery quality', cost: 50625 },
      { level: 5, name: 'Smart Factory', bonus: '-10% operational costs, +12% delivery quality', cost: 75937 },
    ],
  },
  support: {
    label: 'Customer Support',
    icon: Users,
    color: 'from-pink-400 to-pink-600',
    bgColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    description: 'Delight customers and retain them. Unlocks satisfaction and resolution quality bonuses.',
    benefits: [
      { level: 1, name: 'Help Desk', bonus: '+3% customer satisfaction', cost: 10000 },
      { level: 2, name: 'Multi-Channel', bonus: '+6% customer satisfaction, +2% resolution quality', cost: 15000 },
      { level: 3, name: 'Proactive Support', bonus: '+9% customer satisfaction, +5% resolution quality', cost: 22500 },
      { level: 4, name: 'AI Chatbot', bonus: '+12% customer satisfaction, +8% resolution quality', cost: 33750 },
      { level: 5, name: 'Customer Success', bonus: '+15% customer satisfaction, +12% resolution quality', cost: 50625 },
    ],
  },
}

export function DepartmentManager() {
  const { departments, balance, actions } = useGameStore()

  const handleUpgrade = (type: string) => {
    const success = actions.upgradeDepartment(type)
    if (success) {
      console.log(`Upgraded ${type} department`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-heading-lg font-display font-semibold text-ivory-100">Departments</h2>
          <p className="text-body text-slate-400">
            Upgrade departments to unlock powerful bonuses for your business
          </p>
        </div>
        <div className="flex items-center gap-3 p-3 bg-graphite-800/50 rounded-xl border border-graphite-700">
          <div className="w-10 h-10 rounded-xl bg-champagne-400/20 flex items-center justify-center text-champagne-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-caption text-slate-400">Available Balance</p>
            <NumberDisplay value={balance} format="currency" size="md" color="champagne" className="block" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(departmentConfigs).map(([type, config], index) => {
          const dept = departments.find(d => d.type === type)
          const currentLevel = dept?.level || 0
          const maxLevel = dept?.maxLevel || 5
          const upgradeCost = dept?.upgradeCost || config.benefits[currentLevel]?.cost || 0
          const canUpgrade = currentLevel < maxLevel && balance >= upgradeCost

          return (
            <motion.article
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="card-hover h-full flex flex-col"
            >
              <Card className="p-5 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-gradient-to-br ${config.color}`)}>
                      <config.icon className="w-6 h-6 text-graphite-950" />
                    </div>
                    <div>
                      <h3 className="text-heading-lg font-display font-semibold text-ivory-100">{config.label}</h3>
                      <Badge variant="default" className={config.bgColor}>
                        Level {currentLevel} / {maxLevel}
                      </Badge>
                    </div>
                  </div>
                  {currentLevel === maxLevel && (
                    <div className="w-8 h-8 rounded-full bg-success-500/20 flex items-center justify-center text-success-400">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <p className="text-body-sm text-slate-400 mb-4 flex-1">{config.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-caption mb-1">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-mono text-champagne-400">{currentLevel}/{maxLevel}</span>
                  </div>
                  <Progress
                    value={(currentLevel / maxLevel) * 100}
                    size="md"
                    variant="champagne"
                    showLabel={false}
                  />
                </div>

                {/* Benefits at Current Level */}
                {currentLevel > 0 && (
                  <div className="mb-4 p-3 bg-graphite-800/50 rounded-xl border border-graphite-700">
                    <p className="text-caption text-slate-400 mb-2">Active Bonuses:</p>
                    <ul className="space-y-1">
                      {config.benefits
                        .filter(b => b.level <= currentLevel)
                        .map(benefit => (
                          <li key={benefit.level} className="flex items-center gap-2 text-body-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400/50 flex-shrink-0" />
                            <span className="font-medium text-ivory-100">{benefit.name}:</span>
                            <span>{benefit.bonus}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Upgrade Button / Next Benefit */}
                {currentLevel < maxLevel ? (
                  <div className="mt-auto pt-4 border-t border-graphite-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-caption text-slate-400">Next Level: {config.benefits[currentLevel]?.name}</p>
                        <p className="text-body-sm text-champagne-400 font-medium">{config.benefits[currentLevel]?.bonus}</p>
                      </div>
                      <NumberDisplay value={upgradeCost} format="currency" size="md" color="champagne" />
                    </div>
                    <Button
                      onClick={() => handleUpgrade(type)}
                      disabled={!canUpgrade}
                      className="w-full"
                      leftIcon={canUpgrade ? <ChevronRight className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    >
                      {canUpgrade ? 'Upgrade' : balance < upgradeCost ? `Need ₹${(upgradeCost - balance).toLocaleString()} more` : 'Max Level'}
                    </Button>
                  </div>
                ) : (
                  <div className="mt-auto pt-4 border-t border-graphite-800">
                    <Badge variant="success" className="w-full text-center py-2">
                      Max Level Reached
                    </Badge>
                  </div>
                )}
              </Card>
            </motion.article>
          )
        })}
      </div>

      {/* Department Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid gap-4 md:grid-cols-5"
      >
        {Object.entries(departmentConfigs).map(([type, config]) => {
          const dept = departments.find(d => d.type === type)
          const currentLevel = dept?.level || 0
          const totalBonuses = config.benefits
            .filter(b => b.level <= currentLevel)
            .reduce((acc, b) => {
              // Parse bonus strings - simplified
              return acc
            }, {})

          return (
            <Card key={type} className="p-4 text-center hover:border-champagne-400/50 transition-colors">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3', `bg-gradient-to-br ${config.color}`)}>
                <config.icon className="w-5 h-5 text-graphite-950" />
              </div>
              <h4 className="font-medium text-ivory-100 mb-1">{config.label}</h4>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="default" className={config.bgColor}>
                  Lvl {currentLevel}
                </Badge>
              </div>
              <p className="text-caption text-slate-400 mt-2">
                {dept?.employees.length || 0} employee{dept?.employees.length !== 1 ? 's' : ''}
              </p>
            </Card>
          )
        })}
      </motion.div>
    </div>
  )
}