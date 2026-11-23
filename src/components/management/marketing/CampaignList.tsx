import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Trash2, Edit, Play, Pause, BarChart3, Target, DollarSign, Users, ChevronRight } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Badge } from '@components/ui/Badge'
import { NumberDisplay, NumberChangeIndicator } from '@components/ui/NumberDisplay'
import { formatCurrency, formatNumber } from '@utils/helpers'
import { useGameStore } from '@store/gameStore'

const campaignTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'social-media': Target,
  influencer: Users,
  content: BarChart3,
  email: DollarSign,
  'paid-ads': ChevronRight,
  events: Target,
  pr: BarChart3,
}

const campaignTypeLabels: Record<string, string> = {
  'social-media': 'Social Media',
  influencer: 'Influencer',
  content: 'Content',
  email: 'Email',
  'paid-ads': 'Paid Ads',
  events: 'Events',
  pr: 'PR',
}

const audienceLabels: Record<string, string> = {
  'gen-z': 'Gen Z',
  millennials: 'Millennials',
  'gen-x': 'Gen X',
  professionals: 'Professionals',
  students: 'Students',
  families: 'Families',
  general: 'General',
}

export function CampaignList() {
  const { campaigns, actions } = useGameStore()
  const [editingCampaign, setEditingCampaign] = React.useState<string | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const [deletingCampaign, setDeletingCampaign] = React.useState<string | null>(null)

  const handleDelete = (id: string) => {
    setDeletingCampaign(id)
  }

  const confirmDelete = (id: string) => {
    actions.deleteCampaign(id)
    setDeletingCampaign(null)
  }

  const handlePause = (id: string) => {
    actions.pauseCampaign(id)
  }

  const handleResume = (id: string) => {
    actions.resumeCampaign(id)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'paused': return 'warning'
      case 'completed': return 'info'
      case 'draft': return 'default'
      default: return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'paused': return 'Paused'
      case 'completed': return 'Completed'
      case 'draft': return 'Draft'
      default: return status
    }
  }

  if (campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BarChart3 className="w-16 h-16 text-slate-600 mb-4" />
        <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">No Campaigns Yet</h3>
        <p className="text-body text-slate-400 mb-6 max-w-md">
          Launch your first marketing campaign to attract customers. Choose your channel, budget, and target audience.
        </p>
        <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Create First Campaign
        </Button>
      </div>
    )
  }

  const activeCampaigns = campaigns.filter(c => c.status === 'active')
  const completedCampaigns = campaigns.filter(c => c.status === 'completed')
  const draftCampaigns = campaigns.filter(c => c.status === 'draft')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-heading-lg font-display font-semibold text-ivory-100">Marketing Campaigns</h2>
          <p className="text-body-sm text-slate-400">{campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''} total • {activeCampaigns.length} active</p>
        </div>
        <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-4 h-4" />}>
          New Campaign
        </Button>
      </div>

      {/* Active Campaigns */}
      {activeCampaigns.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success-400" />
            Active Campaigns ({activeCampaigns.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeCampaigns.map((campaign, index) => (
              <motion.article
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card-hover relative"
              >
                <CampaignCard
                  campaign={campaign}
                  onEdit={() => setEditingCampaign(campaign.id)}
                  onPause={() => handlePause(campaign.id)}
                  onDelete={() => handleDelete(campaign.id)}
                />
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}

      {/* Completed Campaigns */}
      {completedCampaigns.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            Completed ({completedCampaigns.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedCampaigns.map((campaign, index) => (
              <motion.article
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card-hover opacity-70"
              >
                <CampaignCard
                  campaign={campaign}
                  onEdit={() => setEditingCampaign(campaign.id)}
                  onPause={() => {}}
                  onDelete={() => handleDelete(campaign.id)}
                />
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}

      {/* Draft Campaigns */}
      {draftCampaigns.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-500" />
            Drafts ({draftCampaigns.length})
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {draftCampaigns.map((campaign, index) => (
              <motion.article
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card-hover opacity-50"
              >
                <CampaignCard
                  campaign={campaign}
                  onEdit={() => setEditingCampaign(campaign.id)}
                  onPause={() => {}}
                  onDelete={() => handleDelete(campaign.id)}
                />
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingCampaign && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/80 backdrop-blur-sm"
            onClick={() => setDeletingCampaign(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-graphite-900 rounded-xl border border-graphite-800 p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">Delete Campaign?</h3>
              <p className="text-body text-slate-400 mb-6">
                Are you sure you want to delete this campaign? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setDeletingCampaign(null)}>Cancel</Button>
                <Button variant="danger" onClick={() => confirmDelete(deletingCampaign!)}>Delete</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CampaignCard({ campaign, onEdit, onPause, onDelete }: any) {
  const { campaigns, actions } = useGameStore()

  const latestPerformance = campaign.performance[campaign.performance.length - 1]
  const totalSpent = campaign.spent
  const totalRevenue = campaign.performance.reduce((sum, p) => sum + p.revenueGenerated, 0)
  const totalConversions = campaign.performance.reduce((sum, p) => sum + p.conversions, 0)
  const avgCAC = totalConversions > 0 ? totalSpent / totalConversions : 0
  const roi = totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0

  const daysRunning = campaign.performance.length
  const daysRemaining = campaign.endDay - (campaign.startDay + daysRunning - 1)

  const TypeIcon = campaignTypeIcons[campaign.type] || BarChart3

  return (
    <Card className="p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-graphite-800 flex items-center justify-center">
            <TypeIcon className="w-5 h-5 text-champagne-400" />
          </div>
          <div>
            <h4 className="font-medium text-ivory-100">{campaign.name}</h4>
            <span className="text-caption text-slate-400 capitalize">{campaignTypeLabels[campaign.type]}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={onEdit} aria-label="Edit campaign">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete} aria-label="Delete campaign">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="mb-4 p-3 bg-graphite-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={getStatusColor(campaign.status) as any} className="text-caption">
            {getStatusLabel(campaign.status)}
          </Badge>
          <span className="text-caption text-slate-400">
            Day {daysRunning} / {campaign.endDay - campaign.startDay + 1}
          </span>
        </div>
        <div className="flex items-center gap-4 text-body-sm text-slate-400">
          <span className="flex items-center gap-1">
            <Target className="w-3.5 h-3.5" />
            {audienceLabels[campaign.targetAudience]}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />
            {formatCurrency(campaign.budget)} budget
          </span>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-graphite-800/50 rounded-lg p-3">
          <p className="text-caption text-slate-400">Spent</p>
          <NumberDisplay value={totalSpent} format="currency" size="sm" color="danger" className="block" />
        </div>
        <div className="bg-graphite-800/50 rounded-lg p-3">
          <p className="text-caption text-slate-400">Revenue</p>
          <NumberDisplay value={totalRevenue} format="currency" size="sm" color="success" className="block" />
        </div>
        <div className="bg-graphite-800/50 rounded-lg p-3">
          <p className="text-caption text-slate-400">Conversions</p>
          <NumberDisplay value={totalConversions} format="number" size="sm" color="default" className="block" />
        </div>
        <div className="bg-graphite-800/50 rounded-lg p-3">
          <p className="text-caption text-slate-400">ROI</p>
          <NumberDisplay value={roi} format="percentage" size="sm" color={roi >= 0 ? 'success' : 'danger'} className="block" />
        </div>
      </div>

      {/* Latest Day Performance */}
      {latestPerformance && (
        <div className="pt-3 border-t border-graphite-800">
          <p className="text-caption text-slate-400 mb-2">Latest Day (Day {latestPerformance.day})</p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-graphite-800 rounded-lg">
              <p className="text-caption text-slate-400">Impressions</p>
              <NumberDisplay value={latestPerformance.impressions} format="number" size="sm" color="default" className="block" />
            </div>
            <div className="p-2 bg-graphite-800 rounded-lg">
              <p className="text-caption text-slate-400">Clicks</p>
              <NumberDisplay value={latestPerformance.clicks} format="number" size="sm" color="champagne" className="block" />
            </div>
            <div className="p-2 bg-graphite-800 rounded-lg">
              <p className="text-caption text-slate-400">CAC</p>
              <NumberDisplay value={latestPerformance.costPerAcquisition} format="currency" size="sm" color="default" className="block" />
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-graphite-800">
        {campaign.status === 'active' && (
          <Button variant="secondary" size="sm" onClick={onPause} className="flex-1" leftIcon={<Pause className="w-4 h-4" />}>
            Pause
          </Button>
        )}
        {campaign.status === 'paused' && (
          <Button variant="primary" size="sm" onClick={onPause} className="flex-1" leftIcon={<Play className="w-4 h-4" />}>
            Resume
          </Button>
        )}
        {campaign.status === 'draft' && (
          <Button variant="primary" size="sm" onClick={() => actions.resumeCampaign(campaign.id)} className="flex-1" leftIcon={<Play className="w-4 h-4" />}>
            Launch
          </Button>
        )}
      </div>
    </Card>
  )
}