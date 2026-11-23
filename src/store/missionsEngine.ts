import type { GameState } from './gameStore'
import type { Mission, Achievement, MissionObjective } from '@types/game'
import { MISSION_TEMPLATES, getMissionTemplate, getMissionsByCategory } from '@data/missions'
import { ACHIEVEMENT_TEMPLATES, getAchievementTemplate } from '@data/achievements'

export function checkMissionProgress(
  activeMissions: Mission[],
  simulationOutput: any,
  gameState: GameState
): Mission[] {
  return activeMissions.map(mission => {
    if (mission.isCompleted) return mission

    const updatedProgress = { ...mission.progress }
    let allComplete = true

    for (const objective of mission.objectives) {
      const currentProgress = updatedProgress[objective.id] || 0
      let newProgress = currentProgress

      switch (objective.type) {
        case 'create_product':
          newProgress = gameState.products.length
          break
        case 'set_price':
          // Count price changes - would need to track this separately
          newProgress = currentProgress
          break
        case 'launch_campaign':
          newProgress = gameState.campaigns.filter(c => c.status !== 'draft').length
          break
        case 'hire_employee':
          newProgress = gameState.employees.length
          break
        case 'reach_revenue':
          // Check if any day had this revenue
          const maxDailyRevenue = Math.max(...gameState.dailyReports.map(r => r.revenue), 0)
          newProgress = maxDailyRevenue
          break
        case 'reach_profit':
          const maxDailyProfit = Math.max(...gameState.dailyReports.map(r => r.profit), 0)
          newProgress = maxDailyProfit
          break
        case 'reach_satisfaction':
          // Check consecutive days with high satisfaction
          const recentReports = gameState.dailyReports.slice(-10)
          const consecutiveHigh = recentReports.filter(r => r.customerSatisfaction >= (objective.target || 90)).length
          newProgress = consecutiveHigh
          break
        case 'reach_customers':
          const maxDailyCustomers = Math.max(...gameState.dailyReports.map(r => r.newCustomers), 0)
          newProgress = maxDailyCustomers
          break
        case 'upgrade_department':
          const upgradedDepts = gameState.departments.filter(d => d.level > 0).length
          newProgress = upgradedDepts
          break
        case 'complete_day':
          newProgress = gameState.simulationDay
          break
        case 'handle_event':
          newProgress = gameState.eventHistory.filter(e => e.isResolved).length
          break
        case 'reach_balance':
          newProgress = gameState.company?.valuation || 0
          break
      }

      updatedProgress[objective.id] = newProgress
      if (newProgress < objective.target) {
        allComplete = false
      }
    }

    return {
      ...mission,
      progress: updatedProgress,
      isCompleted: allComplete,
      completedAt: allComplete ? Date.now() : undefined,
    }
  })
}

export function checkAchievementProgress(
  achievements: Achievement[],
  simulationOutput: any,
  gameState: GameState
): Partial<Achievement>[] {
  return achievements.map(achievement => {
    if (achievement.isUnlocked) return {}

    const template = getAchievementTemplate(achievement.id)
    if (!template) return {}

    let progress = 0
    let maxProgress = achievement.maxProgress || 1
    let shouldUnlock = false

    switch (template.condition.type) {
      case 'first_sale':
        progress = gameState.dailyReports.some(r => r.revenue > 0) ? 1 : 0
        maxProgress = 1
        shouldUnlock = progress >= 1
        break

      case 'first_profit':
        progress = gameState.dailyReports.some(r => r.profit > 0) ? 1 : 0
        maxProgress = 1
        shouldUnlock = progress >= 1
        break

      case 'revenue_milestone':
        const totalRevenue = gameState.dailyReports.reduce((sum, r) => sum + r.revenue, 0)
        progress = totalRevenue
        maxProgress = template.condition.value || 10000
        shouldUnlock = progress >= maxProgress
        break

      case 'profit_milestone':
        const totalProfit = gameState.dailyReports.reduce((sum, r) => sum + r.profit, 0)
        progress = totalProfit
        maxProgress = template.condition.value || 50000
        shouldUnlock = progress >= maxProgress
        break

      case 'customers_milestone':
        const totalCustomers = gameState.dailyReports.reduce((sum, r) => sum + r.newCustomers, 0)
        progress = totalCustomers
        maxProgress = template.condition.value || 100
        shouldUnlock = progress >= maxProgress
        break

      case 'products_count':
        progress = gameState.products.length
        maxProgress = template.condition.value || 5
        shouldUnlock = progress >= maxProgress
        break

      case 'campaigns_count':
        progress = gameState.campaigns.filter(c => c.status !== 'draft').length
        maxProgress = template.condition.value || 10
        shouldUnlock = progress >= maxProgress
        break

      case 'employees_count':
        progress = gameState.employees.length
        maxProgress = template.condition.value || 10
        shouldUnlock = progress >= maxProgress
        break

      case 'level_reached':
        progress = gameState.level
        maxProgress = template.condition.value || 5
        shouldUnlock = progress >= maxProgress
        break

      case 'days_survived':
        progress = gameState.simulationDay
        maxProgress = template.condition.value || 30
        shouldUnlock = progress >= maxProgress
        break

      case 'events_resolved':
        progress = gameState.eventHistory.filter(e => e.isResolved).length
        maxProgress = template.condition.value || 10
        shouldUnlock = progress >= maxProgress
        break

      case 'perfect_day':
        const perfectDay = gameState.dailyReports.some(r => r.customerSatisfaction >= 100)
        progress = perfectDay ? 1 : 0
        maxProgress = 1
        shouldUnlock = progress >= 1
        break

      case 'comeback':
        // Check if balance was negative and is now positive
        const hadNegativeBalance = gameState.finances.some(f => f.amount < 0 && f.type === 'expense')
        const hasPositiveBalance = gameState.balance > 0
        progress = (hadNegativeBalance && hasPositiveBalance) ? 1 : 0
        maxProgress = 1
        shouldUnlock = progress >= 1
        break
    }

    if (shouldUnlock) {
      return {
        isUnlocked: true,
        unlockedAt: Date.now(),
        progress,
        maxProgress,
      }
    }

    return {
      progress,
      maxProgress,
    }
  })
}

export function getAvailableMissions(gameState: GameState): Mission[] {
  const completedIds = new Set(gameState.completedMissions)
  const activeIds = new Set(gameState.activeMissions.map(m => m.id))

  return MISSION_TEMPLATES
    .filter(template => {
      if (completedIds.has(template.id) || activeIds.has(template.id)) return false

      // Check prerequisites
      if (template.prerequisiteMissions) {
        return template.prerequisiteMissions.every(pm => completedIds.has(pm))
      }

      // Beginner missions always available
      if (template.category === 'beginner') return true

      // Intermediate missions available at level 3+
      if (template.category === 'intermediate' && gameState.level >= 3) return true

      // Advanced missions available at level 8+
      if (template.category === 'advanced' && gameState.level >= 8) return true

      return false
    })
    .map(template => ({
      ...template,
      isCompleted: false,
      isUnlocked: true,
      progress: Object.fromEntries(template.objectives.map(o => [o.id, 0])),
    }))
}

export function initializeMissions(gameState: GameState): Mission[] {
  // Start with beginner missions
  const beginnerTemplates = getMissionsByCategory('beginner')
  return beginnerTemplates.map(template => ({
    ...template,
    isCompleted: false,
    isUnlocked: true,
    progress: Object.fromEntries(template.objectives.map(o => [o.id, 0])),
  }))
}

export function getMissionProgress(mission: Mission): { completed: number; total: number; percentage: number } {
  let completed = 0
  let total = mission.objectives.length

  for (const objective of mission.objectives) {
    const progress = mission.progress[objective.id] || 0
    if (progress >= objective.target) completed++
  }

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}

export function formatMissionObjective(objective: MissionObjective, progress: number): string {
  const current = Math.min(progress, objective.target)
  return `${objective.description} (${current}/${objective.target})`
}