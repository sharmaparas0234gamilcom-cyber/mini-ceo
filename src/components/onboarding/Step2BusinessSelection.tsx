import { motion } from 'motion/react'
import { ChevronRight, Building2, Shirt, Coffee, Gamepad2, GraduationCap, Film, Check } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui'
import { Card } from '@components/ui/Card'
import { INDUSTRIES, IndustryData } from '@data/industries'
import { INDUSTRY_LIST } from '@data/industries'

export interface BusinessSelectionData {
  industry: IndustryData['id'] | null
}

export interface Step2BusinessSelectionProps {
  data: BusinessSelectionData
  onChange: (data: Partial<BusinessSelectionData>) => void
  onNext: () => void
  onBack: () => void
}

const industryIcons: Record<IndustryData['id'], React.ComponentType<{ className?: string }>> = {
  technology: Building2,
  fashion: Shirt,
  'food-beverage': Coffee,
  gaming: Gamepad2,
  education: GraduationCap,
  entertainment: Film,
}

const industryDescriptions: Record<IndustryData['id'], string[]> = {
  technology: ['High growth potential', 'Scalable digital products', 'Tech-savvy customers'],
  fashion: ['Creative & trend-driven', 'Seasonal collections', 'Brand loyalty matters'],
  'food-beverage': ['Steady repeat demand', 'Perishable inventory', 'Health trends impact sales'],
  gaming: ['Passionate community', 'High engagement', 'Viral potential'],
  education: ['Growing market', 'Social impact', 'Recurring revenue models'],
  entertainment: ['Creative freedom', 'Viral potential', 'Multiple revenue streams'],
}

export function Step2BusinessSelection({ data, onChange, onNext, onBack }: Step2BusinessSelectionProps) {
  const handleIndustrySelect = (industryId: IndustryData['id']) => {
    onChange({ industry: industryId })
  }

  const selectedIndustry = data.industry ? INDUSTRIES[data.industry] : null
  const canProceed = !!data.industry

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption text-slate-400">Step 2 of 5</span>
          <span className="text-caption text-champagne-400 font-mono">Business Selection</span>
        </div>
        <div className="h-1 bg-graphite-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
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
            <Building2 className="w-6 h-6 text-graphite-950" />
          </div>
          <h2 className="text-display-md font-display font-bold text-ivory-100">Choose Your Industry</h2>
        </motion.div>
        <p className="text-body text-slate-400 max-w-lg mx-auto">
          Each industry has unique dynamics, customer behaviors, and challenges. Pick one that excites you!
        </p>
      </div>

      {/* Industry Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRY_LIST.map((industry, index) => (
            <motion.article
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <button
                type="button"
                onClick={() => handleIndustrySelect(industry.id)}
                className={cn(
                  'relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-fast group',
                  data.industry === industry.id
                    ? 'border-champagne-400 bg-champagne-400/10 shadow-xl shadow-champagne-400/10'
                    : 'border-graphite-700 hover:border-graphite-600 hover:shadow-lg'
                )}
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${industry.color} 0%, ${industry.backgroundColor} 100%)` }}
                />

                {/* Content */}
                <div className="relative p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
                        {(() => {
                          const Icon = industryIcons[industry.id as keyof typeof industryIcons]
                          return Icon ? <Icon className="w-6 h-6 text-graphite-950" /> : <Building2 className="w-6 h-6 text-graphite-950" />
                        })()}
                      </div>
                      {data.industry === industry.id && (
                        <div className="w-8 h-8 rounded-full bg-champagne-400 flex items-center justify-center">
                          <Check className="w-5 h-5 text-graphite-950" />
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-heading-lg font-display font-semibold text-ivory-100">
                        {industry.name}
                      </h3>
                      <p className="text-body-sm text-slate-400 mt-1 line-clamp-2">
                        {industry.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className={cn('px-2 py-1 rounded-full text-caption font-medium', 'bg-' + industry.difficulty + '-500/20 text-' + industry.difficulty + '-400 border border-' + industry.difficulty + '-500/30')}>
                      {industry.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-full text-caption font-medium bg-graphite-800 text-slate-400 border border-graphite-700">
                      {industry.competitionLevel} competition
                    </span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-graphite-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-caption text-slate-400 mb-3">Key characteristics:</p>
                  <ul className="space-y-1.5">
                    {industryDescriptions[industry.id].map((desc, i) => (
                      <li key={i} className="flex items-center gap-2 text-body-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne-400/50 flex-shrink-0" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* Selected Industry Details */}
      {selectedIndustry && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 p-6 card bg-champagne-400/5 border-champagne-400/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center flex-shrink-0">
              {(() => {
                const Icon = industryIcons[selectedIndustry.id as keyof typeof industryIcons]
                return Icon ? <Icon className="w-7 h-7 text-graphite-950" /> : <Building2 className="w-7 h-7 text-graphite-950" />
              })()}
            </div>
            <div className="flex-1">
              <h3 className="text-heading-lg font-display font-semibold text-ivory-100">
                {selectedIndustry.name} Selected
              </h3>
              <p className="text-body-sm text-slate-400 mt-1">
                Starting products: {selectedIndustry.startingProducts.map(p => p.name).join(', ')}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="default" className="bg-graphite-800 text-slate-300 border-graphite-700">
                  Market Size: {selectedIndustry.marketSize.toLocaleString()}
                </Badge>
                <Badge variant="default" className="bg-graphite-800 text-slate-300 border-graphite-700">
                  Growth Rate: {(selectedIndustry.growthRate * 100).toFixed(0)}%/month
                </Badge>
                <Badge variant="default" className="bg-graphite-800 text-slate-300 border-graphite-700">
                  Price Elasticity: {selectedIndustry.priceElasticity}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={onBack}>
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          rightIcon={<ChevronRight className="w-5 h-5" />}
          size="lg"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}

// Need Badge import
import { Badge } from '@components/ui/Badge'