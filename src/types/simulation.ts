import type { Product, MarketingCampaign, Employee, Department, FinancialRecord, BusinessEvent, DailyReport } from './game'

export interface SimulationConfig {
  baseDailyCustomers: number
  baseCustomerGrowthRate: number
  marketSize: number
  competitionFactor: number
  basePriceElasticity: number
  minPriceMultiplier: number
  maxPriceMultiplier: number
  inventoryHoldingCostRate: number
  stockoutPenalty: number
  marketingEfficiencyBase: number
  marketingDiminishingReturns: number
  brandAwarenessDecay: number
  baseProductivity: number
  productivityPerLevel: number
  salaryGrowthPerLevel: number
  satisfactionDecay: number
  baseSatisfaction: number
  priceSensitivityWeight: number
  qualityWeight: number
  supportWeight: number
  satisfactionChangeRate: number
  baseReputation: number
  reputationGainPerSale: number
  reputationLossPerComplaint: number
  reputationDecay: number
  eventProbabilityPerDay: number
  maxActiveEvents: number
  xpPerSale: number
  xpPerProfit: number
  xpPerCustomer: number
  xpPerMilestone: number
  levelXpCurve: number[]
}

export interface SimulationInput {
  products: Product[]
  campaigns: MarketingCampaign[]
  employees: Employee[]
  departments: Department[]
  balance: number
  day: number
  customerSatisfaction: number
  reputation: number
  brandAwareness: number
  companyLevel: number
  industry: string
  strategy: string
}

export interface ProductSimulationResult {
  productId: string
  unitsSold: number
  revenue: number
  productionCost: number
  grossProfit: number
  newInventory: number
  demand: number
  satisfactionChange: number
}

export interface CampaignSimulationResult {
  campaignId: string
  impressions: number
  clicks: number
  conversions: number
  spent: number
  revenueGenerated: number
  newCustomers: number
  brandAwarenessChange: number
}

export interface DepartmentSimulationResult {
  departmentType: string
  productivityBonus: number
  costReduction: number
  qualityBonus: number
  innovationBonus: number
  satisfactionBonus: number
  salaryExpense: number
}

export interface SimulationOutput {
  newBalance: number
  dailyRevenue: number
  dailyExpenses: number
  netProfit: number
  productsSold: Record<string, number>
  newInventory: Record<string, number>
  customerSatisfaction: number
  reputation: number
  brandAwareness: number
  newCustomers: number
  events: BusinessEvent[]
  financialRecords: FinancialRecord[]
  productUpdates: Partial<Product>[]
  campaignUpdates: Partial<MarketingCampaign>[]
  employeeUpdates: Partial<Employee>[]
  departmentUpdates: Partial<Department>[]
  xpGained: number
  dailyReport: DailyReport
}

export const DEFAULT_SIMULATION_CONFIG: SimulationConfig = {
  baseDailyCustomers: 50,
  baseCustomerGrowthRate: 0.02,
  marketSize: 10000,
  competitionFactor: 0.8,
  basePriceElasticity: 1.5,
  minPriceMultiplier: 0.5,
  maxPriceMultiplier: 3.0,
  inventoryHoldingCostRate: 0.01,
  stockoutPenalty: 0.1,
  marketingEfficiencyBase: 10,
  marketingDiminishingReturns: 0.1,
  brandAwarenessDecay: 0.02,
  baseProductivity: 1.0,
  productivityPerLevel: 0.15,
  salaryGrowthPerLevel: 0.2,
  satisfactionDecay: 0.01,
  baseSatisfaction: 70,
  priceSensitivityWeight: 0.4,
  qualityWeight: 0.35,
  supportWeight: 0.25,
  satisfactionChangeRate: 0.1,
  baseReputation: 50,
  reputationGainPerSale: 0.1,
  reputationLossPerComplaint: 2,
  reputationDecay: 0.05,
  eventProbabilityPerDay: 0.15,
  maxActiveEvents: 3,
  xpPerSale: 5,
  xpPerProfit: 0.1,
  xpPerCustomer: 2,
  xpPerMilestone: 100,
  levelXpCurve: [0, 500, 1200, 2200, 3500, 5200, 7200, 9500, 12200, 15200, 18500, 22200, 26200, 30500, 35200],
}