import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@utils/helpers'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, leftIcon, rightIcon, fullWidth, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950 disabled:opacity-50 disabled:pointer-events-none'

    const variants = {
      primary: 'bg-champagne-400 text-graphite-950 hover:bg-champagne-500 active:bg-champagne-600 shadow-champagne',
      secondary: 'bg-graphite-800 text-ivory-100 border border-graphite-700 hover:bg-graphite-700 active:bg-graphite-600',
      ghost: 'bg-transparent text-ivory-100 hover:bg-graphite-800 active:bg-graphite-700',
      danger: 'bg-danger-500 text-ivory-100 hover:bg-danger-600 active:bg-danger-700',
    }

    const sizes = {
      sm: 'px-3 py-1.5 rounded-md text-body-sm',
      md: 'px-5 py-2.5 rounded-md text-body',
      lg: 'px-6 py-3 rounded-lg text-body-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        {children}
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'