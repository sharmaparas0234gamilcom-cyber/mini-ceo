import { motion } from 'motion/react'
import { Zap, AlertTriangle, TrendingUp, Award, Target, Shield } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Badge } from '@components/ui/Badge'

const challenges = [
  {
    id: 'competitor-launch',
    title: 'Competitor Launch',
    description: 'A well-funded rival enters your market with a similar product at a lower price. Do you match prices, differentiate, or double down on marketing?',
    type: 'challenge',
    severity: 'high',
    category: 'competitor',
    icon: AlertTriangle,
    color: 'from-red-400 to-red-600',
    outcomes: ['Market share defense', 'Pricing strategy', 'Brand positioning'],
  },
  {
    id: 'demand-surge',
    title: 'Viral Demand Surge',
    description: 'Social media explodes with interest in your product category. Ramp production at higher cost, raise prices, or stay the course?',
    type: 'opportunity',
    severity: 'medium',
    category: 'market',
    icon: TrendingUp,
    color: 'from-green-400 to-green-600',
    outcomes: ['Supply chain decisions', 'Pricing optimization', 'Capacity planning'],
  },
  {
    id: 'supply-disruption',
    title: 'Supply Chain Crisis',
    description: 'Key supplier faces production issues. Costs spike 30% and lead times double. Absorb costs, find alternatives, or raise prices?',
    type: 'crisis',
    severity: 'critical',
    category: 'supplier',
    icon: Shield,
    color: 'from-orange-400 to-orange-600',
    outcomes: ['Risk management', 'Cost control', 'Supplier diversification'],
  },
  {
    id: 'viral-review',
    title: 'Viral Positive Review',
    description: 'A top influencer loves your product! Traffic spikes. Amplify with paid promotion, leverage organically, or invest feedback into product?',
    type: 'opportunity',
    severity: 'low',
    category: 'customer',
    icon: Zap,
    color: 'from-purple-400 to-purple-600',
    outcomes: ['Marketing amplification', 'Community building', 'Product improvement'],
  },
  {
    id: 'key-employee-leaves',
    title: 'Key Talent Departure',
    description: 'Your top performer in a critical department resigns. Counter-offer, hire replacement, or redistribute workload?',
    type: 'challenge',
    severity: 'medium',
    category: 'internal',
    icon: Target,
    color: 'from-indigo-400 to-indigo-600',
    outcomes: ['Talent retention', 'Succession planning', 'Team morale'],
  },
  {
    id: 'economic-boom',
    title: 'Economic Boom',
    description: 'Economy surges! Consumer spending up, investment flowing. Aggressive expansion, measured growth, or strengthen foundations?',
    type: 'opportunity',
    severity: 'low',
    category: 'external',
    icon: Award,
    color: 'from-champagne-400 to-champagne-600',
    outcomes: ['Growth strategy', 'Capital allocation', 'Cycle preparation'],
  },
]

const severityStyles = {
  low: 'bg-success-500/20 text-success-400 border-success-500/30',
  medium: 'bg-champagne-400/20 text-champagne-400 border-champagne-400/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  critical: 'bg-danger-500/20 text-danger-400 border-danger-500/30',
}

export function FeaturedChallenges() {
  return (
    <section id="challenges" className="section bg-graphite-950">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-champagne-400 text-body-sm font-medium uppercase tracking-wider">Featured Challenges</span>
          <h2 className="mt-3 text-display-md font-display font-bold text-ivory-100">
            Expect the Unexpected
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            15+ dynamic business events test your strategic thinking. Every choice has consequences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <motion.article
              key={challenge.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-hover p-6 h-full group relative overflow-hidden"
            >
              {/* Background glow */}
              <div
                className={cn(
                  'absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20',
                  `bg-gradient-to-br ${challenge.color}`
                )}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      `bg-gradient-to-br ${challenge.color}`
                    )}
                  >
                    <challenge.icon className="w-6 h-6 text-graphite-950" />
                  </div>
                  <Badge variant="default" className={severityStyles[challenge.severity]}>
                    {challenge.severity}
                  </Badge>
                </div>

                <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2 group-hover:text-champagne-400 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-body-sm text-slate-400 mb-4 leading-relaxed">
                  {challenge.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.outcomes.map((outcome, i) => (
                    <Badge key={i} variant="default" className="bg-graphite-800 text-slate-300 border-graphite-700 text-caption">
                      {outcome}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 border-t border-graphite-800 flex items-center justify-between">
                  <span className="text-caption text-slate-500 uppercase tracking-wider">
                    Category: {challenge.category}
                  </span>
                  <span className="text-caption text-champagne-400 font-medium">
                    3 strategic choices →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Event System Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 card p-6 lg:p-8"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-display-lg font-display font-bold text-champagne-400 mb-2">15+</div>
              <div className="text-body text-slate-400">Unique Event Scenarios</div>
            </div>
            <div className="border-l border-graphite-800 my-4 md:my-0">
              <div className="text-display-lg font-display font-bold text-champagne-400 mb-2">3–4</div>
              <div className="text-body text-slate-400">Choices Per Event</div>
            </div>
            <div>
              <div className="text-display-lg font-display font-bold text-champagne-400 mb-2">∞</div>
              <div className="text-body text-slate-400">Replayability</div>
            </div>
          </div>
          <p className="mt-6 text-body text-slate-300 text-center max-w-2xl mx-auto">
            Events are triggered by your business state — company size, reputation, industry, and decisions.
            Chain events create evolving narratives where today's choice shapes tomorrow's challenges.
          </p>
        </motion.div>
      </div>
    </section>
  )
}