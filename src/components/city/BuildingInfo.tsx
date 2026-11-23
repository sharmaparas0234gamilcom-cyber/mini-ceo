import { motion, AnimatePresence } from 'motion/react'
import { X, Building2, TrendingUp, DollarSign, Users, Settings, Plus, Minus } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Badge } from '@components/ui/Badge'
import { NumberDisplay } from '@components/ui/NumberDisplay'
import { formatCurrency } from '@utils/helpers'
import { useGameStore } from '@store/gameStore'
import { BUILDING_CONFIGS } from '@types/city'

interface BuildingInfoProps {
  buildingId: string
  onClose: () => void
}

export function BuildingInfo({ buildingId, onClose }: BuildingInfoProps) {
  const { buildings, actions, balance } = useGameStore()
  const building = buildings.find(b => b.id === buildingId)

  if (!building) return null

  const config = BUILDING_CONFIGS[building.type]
  const canUpgrade = building.level < building.maxLevel && !building.isUpgrading && balance >= building.upgradeCost
  const daysUntilComplete = building.isUpgrading ? building.upgradeCompleteDay! - useGameStore.getState().simulationDay : 0

  const handleUpgrade = () => {
    actions.upgradeBuilding(buildingId)
  }

  const handleDemolish = () => {
    if (window.confirm('Are you sure you want to demolish this building? This cannot be undone.')) {
      // Remove building from store
      // actions.removeBuilding(buildingId) // Would need to implement
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/80 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="building-info-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-graphite-900 rounded-xl border border-graphite-800 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-graphite-800 sticky top-0 bg-graphite-900/95 backdrop-blur z-10 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: building.color }}>
                <Building2 className="w-6 h-6 text-graphite-950" />
              </div>
              <div>
                <h2 id="building-info-title" className="text-heading-lg font-display font-semibold text-ivory-100">{building.name}</h2>
                <Badge variant="default" className="text-caption capitalize">{building.type}</Badge>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-ivory-100 hover:bg-graphite-800 transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Building Visual & Level */}
            <div className="text-center">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: building.color }}>
                <Building2 className="w-12 h-12 text-graphite-950" />
              </div>
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-display-sm font-display font-bold text-ivory-100">Level {building.level}</span>
                <Badge variant="champagne" className="text-captain">{building.level}/{building.maxLevel}</Badge>
              </div>
              <Progress value={(building.level / building.maxLevel) * 100} size="md" variant="champagne" className="max-w-xs mx-auto" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Size" value={`${building.size.width}×${building.size.depth}×${building.size.height}`} icon={<Building2 className="w-5 h-5" />} />
              <StatCard label="Upgrade Cost" value={formatCurrency(building.upgradeCost)} icon={<DollarSign className="w-5 h-5" />} color="champagne" />
              <StatCard label="Upgrade Time" value={`${building.upgradeTime} days`} icon={<Settings className="w-5 h-5" />} />
              <StatCard label="Employees" value={building.connectedBuildings.length} icon={<Users className="w-5 h-5" />} />
            </div>

            {/* Production Info */}
            {building.production && (
              <Card className="p-4">
                <h3 className="text-heading-sm font-display font-semibold text-ivory-100 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-champagne-400" />
                  Production
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-slate-400">Type</span>
                    <span className="text-ivory-100 capitalize">{building.production.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-slate-400">Efficiency</span>
                    <NumberDisplay value={building.production.efficiency} format="number" decimals={1} size="sm" color="champagne" />
                  </div>
                  <div className="flex items-center justify-between text-body-sm">
                    <span className="text-slate-400">Output</span>
                    <span className="text-ivory-100 font-mono">
                      {Object.entries(building.production.output).map(([k, v]) => `${k}: ${v}`).join(', ')}
                    </span>
                  </div>
                </div>
              </Card>
            )}

            {/* Upgrade Section */}
            {building.level < building.maxLevel ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-graphite-800/50 rounded-xl border border-graphite-700"
              >
                <h3 className="text-heading-sm font-display font-semibold text-ivory-100 mb-3">Upgrade to Level {building.level + 1}</h3>
                <div className="mb-4 p-3 bg-graphite-800 rounded-lg">
                  <p className="text-caption text-slate-400 mb-1">Next Level Benefits</p>
                  <ul className="space-y-1 text-body-sm text-slate-300">
                    {config.benefits
                      .filter(b => b.level === building.level + 1)
                      .map(benefit => (
                        <li key={benefit.level} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-champagne-400/50 flex-shrink-0" />
                          <span className="font-medium text-ivory-100">{benefit.name}:</span>
                          <span>{benefit.bonus}</span>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-caption text-slate-400">Upgrade Cost</p>
                    <NumberDisplay value={building.upgradeCost} format="currency" size="md" color="champagne" className="block" />
                  </div>
                  <div>
                    <p className="text-caption text-slate-400">Time Required</p>
                    <p className="text-body font-mono text-ivory-100">{building.upgradeTime} days</p>
                  </div>
                </div>
                <Button
                  onClick={handleUpgrade}
                  disabled={!canUpgrade}
                  className="w-full"
                  leftIcon={canUpgrade ? <TrendingUp className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                >
                  {building.isUpgrading ? `Upgrading... (Day ${daysUntilComplete})` : canUpgrade ? 'Upgrade Now' : `Need ₹${(building.upgradeCost - balance).toLocaleString()} more`}
                </Button>
              </motion.div>
            ) : (
              <div className="p-4 bg-success-500/10 rounded-xl border border-success-500/20 text-center">
                <div className="w-10 h-10 rounded-full bg-success-500/20 flex items-center justify-center mx-auto mb-2 text-success-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-heading-sm font-display font-semibold text-success-400 mb-1">Max Level Reached</h3>
                <p className="text-body-sm text-slate-400">This building is fully upgraded</p>
              </div>
            )}

            {/* Danger Zone */}
            <div className="pt-4 border-t border-graphite-800">
              <h3 className="text-heading-sm font-display font-semibold text-ivory-100 mb-3">Danger Zone</h3>
              <Button variant="danger" onClick={handleDemolish} leftIcon={<Trash2 className="w-4 h-4" />}>
                Demolish Building
              </Button>
              <p className="text-caption text-slate-500 mt-2 text-center">This action is irreversible</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function StatCard({ label, value, icon, color = 'default' }: { label: string; value: string; icon: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    default: 'text-ivory-100',
    champagne: 'text-champagne-400',
    success: 'text-success-400',
    warning: 'text-champagne-400',
    danger: 'text-danger-400',
  }

  return (
    <Card className="p-4 text-center">
      <div className="text-champagne-400 mb-2">{icon}</div>
      <p className="text-caption text-slate-400">{label}</p>
      <p className={cn('font-mono font-semibold text-lg', colors[color] || colors.default)}>{value}</p>
    </Card>
  )
}

// Need to import React and CheckCircle
import React from 'react'
import { CheckCircle } from 'lucide-react'