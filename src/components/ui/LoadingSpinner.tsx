import { cn } from '@utils/helpers'

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'rounded-full border-graphite-700 border-t-champagne-400 animate-spin',
          sizes[size]
        )}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-body-sm text-slate-400">{text}</p>}
    </div>
  )
}

export interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export function Skeleton({ className, variant = 'text', width = '100%', height }: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-graphite-800',
        variants[variant],
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('card p-6 space-y-4', className)}>
      <Skeleton variant="rectangular" width="40%" height="24px" />
      <Skeleton variant="text" width="60%" height="16px" />
      <Skeleton variant="text" width="80%" height="16px" />
      <Skeleton variant="text" width="100%" height="16px" />
      <div className="flex gap-4 mt-4">
        <Skeleton variant="rectangular" width="32px" height="32px" />
        <Skeleton variant="rectangular" width="32px" height="32px" />
        <Skeleton variant="rectangular" width="32px" height="32px" />
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-graphite-800">
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} variant="text" width="80px" height="14px" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-graphite-800">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="p-4">
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, col) => (
                <Skeleton key={col} variant="text" width={`${60 + Math.random() * 40}px`} height="16px" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('card p-6 h-[300px]', className)}>
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </div>
  )
}