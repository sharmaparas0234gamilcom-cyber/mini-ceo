import { motion } from 'motion/react'
import { TrendingUp, TrendingDown, ShoppingBag, DollarSign, Users, CreditCard, Package, Megaphone } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { formatCurrency, formatDate } from '@utils/helpers'
import { useGameStore } from '@store/gameStore'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  product_sales: ShoppingBag,
  marketing: Megaphone,
  salaries: Users,
  production_costs: Package,
  initial_capital: DollarSign,
  investment: TrendingUp,
  expense: TrendingDown,
  revenue: TrendingUp,
  inventory_holding: Package,
}

const categoryLabels: Record<string, string> = {
  product_sales: 'Product Sales',
  marketing: 'Marketing',
  salaries: 'Salaries',
  production_costs: 'Production',
  initial_capital: 'Initial Capital',
  investment: 'Investment',
  expense: 'Expense',
  revenue: 'Revenue',
  inventory_holding: 'Inventory Holding',
}

export function RecentTransactions() {
  const { finances, simulationDay } = useGameStore()

  const recentFinances = finances
    .slice()
    .reverse()
    .slice(0, 20)

  if (recentFinances.length === 0) {
    return (
      <Card className="p-8 h-[400px] flex items-center justify-center">
        <div className="text-center text-slate-500">
          <p className="text-body">No transactions yet</p>
          <p className="text-body-sm mt-1">Advance the simulation to see activity</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-graphite-800">
        <h3 className="text-heading-md font-display font-semibold text-ivory-100">Recent Transactions</h3>
        <span className="text-caption text-slate-400">{recentFinances.length} transactions</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="divide-y divide-graphite-800/50">
          {recentFinances.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="py-3 px-2 hover:bg-graphite-800/50 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                    transaction.amount >= 0
                      ? 'bg-success-500/20 text-success-400'
                      : 'bg-danger-500/20 text-danger-400'
                  )}>
                    {(() => {
                      const Icon = categoryIcons[transaction.category]
                      return Icon ? <Icon className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />
                    })()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-ivory-100 truncate">
                      {categoryLabels[transaction.category] || transaction.category}
                    </p>
                    <p className="text-caption text-slate-500">
                      Day {transaction.day} • {formatDate(transaction.day)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right flex-shrink-0">
                  <span className={cn(
                    'font-mono font-semibold',
                    transaction.amount >= 0 ? 'text-success-400' : 'text-danger-400'
                  )}>
                    {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </span>
                  {transaction.description && (
                    <span className="text-caption text-slate-500 hidden sm:block max-w-[150px] truncate">
                      {transaction.description}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}