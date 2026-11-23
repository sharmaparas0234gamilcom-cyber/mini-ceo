import type { EventTemplate, EventChoiceTemplate, EventCondition } from '@types/events'

export const EVENT_TEMPLATES: EventTemplate[] = [
  // COMPETITOR EVENTS
  {
    id: 'competitor-launch',
    type: 'challenge',
    category: 'competitor',
    title: 'Competitor Launches Similar Product',
    description: 'A well-funded competitor just launched a product similar to your bestseller at a lower price. Your customers are starting to switch.',
    severity: 'high',
    probability: 0.08,
    minDay: 10,
    requiredConditions: [
      { type: 'products', operator: '>=', value: 1 },
      { type: 'reputation', operator: '>=', value: 30 },
    ],
    choices: [
      {
        id: 'match-price',
        label: 'Match Their Price',
        description: 'Lower your price to match the competitor. You\'ll lose margin but retain customers.',
        type: 'risky',
        cost: 0,
        effects: { demandChange: { all: 0.2 }, balanceChange: 0 },
        pros: ['Retain market share', 'Keep customers happy'],
        cons: ['Lower profit margins', 'Race to the bottom'],
      },
      {
        id: 'differentiate',
        label: 'Invest in Differentiation',
        description: 'Spend on R&D to improve your product quality and justify a higher price.',
        type: 'investment',
        cost: 15000,
        requirements: [{ type: 'balance', value: 15000, description: 'Requires ₹15,000' }],
        effects: { balanceChange: -15000, qualityWeight: 0.1, reputationChange: 5 },
        pros: ['Premium positioning', 'Higher long-term margins', 'Brand loyalty'],
        cons: ['High upfront cost', 'Takes time to see results'],
      },
      {
        id: 'marketing-push',
        label: 'Aggressive Marketing',
        description: 'Launch a marketing campaign highlighting your unique advantages.',
        type: 'strategic',
        cost: 8000,
        requirements: [{ type: 'balance', value: 8000, description: 'Requires ₹8,000' }],
        effects: { balanceChange: -8000, brandAwarenessChange: 0.15, newCustomers: 20 },
        pros: ['Quick customer acquisition', 'Brand visibility'],
        cons: ['Ongoing marketing costs', 'May not stop churn'],
      },
    ],
    cooldownDays: 30,
  },
  {
    id: 'competitor-marketing',
    type: 'challenge',
    category: 'competitor',
    title: 'Competitor Marketing Blitz',
    description: 'A competitor is flooding the market with ads. Your brand awareness is dropping as they dominate the conversation.',
    severity: 'medium',
    probability: 0.06,
    minDay: 15,
    requiredConditions: [{ type: 'campaigns', operator: '>=', value: 1 }],
    choices: [
      {
        id: 'counter-campaign',
        label: 'Launch Counter-Campaign',
        description: 'Match their marketing spend with your own campaign.',
        type: 'risky',
        cost: 12000,
        requirements: [{ type: 'balance', value: 12000, description: 'Requires ₹12,000' }],
        effects: { balanceChange: -12000, brandAwarenessChange: 0.1 },
        pros: ['Maintain visibility', 'Direct response'],
        cons: ['Expensive', 'Reactive not proactive'],
      },
      {
        id: 'niche-focus',
        label: 'Focus on Niche',
        description: 'Double down on your core audience with targeted messaging.',
        type: 'strategic',
        cost: 5000,
        requirements: [{ type: 'balance', value: 5000, description: 'Requires ₹5,000' }],
        effects: { balanceChange: -5000, brandAwarenessChange: 0.05, customerSatisfactionChange: 3 },
        pros: ['Lower cost', 'Stronger loyalty', 'Better ROI'],
        cons: ['Slower growth', 'Limited reach'],
      },
      {
        id: 'partnership',
        label: 'Seek Partnership',
        description: 'Partner with a complementary business for co-marketing.',
        type: 'strategic',
        cost: 3000,
        requirements: [{ type: 'balance', value: 3000, description: 'Requires ₹3,000' }, { type: 'reputation', value: 50, description: 'Requires 50+ reputation' }],
        effects: { balanceChange: -3000, brandAwarenessChange: 0.12, newCustomers: 15 },
        pros: ['Shared costs', 'New audience', 'Credibility boost'],
        cons: ['Complex coordination', 'Shared control'],
      },
    ],
    cooldownDays: 45,
  },

  // MARKET EVENTS
  {
    id: 'demand-surge',
    type: 'opportunity',
    category: 'market',
    title: 'Unexpected Demand Surge',
    description: 'A viral trend has suddenly increased demand for your product category. You have a window to capitalize.',
    severity: 'medium',
    probability: 0.07,
    minDay: 5,
    choices: [
      {
        id: 'ramp-production',
        label: 'Ramp Up Production',
        description: 'Increase inventory quickly to meet demand, even at higher per-unit cost.',
        type: 'investment',
        cost: 20000,
        requirements: [{ type: 'balance', value: 20000, description: 'Requires ₹20,000' }],
        effects: { balanceChange: -20000, demandChange: { all: 0.5 }, productionCostChange: { all: 0.2 } },
        pros: ['Capture maximum revenue', 'Build market share'],
        cons: ['Higher production costs', 'Risk of overstock'],
      },
      {
        id: 'premium-price',
        label: 'Premium Pricing',
        description: 'Raise prices to maximize profit per unit during high demand.',
        type: 'strategic',
        cost: 0,
        effects: { demandChange: { all: -0.15 }, priceMultiplier: { all: 1.3 } },
        pros: ['Higher margins', 'No upfront cost'],
        cons: ['Fewer units sold', 'Customer dissatisfaction risk'],
      },
      {
        id: 'steady-course',
        label: 'Steady As She Goes',
        description: 'Maintain current pricing and production. Don\'t chase the trend.',
        type: 'safe',
        cost: 0,
        effects: { demandChange: { all: 0.1 } },
        pros: ['No risk', 'Consistent brand', 'Stable operations'],
        cons: ['Missed opportunity', 'Competitors may capture market'],
      },
    ],
    cooldownDays: 60,
  },
  {
    id: 'market-downturn',
    type: 'crisis',
    category: 'market',
    title: 'Market Downturn',
    description: 'Economic conditions have worsened. Customers are cutting discretionary spending across the board.',
    severity: 'high',
    probability: 0.05,
    minDay: 30,
    choices: [
      {
        id: 'cut-costs',
        label: 'Cut Costs Aggressively',
        description: 'Reduce expenses across marketing, R&D, and operations to preserve cash.',
        type: 'safe',
        cost: 0,
        effects: { balanceChange: 10000, marketingEfficiencyChange: -0.2, productivityChange: -0.1 },
        pros: ['Immediate cash savings', 'Extend runway'],
        cons: ['Reduced growth', 'Lower morale', 'Long-term damage'],
      },
      {
        id: 'value-focus',
        label: 'Focus on Value',
        description: 'Emphasize value proposition and essential products. Launch budget-friendly options.',
        type: 'strategic',
        cost: 8000,
        requirements: [{ type: 'balance', value: 8000, description: 'Requires ₹8,000' }],
        effects: { balanceChange: -8000, demandChange: { all: 0.1 }, customerSatisfactionChange: 2 },
        pros: ['Retain price-sensitive customers', 'Build loyalty', 'Market share gains'],
        cons: ['Lower margins', 'Development cost'],
      },
      {
        id: 'premium-hold',
        label: 'Hold Premium Position',
        description: 'Maintain pricing and quality. Target customers less affected by downturn.',
        type: 'risky',
        cost: 0,
        effects: { demandChange: { all: -0.3 }, reputationChange: 5, customerSatisfactionChange: -2 },
        pros: ['Brand integrity', 'High margins maintained', 'Attracts quality buyers'],
        cons: ['Significant volume drop', 'Cash flow pressure'],
      },
    ],
    cooldownDays: 90,
  },

  // SUPPLIER EVENTS
  {
    id: 'supplier-discount',
    type: 'opportunity',
    category: 'supplier',
    title: 'Supplier Offers Volume Discount',
    description: 'A key supplier offers 15% discount on production costs if you commit to 6-month contract.',
    severity: 'low',
    probability: 0.08,
    minDay: 20,
    requiredConditions: [{ type: 'products', operator: '>=', value: 1 }],
    choices: [
      {
        id: 'accept-discount',
        label: 'Accept Volume Discount',
        description: 'Lock in lower costs for 6 months. Requires minimum order commitment.',
        type: 'safe',
        cost: 5000,
        requirements: [{ type: 'balance', value: 5000, description: 'Requires ₹5,000 deposit' }],
        effects: { balanceChange: -5000, costReduction: { all: 0.15 }, inventoryChange: { all: 100 } },
        pros: ['15% cost reduction', 'Predictable expenses', 'Supplier relationship'],
        cons: ['Upfront deposit', 'Inventory commitment', 'Less flexibility'],
      },
      {
        id: 'negotiate-better',
        label: 'Negotiate Better Terms',
        description: 'Push for 20% discount with longer commitment.',
        type: 'risky',
        cost: 0,
        effects: { costReduction: { all: 0.2 }, inventoryChange: { all: 200 } },
        pros: ['Better discount', 'Even lower costs'],
        cons: ['Higher commitment', 'Risk if demand drops', 'Supplier may refuse'],
      },
      {
        id: 'decline',
        label: 'Decline Offer',
        description: 'Keep current arrangement. Flexibility is more valuable than savings.',
        type: 'safe',
        cost: 0,
        effects: {},
        pros: ['Full flexibility', 'No commitment', 'Can switch suppliers'],
        cons: ['Missed savings', 'Higher ongoing costs'],
      },
    ],
    cooldownDays: 45,
  },
  {
    id: 'supply-chain-disruption',
    type: 'crisis',
    category: 'supplier',
    title: 'Supply Chain Disruption',
    description: 'Your primary supplier faces production issues. Raw material costs spike 30% and lead times double.',
    severity: 'high',
    probability: 0.04,
    minDay: 25,
    requiredConditions: [{ type: 'products', operator: '>=', value: 1 }],
    choices: [
      {
        id: 'absorb-cost',
        label: 'Absorb Cost Increase',
        description: 'Pay higher costs temporarily to maintain supply and customer satisfaction.',
        type: 'safe',
        cost: 0,
        effects: { productionCostChange: { all: 0.3 }, customerSatisfactionChange: 2 },
        pros: ['No disruption', 'Customer loyalty', 'Time to find alternatives'],
        cons: ['Significant margin hit', 'Unsustainable long-term'],
      },
      {
        id: 'find-alternative',
        label: 'Find Alternative Supplier',
        description: 'Invest in qualifying a new supplier. Takes time but reduces dependency.',
        type: 'investment',
        cost: 15000,
        requirements: [{ type: 'balance', value: 15000, description: 'Requires ₹15,000' }],
        effects: { balanceChange: -15000, productionCostChange: { all: 0.1 }, unlockFeature: 'backup-supplier' },
        pros: ['Long-term resilience', 'Better negotiating position', 'Reduced risk'],
        cons: ['High upfront cost', 'Takes 2-3 weeks', 'Quality risk'],
      },
      {
        id: 'raise-prices',
        label: 'Pass Cost to Customers',
        description: 'Increase prices to maintain margins. Risk losing price-sensitive customers.',
        type: 'risky',
        cost: 0,
        effects: { priceMultiplier: { all: 1.25 }, demandChange: { all: -0.25 }, customerSatisfactionChange: -5 },
        pros: ['Protect margins', 'Immediate action'],
        cons: ['Customer backlash', 'Market share loss', 'Reputation risk'],
      },
    ],
    cooldownDays: 60,
  },

  // CUSTOMER EVENTS
  {
    id: 'viral-review',
    type: 'opportunity',
    category: 'customer',
    title: 'Viral Positive Review',
    description: 'A popular influencer posted an amazing review of your product. Traffic and interest are spiking!',
    severity: 'low',
    probability: 0.06,
    minDay: 10,
    requiredConditions: [{ type: 'products', operator: '>=', value: 1 }, { type: 'reputation', operator: '>=', value: 40 }],
    choices: [
      {
        id: 'amplify',
        label: 'Amplify the Momentum',
        description: 'Boost the review with paid promotion and engage with the influencer.',
        type: 'investment',
        cost: 10000,
        requirements: [{ type: 'balance', value: 10000, description: 'Requires ₹10,000' }],
        effects: { balanceChange: -10000, brandAwarenessChange: 0.25, newCustomers: 50, demandChange: { all: 0.3 } },
        pros: ['Massive exposure', 'Credibility boost', 'Sustained growth'],
        cons: ['Costly', 'Short-lived without follow-up'],
      },
      {
        id: 'leverage-organic',
        label: 'Leverage Organically',
        description: 'Share the review across your channels, engage with comments, encourage UGC.',
        type: 'safe',
        cost: 0,
        effects: { brandAwarenessChange: 0.1, newCustomers: 20, customerSatisfactionChange: 3 },
        pros: ['Free', 'Authentic engagement', 'Community building'],
        cons: ['Slower spread', 'Limited reach'],
      },
      {
        id: 'improve-product',
        label: 'Invest Feedback into Product',
        description: 'Use the attention to gather feedback and improve the product.',
        type: 'strategic',
        cost: 5000,
        requirements: [{ type: 'balance', value: 5000, description: 'Requires ₹5,000' }],
        effects: { balanceChange: -5000, qualityWeight: 0.05, customerSatisfactionChange: 5, reputationChange: 3 },
        pros: ['Long-term improvement', 'Shows you listen', 'Better product'],
        cons: ['Delayed impact', 'Cost without immediate revenue'],
      },
    ],
    cooldownDays: 60,
  },
  {
    id: 'customer-complaints',
    type: 'challenge',
    category: 'customer',
    title: 'Wave of Customer Complaints',
    description: 'A quality issue has triggered a wave of negative reviews and support tickets. Satisfaction is plummeting.',
    severity: 'high',
    probability: 0.05,
    minDay: 15,
    requiredConditions: [{ type: 'products', operator: '>=', value: 1 }, { type: 'customerSatisfaction', operator: '<=', value: 70 }],
    choices: [
      {
        id: 'full-recall',
        label: 'Full Recall & Fix',
        description: 'Recall affected products, fix the issue, and replace for free. Costly but builds trust.',
        type: 'investment',
        cost: 25000,
        requirements: [{ type: 'balance', value: 25000, description: 'Requires ₹25,000' }],
        effects: { balanceChange: -25000, customerSatisfactionChange: 15, reputationChange: 10, qualityWeight: 0.1 },
        pros: ['Maximum trust recovery', 'Demonstrates accountability', 'Long-term loyalty'],
        cons: ['Very expensive', 'Short-term cash hit', 'Public admission of fault'],
      },
      {
        id: 'targeted-fix',
        label: 'Targeted Fix & Compensation',
        description: 'Fix the issue for affected customers only and offer compensation.',
        type: 'strategic',
        cost: 10000,
        requirements: [{ type: 'balance', value: 10000, description: 'Requires ₹10,000' }],
        effects: { balanceChange: -10000, customerSatisfactionChange: 8, reputationChange: 3 },
        pros: ['Reasonable cost', 'Addresses affected customers', 'Shows responsiveness'],
        cons: ['Partial fix', 'Some customers still unhappy'],
      },
      {
        id: 'minimal-response',
        label: 'Minimal Response',
        description: 'Issue a generic apology and promise to do better. Hope it blows over.',
        type: 'risky',
        cost: 0,
        effects: { customerSatisfactionChange: -10, reputationChange: -10, brandAwarenessChange: -0.05 },
        pros: ['No cost', 'Quick'],
        cons: ['Severe reputation damage', 'Customer exodus', 'Long recovery'],
      },
    ],
    cooldownDays: 90,
  },

  // INTERNAL EVENTS
  {
    id: 'key-employee-leaves',
    type: 'challenge',
    category: 'internal',
    title: 'Key Employee Resigns',
    description: 'Your top performer in a critical department just quit. Productivity in that department will drop significantly.',
    severity: 'medium',
    probability: 0.07,
    minDay: 20,
    requiredConditions: [{ type: 'employees', operator: '>=', value: 3 }],
    choices: [
      {
        id: 'counter-offer',
        label: 'Make Counter-Offer',
        description: 'Offer 20% raise and promotion to keep them.',
        type: 'investment',
        cost: 0,
        effects: { salaryChange: { department: 0.2 }, productivityChange: { department: 0.05 } },
        pros: ['Retain talent', 'Immediate fix', 'Morale signal'],
        cons: ['Higher ongoing costs', 'Sets precedent', 'May not work'],
      },
      {
        id: 'hire-replacement',
        label: 'Hire Replacement',
        description: 'Recruit a replacement. Takes time but brings fresh perspective.',
        type: 'strategic',
        cost: 8000,
        requirements: [{ type: 'balance', value: 8000, description: 'Requires ₹8,000' }],
        effects: { balanceChange: -8000, productivityChange: { department: -0.2 }, newEmployee: true },
        pros: ['Fresh skills', 'Potential upgrade', 'Control over hire'],
        cons: ['Ramp-up time', 'Recruitment cost', 'Temporary gap'],
      },
      {
        id: 'redistribute',
        label: 'Redistribute Workload',
        description: 'Spread the work among existing team. Save money but risk burnout.',
        type: 'risky',
        cost: 0,
        effects: { productivityChange: { department: -0.15 }, employeeSatisfactionChange: -10 },
        pros: ['No cost', 'Immediate'],
        cons: ['Burnout risk', 'Quality decline', 'Resentment'],
      },
    ],
    cooldownDays: 45,
  },
  {
    id: 'innovation-breakthrough',
    type: 'milestone',
    category: 'internal',
    title: 'R&D Breakthrough!',
    description: 'Your research team has made a breakthrough that could significantly improve your products or reduce costs.',
    severity: 'low',
    probability: 0.04,
    minDay: 30,
    requiredConditions: [{ type: 'department', operator: '>=', value: 3, departmentType: 'research' }],
    choices: [
      {
        id: 'apply-products',
        label: 'Apply to Products',
        description: 'Integrate the breakthrough into your product line for quality improvements.',
        type: 'investment',
        cost: 10000,
        requirements: [{ type: 'balance', value: 10000, description: 'Requires ₹10,000' }],
        effects: { balanceChange: -10000, qualityWeight: 0.15, customerSatisfactionChange: 5, demandChange: { all: 0.1 } },
        pros: ['Better products', 'Higher satisfaction', 'Competitive advantage'],
        cons: ['Implementation cost', 'Time to market'],
      },
      {
        id: 'reduce-costs',
        label: 'Optimize Production',
        description: 'Use the breakthrough to streamline manufacturing and reduce costs.',
        type: 'strategic',
        cost: 5000,
        requirements: [{ type: 'balance', value: 5000, description: 'Requires ₹5,000' }],
        effects: { balanceChange: -5000, costReduction: { all: 0.12 }, productionCostChange: { all: -0.12 } },
        pros: ['Lower costs', 'Higher margins', 'Scalable benefit'],
        cons: ['No product improvement', 'Competitors may catch up'],
      },
      {
        id: 'patent-license',
        label: 'Patent & License',
        description: 'Patent the innovation and license it to others for passive income.',
        type: 'strategic',
        cost: 15000,
        requirements: [{ type: 'balance', value: 15000, description: 'Requires ₹15,000' }, { type: 'reputation', value: 60, description: 'Requires 60+ reputation' }],
        effects: { balanceChange: -15000, monthlyPassiveIncome: 5000, reputationChange: 5 },
        pros: ['Passive income stream', 'Industry leadership', 'Asset creation'],
        cons: ['High upfront cost', 'Legal complexity', 'Revenue not guaranteed'],
      },
    ],
    cooldownDays: 90,
  },

  // EXTERNAL EVENTS
  {
    id: 'new-regulation',
    type: 'challenge',
    category: 'regulatory',
    title: 'New Industry Regulation',
    description: 'Government introduces new compliance requirements. All businesses in your industry must adapt.',
    severity: 'medium',
    probability: 0.03,
    minDay: 40,
    choices: [
      {
        id: 'comply-early',
        label: 'Comply Early',
        description: 'Invest now to be fully compliant before deadline. Gain competitive advantage.',
        type: 'investment',
        cost: 20000,
        requirements: [{ type: 'balance', value: 20000, description: 'Requires ₹20,000' }],
        effects: { balanceChange: -20000, reputationChange: 8, unlockFeature: 'compliance-certified' },
        pros: ['First-mover advantage', 'Trust signal', 'Avoid penalties'],
        cons: ['High cost', 'Resources diverted'],
      },
      {
        id: 'minimal-compliance',
        label: 'Minimal Compliance',
        description: 'Do the bare minimum to meet requirements. Save money but risk issues.',
        type: 'risky',
        cost: 5000,
        requirements: [{ type: 'balance', value: 5000, description: 'Requires ₹5,000' }],
        effects: { balanceChange: -5000, reputationChange: -2, complianceRisk: 0.3 },
        pros: ['Lower cost', 'Quick'],
        cons: ['Reputation risk', 'Potential fines', 'Competitive disadvantage'],
      },
      {
        id: 'lobby-oppose',
        label: 'Join Industry Lobby',
        description: 'Pool resources with competitors to lobby for changes or delays.',
        type: 'strategic',
        cost: 15000,
        requirements: [{ type: 'balance', value: 15000, description: 'Requires ₹15,000' }, { type: 'reputation', value: 50, description: 'Requires 50+ reputation' }],
        effects: { balanceChange: -15000, regulationDelay: 60, industryRelations: 10 },
        pros: ['Potential delay/reduction', 'Industry connections', 'Shared burden'],
        cons: ['Uncertain outcome', 'High cost', 'Public perception risk'],
      },
    ],
    cooldownDays: 120,
  },
  {
    id: 'economic-boom',
    type: 'opportunity',
    category: 'external',
    title: 'Economic Boom!',
    description: 'The economy is booming! Consumer confidence is high, spending is up, and investment is flowing.',
    severity: 'low',
    probability: 0.04,
    minDay: 50,
    choices: [
      {
        id: 'aggressive-expansion',
        label: 'Aggressive Expansion',
        description: 'Invest heavily in growth: marketing, hiring, inventory, new products.',
        type: 'investment',
        cost: 50000,
        requirements: [{ type: 'balance', value: 50000, description: 'Requires ₹50,000' }],
        effects: { balanceChange: -50000, demandChange: { all: 0.4 }, brandAwarenessChange: 0.2, newCustomers: 100, employeeCount: 5 },
        pros: ['Maximum growth capture', 'Market leadership', 'Economies of scale'],
        cons: ['High risk if boom ends', 'Overextension danger', 'Management complexity'],
      },
      {
        id: 'measured-growth',
        label: 'Measured Growth',
        description: 'Invest moderately in high-ROI areas. Build sustainably.',
        type: 'strategic',
        cost: 20000,
        requirements: [{ type: 'balance', value: 20000, description: 'Requires ₹20,000' }],
        effects: { balanceChange: -20000, demandChange: { all: 0.2 }, brandAwarenessChange: 0.1, newCustomers: 40, employeeCount: 2 },
        pros: ['Balanced risk/reward', 'Sustainable', 'Flexible'],
        cons: ['May miss peak opportunity', 'Competitors may outpace'],
      },
      {
        id: 'strengthen-foundation',
        label: 'Strengthen Foundation',
        description: 'Use profits to pay debt, build reserves, improve systems. Prepare for downturn.',
        type: 'safe',
        cost: 0,
        effects: { balanceChange: 10000, cashReserves: 50000, riskReduction: 0.2 },
        pros: ['Maximum resilience', 'Debt-free', 'Ready for anything'],
        cons: ['Miss growth window', 'Conservative', 'Shareholders may disagree'],
      },
    ],
    cooldownDays: 180,
  },
]

export function getEventTemplate(id: string): EventTemplate | undefined {
  return EVENT_TEMPLATES.find(e => e.id === id)
}

export function getEventsByCategory(category: EventTemplate['category']): EventTemplate[] {
  return EVENT_TEMPLATES.filter(e => e.category === category)
}

export function getAvailableEvents(day: number, gameState: any): EventTemplate[] {
  return EVENT_TEMPLATES.filter(event => {
    if (day < event.minDay) return false
    if (event.maxDay && day > event.maxDay) return false
    if (event.requiredConditions) {
      return event.requiredConditions.every(condition => checkCondition(condition, gameState))
    }
    return true
  })
}

function checkCondition(condition: EventCondition, gameState: any): boolean {
  let value: number
  switch (condition.type) {
    case 'balance':
      value = gameState.balance
      break
    case 'reputation':
      value = gameState.reputation
      break
    case 'level':
      value = gameState.company?.level || 1
      break
    case 'department':
      const dept = gameState.departments?.find((d: any) => d.type === condition.departmentType)
      value = dept?.level || 0
      break
    case 'product':
      value = gameState.products?.filter((p: any) => p.category === condition.productCategory).length || 0
      break
    case 'employees':
      value = gameState.employees?.length || 0
      break
    case 'campaigns':
      value = gameState.campaigns?.filter((c: any) => c.status === 'active').length || 0
      break
    case 'customerSatisfaction':
      value = gameState.customerSatisfaction || 0
      break
    default:
      return true
  }

  switch (condition.operator) {
    case '>=':
      return value >= condition.value
    case '<=':
      return value <= condition.value
    case '>':
      return value > condition.value
    case '<':
      return value < condition.value
    case '==':
      return value === condition.value
    default:
      return true
  }
}