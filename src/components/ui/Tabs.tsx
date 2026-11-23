import { forwardRef, ReactNode } from 'react'
import { cn } from '@utils/helpers'

export interface TabItem {
  id: string
  label: string
  icon?: ReactNode
  disabled?: boolean
  badge?: string | number
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (tabId: string) => void
  variant?: 'default' | 'pills' | 'underline'
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, variant = 'default', className }: TabsProps) {
  const variants = {
    default: 'border-b border-graphite-800',
    pills: 'gap-1 bg-graphite-800/50 rounded-lg p-1',
    underline: 'border-b border-graphite-800',
  }

  const tabVariants = {
    default: 'px-4 py-3 text-body-sm font-medium text-slate-400 hover:text-ivory-100 hover:bg-graphite-800/50 border-b-2 border-transparent',
    pills: 'px-4 py-2 text-body-sm font-medium text-slate-400 rounded-md hover:text-ivory-100',
    underline: 'px-4 py-3 text-body-sm font-medium text-slate-400 hover:text-ivory-100 border-b-2 border-transparent',
  }

  const activeVariants = {
    default: 'border-champagne-400 text-champagne-400',
    pills: 'bg-champagne-400 text-graphite-950 shadow-md',
    underline: 'border-champagne-400 text-champagne-400',
  }

  return (
    <div className={cn(variants[variant], className)} role="tablist" aria-label="Tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-trigger`}
          onClick={() => !tab.disabled && onChange(tab.id)}
          disabled={tab.disabled}
          className={cn(
            'flex items-center gap-2 transition-all duration-fast',
            tabVariants[variant],
            activeTab === tab.id && activeVariants[variant],
            tab.disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
          {tab.label}
          {tab.badge && (
            <span className={cn(
              'px-1.5 py-0.5 rounded-full text-caption font-medium',
              variant === 'pills'
                ? activeTab === tab.id
                  ? 'bg-graphite-950 text-champagne-400'
                  : 'bg-graphite-700 text-slate-400'
                : 'bg-champagne-400/20 text-champagne-400'
            )}>
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export interface TabPanelProps {
  id: string
  activeTab: string
  children: ReactNode
  className?: string
}

export function TabPanel({ id, activeTab, children, className }: TabPanelProps) {
  if (activeTab !== id) return null

  return (
    <div
      role="tabpanel"
      id={`${id}-panel`}
      aria-labelledby={`${id}-trigger`}
      className={cn('animate-in', className)}
    >
      {children}
    </div>
  )
}