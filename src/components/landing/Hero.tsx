import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Building2, Target, TrendingUp, Users, Award } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui'
import { IsometricCity } from './IsometricCity'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Background */}
      <div className="absolute inset-0 bg-graphite-950" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(201,184,150,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,184,150,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-champagne-400/5 blur-3xl" />

      {/* Isometric City */}
      <div className="relative z-10 flex-1 flex items-center justify-center min-h-[500px]">
        <IsometricCity />
      </div>

      {/* Content */}
      <div className="relative z-20 container px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-graphite-950" />
            </div>
            <span className="text-display-sm font-display font-bold text-ivory-100">MINI CEO</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="text-champagne-400 text-body-lg font-medium tracking-wide uppercase mb-6"
          >
            Build. Manage. Conquer.
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="text-display-xl font-display font-bold text-ivory-100 leading-tight mb-6 text-balance"
          >
            Every Empire Starts{' '}
            <span className="text-gradient">Somewhere.</span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="text-body-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Think like a founder. Build like a leader. Experience the world of business
            through an immersive simulation where every decision shapes your company's destiny.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/onboarding">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Your Company
              </Button>
            </Link>
            <Button variant="secondary" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore the Simulation
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-500"
          >
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-champagne-400" />
              <span className="text-body-sm">Real Business Mechanics</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-champagne-400" />
              <span className="text-body-sm">Dynamic Simulation</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-champagne-400" />
              <span className="text-body-sm">Compete & Learn</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-champagne-400" />
              <span className="text-body-sm">Achievements & Progression</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce"
        aria-hidden="true"
      >
        <span className="text-caption uppercase tracking-wider">Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  )
}