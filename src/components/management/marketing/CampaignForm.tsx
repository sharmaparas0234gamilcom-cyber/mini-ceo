import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { X, Target, Users, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { Select, SelectOption } from '@components/ui/Select'
import { NumberDisplay } from '@components/ui/NumberDisplay'
import { useGameStore } from '@store/gameStore'

interface CampaignFormData {
  name: string
  type: 'social-media' | 'influencer' | 'content' | 'email' | 'paid-ads' | 'events' | 'pr'
  budget: number
  targetAudience: 'gen-z' | 'millennials' | 'gen-x' | 'professionals' | 'students' | 'families' | 'general'
  startDay: number
  endDay: number
}

const initialFormData: CampaignFormData = {
  name: '',
  type: 'social-media',
  budget: 10000,
  targetAudience: 'professionals',
  startDay: 1,
  endDay: 14,
}

const campaignTypes: SelectOption[] = [
  { value: 'social-media', label: 'Social Media', description: 'Facebook, Instagram, Twitter, LinkedIn ads' },
  { value: 'influencer', label: 'Influencer Marketing', description: 'Partner with industry influencers' },
  { value: 'content', label: 'Content Marketing', description: 'Blog posts, videos, SEO, whitepapers' },
  { value: 'email', label: 'Email Marketing', description: 'Newsletter, drip campaigns, promotions' },
  { value: 'paid-ads', label: 'Paid Advertising', description: 'Google Ads, display, retargeting' },
  { value: 'events', label: 'Events & Conferences', description: 'Trade shows, webinars, meetups' },
  { value: 'pr', label: 'Public Relations', description: 'Press releases, media outreach, reviews' },
]

const audiences: SelectOption[] = [
  { value: 'gen-z', label: 'Gen Z (18-26)', description: 'Digital natives, social media driven' },
  { value: 'millennials', label: 'Millennials (27-42)', description: 'Tech-savvy, value-driven buyers' },
  { value: 'gen-x', label: 'Gen X (43-58)', description: 'Established professionals, brand loyal' },
  { value: 'professionals', label: 'Professionals', description: 'B2B decision makers, high value' },
  { value: 'students', label: 'Students', description: 'Budget-conscious, trend followers' },
  { value: 'families', label: 'Families', description: 'Household purchasers, practical' },
  { value: 'general', label: 'General Audience', description: 'Broad reach, lower targeting' },
]

const typeMetrics: Record<string, { efficiency: number; ctr: number; conversion: number; costPerImpression: number }> = {
  'social-media': { efficiency: 15, ctr: 0.03, conversion: 0.03, costPerImpression: 0.001 },
  'influencer': { efficiency: 25, ctr: 0.05, conversion: 0.04, costPerImpression: 0.002 },
  'content': { efficiency: 10, ctr: 0.02, conversion: 0.02, costPerImpression: 0.0005 },
  'email': { efficiency: 30, ctr: 0.04, conversion: 0.05, costPerImpression: 0.0002 },
  'paid-ads': { efficiency: 20, ctr: 0.025, conversion: 0.025, costPerImpression: 0.0015 },
  'events': { efficiency: 8, ctr: 0.015, conversion: 0.03, costPerImpression: 0.003 },
  'pr': { efficiency: 12, ctr: 0.01, conversion: 0.02, costPerImpression: 0.0008 },
}

const audienceMatch: Record<string, Record<string, number>> = {
  'technology': { professionals: 1.2, students: 0.8, 'gen-z': 1.0, millennials: 1.1 },
  'fashion': { 'gen-z': 1.3, millennials: 1.2, professionals: 0.9 },
  'food-beverage': { families: 1.3, professionals: 1.1, students: 1.0 },
  'gaming': { 'gen-z': 1.4, millennials: 1.2, students: 1.1 },
  'education': { students: 1.3, professionals: 1.2, 'lifelong-learners': 1.1 },
  'entertainment': { 'gen-z': 1.2, millennials: 1.1, general: 1.0 },
}

interface CampaignFormProps {
  campaign?: CampaignFormData & { id: string }
  onClose: () => void
  onSubmit: (data: CampaignFormData) => void
  industry: string
}

export function CampaignForm({ campaign, onClose, onSubmit, industry }: CampaignFormProps) {
  const [formData, setFormData] = useState<CampaignFormData>(
    campaign ? { ...campaign, startDay: campaign.startDay, endDay: campaign.endDay } : {
      ...initialFormData,
      startDay: useGameStore.getState().simulationDay,
      endDay: useGameStore.getState().simulationDay + 14,
    }
  )
  const [errors, setErrors] = useState<Partial<Record<keyof CampaignFormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (campaign) {
      setFormData({
        ...campaign,
        startDay: campaign.startDay,
        endDay: campaign.endDay,
      })
    }
  }, [campaign])

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CampaignFormData, string>> = {}

    if (!formData.name.trim()) newErrors.name = 'Campaign name is required'
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters'

    if (formData.budget <= 0) newErrors.budget = 'Budget must be greater than 0'

    if (formData.startDay < useGameStore.getState().simulationDay) newErrors.startDay = 'Start day cannot be in the past'

    if (formData.endDay <= formData.startDay) newErrors.endDay = 'End day must be after start day'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setTimeout(() => {
      onSubmit(formData)
      setSubmitting(false)
      onClose()
    }, 300)
  }

  const handleChange = (field: keyof CampaignFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const campaignDays = formData.endDay - formData.startDay + 1
  const dailyBudget = formData.budget / campaignDays
  const metrics = typeMetrics[formData.type]
  const match = audienceMatch[industry]?.[formData.targetAudience] || 1.0

  const estimatedImpressions = Math.round(formData.budget * metrics.efficiency * match)
  const estimatedClicks = Math.round(estimatedImpressions * metrics.ctr)
  const estimatedConversions = Math.round(estimatedClicks * metrics.conversion * match)
  const estimatedCAC = estimatedConversions > 0 ? formData.budget / estimatedConversions : 0
  const estimatedRevenue = estimatedConversions * 2500 // Assuming average order value

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="campaign-form-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-graphite-900 rounded-xl border border-graphite-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-graphite-800 sticky top-0 bg-graphite-900/95 backdrop-blur z-10 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-graphite-950" />
            </div>
            <h2 id="campaign-form-title" className="text-heading-lg font-display font-semibold text-ivory-100">
              {campaign ? 'Edit Campaign' : 'Create New Campaign'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-ivory-100 hover:bg-graphite-800 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <Card className="p-5">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-champagne-400" />
              Campaign Details
            </h3>
            <div className="space-y-4">
              <Input
                label="Campaign Name"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="e.g., Q1 Product Launch"
                error={errors.name}
                autoFocus
              />
              <Select
                label="Channel Type"
                options={campaignTypes}
                value={formData.type}
                onChange={value => handleChange('type', value as any)}
                placeholder="Select channel"
              />
              <Select
                label="Target Audience"
                options={audiences}
                value={formData.targetAudience}
                onChange={value => handleChange('targetAudience', value as any)}
                placeholder="Select audience"
              />
            </div>
          </Card>

          {/* Budget & Schedule */}
          <Card className="p-5">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-champagne-400" />
              Budget & Schedule
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Input
                label="Total Budget (₹)"
                type="number"
                value={formData.budget}
                onChange={e => handleChange('budget', parseInt(e.target.value) || 0)}
                placeholder="10000"
                error={errors.budget}
              />
              <Input
                label="Campaign Duration (days)"
                type="number"
                value={campaignDays}
                onChange={e => {
                  const days = parseInt(e.target.value) || 1
                  handleChange('endDay', formData.startDay + days - 1)
                }}
                placeholder="14"
                readOnly
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Start Day"
                type="number"
                value={formData.startDay}
                onChange={e => handleChange('startDay', parseInt(e.target.value) || useGameStore.getState().simulationDay)}
                placeholder={useGameStore.getState().simulationDay.toString()}
                error={errors.startDay}
              />
              <Input
                label="End Day"
                type="number"
                value={formData.endDay}
                onChange={e => handleChange('endDay', parseInt(e.target.value) || formData.startDay + 13)}
                placeholder={(formData.startDay + 13).toString()}
                error={errors.endDay}
              />
            </div>
          </Card>

          {/* Performance Preview */}
          <Card className="p-5">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-champagne-400" />
              Performance Preview
            </h3>
            <p className="text-body-sm text-slate-400 mb-4">
              Estimated performance based on channel benchmarks, audience match, and budget.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <MetricCard label="Impressions" value={formatNumber(estimatedImpressions)} icon="👁️" color="champagne" />
              <MetricCard label="Clicks" value={formatNumber(estimatedClicks)} icon="🖱️" color="blue" />
              <MetricCard label="Conversions" value={formatNumber(estimatedConversions)} icon="✅" color="success" />
              <MetricCard label="Est. CAC" value={formatCurrency(estimatedCAC)} icon="💰" color="default" />
            </div>

            <div className="p-4 bg-graphite-800/50 rounded-xl border border-graphite-700">
              <h4 className="text-heading-sm font-display font-semibold text-ivory-100 mb-3">Revenue Projection</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-graphite-800 rounded-lg">
                  <p className="text-caption text-slate-400">Conservative</p>
                  <NumberDisplay value={Math.round(estimatedRevenue * 0.5)} format="currency" size="md" color="default" className="block" />
                </div>
                <div className="p-3 bg-graphite-800 rounded-lg">
                  <p className="text-caption text-slate-400">Expected</p>
                  <NumberDisplay value={estimatedRevenue} format="currency" size="md" color="champagne" className="block" />
                </div>
                <div className="p-3 bg-graphite-800 rounded-lg">
                  <p className="text-caption text-slate-400">Optimistic</p>
                  <NumberDisplay value={Math.round(estimatedRevenue * 1.5)} format="currency" size="md" color="success" className="block" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-body-sm text-slate-400">
                <AlertTriangle className="w-4 h-4 text-champagne-400" />
                <span>ROI projection: {((estimatedRevenue - formData.budget) / formData.budget * 100).toFixed(0)}% (based on avg. order value ₹2,500)</span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-graphite-800">
            <Button variant="ghost" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              {campaign ? 'Save Changes' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function MetricCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  const colors: Record<string, string> = {
    champagne: 'text-champagne-400',
    blue: 'text-blue-400',
    success: 'text-success-400',
    default: 'text-ivory-100',
  }

  return (
    <div className="p-3 bg-graphite-800 rounded-xl text-center">
      <span className="text-2xl mb-1 block">{icon}</span>
      <p className="text-caption text-slate-400">{label}</p>
      <p className={cn('font-mono font-semibold text-lg', colors[color] || colors.default)}>
        {value}
      </p>
    </div>
  )
}