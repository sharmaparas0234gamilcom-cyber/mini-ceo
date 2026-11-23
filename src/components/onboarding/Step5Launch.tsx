import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Building2, Rocket, Sparkles, CheckCircle, ArrowRight, Target, TrendingUp, Users, Award } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui'
import { Card } from '@components/ui/Card'
import { useGameStore } from '@store/gameStore'
import { useNavigate } from 'react-router-dom'

export interface LaunchData {
  completed: boolean
}

export interface Step5LaunchProps {
  data: LaunchData
  onChange: (data: Partial<LaunchData>) => void
  onNext: () => void
  onBack: () => void
  founderName: string
  companyName: string
  industry: string
  brandIdentity: {
    primaryColor: string
    secondaryColor: string
    logoType: string
    tagline: string
  }
  strategy: string
}

const strategyLabels: Record<string, string> = {
  growth: 'Growth Focused',
  profitability: 'Profit First',
  innovation: 'Innovation Driven',
  'customer-focus': 'Customer Obsessed',
  balanced: 'Balanced Approach',
}

const industryLabels: Record<string, string> = {
  technology: 'Technology',
  fashion: 'Fashion & Apparel',
  'food-beverage': 'Food & Beverage',
  gaming: 'Gaming & Entertainment',
  education: 'Education & Learning',
  entertainment: 'Entertainment & Media',
}

export function Step5Launch({ data, onChange, onNext, onBack, founderName, companyName, industry, brandIdentity, strategy }: Step5LaunchProps) {
  const navigate = useNavigate()
  const { actions } = useGameStore()
  const [launchProgress, setLaunchProgress] = useState(0)
  const [launchStage, setLaunchStage] = useState<'idle' | 'initializing' | 'creating' | 'launching' | 'complete'>('idle')
  const [showConfetti, setShowConfetti] = useState(false)

  const stages = [
    { key: 'initializing', label: 'Initializing systems...', duration: 1000 },
    { key: 'creating', label: 'Creating your company...', duration: 1500 },
    { key: 'launching', label: 'Launching to market...', duration: 1500 },
    { key: 'complete', label: 'Welcome to MINI CEO!', duration: 1000 },
  ]

  const runLaunchSequence = async () => {
    setLaunchStage('initializing')
    setLaunchProgress(0)

    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i]
      setLaunchStage(stage.key as any)

      // Animate progress
      const startProgress = (i / stages.length) * 100
      const endProgress = ((i + 1) / stages.length) * 100

      for (let p = startProgress; p <= endProgress; p += 2) {
        setLaunchProgress(p)
        await new Promise(r => setTimeout(r, stage.duration / ((endProgress - startProgress) / 2)))
      }
    }

    // Create the game state
    actions.initializeGame(false)
    actions.setFounder({
      id: `founder-${Date.now()}`,
      name: founderName,
      avatarId: 'founder-1',
      experienceLevel: 'beginner',
      createdAt: Date.now(),
    })

    const industryData = industryLabels[industry] || industry
    actions.setCompany({
      id: `company-${Date.now()}`,
      name: companyName,
      description: `A ${industryData.toLowerCase()} company founded by ${founderName}.`,
      industry: industry as any,
      brandIdentity,
      strategy: strategy as any,
      foundedAt: Date.now(),
      valuation: 100000,
      level: 1,
    })

    // Add initial financial record
    actions.addFinancialRecord({
      day: 1,
      type: 'investment',
      category: 'initial_capital',
      amount: 100000,
      description: 'Initial company capital',
    })

    setShowConfetti(true)
    setLaunchStage('complete')

    // Navigate to dashboard after a moment
    setTimeout(() => {
      onChange({ completed: true })
      navigate('/dashboard')
    }, 2000)
  }

  useEffect(() => {
    if (data.completed) {
      runLaunchSequence()
    }
  }, [data.completed])

  const handleLaunch = () => {
    onChange({ completed: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption text-slate-400">Step 5 of 5</span>
          <span className="text-caption text-champagne-400 font-mono">Launch Company</span>
        </div>
        <div className="h-1 bg-graphite-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-champagne-400 to-champagne-600"
          />
        </div>
      </div>

      {/* Summary Card - shown before launch */}
      <AnimatePresence mode="wait">
        {launchStage === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
                  <Rocket className="w-7 h-7 text-graphite-950" />
                </div>
                <h2 className="text-display-md font-display font-bold text-ivory-100">Ready to Launch?</h2>
              </motion.div>
              <p className="text-body text-slate-400 max-w-lg mx-auto">
                Review your company details below. Once you launch, your entrepreneurial journey begins!
              </p>
            </div>

            {/* Company Summary */}
            <Card className="p-6 mb-6">
              <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-champagne-400" />
                Company Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-graphite-800/50 rounded-lg">
                  <span className="text-body-sm text-slate-400">Founder</span>
                  <span className="font-medium text-ivory-100">{founderName}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-graphite-800/50 rounded-lg">
                  <span className="text-body-sm text-slate-400">Company</span>
                  <span className="font-medium text-ivory-100">{companyName}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-graphite-800/50 rounded-lg">
                  <span className="text-body-sm text-slate-400">Industry</span>
                  <span className="font-medium text-ivory-100">{industryLabels[industry] || industry}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-graphite-800/50 rounded-lg">
                  <span className="text-body-sm text-slate-400">Strategy</span>
                  <span className="font-medium text-ivory-100">{strategyLabels[strategy] || strategy}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-graphite-800/50 rounded-lg">
                  <span className="text-body-sm text-slate-400">Starting Capital</span>
                  <span className="font-mono font-semibold text-champagne-400">₹1,00,000</span>
                </div>
              </div>
            </Card>

            {/* Brand Preview */}
            <Card className="p-6 mb-8">
              <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-champagne-400" />
                Brand Identity Preview
              </h3>
              <div className="flex items-center gap-4 p-4 bg-graphite-800/50 rounded-xl">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: brandIdentity.primaryColor }}>
                  <span className="text-graphite-950 font-bold text-xl">{companyName.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1">
                  <div className="h-4 rounded mb-2" style={{ backgroundColor: brandIdentity.secondaryColor }} />
                  <p className="text-body-sm text-slate-400 italic">"{brandIdentity.tagline}"</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 rounded-full text-caption font-medium bg-graphite-800 text-slate-400 border border-graphite-700">
                      {brandIdentity.logoType} logo
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* What Happens Next */}
            <div className="mb-8">
              <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 text-center">
                What Happens Next
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Target, title: 'Daily Simulation', desc: 'Business runs day-by-day with real mechanics' },
                  { icon: TrendingUp, title: 'Track Performance', desc: 'Revenue, profit, customers, satisfaction' },
                  { icon: Users, title: 'Build Your Team', desc: 'Hire, manage, and grow departments' },
                  { icon: Award, title: 'Earn Achievements', desc: 'Unlock 24 achievements across 4 tiers' },
                  { icon: Rocket, title: 'Face Challenges', desc: '15+ dynamic business events' },
                  { icon: Building2, title: 'Grow Your City', desc: 'Watch your empire expand in 3D' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.06 }}
                    className="card-hover p-4 text-center"
                  >
                    <div className="w-12 h-12 rounded-xl bg-graphite-800 flex items-center justify-center mx-auto mb-3 text-champagne-400">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-medium text-ivory-100">{item.title}</h4>
                    <p className="text-body-sm text-slate-400 mt-1">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <Button
                onClick={handleLaunch}
                size="lg"
                rightIcon={<Rocket className="w-5 h-5" />}
                className="w-full max-w-md"
              >
                Launch My Company
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between mt-6"
            >
              <Button variant="ghost" onClick={onBack}>
                <ArrowRight className="w-5 h-5 rotate-180" />
                Back
              </Button>
              <div className="w-20" />
            </motion.div>
          </motion.div>
        )}

        {/* Launch Animation */}
        {launchStage !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-3 bg-graphite-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${launchProgress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-champagne-400 to-champagne-600"
                />
              </div>
              <p className="text-caption text-slate-400 text-center mt-2">
                {stages.find(s => s.key === launchStage)?.label || 'Processing...'}
              </p>
            </div>

            {/* Animation Area */}
            <div className="relative h-64 flex items-center justify-center mb-8">
              {/* Confetti burst */}
              <AnimatePresence>
                {showConfetti && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 2 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <ConfettiBurst />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rocket/Building Animation */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
                className="relative z-10"
              >
                <div className="text-center">
                  {launchStage === 'initializing' && (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center animate-pulse">
                      <Building2 className="w-12 h-12 text-graphite-950" />
                    </div>
                  )}
                  {launchStage === 'creating' && (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center animate-pulse">
                      <Sparkles className="w-12 h-12 text-white" />
                    </div>
                  )}
                  {launchStage === 'launching' && (
                    <div className="relative">
                      <motion.div
                        animate={{ y: [-20, 0, -20], rotate: [-5, 0, 5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-24 h-24 mx-auto mb-4"
                      >
                        <Rocket className="w-24 h-24 text-champagne-400" />
                      </motion.div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-t from-champagne-400/50 to-transparent rounded-full blur-lg animate-pulse" />
                    </div>
                  )}
                  {launchStage === 'complete' && (
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                  )}

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-heading-lg font-display font-semibold text-ivory-100"
                  >
                    {launchStage === 'initializing' && 'Initializing Systems...'}
                    {launchStage === 'creating' && 'Creating Your Company...'}
                    {launchStage === 'launching' && 'Launching to Market...'}
                    {launchStage === 'complete' && 'Welcome to MINI CEO!'}
                  </motion.h3>
                </div>
              </motion.div>

              {/* Orbiting elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: 360,
                      x: [0, 100 * Math.cos(i * Math.PI / 3), 0],
                      y: [0, 100 * Math.sin(i * Math.PI / 3), 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: i * 1.3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-champagne-400/30 blur-sm"
                  />
                ))}
              </div>
            </div>

            {/* Stage Indicators */}
            <div className="flex justify-center gap-4 mb-8">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'flex flex-col items-center gap-2',
                    launchStage === stage.key || (stages.indexOf(stages.find(s => s.key === launchStage)!) > index) ? 'text-champagne-400' : 'text-slate-500'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all',
                    launchStage === stage.key
                      ? 'border-champagne-400 bg-champagne-400/20 animate-pulse'
                      : stages.indexOf(stages.find(s => s.key === launchStage)!) > index
                        ? 'border-success-400 bg-success-400/20'
                        : 'border-graphite-700'
                  )}>
                    {stages.indexOf(stages.find(s => s.key === launchStage)!) > index ? (
                      <CheckCircle className="w-5 h-5 text-success-400" />
                    ) : (
                      <span className="text-caption font-bold">{index + 1}</span>
                    )}
                  </div>
                  <span className="text-caption text-center max-w-[80px]">{stage.label.split('...')[0]}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Confetti component
function ConfettiBurst() {
  const colors = ['#C9B896', '#B8A484', '#A38F6E', '#4ADE80', '#3B82F6', '#F59E0B']

  return (
    <div className="absolute inset-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <ConfettiPiece key={i} color={colors[Math.floor(Math.random() * colors.length)]} delay={Math.random() * 0.5} />
      ))}
    </div>
  )
}

function ConfettiPiece({ color, delay }: { color: string; delay: number }) {
  const x = (Math.random() - 0.5) * 400
  const y = -200 - Math.random() * 300
  const rotation = Math.random() * 720

  return (
    <motion.div
      initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
      animate={{ x, y, rotate: rotation, opacity: 0 }}
      transition={{ duration: 1.5, delay, ease: 'easeOut' }}
      className="absolute top-1/2 left-1/2 w-2 h-3"
      style={{ backgroundColor: color, transformOrigin: 'center' }}
    />
  )
}