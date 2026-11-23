import { forwardRef, HTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { cn } from '@utils/helpers'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'champagne'
  showLabel?: boolean
  label?: string
  animated?: boolean
  className?: string
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, size = 'md', variant = 'default', showLabel = false, label, animated = true, ...props }, ref) => {
    const percentage = Math.max(0, Math.min(100, (value / max) * 100))

    const sizes = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    }

    const variants = {
      default: 'bg-champagne-400',
      success: 'bg-success-400',
      warning: 'bg-champagne-400',
      danger: 'bg-danger-400',
      champagne: 'bg-champagne-400',
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(showLabel || label) && (
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-body-sm font-medium text-ivory-100">{label || `${Math.round(percentage)}%`}</span>
            {showLabel && <span className="text-body-sm text-slate-400 font-mono">{Math.round(value)}/{Math.round(max)}</span>}
          </div>
        )}
        <div className={cn('relative bg-graphite-800 rounded-full overflow-hidden', sizes[size])}>
          <motion.div
            initial={animated ? { width: 0 } : { width: `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={animated ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              variants[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'champagne'
  showValue?: boolean
  className?: string
}

export function CircularProgress({ value, max = 100, size = 60, strokeWidth = 6, variant = 'default', showValue = true, className }: CircularProgressProps) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const variants = {
    default: 'text-champagne-400',
    success: 'text-success-400',
    warning: 'text-champagne-400',
    danger: 'text-danger-400',
    champagne: 'text-champagne-400',
  }

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-graphite-800"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn('transition-all duration-500 ease-out', variants[variant])}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-heading-sm font-display font-semibold text-ivory-100">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
}