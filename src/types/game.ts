export type IndustryType = 'technology' | 'fashion' | 'food-beverage' | 'gaming' | 'education' | 'entertainment'

export type BusinessStrategy = 'growth' | 'profitability' | 'innovation' | 'customer-focus' | 'balanced'

export type ProductCategory = 'physical' | 'digital' | 'service' | 'subscription'

export type CampaignType = 'social-media' | 'influencer' | 'content' | 'email' | 'paid-ads' | 'events' | 'pr'

export type AudienceSegment = 'gen-z' | 'millennials' | 'gen-x' | 'professionals' | 'students' | 'families' | 'general'

export type EmployeeRole = 'junior' | 'senior' | 'lead' | 'manager' | 'director'

export type DepartmentType = 'product' | 'marketing' | 'finance' | 'operations' | 'support'

export type EventType = 'opportunity' | 'challenge' | 'crisis' | 'milestone'

export type EventCategory = 'competitor' | 'market' | 'supplier' | 'customer' | 'internal' | 'external' | 'regulatory'

export type BuildingType = 'hq' | 'retail' | 'office' | 'warehouse' | 'research' | 'factory'

export interface FounderProfile {
  id: string
  name: string
  avatarId: string
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
  createdAt: number
}

export interface BrandIdentity {
  primaryColor: string
  secondaryColor: string
  logoType: 'minimal' | 'modern' | 'playful' | 'professional'
  tagline: string
}

export interface Company {
  id: string
  name: string
  description: string
  industry: IndustryType
  brandIdentity: BrandIdentity
  strategy: BusinessStrategy
  foundedAt: number
  valuation: number
  level: number
}

export interface Product {
  id: string
  name: string
  description: string
  category: ProductCategory
  sellingPrice: number
  productionCost: number
  inventory: number
  maxInventory: number
  demand: number
  baseDemand: number
  priceElasticity: number
  customerSatisfaction: number
  createdAt: number
  performance: ProductPerformance[]
}

export interface ProductPerformance {
  day: number
  unitsSold: number
  revenue: number
  profit: number
  satisfaction: number
}

export interface MarketingCampaign {
  id: string
  name: string
  type: CampaignType
  budget: number
  spent: number
  targetAudience: AudienceSegment
  startDay: number
  endDay: number
  status: 'draft' | 'active' | 'completed' | 'paused'
  performance: CampaignPerformance[]
}

export interface CampaignPerformance {
  day: number
  impressions: number
  clicks: number
  conversions: number
  costPerAcquisition: number
  revenueGenerated: number
}

export interface EmployeeSkill {
  name: string
  level: number
  maxLevel: number
}

export interface Employee {
  id: string
  name: string
  role: EmployeeRole
  department: DepartmentType
  level: number
  baseSalary: number
  currentSalary: number
  productivity: number
  satisfaction: number
  hiredAt: number
  skills: EmployeeSkill[]
}

export interface DepartmentBonus {
  type: 'productivity' | 'cost-reduction' | 'quality' | 'innovation' | 'customer-satisfaction'
  value: number
  description: string
}

export interface Department {
  type: DepartmentType
  name: string
  level: number
  maxLevel: number
  upgradeCost: number
  employees: string[]
  bonuses: DepartmentBonus[]
}

export interface FinancialRecord {
  id: string
  day: number
  type: 'revenue' | 'expense' | 'investment' | 'loan' | 'tax'
  category: string
  amount: number
  description: string
  productId?: string
  campaignId?: string
}

export interface DailyReport {
  day: number
  date: string
  revenue: number
  expenses: number
  profit: number
  balance: number
  productsSold: number
  newCustomers: number
  customerSatisfaction: number
  reputation: number
  events: BusinessEvent[]
  topProducts: ProductPerformance[]
  insights: string[]
}

export interface UserSettings {
  soundEnabled: boolean
  musicEnabled: boolean
  reducedMotion: boolean
  autoSave: boolean
  demoMode: boolean
  notifications: boolean
}