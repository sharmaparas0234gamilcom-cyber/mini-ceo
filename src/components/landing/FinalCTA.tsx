import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Building2, ArrowRight, CheckCircle } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui'

export function FinalCTA() {
  const benefits = [
    'Full business simulation with real mechanics',
    '24 achievements across 4 rarity tiers',
    '15 missions from beginner to advanced',
    '15+ dynamic business events',
    'Interactive 3D business city',
    'Competitive leaderboards',
    'Complete offline play — no account needed',
    'Built for the Student Technology Challenge',
  ]

  return (
    <section id="cta" className="section bg-graphite-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne-400/5 blur-3xl" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(201,184,150,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,184,150,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-graphite-950" />
            </div>
            <span className="text-display-md font-display font-bold text-ivory-100">MINI CEO</span>
          </div>

          <h2 className="text-display-lg font-display font-bold text-ivory-100 leading-tight mb-6 text-balance">
            Ready to Build Your Empire?
          </h2>

          <p className="text-body-lg text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of student founders learning business through play. No registration required — just start building.
          </p>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex items-start gap-3 text-left"
              >
                <CheckCircle className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" />
                <span className="text-body-sm text-slate-300">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/onboarding">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} className="w-full sm:w-auto">
                Start Your Company Free
              </Button>
            </Link>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>
              Back to Top
            </Button>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 text-caption text-slate-500"
          >
            This is a simulation for educational purposes. All currency is virtual and has no real-world value.
            No personal data collected. Runs entirely in your browser.
          </motion.p>
        </motion.div>

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-champagne-400/20 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-champagne-400/20 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-champagne-400/20 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-champagne-400/20 rounded-br-xl pointer-events-none" />
      </div>
    </section>
  )
}