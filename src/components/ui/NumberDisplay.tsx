import { motion } from 'motion/react'
import { cn } from '@utils/helpers'
import { formatCurrency, formatNumber } from '@utils/helpers'

export interface NumberDisplayProps {
  value: number
  format?: 'currency' | 'number' | 'percentage' | 'raw'
  currency?: string
  decimals?: number
  prefix?: string
  suffix?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'default' | 'success' | 'danger' | 'champagne' | 'warning'
  animate?: boolean
  duration?: number
  className?: string
}

export function NumberDisplay({
  value,
  format = 'currency',
  currency = 'INR',
  decimals = 0,
  prefix = '',
  suffix = '',
  size = 'md',
  color = 'default',
  animate = true,
  duration = 1,
  className,
}: NumberDisplayProps) {
  const sizes = {
    sm: 'text-data-sm',
    md: 'text-data',
    lg: 'text-data-lg',
    xl: 'text-4xl font-mono font-semibold',
  }

  const colors = {
    default: 'text-ivory-100',
    success: 'text-success-400',
    danger: 'text-danger-400',
    champagne: 'text-champagne-400',
    warning: 'text-champagne-400',
  }

  const formattedValue = React.useMemo(() => {
    switch (format) {
      case 'currency':
        return formatCurrency(value, currency)
      case 'number':
        return formatNumber(value, decimals)
      case 'percentage':
        return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
      case 'raw':
        return value.toFixed(decimals)
      default:
        return value.toString()
    }
  }, [value, format, currency, decimals])

  const displayValue = `${prefix}${formattedValue}${suffix}`

  if (animate) {
    return (
      <motion.span
        initial={format === 'currency' ? { opacity: 0, y: 10 } : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration, ease: 'easeOut' }}
        className={cn('inline-block font-mono tabular-nums', sizes[size], colors[color], className)}
      >
        {displayValue}
      </motion.span>
    )
  }

  return (
    <span className={cn('font-mono tabular-nums', sizes[size], colors[color], className)}>
      {displayValue}
    </span>
  )
}

export interface NumberChangeIndicatorProps {
  value: number
  previousValue: number
  format?: 'currency' | 'number' | 'percentage'
  currency?: string
  decimals?: number
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export function NumberChangeIndicator({
  value,
  previousValue,
  format = 'currency',
  currency = 'INR',
  decimals = 1,
  size = 'md',
  showIcon = true,
  className,
}: NumberChangeIndicatorProps) {
  const change = value - previousValue
  const percentChange = previousValue !== 0 ? (change / Math.abs(previousValue)) * 100 : 0
  const isPositive = change >= 0

  const formattedChange = React.useMemo(() => {
    switch (format) {
      case 'currency':
        return formatCurrency(Math.abs(change), currency)
      case 'number':
        return formatNumber(Math.abs(change), decimals)
      case 'percentage':
        return `${Math.abs(percentChange).toFixed(decimals)}%`
      default:
        return Math.abs(change).toString()
    }
  }, [change, percentChange, format, currency, decimals])

  const sizes = {
    sm: 'text-caption',
    md: 'text-body-sm',
    lg: 'text-body',
  }

  return (
    <span className={cn('inline-flex items-center gap-1', sizes[size], className)}>
      {showIcon && (
        <span className={cn('flex-shrink-0', isPositive ? 'text-success-400' : 'text-danger-400')}>
          {isPositive ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          )}
        </span>
      )}
      <span className={cn('font-mono tabular-nums', isPositive ? 'text-success-400' : 'text-danger-400')}>
        {isPositive ? '+' : '−'}{formattedChange}
      </span>
    </span>
  )
}

export interface StatCardProps {
  label: string
  value: number
  format?: 'currency' | 'number' | 'percentage'
  currency?: string
  change?: number
  previousValue?: number
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function StatCard({ label, value, format = 'currency', currency = 'INR', change, previousValue, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn('card-hover p-6', className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-caption text-slate-400 uppercase tracking-wider mb-1">{label}</p>
          <NumberDisplay value={value} format={format} currency={currency} size="lg" animate />
        </div>
        {icon && <div className="text-slate-500">{icon}</div>}
      </div>
      {(change !== undefined || previousValue !== undefined) && (
        <NumberChangeIndicator
          value={value}
          previousValue={previousValue ?? value - (change || 0)}
          format={format}
          currency={currency}
          size="sm"
        />
      )}
      {trend && (
        <div className={cn('mt-2 flex items-center gap-1 text-caption', trend === 'up' ? 'text-success-400' : trend === 'down' ? 'text-danger-400' : 'text-slate-400')}>
          <span className="font-mono">
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
          </span>
          <span>Trending {trend}</span>
        </div>
      )}
    </div>
  )
}