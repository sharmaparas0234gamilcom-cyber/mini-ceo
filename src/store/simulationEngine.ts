import type { SimulationInput, SimulationOutput, SimulationConfig, ProductSimulationResult, CampaignSimulationResult, DepartmentSimulationResult } from '@types/simulation'
import type { Product, MarketingCampaign, Employee, Department, FinancialRecord, DailyReport, BusinessEvent } from '@types/game'
import { generateId, formatDate, randomRange } from '@utils/helpers'
import { DEFAULT_SIMULATION_CONFIG } from '@types/simulation'

export function runSimulationStep(
  input: SimulationInput,
  config: SimulationConfig = DEFAULT_SIMULATION_CONFIG
): SimulationOutput {
  const day = input.day + 1

  // 1. Calculate market conditions
  const marketConditions = calculateMarketConditions(day, input, config)

  // 2. Process products
  const productResults = processProducts(input.products, marketConditions, input, config)

  // 3. Process marketing campaigns
  const campaignResults = processCampaigns(input.campaigns, marketConditions, input, config)

  // 4. Process departments and employees
  const departmentResults = processDepartments(input.departments, input.employees, input, config)

  // 5. Calculate financial totals
  const dailyRevenue = productResults.reduce((sum, r) => sum + r.revenue, 0)
  const productionCosts = productResults.reduce((sum, r) => sum + r.productionCost, 0)
  const marketingCosts = campaignResults.reduce((sum, r) => sum + r.spent, 0)
  const salaryCosts = departmentResults.reduce((sum, r) => sum + r.salaryExpense, 0)
  const departmentUpgradeCosts = 0 // Handled separately
  const inventoryHoldingCosts = calculateInventoryHoldingCosts(input.products, config)

  const dailyExpenses = productionCosts + marketingCosts + salaryCosts + inventoryHoldingCosts
  const netProfit = dailyRevenue - dailyExpenses
  const newBalance = input.balance + netProfit

  // 6. Calculate customer satisfaction
  const customerSatisfaction = calculateCustomerSatisfaction(
    input.customerSatisfaction,
    productResults,
    departmentResults,
    input,
    config
  )

  // 7. Calculate reputation
  const reputation = calculateReputation(
    input.reputation,
    dailyRevenue,
    productResults,
    customerSatisfaction,
    input,
    config
  )

  // 8. Calculate brand awareness
  const brandAwareness = calculateBrandAwareness(
    input.brandAwareness,
    campaignResults,
    input,
    config
  )

  // 9. Calculate new customers
  const newCustomers = calculateNewCustomers(campaignResults, brandAwareness, marketConditions, config)

  // 10. Check for random events
  const events = checkRandomEvents(day, input, config)

  // 11. Build financial records
  const financialRecords = buildFinancialRecords(
    day,
    productResults,
    campaignResults,
    departmentResults,
    inventoryHoldingCosts,
    input
  )

  // 12. Build product updates
  const productUpdates = buildProductUpdates(input.products, productResults)

  // 13. Build campaign updates
  const campaignUpdates = buildCampaignUpdates(input.campaigns, campaignResults)

  // 14. Build employee updates
  const employeeUpdates = buildEmployeeUpdates(input.employees, departmentResults, config)

  // 15. Build department updates
  const departmentUpdates = buildDepartmentUpdates(input.departments, departmentResults)

  // 16. Calculate XP gained
  const xpGained = calculateXPGained(
    dailyRevenue,
    netProfit,
    newCustomers,
    productResults,
    config
  )

  // 17. Create daily report
  const dailyReport = createDailyReport(
    day,
    dailyRevenue,
    dailyExpenses,
    netProfit,
    newBalance,
    productResults,
    newCustomers,
    customerSatisfaction,
    reputation,
    events,
    input
  )

  return {
    newBalance,
    dailyRevenue,
    dailyExpenses,
    netProfit,
    productsSold: Object.fromEntries(productResults.map(r => [r.productId, r.unitsSold])),
    newInventory: Object.fromEntries(productResults.map(r => [r.productId, r.newInventory])),
    customerSatisfaction,
    reputation,
    brandAwareness,
    newCustomers,
    events,
    financialRecords,
    productUpdates,
    campaignUpdates,
    employeeUpdates,
    departmentUpdates,
    xpGained,
    dailyReport,
  }
}

function calculateMarketConditions(
  day: number,
  input: SimulationInput,
  config: SimulationConfig
) {
  // Seasonal variation (yearly cycle)
  const seasonalFactor = 1 + 0.1 * Math.sin((day / 365) * 2 * Math.PI)

  // Weekly variation (weekends higher for some industries)
  const dayOfWeek = day % 7
  const weekendBoost = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.15 : 1.0

  // Growth over time
  const growthFactor = Math.pow(1 + config.baseCustomerGrowthRate, day / 30)

  // Competition pressure increases over time
  const competitionPressure = Math.min(1.5, 1 + (day / 365) * 0.5)

  // Random daily variance
  const dailyVariance = randomRange(0.9, 1.1)

  return {
    seasonalFactor,
    weekendBoost,
    growthFactor,
    competitionPressure,
    dailyVariance,
    totalMultiplier: seasonalFactor * weekendBoost * growthFactor / competitionPressure * dailyVariance,
  }
}

function processProducts(
  products: Product[],
  marketConditions: any,
  input: SimulationInput,
  config: SimulationConfig
): ProductSimulationResult[] {
  return products.map(product => {
    // Calculate effective demand
    const marketingMultiplier = calculateMarketingMultiplier(product.id, input.campaigns, input.brandAwareness)
    const satisfactionMultiplier = 0.5 + (product.customerSatisfaction / 100) * 0.5
    const priceElasticityFactor = Math.pow(
      product.productionCost * config.maxPriceMultiplier / product.sellingPrice,
      product.priceElasticity
    )
    const randomFactor = randomRange(0.8, 1.2)

    const effectiveDemand = Math.max(0, Math.floor(
      product.baseDemand *
      marketingMultiplier *
      satisfactionMultiplier *
      priceElasticityFactor *
      marketConditions.totalMultiplier *
      randomFactor
    ))

    // Units sold limited by inventory
    const unitsSold = Math.min(effectiveDemand, product.inventory)
    const revenue = unitsSold * product.sellingPrice
    const productionCost = unitsSold * product.productionCost
    const grossProfit = revenue - productionCost
    const newInventory = product.inventory - unitsSold

    // Satisfaction change based on stockout
    const stockoutRate = product.inventory > 0 ? (effectiveDemand - unitsSold) / effectiveDemand : 0
    const satisfactionChange = stockoutRate > 0 ? -stockoutRate * 10 * config.stockoutPenalty : 0.1

    return {
      productId: product.id,
      unitsSold,
      revenue,
      productionCost,
      grossProfit,
      newInventory,
      demand: effectiveDemand,
      satisfactionChange,
    }
  })
}

function calculateMarketingMultiplier(
  productId: string,
  campaigns: MarketingCampaign[],
  brandAwareness: number
): number {
  const activeCampaigns = campaigns.filter(c => c.status === 'active')
  if (activeCampaigns.length === 0) return 1 * (0.5 + brandAwareness * 0.5)

  let totalBoost = 0
  for (const campaign of activeCampaigns) {
    const campaignProgress = campaign.performance.length
    const efficiency = campaign.performance[campaignProgress - 1]?.revenueGenerated /
      Math.max(1, campaign.performance[campaignProgress - 1]?.spent) || 1
    totalBoost += Math.min(0.5, efficiency * 0.1)
  }

  return 1 + totalBoost + brandAwareness * 0.3
}

function processCampaigns(
  campaigns: MarketingCampaign[],
  marketConditions: any,
  input: SimulationInput,
  config: SimulationConfig
): CampaignSimulationResult[] {
  return campaigns
    .filter(c => c.status === 'active' && c.spent < c.budget)
    .map(campaign => {
      const dayIndex = campaign.performance.length
      const dailyBudget = campaign.budget / Math.max(1, campaign.endDay - campaign.startDay + 1)
      const spendToday = Math.min(dailyBudget, campaign.budget - campaign.spent)

      // Channel efficiency
      const channelEfficiency = getChannelEfficiency(campaign.type)
      const audienceMatch = getAudienceMatch(campaign.targetAudience, input.company?.industry || 'technology')
      const diminishingReturns = 1 - config.marketingDiminishingReturns * (campaign.spent / campaign.budget)

      const impressions = Math.floor(spendToday * channelEfficiency * audienceMatch * diminishingReturns * marketConditions.totalMultiplier)
      const clickThroughRate = getClickThroughRate(campaign.type)
      const clicks = Math.floor(impressions * clickThroughRate * audienceMatch)
      const conversionRate = getConversionRate(campaign.type, input.brandAwareness)
      const conversions = Math.floor(clicks * conversionRate)

      const revenueGenerated = conversions * getAverageOrderValue(input.products)
      const costPerAcquisition = conversions > 0 ? spendToday / conversions : 0
      const newCustomers = conversions

      return {
        campaignId: campaign.id,
        impressions,
        clicks,
        conversions,
        spent: spendToday,
        revenueGenerated,
        newCustomers,
        brandAwarenessChange: impressions * 0.000001, // Small brand awareness boost
      }
    })
}

function getChannelEfficiency(type: string): number {
  const efficiencies: Record<string, number> = {
    'social-media': 15,
    'influencer': 25,
    'content': 10,
    'email': 30,
    'paid-ads': 20,
    'events': 8,
    'pr': 12,
  }
  return efficiencies[type] || 10
}

function getAudienceMatch(audience: string, industry: string): number {
  const matches: Record<string, Record<string, number>> = {
    'technology': { professionals: 1.2, students: 0.8, 'gen-z': 1.0, millennials: 1.1 },
    'fashion': { 'gen-z': 1.3, millennials: 1.2, professionals: 0.9 },
    'food-beverage': { families: 1.3, professionals: 1.1, students: 1.0 },
    'gaming': { 'gen-z': 1.4, millennials: 1.2, students: 1.1 },
    'education': { students: 1.3, professionals: 1.2, 'lifelong-learners': 1.1 },
    'entertainment': { 'gen-z': 1.2, millennials: 1.1, general: 1.0 },
  }
  return matches[industry]?.[audience] || 1.0
}

function getClickThroughRate(type: string): number {
  const rates: Record<string, number> = {
    'social-media': 0.03,
    'influencer': 0.05,
    'content': 0.02,
    'email': 0.04,
    'paid-ads': 0.025,
    'events': 0.015,
    'pr': 0.01,
  }
  return rates[type] || 0.02
}

function getConversionRate(type: string, brandAwareness: number): number {
  const baseRates: Record<string, number> = {
    'social-media': 0.03,
    'influencer': 0.04,
    'content': 0.02,
    'email': 0.05,
    'paid-ads': 0.025,
    'events': 0.03,
    'pr': 0.02,
  }
  return (baseRates[type] || 0.02) * (1 + brandAwareness)
}

function getAverageOrderValue(products: Product[]): number {
  if (products.length === 0) return 1000
  const avg = products.reduce((sum, p) => sum + p.sellingPrice, 0) / products.length
  return avg
}

function processDepartments(
  departments: Department[],
  employees: Employee[],
  input: SimulationInput,
  config: SimulationConfig
): DepartmentSimulationResult[] {
  return departments.map(dept => {
    const deptEmployees = employees.filter(e => e.department === dept.type)
    const avgProductivity = deptEmployees.length > 0
      ? deptEmployees.reduce((sum, e) => sum + e.productivity, 0) / deptEmployees.length
      : config.baseProductivity

    const avgSatisfaction = deptEmployees.length > 0
      ? deptEmployees.reduce((sum, e) => sum + e.satisfaction, 0) / deptEmployees.length
      : 70

    const avgLevel = deptEmployees.length > 0
      ? deptEmployees.reduce((sum, e) => sum + e.level, 0) / deptEmployees.length
      : 1

    const salaryExpense = deptEmployees.reduce((sum, e) => sum + e.currentSalary / 365, 0)

    // Department level bonuses
    const levelBonus = 1 + dept.level * config.productivityPerLevel
    const productivityBonus = (avgProductivity * levelBonus * (avgSatisfaction / 100)) - 1

    // Calculate specific bonuses from department upgrades
    const bonuses = dept.bonuses.reduce((acc, b) => {
      acc[b.type] = (acc[b.type] || 0) + b.value
      return acc
    }, {} as Record<string, number>)

    return {
      departmentType: dept.type,
      productivityBonus,
      costReduction: bonuses['cost-reduction'] || 0,
      qualityBonus: bonuses['quality'] || 0,
      innovationBonus: bonuses['innovation'] || 0,
      satisfactionBonus: bonuses['customer-satisfaction'] || 0,
      salaryExpense,
    }
  })
}

function calculateInventoryHoldingCosts(products: Product[], config: SimulationConfig): number {
  return products.reduce((sum, p) => sum + p.inventory * p.productionCost * config.inventoryHoldingCostRate, 0)
}

function calculateCustomerSatisfaction(
  currentSatisfaction: number,
  productResults: ProductSimulationResult[],
  departmentResults: DepartmentSimulationResult[],
  input: SimulationInput,
  config: SimulationConfig
): number {
  if (productResults.length === 0) return Math.max(0, currentSatisfaction - config.satisfactionDecay * 10)

  // Product quality factor
  const avgProductSatisfaction = productResults.reduce((sum, r) => {
    const product = input.products.find(p => p.id === r.productId)
    return sum + (product?.customerSatisfaction || 70) + r.satisfactionChange
  }, 0) / productResults.length

  // Support quality from support department
  const supportDept = departmentResults.find(d => d.departmentType === 'support')
  const supportQuality = supportDept ? 50 + supportDept.satisfactionBonus * 100 + supportDept.productivityBonus * 50 : 50

  // Price fairness
  const avgPriceFairness = productResults.reduce((sum, r) => {
    const product = input.products.find(p => p.id === r.productId)
    if (!product) return sum + 0.5
    const fairPrice = product.productionCost * 2.5
    return sum + Math.max(0, 1 - Math.abs(product.sellingPrice - fairPrice) / fairPrice)
  }, 0) / productResults.length

  const newSatisfaction =
    config.baseSatisfaction +
    (avgPriceFairness - 0.5) * 20 * config.priceSensitivityWeight +
    (avgProductSatisfaction - 70) * config.qualityWeight +
    (supportQuality - 70) * config.supportWeight

  // Smooth transition
  return clamp(
    currentSatisfaction + (newSatisfaction - currentSatisfaction) * config.satisfactionChangeRate,
    0,
    100
  )
}

function calculateReputation(
  currentReputation: number,
  dailyRevenue: number,
  productResults: ProductSimulationResult[],
  customerSatisfaction: number,
  input: SimulationInput,
  config: SimulationConfig
): number {
  const salesCount = productResults.reduce((sum, r) => sum + r.unitsSold, 0)
  const reputationGain = salesCount * config.reputationGainPerSale
  const satisfactionEffect = (customerSatisfaction - 70) * 0.1
  const decay = config.reputationDecay

  return Math.max(0, Math.min(100, currentReputation + reputationGain + satisfactionEffect - decay))
}

function calculateBrandAwareness(
  currentAwareness: number,
  campaignResults: CampaignSimulationResult[],
  input: SimulationInput,
  config: SimulationConfig
): number {
  const marketingBoost = campaignResults.reduce((sum, r) => sum + r.brandAwarenessChange, 0)
  const decay = config.brandAwarenessDecay

  return Math.min(1, Math.max(0, currentAwareness + marketingBoost - decay))
}

function calculateNewCustomers(
  campaignResults: CampaignSimulationResult[],
  brandAwareness: number,
  marketConditions: any,
  config: SimulationConfig
): number {
  const campaignCustomers = campaignResults.reduce((sum, r) => sum + r.newCustomers, 0)
  const organicCustomers = Math.floor(config.baseDailyCustomers * brandAwareness * marketConditions.totalMultiplier * 0.1)
  return campaignCustomers + organicCustomers
}

function checkRandomEvents(
  day: number,
  input: SimulationInput,
  config: SimulationConfig
): BusinessEvent[] {
  // This will be handled by the events engine
  return []
}

function buildFinancialRecords(
  day: number,
  productResults: ProductSimulationResult[],
  campaignResults: CampaignSimulationResult[],
  departmentResults: DepartmentSimulationResult[],
  inventoryHoldingCosts: number,
  input: SimulationInput
): FinancialRecord[] {
  const records: FinancialRecord[] = []

  // Product revenue
  for (const result of productResults) {
    if (result.revenue > 0) {
      records.push({
        id: generateId('fin-'),
        day,
        type: 'revenue',
        category: 'product_sales',
        amount: result.revenue,
        description: `${input.products.find(p => p.id === result.productId)?.name} sales`,
        productId: result.productId,
      })
    }
    if (result.productionCost > 0) {
      records.push({
        id: generateId('fin-'),
        day,
        type: 'expense',
        category: 'production_costs',
        amount: -result.productionCost,
        description: `${input.products.find(p => p.id === result.productId)?.name} production`,
        productId: result.productId,
      })
    }
  }

  // Marketing expenses
  for (const result of campaignResults) {
    if (result.spent > 0) {
      const campaign = input.campaigns.find(c => c.id === result.campaignId)
      records.push({
        id: generateId('fin-'),
        day,
        type: 'expense',
        category: 'marketing',
        amount: -result.spent,
        description: `${campaign?.name} campaign`,
        campaignId: result.campaignId,
      })
    }
  }

  // Salary expenses
  const totalSalaries = departmentResults.reduce((sum, r) => sum + r.salaryExpense, 0)
  if (totalSalaries > 0) {
    records.push({
      id: generateId('fin-'),
      day,
      type: 'expense',
      category: 'salaries',
      amount: -totalSalaries,
      description: 'Daily payroll',
    })
  }

  // Inventory holding costs
  if (inventoryHoldingCosts > 0) {
    records.push({
      id: generateId('fin-'),
      day,
      type: 'expense',
      category: 'inventory_holding',
      amount: -inventoryHoldingCosts,
      description: 'Inventory storage costs',
    })
  }

  return records
}

function buildProductUpdates(
  products: Product[],
  results: ProductSimulationResult[]
): Partial<Product>[] {
  return products.map((product, i) => {
    const result = results[i]
    if (!result) return {}

    const newPerformance = {
      day: product.performance.length + 1,
      unitsSold: result.unitsSold,
      revenue: result.revenue,
      profit: result.grossProfit,
      satisfaction: Math.max(0, Math.min(100, product.customerSatisfaction + result.satisfactionChange)),
    }

    return {
      inventory: result.newInventory,
      demand: result.demand,
      customerSatisfaction: Math.max(0, Math.min(100, product.customerSatisfaction + result.satisfactionChange)),
      performance: [...product.performance, newPerformance].slice(-30), // Keep last 30 days
    }
  })
}

function buildCampaignUpdates(
  campaigns: MarketingCampaign[],
  results: CampaignSimulationResult[]
): Partial<MarketingCampaign>[] {
  return campaigns.map(campaign => {
    const result = results.find(r => r.campaignId === campaign.id)
    if (!result) return {}

    const newPerformance = {
      day: campaign.performance.length + 1,
      impressions: result.impressions,
      clicks: result.clicks,
      conversions: result.conversions,
      costPerAcquisition: result.costPerAcquisition,
      revenueGenerated: result.revenueGenerated,
    }

    const newSpent = campaign.spent + result.spent
    const newStatus = newSpent >= campaign.budget ? 'completed' : campaign.status

    return {
      spent: newSpent,
      status: newStatus,
      performance: [...campaign.performance, newPerformance],
    }
  })
}

function buildEmployeeUpdates(
  employees: Employee[],
  departmentResults: DepartmentSimulationResult[],
  config: SimulationConfig
): Partial<Employee>[] {
  return employees.map(emp => {
    const deptResult = departmentResults.find(d => d.departmentType === emp.department)
    if (!deptResult) return {}

    // Satisfaction changes based on department productivity and workload
    const workloadFactor = deptResult.productivityBonus > 0 ? 1 : 0.95
    const satisfactionChange = (deptResult.satisfactionBonus * 2) - config.satisfactionDecay * workloadFactor

    // Productivity growth with experience
    const productivityGrowth = 0.001 * emp.level

    return {
      satisfaction: clamp(emp.satisfaction + satisfactionChange, 0, 100),
      productivity: emp.productivity + productivityGrowth,
    }
  })
}

function buildDepartmentUpdates(
  departments: Department[],
  results: DepartmentSimulationResult[]
): Partial<Department>[] {
  // Departments don't change daily unless upgraded
  return departments.map(() => ({}))
}

function calculateXPGained(
  dailyRevenue: number,
  netProfit: number,
  newCustomers: number,
  productResults: ProductSimulationResult[],
  config: SimulationConfig
): number {
  const salesCount = productResults.reduce((sum, r) => sum + r.unitsSold, 0)
  let xp = 0
  xp += salesCount * config.xpPerSale
  xp += Math.max(0, netProfit) * config.xpPerProfit
  xp += newCustomers * config.xpPerCustomer
  return Math.floor(xp)
}

function createDailyReport(
  day: number,
  dailyRevenue: number,
  dailyExpenses: number,
  netProfit: number,
  balance: number,
  productResults: ProductSimulationResult[],
  newCustomers: number,
  customerSatisfaction: number,
  reputation: number,
  events: BusinessEvent[],
  input: SimulationInput
): DailyReport {
  const topProducts = productResults
    .map(r => ({
      ...r,
      productName: input.products.find(p => p.id === r.productId)?.name || 'Unknown',
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  const insights = generateInsights(day, dailyRevenue, netProfit, newCustomers, customerSatisfaction, events, input)

  return {
    day,
    date: formatDate(day),
    revenue: dailyRevenue,
    expenses: dailyExpenses,
    profit: netProfit,
    balance,
    productsSold: productResults.reduce((sum, r) => sum + r.unitsSold, 0),
    newCustomers,
    customerSatisfaction,
    reputation,
    events,
    topProducts: topProducts.map(p => ({
      day: p.day,
      unitsSold: p.unitsSold,
      revenue: p.revenue,
      profit: p.grossProfit,
      satisfaction: p.satisfactionChange + 70, // Approximation
    })),
    insights,
  }
}

function generateInsights(
  day: number,
  revenue: number,
  profit: number,
  newCustomers: number,
  satisfaction: number,
  events: BusinessEvent[],
  input: SimulationInput
): string[] {
  const insights: string[] = []

  if (day === 1) {
    insights.push('Welcome to your first day as CEO! Start by creating a product.')
    return insights
  }

  if (profit > 0 && revenue > 0) {
    insights.push(`Profitable day! Net profit: ₹${Math.floor(profit).toLocaleString()}`)
  } else if (profit < 0) {
    insights.push(`Operating at a loss: ₹${Math.floor(Math.abs(profit)).toLocaleString()}. Review expenses.`)
  }

  if (newCustomers > 20) {
    insights.push(`Excellent customer acquisition: ${newCustomers} new customers today!`)
  } else if (newCustomers > 0) {
    insights.push(`Acquired ${newCustomers} new customers.`)
  }

  if (satisfaction >= 90) {
    insights.push('Customer satisfaction is exceptional!')
  } else if (satisfaction < 60) {
    insights.push('Customer satisfaction needs attention.')
  }

  if (events.length > 0) {
    insights.push(`${events.length} business event${events.length > 1 ? 's' : ''} occurred today.`)
  }

  // Product insights
  const topProduct = input.products
    .map(p => ({ product: p, perf: p.performance[p.performance.length - 1] }))
    .filter(p => p.perf)
    .sort((a, b) => (b.perf?.revenue || 0) - (a.perf?.revenue || 0))[0]

  if (topProduct) {
    insights.push(`Top performer: ${topProduct.product.name} (₹${Math.floor(topProduct.perf!.revenue).toLocaleString()} revenue)`)
  }

  return insights.slice(0, 4)
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}