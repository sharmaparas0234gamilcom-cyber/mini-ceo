import { motion } from 'motion/react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { useGameStore } from '@store/gameStore'
import { formatCurrency, formatNumber } from '@utils/helpers'

const CHART_COLORS = {
  revenue: '#3B82F6',
  profit: '#22C55E',
  expenses: '#EF4444',
  balance: '#C9B896',
  satisfaction: '#F59E0B',
  customers: '#8B5CF6',
}

const CHART_GRID_STROKE = '#1E242A'
const CHART_TEXT_COLOR = '#94A3B8'
const TOOLTIP_BG = '#14181C'
const TOOLTIP_BORDER = '#2A323C'

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-graphite-900 border border-graphite-800 rounded-lg p-3 shadow-xl min-w-[180px]"
      style={{ backgroundColor: TOOLTIP_BG, borderColor: TOOLTIP_BORDER }}
    >
      <p className="text-caption text-slate-400 mb-2 font-mono">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center justify-between gap-2 text-body-sm">
          <span className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}
          </span>
          <span className="font-mono font-medium text-ivory-100">
            {entry.value >= 1000 ? formatCurrency(entry.value) : formatNumber(entry.value)}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

export function RevenueChart() {
  const { dailyReports } = useGameStore()

  const data = dailyReports.slice(-30).map((report, index) => ({
    day: `Day ${report.day}`,
    dayNum: report.day,
    revenue: report.revenue,
    profit: report.profit,
    expenses: report.expenses,
  }))

  if (data.length === 0) {
    return (
      <Card className="p-8 h-[300px] flex items-center justify-center">
        <div className="text-center text-slate-500">
          <p className="text-body">No revenue data yet</p>
          <p className="text-body-sm mt-1">Run the simulation to see charts</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-[350px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-md font-display font-semibold text-ivory-100">Revenue & Profit Trend</h3>
        <Legend
          iconType="line"
          layout="horizontal"
          payload={[
            { value: 'Revenue', color: CHART_COLORS.revenue },
            { value: 'Profit', color: CHART_COLORS.profit },
            { value: 'Expenses', color: CHART_COLORS.expenses },
          ]}
          wrapperStyle={{ paddingTop: 8 }}
        />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: CHART_TEXT_COLOR, fontSize: 11 }}
            axisLine={{ stroke: CHART_GRID_STROKE }}
            tickLine={false}
            interval={data.length > 14 ? 'preserveStartEnd' : 0}
          />
          <YAxis
            tick={{ fill: CHART_TEXT_COLOR, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatCurrency(value).replace('₹', '₹')}
            orientation="left"
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke={CHART_COLORS.revenue}
            fill={CHART_COLORS.revenue}
            fillOpacity={0.1}
            strokeWidth={2}
            activeDot={{ r: 4, strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke={CHART_COLORS.profit}
            fill={CHART_COLORS.profit}
            fillOpacity={0.1}
            strokeWidth={2}
            activeDot={{ r: 4, strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke={CHART_COLORS.expenses}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function BalanceChart() {
  const { dailyReports } = useGameStore()

  const data = dailyReports.slice(-30).map(report => ({
    day: `Day ${report.day}`,
    balance: report.balance,
  }))

  if (data.length === 0) {
    return (
      <Card className="p-8 h-[300px] flex items-center justify-center">
        <div className="text-center text-slate-500">
          <p className="text-body">No balance data yet</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-[300px]">
      <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Cash Balance</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.balance} stopOpacity={0.3} />
              <stop offset="100%" stopColor={CHART_COLORS.balance} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: CHART_TEXT_COLOR, fontSize: 11 }}
            axisLine={{ stroke: CHART_GRID_STROKE }}
            tickLine={false}
            interval={data.length > 14 ? 'preserveStartEnd' : 0}
          />
          <YAxis
            tick={{ fill: CHART_TEXT_COLOR, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatCurrency(value).replace('₹', '₹')}
            orientation="left"
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke={CHART_COLORS.balance}
            fill="url(#balanceGradient)"
            strokeWidth={2}
            activeDot={{ r: 4, strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function ExpenseBreakdownChart() {
  const { dailyReports, finances } = useGameStore()

  // Calculate expense categories from recent finances
  const recentFinances = finances.slice(-100)
  const expenseCategories = recentFinances
    .filter(f => f.type === 'expense')
    .reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + Math.abs(f.amount)
      return acc
    }, {} as Record<string, number>)

  const data = Object.entries(expenseCategories)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)

  const COLORS = ['#EF4444', '#F97316', '#F59E0B', '#8B5CF6', '#3B82F6', '#06B6D4']

  if (data.length === 0) {
    return (
      <Card className="p-8 h-[300px] flex items-center justify-center">
        <div className="text-center text-slate-500">
          <p className="text-body">No expense data yet</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-[300px]">
      <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip />}
            formatter={(value: number) => [formatCurrency(value), 'Expenses']}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            wrapperStyle={{ paddingRight: 20 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function SatisfactionChart() {
  const { dailyReports } = useGameStore()

  const data = dailyReports.slice(-30).map(report => ({
    day: `Day ${report.day}`,
    satisfaction: report.customerSatisfaction,
    reputation: report.reputation,
  }))

  if (data.length === 0) {
    return (
      <Card className="p-8 h-[250px] flex items-center justify-center">
        <div className="text-center text-slate-500">
          <p className="text-body">No satisfaction data yet</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-[280px]">
      <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Satisfaction & Reputation</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: CHART_TEXT_COLOR, fontSize: 11 }}
            axisLine={{ stroke: CHART_GRID_STROKE }}
            tickLine={false}
            interval={data.length > 14 ? 'preserveStartEnd' : 0}
          />
          <YAxis
            tick={{ fill: CHART_TEXT_COLOR, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            orientation="left"
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="satisfaction"
            stroke={CHART_COLORS.satisfaction}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5, strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="reputation"
            stroke={CHART_COLORS.customers}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
            activeDot={{ r: 5, strokeWidth: 2 }}
          />
          <Legend
            layout="horizontal"
            payload={[
              { value: 'Satisfaction', color: CHART_COLORS.satisfaction },
              { value: 'Reputation', color: CHART_COLORS.customers },
            ]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

export function CustomerAcquisitionChart() {
  const { dailyReports } = useGameStore()

  const data = dailyReports.slice(-30).map(report => ({
    day: `Day ${report.day}`,
    newCustomers: report.newCustomers,
    totalCustomers: dailyReports.slice(0, dailyReports.indexOf(report) + 1).reduce((sum, r) => sum + r.newCustomers, 0),
  }))

  if (data.length === 0) {
    return (
      <Card className="p-8 h-[250px] flex items-center justify-center">
        <div className="text-center text-slate-500">
          <p className="text-body">No customer data yet</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 h-[280px]">
      <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4">Customer Acquisition</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: CHART_TEXT_COLOR, fontSize: 11 }}
            axisLine={{ stroke: CHART_GRID_STROKE }}
            tickLine={false}
            interval={data.length > 14 ? 'preserveStartEnd' : 0}
          />
          <YAxis
            tick={{ fill: CHART_TEXT_COLOR, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            orientation="left"
            width={50}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="newCustomers"
            fill={CHART_COLORS.customers}
            radius={[4, 4, 0, 0]}
            maxBarWidth={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}