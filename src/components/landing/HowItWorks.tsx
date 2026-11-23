import { motion } from 'motion/react'
import { Building2, TrendingUp, Target, Award, Brain, Lightbulb, BarChart3, Users } from 'lucide-react'
import { cn } from '@utils/helpers'

const steps = [
  {
    number: '01',
    title: 'Create Your Company',
    description: 'Choose your industry, define your brand identity, and set your business strategy. Start with ₹1,00,000 in virtual capital.',
    icon: Building2,
    color: 'from-champagne-400 to-champagne-600',
  },
  {
    number: '02',
    title: 'Build Products',
    description: 'Design products, set prices, manage inventory, and watch market demand respond to your decisions in real-time.',
    icon: Lightbulb,
    color: 'from-blue-400 to-blue-600',
  },
  {
    number: '03',
    title: 'Market & Grow',
    description: 'Launch marketing campaigns, hire employees, upgrade departments, and expand your business empire.',
    icon: TrendingUp,
    color: 'from-green-400 to-green-600',
  },
  {
    number: '04',
    title: 'Compete & Learn',
    description: 'Face random business events, complete missions, unlock achievements, and climb the leaderboard.',
    icon: Award,
    color: 'from-purple-400 to-purple-600',
  },
]

const features = [
  {
    icon: Brain,
    title: 'Real Business Logic',
    description: 'Price elasticity, market dynamics, customer satisfaction, and competitive pressure all simulated with authentic mechanics.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description: 'Interactive charts, daily reports, and performance metrics help you understand the impact of every choice.',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Hire across 5 departments, manage salaries, track productivity, and unlock powerful department bonuses.',
  },
  {
    icon: Target,
    title: 'Learning Missions',
    description: 'Progress through beginner, intermediate, and advanced missions that teach real business concepts.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-graphite-900/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-champagne-400 text-body-sm font-medium uppercase tracking-wider">How It Works</span>
          <h2 className="mt-3 text-display-md font-display font-bold text-ivory-100">
            From Founder to CEO in Four Steps
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            Experience the complete entrepreneurial journey — from idea to empire.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-hover p-6 relative group"
            >
              <div className="absolute top-4 right-4 text-4xl font-display font-bold text-graphite-800/50">
                {step.number}
              </div>
              <div
                className={cn(
                  'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
                  `bg-gradient-to-br ${step.color}`
                )}
              >
                <step.icon className="w-7 h-7 text-graphite-950" />
              </div>
              <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">
                {step.title}
              </h3>
              <p className="text-body text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-display-sm font-display font-bold text-ivory-100 text-center mb-12">
            Everything You Need to Succeed
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="card-hover p-6"
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
      </div>
    </section>
  )
}