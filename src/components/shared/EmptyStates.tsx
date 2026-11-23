import React from 'react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui/Button'
import { Database, Search, WifiOff, AlertCircle, RotateCw, Clock } from 'lucide-react'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <div className="w-16 h-16 rounded-2xl bg-graphite-800 flex items-center justify-center mb-4 text-slate-600">
        {icon}
      </div>
      <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">{title}</h3>
      <p className="text-body text-slate-400 mb-6 max-w-md">{description}</p>
      {action && (
        <Button onClick={action.onClick} leftIcon={action.icon}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

export function NoDataState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      icon={<Database className="w-8 h-8" />}
      title="No Data Available"
      description="There's nothing here yet. Start by taking an action to generate data."
    />
  )
}

export function NoResultsState({ className, query }: { className?: string; query?: string }) {
  return (
    <EmptyState
      className={className}
      icon={<Search className="w-8 h-8" />}
      title="No Results Found"
      description={query ? `No results for "${query}". Try adjusting your search.` : 'No results match your criteria.'}
    />
  )
}

export function NoConnectionState({ className, onRetry }: { className?: string; onRetry?: () => void }) {
  return (
    <EmptyState
      className={className}
      icon={<WifiOff className="w-8 h-8" />}
      title="Connection Lost"
      description="Unable to connect. Check your connection and try again."
      action={onRetry ? { label: 'Retry', onClick: onRetry, icon: <RotateCw className="w-4 h-4" /> } : undefined}
    />
  )
}

export function ErrorState({ className, message, onRetry }: { className?: string; message?: string; onRetry?: () => void }) {
  return (
    <EmptyState
      className={className}
      icon={<AlertCircle className="w-8 h-8 text-danger-400" />}
      title="Something Went Wrong"
      description={message || 'An unexpected error occurred. Please try again.'}
      action={onRetry ? { label: 'Try Again', onClick: onRetry, icon: <RotateCw className="w-4 h-4" /> } : undefined}
    />
  )
}

export function ComingSoonState({ className, feature }: { className?: string; feature?: string }) {
  return (
    <EmptyState
      className={className}
      icon={<Clock className="w-8 h-8" />}
      title="Coming Soon"
      description={feature ? `"${feature}" is under development. Check back soon!` : 'This feature is under development. Check back soon!'}
    />
  )
}