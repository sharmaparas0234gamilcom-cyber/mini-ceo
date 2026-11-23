import { motion } from 'motion/react'
import { BookOpen, TrendingUp, Users, Target, Lightbulb, Shield, Globe, Zap } from 'lucide-react'
import { cn } from '@utils/helpers'

const learningCategories = [
  {
    title: 'Business Fundamentals',
    icon: BookOpen,
    color: 'from-blue-400 to-blue-600',
    skills: [
      'Revenue models & pricing strategies',
      'Cost structures & profit margins',
      'Cash flow management',
      'Financial statements basics',
      'Break-even analysis',
    ],
  },
  {
    title: 'Product & Market',
    icon: Lightbulb,
    color: 'from-green-400 to-green-600',
    skills: [
      'Product-market fit',
      'Price elasticity of demand',
      'Inventory optimization',
      'Customer segmentation',
      'Competitive positioning',
    ],
  },
  {
    title: 'Marketing & Growth',
    icon: TrendingUp,
    color: 'from-champagne-400 to-champagne-600',
    skills: [
      'Customer acquisition channels',
      'Campaign ROI measurement',
      'Brand awareness building',
      'Conversion optimization',
      'Retention strategies',
    ],
  },
  {
    title: 'Operations & Team',
    icon: Users,
    color: 'from-purple-400 to-purple-600',
    skills: [
      'Department management',
      'Hiring & compensation',
      'Productivity optimization',
      'Process improvement',
      'Quality control',
    ],
  },
  {
    title: 'Strategy & Leadership',
    icon: Target,
    color: 'from-orange-400 to-orange-600',
    skills: [
      'Strategic planning',
      'Risk assessment',
      'Crisis management',
      'Long-term vision',
      'Decision-making frameworks',
    ],
  },
  {
    title: 'Real-World Events',
    icon: Zap,
    color: 'from-red-400 to-red-600',
    skills: [
      'Competitor responses',
      'Market disruptions',
      'Supply chain issues',
      'Regulatory changes',
      'Economic cycles',
    ],
  },
]

const outcomes = [
  { metric: 'Financial Literacy', description: 'Understand P&L, cash flow, and valuation' },
  { metric: 'Strategic Thinking', description: 'Make decisions with incomplete information' },
  { metric: 'Data Analysis', description: 'Interpret metrics to drive business choices' },
  { metric: 'Leadership', description: 'Manage teams, resources, and stakeholder expectations' },
  { metric: 'Resilience', description: 'Navigate crises and adapt to change' },
  { metric: 'Entrepreneurial Mindset', description: 'Identify opportunities and execute on vision' },
]

export function WhatYouLearn() {
  return (
    <section id="learn" className="section bg-graphite-950">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-champagne-400 text-body-sm font-medium uppercase tracking-wider">What You'll Learn</span>
          <h2 className="mt-3 text-display-md font-display font-bold text-ivory-100">
            Real Business Skills, Real Consequences
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            Every concept taught through hands-on simulation — not passive lectures.
          </p>
        </motion.div>

        {/* Learning Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {learningCategories.map((category, index) => (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-hover p-6 h-full"
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                  `bg-gradient-to-br ${category.color}`
                )}
              >
                <category.icon className="w-6 h-6 text-graphite-950" />
              </div>
              <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 + i * 0.05 }}
                    className="flex items-start gap-3 text-body-sm text-slate-300"
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-champagne-400/50 mt-1.5" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-display-sm font-display font-bold text-ivory-100 text-center mb-12">
            Measurable Outcomes
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="card-hover p-6 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-champagne-400/20 to-champagne-600/20 border border-champagne-400/30 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-champagne-400" />
                </div>
                <h4 className="text-heading-md font-display font-semibold text-ivory-100 mb-2">
                  {outcome.metric}
                </h4>
                <p className="text-body-sm text-slate-400">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}