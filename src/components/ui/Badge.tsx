import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@utils/helpers'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'champagne'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot, children, ...props }, ref) => {
    const variants = {
      default: 'bg-graphite-800 text-slate-300 border border-graphite-700',
      success: 'bg-success-500/20 text-success-400 border border-success-500/30',
      danger: 'bg-danger-500/20 text-danger-400 border border-danger-500/30',
      warning: 'bg-champagne-400/20 text-champagne-400 border border-champagne-400/30',
      info: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
      champagne: 'bg-champagne-400/20 text-champagne-400 border border-champagne-400/30',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-caption',
      md: 'px-2.5 py-1 text-caption',
      lg: 'px-3 py-1.5 text-body-sm',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full flex-shrink-0',
              variant === 'success' && 'bg-success-400',
              variant === 'danger' && 'bg-danger-400',
              variant === 'warning' && 'bg-champagne-400',
              variant === 'info' && 'bg-slate-400',
              variant === 'champagne' && 'bg-champagne-400',
              variant === 'default' && 'bg-slate-400'
            )}
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'