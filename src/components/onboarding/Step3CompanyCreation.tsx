import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronRight, Building2, Palette, Target, PenTool, Check } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui'
import { Input } from '@components/ui/Input'
import { Textarea } from '@components/ui/Input'
import { Select, SelectOption } from '@components/ui/Select'
import { Card } from '@components/ui/Card'
import { INDUSTRIES } from '@data/industries'

export interface CompanyCreationData {
  name: string
  description: string
  brandIdentity: {
    primaryColor: string
    secondaryColor: string
    logoType: 'minimal' | 'modern' | 'playful' | 'professional'
    tagline: string
  }
  strategy: 'growth' | 'profitability' | 'innovation' | 'customer-focus' | 'balanced'
}

export interface Step3CompanyCreationProps {
  data: CompanyCreationData
  onChange: (data: Partial<CompanyCreationData>) => void
  onNext: () => void
  onBack: () => void
  industry: string
}

const logoTypes: SelectOption[] = [
  { value: 'minimal', label: 'Minimal', description: 'Clean, simple, timeless' },
  { value: 'modern', label: 'Modern', description: 'Bold, geometric, contemporary' },
  { value: 'playful', label: 'Playful', description: 'Fun, approachable, creative' },
  { value: 'professional', label: 'Professional', description: 'Corporate, trustworthy, established' },
]

const strategies: SelectOption[] = [
  { value: 'growth', label: 'Growth Focused', description: 'Prioritize market share and user acquisition over short-term profit' },
  { value: 'profitability', label: 'Profit First', description: 'Maximize margins and cash flow from day one' },
  { value: 'innovation', label: 'Innovation Driven', description: 'Invest heavily in R&D and cutting-edge products' },
  { value: 'customer-focus', label: 'Customer Obsessed', description: 'Exceptional experience and satisfaction above all' },
  { value: 'balanced', label: 'Balanced Approach', description: 'Steady growth with sustainable profits' },
]

const colorOptions = [
  { value: '#3B82F6', name: 'Blue', label: 'Trust & Technology' },
  { value: '#8B5CF6', name: 'Purple', label: 'Innovation & Creativity' },
  { value: '#EC4899', name: 'Pink', label: 'Style & Passion' },
  { value: '#F97316', name: 'Orange', label: 'Energy & Enthusiasm' },
  { value: '#10B981', name: 'Green', label: 'Growth & Sustainability' },
  { value: '#F59E0B', name: 'Amber', label: 'Optimism & Warmth' },
  { value: '#06B6D4', name: 'Cyan', label: 'Clarity & Communication' },
  { value: '#84CC16', name: 'Lime', label: 'Freshness & Vitality' },
  { value: '#EF4444', name: 'Red', label: 'Boldness & Action' },
  { value: '#6366F1', name: 'Indigo', label: 'Depth & Intelligence' },
  { value: '#14B8A6', name: 'Teal', label: 'Balance & Harmony' },
  { value: '#D946EF', name: 'Fuchsia', label: 'Creativity & Magic' },
]

export function Step3CompanyCreation({ data, onChange, onNext, onBack, industry }: Step3CompanyCreationProps) {
  const [nameError, setNameError] = useState('')
  const [taglineError, setTaglineError] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNameError(value.length > 0 && value.length < 2 ? 'Company name must be at least 2 characters' : '')
    onChange({ name: value })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ description: e.target.value })
  }

  const handleTaglineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTaglineError(value.length > 80 ? 'Tagline must be 80 characters or less' : '')
    onChange({ brandIdentity: { ...data.brandIdentity, tagline: value } })
  }

  const handlePrimaryColorChange = (color: string) => {
    onChange({ brandIdentity: { ...data.brandIdentity, primaryColor: color } })
  }

  const handleSecondaryColorChange = (color: string) => {
    onChange({ brandIdentity: { ...data.brandIdentity, secondaryColor: color } })
  }

  const handleLogoTypeChange = (value: string) => {
    onChange({ brandIdentity: { ...data.brandIdentity, logoType: value as any } })
  }

  const handleStrategyChange = (value: string) => {
    onChange({ strategy: value as any })
  }

  const canProceed = data.name.trim().length >= 2 && data.tagline.trim().length <= 80

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
          <span className="text-caption text-slate-400">Step 3 of 5</span>
          <span className="text-caption text-champagne-400 font-mono">Company Creation</span>
        </div>
        <div className="h-1 bg-graphite-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '60%' }}
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
          <h2 className="text-display-md font-display font-bold text-ivory-100">Create Your Company</h2>
        </motion.div>
        <p className="text-body text-slate-400 max-w-lg mx-auto">
          Define your company's identity, brand, and strategy. This shapes how customers perceive you.
        </p>
      </div>

      {/* Basic Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-8"
      >
        <Card className="p-6">
          <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-champagne-400" />
            Company Details
          </h3>
          <Input
            label="Company Name"
            value={data.name}
            onChange={handleNameChange}
            placeholder="Enter your company name"
            error={nameError}
            autoComplete="organization"
            className="text-lg"
          />
          <Textarea
            label="Company Description"
            value={data.description}
            onChange={handleDescriptionChange}
            placeholder="Describe what your company does, your mission, and what makes you unique..."
            rows={3}
            helperText="This appears on your company profile and helps define your brand voice."
          />
        </Card>
      </motion.div>

      {/* Brand Identity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 mb-8"
      >
        <Card className="p-6">
          <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-champagne-400" />
            Brand Identity
          </h3>

          {/* Color Pickers */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="label">Primary Brand Color</label>
              <div className="grid grid-cols-6 gap-2" role="radiogroup" aria-label="Select primary color">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    role="radio"
                    aria-checked={data.brandIdentity.primaryColor === color.value}
                    onClick={() => handlePrimaryColorChange(color.value)}
                    className={cn(
                      'relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-fast',
                      data.brandIdentity.primaryColor === color.value
                        ? 'border-champagne-400 shadow-lg shadow-champagne-400/20'
                        : 'border-graphite-700 hover:border-graphite-600'
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  >
                    {data.brandIdentity.primaryColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center bg-graphite-950/50">
                        <Check className="w-6 h-6 text-champagne-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Secondary Brand Color</label>
              <div className="grid grid-cols-6 gap-2" role="radiogroup" aria-label="Select secondary color">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    role="radio"
                    aria-checked={data.brandIdentity.secondaryColor === color.value}
                    onClick={() => handleSecondaryColorChange(color.value)}
                    className={cn(
                      'relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-fast',
                      data.brandIdentity.secondaryColor === color.value
                        ? 'border-champagne-400 shadow-lg shadow-champagne-400/20'
                        : 'border-graphite-700 hover:border-graphite-600'
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  >
                    {data.brandIdentity.secondaryColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center bg-graphite-950/50">
                        <Check className="w-6 h-6 text-champagne-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="mb-6 p-4 bg-graphite-800/50 rounded-xl border border-graphite-700">
            <p className="text-caption text-slate-400 mb-3">Brand Preview</p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: data.brandIdentity.primaryColor }}>
                <span className="text-graphite-950 font-bold text-lg">{data.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1">
                <div className="h-4 rounded bg-graphite-700" style={{ backgroundColor: data.brandIdentity.secondaryColor }} />
                <p className="text-body-sm text-slate-400 mt-2">{data.brandIdentity.tagline || 'Your tagline here...'}</p>
              </div>
            </div>
          </div>

          {/* Logo Type & Tagline */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Select
              label="Logo Style"
              options={logoTypes}
              value={data.brandIdentity.logoType}
              onChange={handleLogoTypeChange}
              placeholder="Select logo style"
            />
            <Input
              label="Tagline"
              value={data.brandIdentity.tagline}
              onChange={handleTaglineChange}
              placeholder="A memorable phrase (max 80 chars)"
              error={taglineError}
              maxLength={80}
            />
          </div>
        </Card>
      </motion.div>

      {/* Business Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card className="p-6">
          <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-champagne-400" />
            Business Strategy
          </h3>
          <p className="text-body-sm text-slate-400 mb-4">
            Your strategy influences simulation mechanics and available bonuses. Choose what aligns with your vision.
          </p>
          <div className="grid gap-3" role="radiogroup" aria-label="Select business strategy">
            {strategies.map(strategy => (
              <button
                key={strategy.value}
                type="button"
                role="radio"
                aria-checked={data.strategy === strategy.value}
                onClick={() => handleStrategyChange(strategy.value)}
                className={cn(
                  'relative p-4 rounded-xl border-2 text-left transition-all duration-fast',
                  data.strategy === strategy.value
                    ? 'border-champagne-400 bg-champagne-400/10'
                    : 'border-graphite-700 hover:border-graphite-600'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                    data.strategy === strategy.value
                      ? 'bg-champagne-400 text-graphite-950'
                      : 'bg-graphite-800 text-slate-400'
                  )}>
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      'font-medium',
                      data.strategy === strategy.value ? 'text-ivory-100' : 'text-slate-300'
                    )}>
                      {strategy.label}
                    </p>
                    <p className="text-body-sm text-slate-500 mt-0.5">{strategy.description}</p>
                  </div>
                  {data.strategy === strategy.value && (
                    <div className="w-6 h-6 rounded-full bg-champagne-400 flex items-center justify-center">
                      <Check className="w-4 h-4 text-graphite-950" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

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