import type { MissionTemplate, MissionObjectiveTemplate } from '@types/events'

export const MISSION_TEMPLATES: MissionTemplate[] = [
  // BEGINNER MISSIONS
  {
    id: 'mission-understand-revenue',
    title: 'Understand Revenue',
    description: 'Learn how revenue works by creating your first product and making a sale.',
    category: 'beginner',
    xpReward: 200,
    objectives: [
      {
        id: 'obj-create-product',
        type: 'create_product',
        target: 1,
        description: 'Create your first product',
      },
      {
        id: 'obj-make-sale',
        type: 'reach_revenue',
        target: 1,
        description: 'Make your first sale (reach ₹1 revenue)',
      },
    ],
  },
  {
    id: 'mission-understand-expenses',
    title: 'Understand Expenses',
    description: 'Learn about production costs and operating expenses.',
    category: 'beginner',
    xpReward: 200,
    objectives: [
      {
        id: 'obj-set-cost',
        type: 'create_product',
        target: 1,
        description: 'Create a product with production cost set',
      },
      {
        id: 'obj-view-expenses',
        type: 'reach_revenue',
        target: 0,
        description: 'View your daily expense breakdown',
      },
    ],
  },
  {
    id: 'mission-set-prices',
    title: 'Price It Right',
    description: 'Experiment with pricing to understand demand elasticity.',
    category: 'beginner',
    xpReward: 250,
    objectives: [
      {
        id: 'obj-change-price',
        type: 'set_price',
        target: 3,
        description: 'Change product price 3 times',
      },
      {
        id: 'obj-observe-demand',
        type: 'reach_revenue',
        target: 0,
        description: 'Observe how demand changes with price',
      },
    ],
  },
  {
    id: 'mission-first-campaign',
    title: 'Marketing Rookie',
    description: 'Launch your first marketing campaign to attract customers.',
    category: 'beginner',
    xpReward: 300,
    objectives: [
      {
        id: 'obj-create-campaign',
        type: 'launch_campaign',
        target: 1,
        description: 'Create and launch a marketing campaign',
      },
      {
        id: 'obj-get-customers',
        type: 'reach_customers',
        target: 10,
        description: 'Acquire 10 new customers from marketing',
      },
    ],
  },
  {
    id: 'mission-positive-profit',
    title: 'Break Even',
    description: 'Achieve your first profitable day.',
    category: 'beginner',
    xpReward: 300,
    objectives: [
      {
        id: 'obj-profit-day',
        type: 'reach_profit',
        target: 1,
        description: 'End a day with positive net profit',
      },
    ],
  },

  // INTERMEDIATE MISSIONS
  {
    id: 'mission-hire-team',
    title: 'Build Your Team',
    description: 'Hire employees to grow your business capacity.',
    category: 'intermediate',
    xpReward: 400,
    objectives: [
      {
        id: 'obj-hire-3',
        type: 'hire_employee',
        target: 3,
        description: 'Hire 3 employees',
      },
      {
        id: 'obj-assign-dept',
        type: 'hire_employee',
        target: 3,
        description: 'Assign employees to different departments',
      },
    ],
  },
  {
    id: 'mission-improve-profitability',
    title: 'Profit Optimizer',
    description: 'Improve your profit margins through smart decisions.',
    category: 'intermediate',
    xpReward: 500,
    objectives: [
      {
        id: 'obj-profit-margin',
        type: 'reach_profit',
        target: 5000,
        description: 'Achieve ₹5,000 profit in a single day',
      },
      {
        id: 'obj-optimize-prices',
        type: 'set_price',
        target: 5,
        description: 'Optimize prices for 5 products',
      },
    ],
  },
  {
    id: 'mission-handle-competition',
    title: 'Competitive Edge',
    description: 'Successfully navigate a competitive threat.',
    category: 'intermediate',
    xpReward: 400,
    objectives: [
      {
        id: 'obj-resolve-competitor',
        type: 'handle_event',
        target: 1,
        description: 'Resolve a competitor-related event',
      },
      {
        id: 'obj-maintain-share',
        type: 'reach_customers',
        target: 50,
        description: 'Maintain 50+ daily customers',
      },
    ],
  },
  {
    id: 'mission-expand-products',
    title: 'Product Expansion',
    description: 'Diversify your product portfolio.',
    category: 'intermediate',
    xpReward: 500,
    objectives: [
      {
        id: 'obj-create-5-products',
        type: 'create_product',
        target: 5,
        description: 'Have 5 active products simultaneously',
      },
      {
        id: 'obj-different-categories',
        type: 'create_product',
        target: 3,
        description: 'Create products in 3 different categories',
      },
    ],
  },
  {
    id: 'mission-upgrade-departments',
    title: 'Department Growth',
    description: 'Upgrade your departments to unlock powerful bonuses.',
    category: 'intermediate',
    xpReward: 450,
    objectives: [
      {
        id: 'obj-upgrade-dept',
        type: 'upgrade_department',
        target: 2,
        description: 'Upgrade any department to level 2',
      },
      {
        id: 'obj-upgrade-two',
        type: 'upgrade_department',
        target: 2,
        description: 'Upgrade two different departments',
      },
    ],
  },

  // ADVANCED MISSIONS
  {
    id: 'mission-scale-business',
    title: 'Scale Up',
    description: 'Scale your business to new heights.',
    category: 'advanced',
    xpReward: 1000,
    objectives: [
      {
        id: 'obj-revenue-50k',
        type: 'reach_revenue',
        target: 50000,
        description: 'Achieve ₹50,000 revenue in a single day',
      },
      {
        id: 'obj-10-employees',
        type: 'hire_employee',
        target: 10,
        description: 'Have 10+ employees',
      },
    ],
  },
  {
    id: 'mission-multi-department',
    title: 'Multi-Department Master',
    description: 'Effectively manage all five departments.',
    category: 'advanced',
    xpReward: 1000,
    objectives: [
      {
        id: 'obj-all-depts',
        type: 'upgrade_department',
        target: 5,
        description: 'Unlock all 5 departments',
      },
      {
        id: 'obj-level-3-all',
        type: 'upgrade_department',
        target: 3,
        description: 'Reach level 3 in all departments',
      },
    ],
  },
  {
    id: 'mission-market-changes',
    title: 'Market Navigator',
    description: 'Adapt to changing market conditions.',
    category: 'advanced',
    xpReward: 800,
    objectives: [
      {
        id: 'obj-handle-market-events',
        type: 'handle_event',
        target: 5,
        description: 'Resolve 5 market-related events',
      },
      {
        id: 'obj-survive-volatility',
        type: 'complete_day',
        target: 30,
        description: 'Survive 30 days with positive balance',
      },
    ],
  },
  {
    id: 'mission-sustainable-strategy',
    title: 'Sustainable Empire',
    description: 'Build a business that thrives long-term.',
    category: 'advanced',
    xpReward: 1500,
    objectives: [
      {
        id: 'obj-level-15',
        type: 'reach_balance',
        target: 500000,
        description: 'Reach ₹5,00,000 company valuation',
      },
      {
        id: 'obj-high-satisfaction',
        type: 'reach_satisfaction',
        target: 90,
        description: 'Maintain 90%+ customer satisfaction for 10 days',
      },
      {
        id: 'obj-diverse-revenue',
        type: 'create_product',
        target: 8,
        description: 'Have 8+ products generating revenue',
      },
    ],
  },
  {
    id: 'mission-tycoon',
    title: 'Business Tycoon',
    description: 'The ultimate test of entrepreneurial skill.',
    category: 'advanced',
    xpReward: 3000,
    objectives: [
      {
        id: 'obj-valuation-10m',
        type: 'reach_balance',
        target: 10000000,
        description: 'Reach ₹1,00,00,000 company valuation',
      },
      {
        id: 'obj-20-employees',
        type: 'hire_employee',
        target: 20,
        description: 'Employ 20+ people',
      },
      {
        id: 'obj-all-achievements',
        type: 'reach_revenue',
        target: 5000000,
        description: 'Unlock 15+ achievements',
      },
    ],
  },
]

export function getMissionTemplate(id: string): MissionTemplate | undefined {
  return MISSION_TEMPLATES.find(m => m.id === id)
}

export function getMissionsByCategory(category: MissionTemplate['category']): MissionTemplate[] {
  return MISSION_TEMPLATES.filter(m => m.category === category)
}

export function getBeginnerMissions(): MissionTemplate[] {
  return getMissionsByCategory('beginner')
}

export function getIntermediateMissions(): MissionTemplate[] {
  return getMissionsByCategory('intermediate')
}

export function getAdvancedMissions(): MissionTemplate[] {
  return getMissionsByCategory('advanced')
}