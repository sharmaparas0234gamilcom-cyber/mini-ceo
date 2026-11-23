import { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { cn } from '@utils/helpers'

export interface SwitchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onChange, label, description, size = 'md', disabled, id, ...props }, ref) => {
    const switchId = id || label?.toLowerCase().replace(/\s+/g, '-')

    const sizes = {
      sm: { track: 'w-8 h-5', thumb: 'w-4 h-4', translate: 'translate-x-3' },
      md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
      lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
    }

    const { track, thumb, translate } = sizes[size]

    return (
      <div className="flex items-start gap-3">
        <button
          ref={ref}
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${switchId}-label` : undefined}
          aria-describedby={description ? `${switchId}-desc` : undefined}
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          className={cn(
            'relative inline-flex flex-shrink-0 rounded-full border-2 transition-all duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-400 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite-950 disabled:opacity-50 disabled:cursor-not-allowed',
            track,
            checked
              ? 'bg-champagne-400 border-champagne-400'
              : 'bg-graphite-800 border-graphite-700'
          )}
          {...props}
        >
          <motion.span
            className={cn(
              'inline-block rounded-full bg-white transition-transform duration-fast ease-out',
              thumb,
              checked ? translate : 'translate-x-0.5'
            )}
            animate={{ scale: checked ? 1 : 1 }}
          />
        </button>
        {(label || description) && (
          <div className="flex-1 min-w-0 pt-1">
            {label && (
              <label id={`${switchId}-label`} className="font-medium text-ivory-100 cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p id={`${switchId}-desc`} className="text-body-sm text-slate-400 mt-0.5">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'