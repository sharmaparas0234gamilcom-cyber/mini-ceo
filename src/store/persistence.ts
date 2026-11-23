import type { GameState } from './gameStore'
import { DEMO_GAME_STATE } from '@data/demoData'

const SAVE_KEY = 'mini-ceo-save'
const SAVE_VERSION = 1

export interface SaveData {
  version: number
  timestamp: number
  state: Partial<GameState>
}

export function saveGame(state: Partial<GameState>): boolean {
  try {
    const saveData: SaveData = {
      version: SAVE_VERSION,
      timestamp: Date.now(),
      state: {
        founder: state.founder,
        company: state.company,
        products: state.products,
        campaigns: state.campaigns,
        employees: state.employees,
        departments: state.departments,
        balance: state.balance,
        finances: state.finances?.slice(-500) || [],
        simulationDay: state.simulationDay,
        simulationSpeed: state.simulationSpeed,
        isRunning: state.isRunning,
        dailyReports: state.dailyReports?.slice(-100) || [],
        activeEvents: state.activeEvents,
        eventHistory: state.eventHistory?.slice(-50) || [],
        xp: state.xp,
        level: state.level,
        achievements: state.achievements,
        completedMissions: state.completedMissions,
        activeMissions: state.activeMissions,
        buildings: state.buildings,
        settings: state.settings,
        isDemoMode: state.isDemoMode,
      },
    }

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData))
    return true
  } catch (error) {
    console.error('Failed to save game:', error)
    return false
  }
}

export function loadGame(): Partial<GameState> | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY)
    if (!saved) return null

    const saveData: SaveData = JSON.parse(saved)

    // Handle version migrations
    if (saveData.version < SAVE_VERSION) {
      return migrateSave(saveData)
    }

    return saveData.state
  } catch (error) {
    console.error('Failed to load game:', error)
    return null
  }
}

export function deleteSave(): boolean {
  try {
    localStorage.removeItem(SAVE_KEY)
    return true
  } catch (error) {
    console.error('Failed to delete save:', error)
    return false
  }
}

export function exportSave(): string | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY)
    return saved
  } catch (error) {
    console.error('Failed to export save:', error)
    return null
  }
}

export function importSave(jsonString: string): boolean {
  try {
    const saveData: SaveData = JSON.parse(jsonString)

    // Validate save data structure
    if (!saveData.version || !saveData.state) {
      throw new Error('Invalid save file format')
    }

    // Handle version migrations
    let finalState = saveData.state
    if (saveData.version < SAVE_VERSION) {
      const migrated = migrateSave(saveData)
      if (!migrated) return false
      finalState = migrated
    }

    localStorage.setItem(SAVE_KEY, JSON.stringify({
      version: SAVE_VERSION,
      timestamp: Date.now(),
      state: finalState,
    }))

    return true
  } catch (error) {
    console.error('Failed to import save:', error)
    return false
  }
}

function migrateSave(saveData: SaveData): Partial<GameState> | null {
  let state = saveData.state

  // Version 1 -> 2 migrations (future)
  // if (saveData.version < 2) {
  //   state = migrateV1toV2(state)
  // }

  return state
}

export function hasSave(): boolean {
  return !!localStorage.getItem(SAVE_KEY)
}

export function getSaveInfo(): { timestamp: number; version: number } | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY)
    if (!saved) return null

    const saveData: SaveData = JSON.parse(saved)
    return {
      timestamp: saveData.timestamp,
      version: saveData.version,
    }
  } catch {
    return null
  }
}

export function resetToDemo(): GameState {
  return DEMO_GAME_STATE as GameState
}

export function createNewGame(founderName: string, avatarId: string, experienceLevel: string, companyData: any): Partial<GameState> {
  const initialDepartments = [
    { type: 'product', name: 'Product Development', level: 0, maxLevel: 5, upgradeCost: 25000, employees: [], bonuses: [] },
    { type: 'marketing', name: 'Marketing', level: 0, maxLevel: 5, upgradeCost: 20000, employees: [], bonuses: [] },
    { type: 'finance', name: 'Finance', level: 0, maxLevel: 5, upgradeCost: 20000, employees: [], bonuses: [] },
    { type: 'operations', name: 'Operations', level: 0, maxLevel: 5, upgradeCost: 15000, employees: [], bonuses: [] },
    { type: 'support', name: 'Customer Support', level: 0, maxLevel: 5, upgradeCost: 10000, employees: [], bonuses: [] },
  ]

  return {
    founder: {
      id: `founder-${Date.now()}`,
      name: founderName,
      avatarId,
      experienceLevel: experienceLevel as any,
      createdAt: Date.now(),
    },
    company: {
      id: `company-${Date.now()}`,
      name: companyData.name,
      description: companyData.description,
      industry: companyData.industry,
      brandIdentity: companyData.brandIdentity,
      strategy: companyData.strategy,
      foundedAt: Date.now(),
      valuation: 100000,
      level: 1,
    },
    products: [],
    campaigns: [],
    employees: [],
    departments: initialDepartments,
    balance: 100000,
    finances: [{
      id: `fin-${Date.now()}`,
      day: 1,
      type: 'investment',
      category: 'initial_capital',
      amount: 100000,
      description: 'Initial company capital',
    }],
    simulationDay: 1,
    simulationSpeed: 1,
    isRunning: true,
    dailyReports: [],
    activeEvents: [],
    eventHistory: [],
    xp: 0,
    level: 1,
    achievements: [],
    completedMissions: [],
    activeMissions: [],
    buildings: [],
    settings: {
      soundEnabled: true,
      musicEnabled: true,
      reducedMotion: false,
      autoSave: true,
      demoMode: false,
      notifications: true,
    },
    isDemoMode: false,
  }
}

// Auto-save functionality
let autoSaveInterval: ReturnType<typeof setInterval> | null = null

export function startAutoSave(getState: () => Partial<GameState>, intervalMs = 30000): void {
  if (autoSaveInterval) return

  autoSaveInterval = setInterval(() => {
    const state = getState()
    if (state && !state.isDemoMode) {
      saveGame(state)
    }
  }, intervalMs)
}

export function stopAutoSave(): void {
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
    autoSaveInterval = null
  }
}

// Save on specific actions
export function saveOnAction(getState: () => Partial<GameState>): void {
  const state = getState()
  if (state && !state.isDemoMode && state.settings?.autoSave) {
    saveGame(state)
  }
}