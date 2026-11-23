import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Target, TrendingUp, AlertTriangle, Clock, Trophy, ChevronDown, CheckCircle } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Progress } from '@components/ui/Progress'
import { Badge } from '@components/ui/Badge'
import { useGameStore } from '@store/gameStore'
import { getAvailableMissions } from '@store/missionsEngine'
import { MISSION_TEMPLATES } from '@data/missions'

const categoryIcons = {
  beginner: Target,
  intermediate: TrendingUp,
  advanced: AlertTriangle,
}

const categoryColors = {
  beginner: 'text-green-400 bg-green-500/20 border-green-500/30',
  intermediate: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  advanced: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
}

const categoryLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export function CurrentChallenges() {
  const { activeMissions, completedMissions, level, xp, simulationDay } = useGameStore()
  const [expandedMission, setExpandedMission] = React.useState<string | null>(null)

  const availableMissions = getAvailableMissions({
    completedMissions,
    activeMissions,
    level,
    xp,
    simulationDay,
    company: { level: 1 },
    products: [],
    campaigns: [],
    employees: [],
    departments: [],
    balance: 0,
    finances: [],
    dailyReports: [],
    eventHistory: [],
    achievements: [],
    settings: {},
    isDemoMode: false,
  } as any)

  const allMissions = [
    ...activeMissions.filter(m => !m.isCompleted),
    ...availableMissions.filter(m => !activeMissions.some(am => am.id === m.id)),
  ]

  if (allMissions.length === 0) {
    return (
      <Card className="h-[400px] flex items-center justify-center">
        <div className="text-center text-slate-500">
          <Trophy className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <p className="text-body">No active missions</p>
          <p className="text-body-sm mt-1">Complete current missions to unlock new ones</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-graphite-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-champagne-400/20 flex items-center justify-center text-champagne-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-heading-md font-display font-semibold text-ivory-100">Missions & Challenges</h3>
        </div>
        <Badge variant="champagne" className="text-caption">
          {allMissions.filter(m => !m.isCompleted).length} Active
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-graphite-800/50 p-2">
        {allMissions.map((mission, index) => {
          const progress = mission.objectives.reduce((acc, obj) => {
            const current = mission.progress[obj.id] || 0
            return acc + Math.min(1, current / obj.target)
          }, 0) / mission.objectives.length

          const isCompleted = mission.isCompleted
          const isActive = activeMissions.some(am => am.id === mission.id)

          const CategoryIcon = categoryIcons[mission.category]

          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={cn('p-4 hover:bg-graphite-800/50 transition-colors', isCompleted && 'opacity-60')}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                    categoryColors[mission.category]
                  )}>
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={cn(
                        'font-medium text-ivory-100 truncate',
                        isCompleted && 'line-through text-slate-500'
                      )}>
                        {mission.title}
                      </h4>
                      <Badge
                        variant="default"
                        className={cn('text-caption', categoryColors[mission.category])}
                      >
                        {categoryLabels[mission.category]}
                      </Badge>
                      {isCompleted && (
                        <Badge variant="success" className="text-caption">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-body-sm text-slate-400 mt-1 truncate">{mission.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={cn('font-mono text-champagne-400', isCompleted ? 'text-success-400' : '')}>
                    {Math.round(progress * 100)}%
                  </span>
                  <button
                    onClick={() => setExpandedMission(expandedMission === mission.id ? null : mission.id)}
                    className="p-1 text-slate-500 hover:text-ivory-100 transition-colors"
                    aria-label={expandedMission === mission.id ? 'Collapse' : 'Expand'}
                  >
                    <ChevronDown className={cn('w-4 h-4', expandedMission === mission.id && 'rotate-180')} />
                  </button>
                </div>
              </div>

              <Progress value={progress * 100} size="md" variant="champagne" className="mb-3" />

              <AnimatePresence>
                {expandedMission === mission.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 space-y-3">
                      {mission.objectives.map((objective, objIndex) => {
                        const currentProgress = mission.progress[objective.id] || 0
                        const objProgress = Math.min(100, (currentProgress / objective.target) * 100)
                        const isObjComplete = currentProgress >= objective.target

                        return (
                          <motion.div
                            key={objective.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: objIndex * 0.05 }}
                            className="flex items-center justify-between gap-3 p-3 bg-graphite-800/50 rounded-lg"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className={cn(
                                'w-6 h-6 rounded flex-shrink-0',
                                isObjComplete ? 'bg-success-500' : 'bg-graphite-700 border border-graphite-600'
                              )}>
                                {isObjComplete && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div>
                                <p className={cn(
                                  'text-body-sm',
                                  isObjComplete ? 'text-slate-400 line-through' : 'text-ivory-100'
                                )}>
                                  {objective.description}
                                </p>
                                <p className="text-caption text-slate-500">
                                  {currentProgress.toLocaleString()} / {objective.target.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <Progress
                              value={objProgress}
                              size="sm"
                              variant={isObjComplete ? 'success' : 'champagne'}
                              className="w-32"
                            />
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: allMissions.length * 0.05 }}
          className="p-4 bg-champagne-400/5 border border-champagne-400/20 rounded-xl"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-champagne-400/20 flex items-center justify-center text-champagne-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-ivory-100">Daily Challenge</h4>
              <p className="text-body-sm text-slate-400">Complete a simulation day with positive profit</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Progress value={simulationDay > 0 ? Math.min(100, (simulationDay % 7) * 14) : 0} size="md" variant="champagne" className="flex-1 mr-4" />
            <Button size="sm" variant="primary">
              Claim Reward
            </Button>
          </div>
        </motion.div>
      </div>
    </Card>
  )
}