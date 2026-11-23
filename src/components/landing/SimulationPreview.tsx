import { motion } from 'motion/react'
import { BarChart3, TrendingUp, ShoppingBag, Users, AlertTriangle, Award } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { NumberDisplay } from '@components/ui/NumberDisplay'

const previewStats = [
  { label: 'Company Valuation', value: 2850000, format: 'currency', icon: TrendingUp, color: 'champagne' },
  { label: 'Daily Revenue', value: 210000, format: 'currency', icon: ShoppingBag, color: 'success' },
  { label: 'Net Profit', value: 65000, format: 'currency', icon: BarChart3, color: 'success' },
  { label: 'Customers Today', value: 58, format: 'number', icon: Users, color: 'default' },
  { label: 'Customer Satisfaction', value: 87, format: 'percentage', icon: Award, color: 'champagne' },
  { label: 'Active Events', value: 2, format: 'number', icon: AlertTriangle, color: 'warning' },
]

const previewFeatures = [
  {
    title: 'Financial Dashboard',
    description: 'Real-time KPIs with animated number transitions. Track valuation, revenue, profit, expenses, and cash flow at a glance.',
    icon: BarChart3,
  },
  {
    title: 'Product Portfolio',
    description: 'Manage multiple products with individual pricing, inventory, and performance tracking. Watch demand respond to price changes.',
    icon: ShoppingBag,
  },
  {
    title: 'Marketing Campaigns',
    description: 'Launch campaigns across 7 channels. Target 6 audience segments. Measure impressions, clicks, conversions, and CAC.',
    icon: TrendingUp,
  },
  {
    title: 'Team Management',
    description: 'Hire across 5 departments. Track productivity, satisfaction, and skills. Upgrade departments for powerful bonuses.',
    icon: Users,
  },
  {
    title: 'Dynamic Events',
    description: 'Face 15+ unique business scenarios. Make strategic choices with real consequences. Chain events create evolving narratives.',
    icon: AlertTriangle,
  },
  {
    title: 'Progression System',
    description: 'Earn XP, level up, unlock 24 achievements, complete 15 missions across 3 difficulty tiers. Compete on leaderboards.',
    icon: Award,
  },
]

export function SimulationPreview() {
  return (
    <section id="preview" className="section bg-graphite-900/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-champagne-400 text-body-sm font-medium uppercase tracking-wider">Simulation Preview</span>
          <h2 className="mt-3 text-display-md font-display font-bold text-ivory-100">
            Your Command Center
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            A sophisticated dashboard that puts you in the CEO's chair with real-time business intelligence.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {previewStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Card className="p-5 hover:border-champagne-400/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-caption text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
                    <NumberDisplay
                      value={stat.value}
                      format={stat.format as any}
                      size="lg"
                      color={stat.color as any}
                      animate
                    />
                  </div>
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', `bg-${stat.color}-400/20 text-${stat.color}-400`)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-display-sm font-display font-bold text-ivory-100 text-center mb-12">
            Core Simulation Modules
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="card-hover p-6 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-graphite-800 flex items-center justify-center mb-4 text-champagne-400">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h4 className="text-heading-md font-display font-semibold text-ivory-100 mb-2">
                  {feature.title}
                </h4>
                <p className="text-body-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Preview Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 relative"
        >
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-graphite-800 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger-500" />
                <div className="w-3 h-3 rounded-full bg-champagne-400" />
                <div className="w-3 h-3 rounded-full bg-success-400" />
              </div>
              <span className="text-caption text-slate-400 ml-2 font-mono">dashboard.miniceo.app</span>
            </div>
            <div className="p-6 space-y-4">
              {/* KPI Row */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Valuation', value: '₹28.5L', trend: '+12.3%' },
                  { label: 'Balance', value: '₹28.5L', trend: '+5.1%' },
                  { label: 'Revenue (Day)', value: '₹2.1L', trend: '+8.7%' },
                  { label: 'Profit (Day)', value: '₹65K', trend: '+15.2%' },
                ].map((kpi, i) => (
                  <div key={i} className="bg-graphite-800/50 rounded-lg p-4">
                    <p className="text-caption text-slate-400">{kpi.label}</p>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-data font-semibold text-ivory-100">{kpi.value}</span>
                      <span className="text-body-sm text-success-400">{kpi.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="bg-graphite-800/50 rounded-lg p-4 h-48 flex items-end justify-around gap-2">
                {[45, 62, 58, 75, 82, 90, 95, 88, 100, 105, 112, 118].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
                    className="w-8 bg-gradient-to-t from-champagne-400 to-champagne-600 rounded-t transition-colors hover:from-champagne-300 hover:to-champagne-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {[
                  { label: 'Products', value: '3', sub: 'Active' },
                  { label: 'Campaigns', value: '2', sub: 'Running' },
                  { label: 'Employees', value: '7', sub: 'Hired' },
                ].map((stat, i) => (
                  <div key={i} className="bg-graphite-800/50 rounded-lg p-4 text-center">
                    <div className="text-data-lg font-display font-bold text-champagne-400">{stat.value}</div>
                    <div className="text-caption text-slate-400">{stat.label}</div>
                    <div className="text-caption text-slate-500">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}