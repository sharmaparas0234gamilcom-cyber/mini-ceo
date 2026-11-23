import type { GameState } from './gameStore'
import type { BusinessEvent, EventTemplate, EventChoice } from '@types/game'
import { EVENT_TEMPLATES, getAvailableEvents } from '@data/events'
import { generateId } from '@utils/helpers'

export function checkAndTriggerEvents(day: number, gameState: GameState): BusinessEvent[] {
  const config = gameState.simulationConfig
  const newEvents: BusinessEvent[] = []

  // Check if we already have max active events
  if (gameState.activeEvents.length >= config.maxActiveEvents) {
    return newEvents
  }

  // Get available event templates for this day
  const availableTemplates = getAvailableEvents(day, gameState)

  // Check each template for trigger
  for (const template of availableTemplates) {
    // Check probability
    if (Math.random() > template.probability) continue

    // Check cooldown - don't trigger same event too frequently
    const recentEvent = gameState.eventHistory
      .filter(e => e.type === template.type && e.category === template.category)
      .sort((a, b) => b.day - a.day)[0]

    if (recentEvent && (day - recentEvent.day) < template.cooldownDays) {
      continue
    }

    // Create event instance
    const event: BusinessEvent = {
      id: generateId('evt-'),
      type: template.type,
      title: template.title,
      description: template.description,
      day,
      severity: template.severity,
      category: template.category,
      choices: template.choices.map(c => ({
        ...c,
        effects: { ...c.effects },
      })),
      triggeredBy: template.id,
      expiresAt: day + 7, // Events expire after 7 days
      isResolved: false,
    }

    newEvents.push(event)
  }

  // Limit to max active events
  return newEvents.slice(0, config.maxActiveEvents - gameState.activeEvents.length)
}

export function applyEventChoice(
  gameState: GameState,
  eventId: string,
  choiceId: string
): Partial<GameState> {
  const event = gameState.activeEvents.find(e => e.id === eventId)
  if (!event) return {}

  const choice = event.choices.find(c => c.id === choiceId)
  if (!choice) return {}

  const updates: Partial<GameState> = {
    balance: gameState.balance,
    reputation: gameState.reputation,
    customerSatisfaction: gameState.customerSatisfaction,
    brandAwareness: (gameState as any).brandAwareness || 0,
    products: [...gameState.products],
    departments: [...gameState.departments],
    employees: [...gameState.employees],
    finances: [...gameState.finances],
  }

  const effects = choice.effects

  // Balance change
  if (effects.balanceChange !== undefined) {
    updates.balance = (updates.balance || 0) + effects.balanceChange
    updates.finances = [
      ...(updates.finances || []),
      {
        id: generateId('fin-'),
        day: gameState.simulationDay,
        type: effects.balanceChange >= 0 ? 'revenue' : 'expense',
        category: 'event',
        amount: effects.balanceChange,
        description: `Event: ${event.title} - ${choice.label}`,
      },
    ]
  }

  // Reputation change
  if (effects.reputationChange !== undefined) {
    updates.reputation = Math.max(0, Math.min(100, (updates.reputation || 0) + effects.reputationChange))
  }

  // Customer satisfaction change
  if (effects.satisfactionChange !== undefined) {
    updates.customerSatisfaction = Math.max(0, Math.min(100, (updates.customerSatisfaction || 0) + effects.satisfactionChange))
  }

  // Brand awareness change
  if (effects.brandAwarenessChange !== undefined) {
    updates.brandAwareness = Math.min(1, Math.max(0, ((updates as any).brandAwareness || 0) + effects.brandAwarenessChange))
  }

  // Product demand changes
  if (effects.demandChange) {
    updates.products = updates.products?.map(p => {
      const change = effects.demandChange![p.id] ?? effects.demandChange!.all ?? 0
      return {
        ...p,
        baseDemand: Math.max(1, Math.round(p.baseDemand * (1 + change))),
        demand: Math.max(1, Math.round(p.demand * (1 + change))),
      }
    }) || []
  }

  // Production cost changes
  if (effects.costChange) {
    updates.products = updates.products?.map(p => {
      const change = effects.costChange![p.id] ?? effects.costChange!.all ?? 0
      return {
        ...p,
        productionCost: Math.max(1, Math.round(p.productionCost * (1 + change))),
      }
    }) || []
  }

  // Productivity changes
  if (effects.productivityChange !== undefined) {
    updates.departments = updates.departments?.map(d => ({
      ...d,
      bonuses: [
        ...d.bonuses,
        { type: 'productivity', value: effects.productivityChange!, description: `Event effect: ${choice.label}` },
      ],
    })) || []
  }

  // Unlock feature
  if (effects.unlockFeature) {
    // Handle feature unlocks (could be stored in settings or separate state)
    console.log(`Feature unlocked: ${effects.unlockFeature}`)
  }

  // Unlock achievement
  if (effects.unlockAchievement) {
    // This would be handled by the achievement system
    console.log(`Achievement unlocked: ${effects.unlockAchievement}`)
  }

  // XP reward
  if (effects.xpReward !== undefined) {
    updates.xp = (gameState.xp || 0) + effects.xpReward
  }

  // Chain event
  if (effects.newEventId) {
    const chainTemplate = EVENT_TEMPLATES.find(t => t.id === effects.newEventId)
    if (chainTemplate) {
      const chainEvent: BusinessEvent = {
        id: generateId('evt-'),
        type: chainTemplate.type,
        title: chainTemplate.title,
        description: chainTemplate.description,
        day: gameState.simulationDay,
        severity: chainTemplate.severity,
        category: chainTemplate.category,
        choices: chainTemplate.choices.map(c => ({ ...c, effects: { ...c.effects } })),
        triggeredBy: chainTemplate.id,
        expiresAt: gameState.simulationDay + 7,
        isResolved: false,
      }
      updates.activeEvents = [...(gameState.activeEvents || []), chainEvent]
    }
  }

  return updates
}

export function getEventDescription(event: BusinessEvent): string {
  return event.description
}

export function getEventChoices(event: BusinessEvent): EventChoice[] {
  return event.choices
}

export function getEventSeverityColor(severity: BusinessEvent['severity']): string {
  switch (severity) {
    case 'low': return 'text-success-400'
    case 'medium': return 'text-champagne-400'
    case 'high': return 'text-orange-400'
    case 'critical': return 'text-danger-400'
  }
}

export function getEventSeverityBg(severity: BusinessEvent['severity']): string {
  switch (severity) {
    case 'low': return 'bg-success-500/10 border-success-500/20'
    case 'medium': return 'bg-champagne-400/10 border-champagne-400/20'
    case 'high': return 'bg-orange-500/10 border-orange-500/20'
    case 'critical': return 'bg-danger-500/10 border-danger-500/20'
  }
}

export function getEventTypeIcon(type: BusinessEvent['type']): string {
  switch (type) {
    case 'opportunity': return 'zap'
    case 'challenge': return 'alert-triangle'
    case 'crisis': return 'alert-octagon'
    case 'milestone': return 'award'
  }
}

export function getEventCategoryColor(category: BusinessEvent['category']): string {
  switch (category) {
    case 'competitor': return 'text-purple-400'
    case 'market': return 'text-blue-400'
    case 'supplier': return 'text-amber-400'
    case 'customer': return 'text-green-400'
    case 'internal': return 'text-indigo-400'
    case 'external': return 'text-teal-400'
    case 'regulatory': return 'text-red-400'
  }
}