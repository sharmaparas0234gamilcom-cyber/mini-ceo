import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  FounderProfile,
  Company,
  Product,
  MarketingCampaign,
  Employee,
  Department,
  FinancialRecord,
  DailyReport,
  BusinessEvent,
  Achievement,
  Mission,
  UserSettings,
  Building,
  SimulationConfig,
} from '@types/game'
import type { SimulationOutput } from '@types/simulation'
import { DEMO_GAME_STATE } from '@data/demoData'
import { ACHIEVEMENT_TEMPLATES } from '@data/achievements'
import { MISSION_TEMPLATES } from '@data/missions'
import { generateId, formatDate } from '@utils/helpers'
import { DEFAULT_SIMULATION_CONFIG } from '@types/simulation'
import { runSimulationStep } from './simulationEngine'
import { checkAndTriggerEvents } from './eventsEngine'
import { checkMissionProgress, checkAchievementProgress } from './missionsEngine'

interface GameState {
  // Founder
  founder: FounderProfile | null

  // Company
  company: Company | null

  // Business Data
  products: Product[]
  campaigns: MarketingCampaign[]
  employees: Employee[]
  departments: Department[]

  // Finances
  balance: number
  finances: FinancialRecord[]

  // Simulation
  simulationDay: number
  simulationSpeed: number
  isRunning: boolean
  dailyReports: DailyReport[]
  simulationConfig: SimulationConfig

  // Events
  activeEvents: BusinessEvent[]
  eventHistory: BusinessEvent[]

  // Progression
  xp: number
  level: number
  achievements: Achievement[]
  completedMissions: string[]
  activeMissions: Mission[]

  // City
  buildings: Building[]

  // Settings
  settings: UserSettings

  // Demo mode
  isDemoMode: boolean

  // Actions
  actions: {
    // Initialization
    initializeGame: (demo?: boolean) => void
    resetGame: () => void
    loadGame: (state: Partial<GameState>) => void

    // Founder & Company
    setFounder: (founder: FounderProfile) => void
    setCompany: (company: Company) => void
    updateCompany: (updates: Partial<Company>) => void

    // Products
    addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'performance'>) => string
    updateProduct: (id: string, updates: Partial<Product>) => void
    deleteProduct: (id: string) => void
    setProductPrice: (id: string, price: number) => void
    adjustInventory: (id: string, amount: number) => void

    // Campaigns
    addCampaign: (campaign: Omit<MarketingCampaign, 'id' | 'performance'>) => string
    updateCampaign: (id: string, updates: Partial<MarketingCampaign>) => void
    deleteCampaign: (id: string) => void
    pauseCampaign: (id: string) => void
    resumeCampaign: (id: string) => void

    // Employees
    hireEmployee: (employee: Omit<Employee, 'id' | 'hiredAt'>) => string
    updateEmployee: (id: string, updates: Partial<Employee>) => void
    fireEmployee: (id: string) => void
    assignEmployee: (employeeId: string, department: string) => void

    // Departments
    upgradeDepartment: (type: string) => boolean
    getDepartment: (type: string) => Department | undefined

    // Finances
    addFinancialRecord: (record: Omit<FinancialRecord, 'id'>) => void
    updateBalance: (amount: number) => void

    // Simulation
    advanceDay: () => SimulationOutput | null
    setSimulationSpeed: (speed: number) => void
    toggleSimulation: () => void
    getDailyReport: (day: number) => DailyReport | undefined

    // Events
    addEvent: (event: BusinessEvent) => void
    resolveEvent: (eventId: string, choiceId: string) => void
    dismissEvent: (eventId: string) => void

    // Progression
    addXP: (amount: number) => void
    checkLevelUp: () => void
    unlockAchievement: (achievementId: string) => void
    startMission: (missionId: string) => void
    completeMissionObjective: (missionId: string, objectiveId: string, progress: number) => void

    // City
    addBuilding: (building: Omit<Building, 'id'>) => string
    upgradeBuilding: (id: string) => boolean
    selectBuilding: (id: string | null) => void
    selectedBuildingId: string | null

    // Settings
    updateSettings: (settings: Partial<UserSettings>) => void

    // Demo
    setDemoMode: (enabled: boolean) => void
  }
}

const INITIAL_STATE = {
  founder: null,
  company: null,
  products: [],
  campaigns: [],
  employees: [],
  departments: [],
  balance: 0,
  finances: [],
  simulationDay: 0,
  simulationSpeed: 1,
  isRunning: false,
  dailyReports: [],
  simulationConfig: DEFAULT_SIMULATION_CONFIG,
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
  selectedBuildingId: null,
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      actions: {
        initializeGame: (demo = false) => {
          if (demo) {
            set({ ...DEMO_GAME_STATE, isDemoMode: true })
            return
          }

          // Initialize empty game with starting capital
          const initialDepartments: Department[] = [
            { type: 'product', name: 'Product Development', level: 0, maxLevel: 5, upgradeCost: 25000, employees: [], bonuses: [] },
            { type: 'marketing', name: 'Marketing', level: 0, maxLevel: 5, upgradeCost: 20000, employees: [], bonuses: [] },
            { type: 'finance', name: 'Finance', level: 0, maxLevel: 5, upgradeCost: 20000, employees: [], bonuses: [] },
            { type: 'operations', name: 'Operations', level: 0, maxLevel: 5, upgradeCost: 15000, employees: [], bonuses: [] },
            { type: 'support', name: 'Customer Support', level: 0, maxLevel: 5, upgradeCost: 10000, employees: [], bonuses: [] },
          ]

          const initialAchievements = ACHIEVEMENT_TEMPLATES.map(t => ({
            ...t,
            isUnlocked: false,
            progress: 0,
            maxProgress: t.condition.value || 1,
          }))

          const initialMissions = MISSION_TEMPLATES
            .filter(m => m.category === 'beginner')
            .map(m => ({
              ...m,
              isCompleted: false,
              isUnlocked: true,
              progress: Object.fromEntries(m.objectives.map(o => [o.id, 0])),
            }))

          set({
            ...INITIAL_STATE,
            balance: 100000,
            departments: initialDepartments,
            achievements: initialAchievements,
            activeMissions: initialMissions,
            simulationDay: 1,
            isRunning: true,
            finances: [{
              id: generateId('fin-'),
              day: 1,
              type: 'investment',
              category: 'initial_capital',
              amount: 100000,
              description: 'Initial company capital',
            }],
          })
        },

        resetGame: () => {
          set(INITIAL_STATE)
        },

        loadGame: (state) => {
          set({ ...get(), ...state })
        },

        setFounder: (founder) => set({ founder }),

        setCompany: (company) => set({ company }),

        updateCompany: (updates) => set((state) => ({
          company: state.company ? { ...state.company, ...updates } : null,
        })),

        addProduct: (product) => {
          const id = generateId('prod-')
          const newProduct: Product = {
            ...product,
            id,
            createdAt: Date.now(),
            performance: [],
          }
          set((state) => ({ products: [...state.products, newProduct] }))
          return id
        },

        updateProduct: (id, updates) => set((state) => ({
          products: state.products.map(p => p.id === id ? { ...p, ...updates } : p),
        })),

        deleteProduct: (id) => set((state) => ({
          products: state.products.filter(p => p.id !== id),
        })),

        setProductPrice: (id, price) => set((state) => ({
          products: state.products.map(p =>
            p.id === id ? { ...p, sellingPrice: Math.max(1, price) } : p
          ),
        })),

        adjustInventory: (id, amount) => set((state) => ({
          products: state.products.map(p =>
            p.id === id ? { ...p, inventory: Math.max(0, Math.min(p.maxInventory, p.inventory + amount)) } : p
          ),
        })),

        addCampaign: (campaign) => {
          const id = generateId('camp-')
          const newCampaign: MarketingCampaign = {
            ...campaign,
            id,
            performance: [],
          }
          set((state) => ({ campaigns: [...state.campaigns, newCampaign] }))
          return id
        },

        updateCampaign: (id, updates) => set((state) => ({
          campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c),
        })),

        deleteCampaign: (id) => set((state) => ({
          campaigns: state.campaigns.filter(c => c.id !== id),
        })),

        pauseCampaign: (id) => set((state) => ({
          campaigns: state.campaigns.map(c =>
            c.id === id ? { ...c, status: 'paused' as const } : c
          ),
        })),

        resumeCampaign: (id) => set((state) => ({
          campaigns: state.campaigns.map(c =>
            c.id === id ? { ...c, status: 'active' as const } : c
          ),
        })),

        hireEmployee: (employee) => {
          const id = generateId('emp-')
          const newEmployee: Employee = {
            ...employee,
            id,
            hiredAt: Date.now(),
          }
          set((state) => ({ employees: [...state.employees, newEmployee] }))
          return id
        },

        updateEmployee: (id, updates) => set((state) => ({
          employees: state.employees.map(e => e.id === id ? { ...e, ...updates } : e),
        })),

        fireEmployee: (id) => set((state) => ({
          employees: state.employees.filter(e => e.id !== id),
          departments: state.departments.map(d => ({
            ...d,
            employees: d.employees.filter(empId => empId !== id),
          })),
        })),

        assignEmployee: (employeeId, department) => set((state) => ({
          employees: state.employees.map(e =>
            e.id === employeeId ? { ...e, department: department as any } : e
          ),
          departments: state.departments.map(d => ({
            ...d,
            employees: d.type === department
              ? [...d.employees, employeeId].filter((id, i, arr) => arr.indexOf(id) === i)
              : d.employees.filter(id => id !== employeeId),
          })),
        })),

        upgradeDepartment: (type) => {
          const state = get()
          const dept = state.departments.find(d => d.type === type)
          if (!dept || dept.level >= dept.maxLevel) return false

          const cost = dept.upgradeCost
          if (state.balance < cost) return false

          set((state) => ({
            balance: state.balance - cost,
            departments: state.departments.map(d =>
              d.type === type
                ? {
                    ...d,
                    level: d.level + 1,
                    upgradeCost: Math.round(d.upgradeCost * 1.5),
                    bonuses: [
                      ...d.bonuses,
                      ...getDepartmentUpgradeBonuses(type, d.level + 1)
                    ],
                  }
                : d
            ),
            finances: [
              ...state.finances,
              {
                id: generateId('fin-'),
                day: state.simulationDay,
                type: 'expense',
                category: 'department_upgrade',
                amount: -cost,
                description: `Upgraded ${d.name} to level ${d.level + 1}`,
              }
            ],
          }))
          return true
        },

        getDepartment: (type) => {
          return get().departments.find(d => d.type === type)
        },

        addFinancialRecord: (record) => set((state) => ({
          finances: [...state.finances, { ...record, id: generateId('fin-') }],
        })),

        updateBalance: (amount) => set((state) => ({
          balance: state.balance + amount,
        })),

        advanceDay: () => {
          const state = get()
          if (!state.company) return null

          const input = {
            products: state.products,
            campaigns: state.campaigns,
            employees: state.employees,
            departments: state.departments,
            balance: state.balance,
            day: state.simulationDay,
            customerSatisfaction: state.dailyReports[state.dailyReports.length - 1]?.customerSatisfaction || 70,
            reputation: state.dailyReports[state.dailyReports.length - 1]?.reputation || 50,
            brandAwareness: state.dailyReports[state.dailyReports.length - 1]?.reputation ?
              Math.min(1, state.dailyReports[state.dailyReports.length - 1]!.reputation / 100) : 0.1,
            companyLevel: state.company.level,
            industry: state.company.industry,
            strategy: state.company.strategy,
          }

          const output = runSimulationStep(input, state.simulationConfig)

          // Check events
          const newEvents = checkAndTriggerEvents(state.simulationDay + 1, state)

          // Update missions and achievements
          const updatedMissions = checkMissionProgress(state.activeMissions, output, state)
          const newAchievements = checkAchievementProgress(state.achievements, output, state)

          set((state) => ({
            balance: output.newBalance,
            simulationDay: state.simulationDay + 1,
            products: state.products.map((p, i) => ({ ...p, ...output.productUpdates[i] })),
            campaigns: state.campaigns.map((c, i) => ({ ...c, ...output.campaignUpdates[i] })),
            employees: state.employees.map((e, i) => ({ ...e, ...output.employeeUpdates[i] })),
            departments: state.departments.map((d, i) => ({ ...d, ...output.departmentUpdates[i] })),
            finances: [...state.finances, ...output.financialRecords],
            dailyReports: [...state.dailyReports, output.dailyReport],
            activeEvents: [...state.activeEvents, ...newEvents],
            eventHistory: [...state.eventHistory, ...newEvents],
            activeMissions: updatedMissions,
            achievements: state.achievements.map((a, i) => newAchievements[i] ? { ...a, ...newAchievements[i] } : a),
            xp: state.xp + output.xpGained,
          }))

          get().actions.checkLevelUp()

          return output
        },

        setSimulationSpeed: (speed) => set({ simulationSpeed: Math.max(0.5, Math.min(4, speed)) }),

        toggleSimulation: () => set((state) => ({ isRunning: !state.isRunning })),

        getDailyReport: (day) => {
          return get().dailyReports.find(r => r.day === day)
        },

        addEvent: (event) => set((state) => ({
          activeEvents: [...state.activeEvents, event],
        })),

        resolveEvent: (eventId, choiceId) => {
          const state = get()
          const event = state.activeEvents.find(e => e.id === eventId)
          if (!event) return

          const choice = event.choices.find(c => c.id === choiceId)
          if (!choice) return

          // Apply effects
          if (choice.effects.balanceChange) {
            set({ balance: state.balance + choice.effects.balanceChange })
          }

          set((state) => ({
            activeEvents: state.activeEvents.map(e =>
              e.id === eventId
                ? { ...e, isResolved: true, selectedChoiceId: choiceId, effects: choice.effects }
                : e
            ),
            eventHistory: state.eventHistory.map(e =>
              e.id === eventId
                ? { ...e, isResolved: true, selectedChoiceId: choiceId, effects: choice.effects }
                : e
            ),
          }))
        },

        dismissEvent: (eventId) => set((state) => ({
          activeEvents: state.activeEvents.filter(e => e.id !== eventId),
        })),

        addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

        checkLevelUp: () => {
          const state = get()
          const xpCurve = state.simulationConfig.levelXpCurve
          let newLevel = state.level
          while (newLevel < xpCurve.length && state.xp >= xpCurve[newLevel]) {
            newLevel++
          }
          if (newLevel > state.level) {
            set({ level: newLevel })
            // Unlock new missions
            const nextMissions = MISSION_TEMPLATES
              .filter(m => m.prerequisiteMissions?.some(pm => state.completedMissions.includes(pm)))
              .filter(m => !state.completedMissions.includes(m.id) && !state.activeMissions.some(am => am.id === m.id))
              .map(m => ({ ...m, isCompleted: false, isUnlocked: true, progress: Object.fromEntries(m.objectives.map(o => [o.id, 0])) }))

            if (nextMissions.length > 0) {
              set((state) => ({ activeMissions: [...state.activeMissions, ...nextMissions] }))
            }
          }
        },

        unlockAchievement: (achievementId) => set((state) => ({
          achievements: state.achievements.map(a =>
            a.id === achievementId ? { ...a, isUnlocked: true, unlockedAt: Date.now() } : a
          ),
          xp: state.xp + (state.achievements.find(a => a.id === achievementId)?.xpReward || 0),
        })),

        startMission: (missionId) => {
          const template = MISSION_TEMPLATES.find(m => m.id === missionId)
          if (!template) return

          set((state) => ({
            activeMissions: [...state.activeMissions, {
              ...template,
              isCompleted: false,
              isUnlocked: true,
              progress: Object.fromEntries(template.objectives.map(o => [o.id, 0])),
            }],
          }))
        },

        completeMissionObjective: (missionId, objectiveId, progress) => set((state) => ({
          activeMissions: state.activeMissions.map(m => {
            if (m.id !== missionId) return m
            const newProgress = { ...m.progress, [objectiveId]: progress }
            const allComplete = m.objectives.every(o => newProgress[o.id] >= o.target)
            return {
              ...m,
              progress: newProgress,
              isCompleted: allComplete,
              completedAt: allComplete ? Date.now() : undefined,
            }
          }),
          completedMissions: state.activeMissions
            .filter(m => m.id === missionId && m.objectives.every(o => (m.progress[o.id] || 0) >= o.target))
            .map(m => m.id),
        })),

        addBuilding: (building) => {
          const id = generateId('bld-')
          const newBuilding: Building = { ...building, id }
          set((state) => ({ buildings: [...state.buildings, newBuilding] }))
          return id
        },

        upgradeBuilding: (id) => {
          const state = get()
          const building = state.buildings.find(b => b.id === id)
          if (!building || building.level >= building.maxLevel || building.isUpgrading) return false

          const cost = building.upgradeCost
          if (state.balance < cost) return false

          set((state) => ({
            balance: state.balance - cost,
            buildings: state.buildings.map(b =>
              b.id === id
                ? { ...b, isUpgrading: true, upgradeCompleteDay: state.simulationDay + b.upgradeTime }
                : b
            ),
          }))
          return true
        },

        selectedBuildingId: null,
        selectBuilding: (id) => set({ selectedBuildingId: id }),

        updateSettings: (settings) => set((state) => ({
          settings: { ...state.settings, ...settings },
        })),

        setDemoMode: (enabled) => set({ isDemoMode: enabled }),
      },
    }),
    {
      name: 'mini-ceo-save',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        founder: state.founder,
        company: state.company,
        products: state.products,
        campaigns: state.campaigns,
        employees: state.employees,
        departments: state.departments,
        balance: state.balance,
        finances: state.finances.slice(-500), // Keep last 500 records
        simulationDay: state.simulationDay,
        simulationSpeed: state.simulationSpeed,
        isRunning: state.isRunning,
        dailyReports: state.dailyReports.slice(-100), // Keep last 100 reports
        activeEvents: state.activeEvents,
        eventHistory: state.eventHistory.slice(-50),
        xp: state.xp,
        level: state.level,
        achievements: state.achievements,
        completedMissions: state.completedMissions,
        activeMissions: state.activeMissions,
        buildings: state.buildings,
        settings: state.settings,
        isDemoMode: state.isDemoMode,
      }),
    }
  )
)

// Helper function for department upgrade bonuses
function getDepartmentUpgradeBonuses(type: string, newLevel: number) {
  const bonuses: Record<string, any[]> = {
    product: [
      { type: 'productivity', value: 0.05, description: '+5% product development speed' },
      { type: 'quality', value: 0.03, description: '+3% product quality' },
      { type: 'innovation', value: 0.02, description: '+2% innovation rate' },
    ],
    marketing: [
      { type: 'productivity', value: 0.04, description: '+4% campaign efficiency' },
      { type: 'customer-satisfaction', value: 0.02, description: '+2% brand perception' },
    ],
    finance: [
      { type: 'cost-reduction', value: 0.03, description: '-3% operating costs' },
      { type: 'productivity', value: 0.02, description: '+2% financial efficiency' },
    ],
    operations: [
      { type: 'cost-reduction', value: 0.02, description: '-2% operational costs' },
      { type: 'quality', value: 0.02, description: '+2% delivery quality' },
    ],
    support: [
      { type: 'customer-satisfaction', value: 0.03, description: '+3% customer satisfaction' },
      { type: 'quality', value: 0.02, description: '+2% resolution quality' },
    ],
  }

  return bonuses[type]?.slice(0, newLevel) || []
}

// Export selectors for performance
export const useFounder = () => useGameStore((state) => state.founder)
export const useCompany = () => useGameStore((state) => state.company)
export const useProducts = () => useGameStore((state) => state.products)
export const useCampaigns = () => useGameStore((state) => state.campaigns)
export const useEmployees = () => useGameStore((state) => state.employees)
export const useDepartments = () => useGameStore((state) => state.departments)
export const useBalance = () => useGameStore((state) => state.balance)
export const useFinances = () => useGameStore((state) => state.finances)
export const useSimulationDay = () => useGameStore((state) => state.simulationDay)
export const useSimulationSpeed = () => useGameStore((state) => state.simulationSpeed)
export const useIsRunning = () => useGameStore((state) => state.isRunning)
export const useDailyReports = () => useGameStore((state) => state.dailyReports)
export const useActiveEvents = () => useGameStore((state) => state.activeEvents)
export const useEventHistory = () => useGameStore((state) => state.eventHistory)
export const useXP = () => useGameStore((state) => state.xp)
export const useLevel = () => useGameStore((state) => state.level)
export const useAchievements = () => useGameStore((state) => state.achievements)
export const useCompletedMissions = () => useGameStore((state) => state.completedMissions)
export const useActiveMissions = () => useGameStore((state) => state.activeMissions)
export const useBuildings = () => useGameStore((state) => state.buildings)
export const useSettings = () => useGameStore((state) => state.settings)
export const useGameActions = () => useGameStore((state) => state.actions)
export const useIsDemoMode = () => useGameStore((state) => state.isDemoMode)
export const useSelectedBuildingId = () => useGameStore((state) => state.selectedBuildingId)