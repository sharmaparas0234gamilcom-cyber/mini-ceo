import { motion } from 'motion/react'
import { ChevronRight, Clock, TrendingUp, AlertTriangle, Target } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Tabs, TabPanel } from '@components/ui/Tabs'
import { Badge } from '@components/ui/Badge'
import { KPICards, LevelProgress, QuickStats } from './KPICards'
import { RevenueChart, BalanceChart, ExpenseBreakdownChart, SatisfactionChart, CustomerAcquisitionChart } from './FinancialCharts'
import { RecentTransactions } from './RecentTransactions'
import { Notifications } from './Notifications'
import { CurrentChallenges } from './CurrentChallenges'
import { useGameStore } from '@store/gameStore'

export function Dashboard() {
  const { isRunning, simulationDay, actions, activeEvents, balance } = useGameStore()

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'financials', label: 'Financials' },
    { id: 'operations', label: 'Operations' },
  ]

  const [activeTab, setActiveTab] = React.useState('overview')

  const handleAdvanceDay = () => {
    const result = actions.advanceDay()
    if (result) {
      // Play sound for day advance
      console.log('Day advanced:', result.dailyReport.day)
    }
  }

  const handleToggleSimulation = () => {
    actions.toggleSimulation()
  }

  return (
    <div className="space-y-6">
      {/* Header with simulation controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-display-md font-display font-bold text-ivory-100">Headquarters</h1>
          <p className="text-body text-slate-400 mt-1">
            Day {simulationDay} • {isRunning ? 'Simulation Running' : 'Simulation Paused'}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-caption font-medium',
            isRunning
              ? 'bg-success-500/20 text-success-400 border border-success-500/30'
              : 'bg-champagne-400/20 text-champagne-400 border border-champagne-400/30'
          )}>
            <span className={cn('w-2 h-2 rounded-full', isRunning ? 'bg-success-400 animate-pulse' : 'bg-champagne-400')} />
            {isRunning ? 'Live' : 'Paused'}
          </div>
          <Button
            variant={isRunning ? 'secondary' : 'primary'}
            onClick={handleToggleSimulation}
            leftIcon={<Clock className="w-4 h-4" />}
          >
            {isRunning ? 'Pause' : 'Resume'}
          </Button>
          <Button onClick={handleAdvanceDay} rightIcon={<ChevronRight className="w-4 h-4" />}>
            Advance Day
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <KPICards />
      </motion.div>

      {/* Level Progress & Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-6"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <LevelProgress />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-1">
          <QuickStats />
        </motion.div>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />

        <TabPanel id="overview" activeTab={activeTab}>
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <RevenueChart />
            <BalanceChart />
          </div>
          <div className="grid lg:grid-cols-3 gap-6 mt-6">
            <SatisfactionChart />
            <CustomerAcquisitionChart />
            <ExpenseBreakdownChart />
          </div>
        </TabPanel>

        <TabPanel id="financials" activeTab={activeTab}>
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <RecentTransactions />
            <ExpenseBreakdownChart />
          </div>
        </TabPanel>

        <TabPanel id="operations" activeTab={activeTab}>
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <Notifications />
            <CurrentChallenges />
          </div>
        </TabPanel>
      </motion.div>

      {/* Active Events Banner */}
      {activeEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 z-40 w-80 md:w-96"
        >
          {activeEvents.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-3 card p-4 shadow-xl border-champagne-400/30 animate-in"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="warning" className="text-caption">
                    {event.severity.toUpperCase()}
                  </Badge>
                  <span className="text-caption text-slate-400">{event.category}</span>
                </div>
                <span className="text-caption text-slate-500">Day {event.day}</span>
              </div>
              <h4 className="font-medium text-ivory-100 mb-2">{event.title}</h4>
              <p className="text-body-sm text-slate-400 mb-3 line-clamp-2">{event.description}</p>
              <Button size="sm" variant="primary" onClick={() => {}}>
                View & Resolve
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

// Need to import React
import React from 'react'