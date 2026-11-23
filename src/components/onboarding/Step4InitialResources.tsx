import { motion } from 'motion/react'
import { ChevronRight, DollarSign, PiggyBank, Shield, Info, AlertCircle } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui'
import { Card } from '@components/ui/Card'
import { NumberDisplay } from '@components/ui/NumberDisplay'

export interface InitialResourcesData {
  acknowledged: boolean
}

export interface Step4InitialResourcesProps {
  data: InitialResourcesData
  onChange: (data: Partial<InitialResourcesData>) => void
  onNext: () => void
  onBack: () => void
}

export function Step4InitialResources({ data, onChange, onNext, onBack }: Step4InitialResourcesProps) {
  const handleAcknowledge = () => {
    onChange({ acknowledged: true })
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
          <span className="text-caption text-slate-400">Step 4 of 5</span>
          <span className="text-caption text-champagne-400 font-mono">Initial Resources</span>
        </div>
        <div className="h-1 bg-graphite-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-champagne-400 to-champagne-600"
          />
        </div>
      </div>

      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-graphite-950" />
          </div>
          <h2 className="text-display-md font-display font-bold text-ivory-100">Your Starting Capital</h2>
        </motion.div>
        <p className="text-body text-slate-400 max-w-lg mx-auto">
          Every new company receives virtual seed funding to start their journey. Understand the rules before you begin.
        </p>
      </div>

      {/* Capital Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="p-8 text-center bg-gradient-to-br from-champagne-400/10 to-champagne-600/10 border-champagne-400/30 relative overflow-hidden">
          <div className="absolute top-4 right-4 w-24 h-24 bg-champagne-400/5 rounded-full blur-xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
                <PiggyBank className="w-8 h-8 text-graphite-950" />
              </div>
            </div>
            <p className="text-heading-md font-display font-semibold text-ivory-100 mb-2">
              Starting Capital
            </p>
            <NumberDisplay
              value={100000}
              format="currency"
              size="xl"
              color="champagne"
              animate
            />
            <p className="mt-4 text-body text-slate-300 max-w-lg mx-auto">
              Virtual currency to fund your first products, marketing campaigns, and hires.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Rules & Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 mb-8"
      >
        <div className="flex items-center gap-3 p-4 card">
          <div className="w-10 h-10 rounded-xl bg-champagne-400/20 flex items-center justify-center flex-shrink-0 text-champagne-400">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium text-ivory-100">Virtual Currency Only</h4>
            <p className="text-body-sm text-slate-400 mt-0.5">
              All money in MINI CEO is fictional simulation currency (₹). It has no real-world value and cannot be withdrawn, exchanged, or converted.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 card">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium text-ivory-100">No Real Money Required</h4>
            <p className="text-body-sm text-slate-400 mt-0.5">
              You never need to spend real money. The simulation is completely free and runs entirely in your browser with LocalStorage persistence.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 card border-champagne-400/30 bg-champagne-400/5">
          <div className="w-10 h-10 rounded-xl bg-champagne-400/20 flex items-center justify-center flex-shrink-0 text-champagne-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium text-ivory-100">Educational Purpose</h4>
            <p className="text-body-sm text-slate-400 mt-0.5">
              This simulation teaches business concepts through gameplay. Results don't guarantee real-world success. Make decisions and learn from consequences!
            </p>
          </div>
        </div>
      </motion.div>

      {/* What You Can Do With ₹1,00,000 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 text-center">
          What Can You Do With ₹1,00,000?
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: '💡', title: 'Develop Products', desc: 'Create 2-3 initial products with production costs', cost: '₹15,000-30,000' },
            { icon: '📢', title: 'Launch Marketing', desc: 'Run social media or content campaigns', cost: '₹10,000-25,000' },
            { icon: '👥', title: 'Hire Team', desc: 'Recruit 1-2 junior employees', cost: '₹20,000-40,000/month' },
            { icon: '🏢', title: 'Upgrade Departments', desc: 'Level up Product or Marketing dept', cost: '₹20,000-25,000' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              className="card-hover p-4"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h4 className="font-medium text-ivory-100">{item.title}</h4>
                  <p className="text-body-sm text-slate-400 mt-0.5">{item.desc}</p>
                  <span className="text-caption font-mono text-champagne-400 mt-1 block">{item.cost}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Acknowledgment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <label className="flex items-start gap-3 cursor-pointer p-4 card rounded-xl transition-all hover:border-champagne-400/50"
          onClick={handleAcknowledge}
        >
          <div className={cn(
            'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
            data.acknowledged
              ? 'bg-champagne-400 border-champagne-400 text-graphite-950'
              : 'border-graphite-600 hover:border-champagne-400'
          )}>
            {data.acknowledged && (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-ivory-100">I understand this is virtual currency for simulation purposes only</p>
            <p className="text-body-sm text-slate-400 mt-0.5">No real money involved • Educational use only • Runs in browser</p>
          </div>
        </label>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={onBack}>
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!data.acknowledged}
          rightIcon={<ChevronRight className="w-5 h-5" />}
          size="lg"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}