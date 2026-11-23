export interface Building {
  id: string
  type: BuildingType
  name: string
  level: number
  maxLevel: number
  position: { x: number; y: number; z: number }
  size: { width: number; depth: number; height: number }
  color: string
  connectedBuildings: string[]
  production?: BuildingProduction
  upgradeCost: number
  upgradeTime: number
  isUpgrading: boolean
  upgradeCompleteDay?: number
}

export type BuildingType = 'hq' | 'retail' | 'office' | 'warehouse' | 'research' | 'factory'

export interface BuildingProduction {
  type: 'products' | 'research' | 'storage' | 'revenue' | 'marketing'
  output: Record<string, number>
  efficiency: number
}

export interface CityGrid {
  width: number
  depth: number
  cells: (string | null)[][]
  roads: Road[]
}

export interface Road {
  start: { x: number; z: number }
  end: { x: number; z: number }
  type: 'main' | 'secondary' | 'path'
}

export interface CityBuildingConfig {
  type: BuildingType
  baseSize: { width: number; depth: number; height: number }
  baseColor: string
  maxLevel: number
  upgradeCostBase: number
  upgradeTimeBase: number
  production?: BuildingProduction
}

export const BUILDING_CONFIGS: Record<BuildingType, CityBuildingConfig> = {
  hq: {
    type: 'hq',
    baseSize: { width: 4, depth: 4, height: 6 },
    baseColor: '#C9B896',
    maxLevel: 10,
    upgradeCostBase: 50000,
    upgradeTimeBase: 5,
    production: { type: 'revenue', output: { base: 1000 }, efficiency: 1 },
  },
  retail: {
    type: 'retail',
    baseSize: { width: 3, depth: 3, height: 3 },
    baseColor: '#B8A484',
    maxLevel: 5,
    upgradeCostBase: 25000,
    upgradeTimeBase: 3,
    production: { type: 'products', output: { retail: 10 }, efficiency: 1 },
  },
  office: {
    type: 'office',
    baseSize: { width: 3, depth: 3, height: 5 },
    baseColor: '#A38F6E',
    maxLevel: 5,
    upgradeCostBase: 30000,
    upgradeTimeBase: 4,
    production: { type: 'marketing', output: { marketing: 5 }, efficiency: 1 },
  },
  warehouse: {
    type: 'warehouse',
    baseSize: { width: 4, depth: 4, height: 4 },
    baseColor: '#8B7A5A',
    maxLevel: 5,
    upgradeCostBase: 20000,
    upgradeTimeBase: 3,
    production: { type: 'storage', output: { storage: 500 }, efficiency: 1 },
  },
  research: {
    type: 'research',
    baseSize: { width: 3, depth: 3, height: 4 },
    baseColor: '#7A6B4A',
    maxLevel: 5,
    upgradeCostBase: 40000,
    upgradeTimeBase: 5,
    production: { type: 'research', output: { research: 2 }, efficiency: 1 },
  },
  factory: {
    type: 'factory',
    baseSize: { width: 5, depth: 4, height: 4 },
    baseColor: '#6B5D3A',
    maxLevel: 5,
    upgradeCostBase: 35000,
    upgradeTimeBase: 4,
    production: { type: 'products', output: { factory: 20 }, efficiency: 1 },
  },
}