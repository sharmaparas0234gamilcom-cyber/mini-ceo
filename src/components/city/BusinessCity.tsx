import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Badge } from '@components/ui/Badge'
import { Building } from './Building'
import { BuildingInfo } from './BuildingInfo'
import { CityControls } from './CityControls'
import { BUILDING_CONFIGS, BUILDING_TYPES } from '@types/city'
import { useGameStore } from '@store/gameStore'

// Check for WebGL support
function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

function FallbackCity() {
  const { buildings, actions } = useGameStore()
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-display-md font-display font-bold text-ivory-100">Business City</h1>
          <p className="text-body text-slate-400 mt-1">
            Your growing empire visualized. WebGL not available - showing 2D view.
          </p>
        </div>
        <Button
          onClick={() => actions.addBuilding({
            type: 'hq',
            name: 'New HQ',
            level: 1,
            maxLevel: 10,
            position: { x: 0, y: 0, z: 0 },
            size: { width: 4, depth: 4, height: 6 },
            color: '#C9B896',
            connectedBuildings: [],
            upgradeCost: 50000,
            upgradeTime: 5,
            isUpgrading: false,
          })}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Building
        </Button>
      </div>

      {buildings.length === 0 ? (
        <Card className="p-12 text-center">
          <Building2 className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">No Buildings Yet</h3>
          <p className="text-body text-slate-400 mb-6">
            Start building your business city! Add headquarters, offices, retail stores, and more.
          </p>
          <Button onClick={() => actions.addBuilding({
            type: 'hq',
            name: 'Main HQ',
            level: 1,
            maxLevel: 10,
            position: { x: 0, y: 0, z: 0 },
            size: { width: 4, depth: 4, height: 6 },
            color: '#C9B896',
            connectedBuildings: [],
            upgradeCost: 50000,
            upgradeTime: 5,
            isUpgrading: false,
          })} leftIcon={<Plus className="w-4 h-4" />}>
            Build First HQ
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {buildings.map(building => {
            const config = BUILDING_CONFIGS[building.type]
            return (
              <motion.article
                key={building.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="card-hover relative group"
                onClick={() => setSelectedBuilding(building.id)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: building.color }}>
                        <Building2 className="w-6 h-6 text-graphite-950" />
                      </div>
                      <div>
                        <h3 className="font-medium text-ivory-100">{building.name}</h3>
                        <Badge variant="default" className="text-caption capitalize">{building.type}</Badge>
                      </div>
                    </div>
                    <span className="text-caption text-slate-400">Lvl {building.level}</span>
                  </div>

                  <div className="space-y-2 text-body-sm text-slate-400">
                    <div className="flex justify-between">
                      <span>Size</span>
                      <span className="text-ivory-100">{building.size.width}×{building.size.depth}×{building.size.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Upgrade Cost</span>
                      <span className="text-champagne-400 font-mono">₹{building.upgradeCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Upgrade Time</span>
                      <span className="text-ivory-100">{building.upgradeTime} days</span>
                    </div>
                  </div>

                  {building.isUpgrading && (
                    <div className="mt-3 p-3 bg-champagne-400/10 rounded-lg border border-champagne-400/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-caption text-champagne-400">Upgrading...</span>
                        <span className="text-caption text-champagne-400 font-mono">
                          Day {building.upgradeCompleteDay}
                        </span>
                      </div>
                      <div className="h-2 bg-graphite-800 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${((building.upgradeCompleteDay - useGameStore.getState().simulationDay) / building.upgradeTime) * 100}%` }}
                          className="h-full bg-champagne-400"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="flex-1" onClick={e => { e.stopPropagation(); actions.upgradeBuilding(building.id) }} disabled={building.level >= building.maxLevel || building.isUpgrading}>
                      <TrendingUp className="w-4 h-4" /> Upgrade
                    </Button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      )}

      {/* Building Info Modal */}
      {selectedBuilding && (
        <BuildingInfo
          buildingId={selectedBuilding}
          onClose={() => setSelectedBuilding(null)}
        />
      )}
    </div>
  )
}

// Need to import React and Building2
import React from 'react'
import { Building2, Plus, TrendingUp } from 'lucide-react'