import { motion } from 'motion/react'
import { RotateCcw, ZoomIn, ZoomOut, Minimize2, Maximize2, Layers, Grid, Home } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'

interface CityControlsProps {
  cameraPosition: [number, number, number]
  onResetView: () => void
  onToggleGrid: () => void
  onToggleLayers: () => void
  showGrid: boolean
  showBuildings: boolean
}

export function CityControls({ cameraPosition, onResetView, onToggleGrid, onToggleLayers, showGrid, showBuildings }: CityControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-30 flex flex-col gap-2"
    >
      <Card className="p-2 flex flex-col gap-1">
        <Button variant="ghost" size="sm" onClick={onResetView} title="Reset View" className="w-full justify-start">
          <Home className="w-4 h-4" />
          <span>Reset View</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onToggleGrid} title="Toggle Grid" className={cn('w-full justify-start', showGrid && 'text-champagne-400')}>
          <Grid className="w-4 h-4" />
          <span>Grid</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onToggleLayers} title="Toggle Buildings" className={cn('w-full justify-start', showBuildings && 'text-champagne-400')}>
          <Layers className="w-4 h-4" />
          <span>Buildings</span>
        </Button>
      </Card>

      {/* Camera Info */}
      <Card className="p-3 min-w-[180px]">
        <p className="text-caption text-slate-400 mb-1">Camera Position</p>
        <div className="font-mono text-body-sm text-ivory-100 space-y-1">
          <div>X: {cameraPosition[0].toFixed(1)}</div>
          <div>Y: {cameraPosition[1].toFixed(1)}</div>
          <div>Z: {cameraPosition[2].toFixed(1)}</div>
        </div>
      </Card>
    </motion.div>
  )
}

export function CityLegend() {
  const buildingTypes = [
    { type: 'hq', label: 'Headquarters', color: '#C9B896' },
    { type: 'office', label: 'Offices', color: '#A38F6E' },
    { type: 'retail', label: 'Retail', color: '#B8A484' },
    { type: 'warehouse', label: 'Warehouses', color: '#8B7A5A' },
    { type: 'research', label: 'Research', color: '#7A6B4A' },
    { type: 'factory', label: 'Factories', color: '#6B5D3A' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-6 z-30"
    >
      <Card className="p-4">
        <h4 className="text-heading-sm font-display font-semibold text-ivory-100 mb-3">Building Types</h4>
        <div className="space-y-2">
          {buildingTypes.map(b => (
            <div key={b.type} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: b.color }} />
              <span className="text-body-sm text-slate-300">{b.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}