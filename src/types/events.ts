import type { EventType, EventCategory, BusinessEvent, EventChoice, EventEffects, EventRequirement } from './game'

export interface EventTemplate {
  id: string
  type: EventType
  category: EventCategory
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  probability: number
  minDay: number
  maxDay?: number
  requiredConditions?: EventCondition[]
  choices: EventChoiceTemplate[]
  cooldownDays: number
}

export interface EventCondition {
  type: 'balance' | 'reputation' | 'level' | 'department' | 'product' | 'employees' | 'campaigns'
  operator: '>=' | '<=' | '>' | '<' | '=='
  value: number
  departmentType?: string
  productCategory?: string
}

export interface EventChoiceTemplate {
  id: string
  label: string
  description: string
  type: 'safe' | 'risky' | 'investment' | 'strategic'
  cost?: number
  requirements?: EventRequirement[]
  effects: EventEffects
  pros: string[]
  cons: string[]
}

export interface MissionTemplate {
  id: string
  title: string
  description: string
  category: 'beginner' | 'intermediate' | 'advanced'
  objectives: MissionObjectiveTemplate[]
  xpReward: number
  unlocks?: string[]
  prerequisiteMissions?: string[]
}

export interface MissionObjectiveTemplate {
  id: string
  type: 'create_product' | 'set_price' | 'launch_campaign' | 'hire_employee' |
        'reach_revenue' | 'reach_profit' | 'reach_satisfaction' | 'reach_customers' |
        'upgrade_department' | 'complete_day' | 'handle_event' | 'reach_balance'
  target: number
  description: string
  productCategory?: string
  campaignType?: string
  departmentType?: string
}

export interface AchievementTemplate {
  id: string
  title: string
  description: string
  icon: string
  category: 'milestone' | 'mastery' | 'special' | 'secret'
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary'
  xpReward: number
  condition: AchievementConditionTemplate
}

export interface AchievementConditionTemplate {
  type: 'first_sale' | 'first_profit' | 'revenue_milestone' | 'profit_milestone' |
        'customers_milestone' | 'products_count' | 'campaigns_count' | 'employees_count' |
        'level_reached' | 'days_survived' | 'events_resolved' | 'perfect_day' | 'comeback'
  value?: number
  productCategory?: string
}