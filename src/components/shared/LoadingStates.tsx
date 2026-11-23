import { Skeleton } from '@components/ui/LoadingSpinner'
import { cn } from '@utils/helpers'

export function PageLoading({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[400px]', className)}>
      <div className="w-12 h-12 rounded-full border-4 border-graphite-700 border-t-champagne-400 animate-spin mb-4" />
      <p className="text-body text-slate-400">Loading...</p>
    </div>
  )
}

export function ContentLoading({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      <Skeleton variant="rectangular" width="40%" height="32px" />
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

export function CardGridLoading({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card p-6 space-y-4">
          <Skeleton variant="rectangular" width="60px" height="60px" />
          <Skeleton variant="text" width="80%" height="24px" />
          <Skeleton variant="text" width="60%" height="16px" />
          <Skeleton variant="text" width="40%" height="16px" />
          <div className="grid grid-cols-3 gap-2">
            <Skeleton variant="rectangular" width="100%" height="40px" />
            <Skeleton variant="rectangular" width="100%" height="40px" />
            <Skeleton variant="rectangular" width="100%" height="40px" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function TableLoading({ rows = 5, columns = 4, className }: { rows?: number; columns?: number; className?: string }) {
  return (
    <div className={cn('card overflow-hidden', className)}>
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

export function ChartLoading({ className, height = 300 }: { className?: string; height?: number }) {
  return (
    <div className={cn('card p-6', className)} style={{ height }}>
      <Skeleton variant="rectangular" width="100%" height="100%" />
    </div>
  )
}

export function ListLoading({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-graphite-800/50 rounded-xl">
          <Skeleton variant="circular" width="48px" height="48px" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" height="20px" />
            <Skeleton variant="text" width="60%" height="14px" />
          </div>
          <Skeleton variant="rectangular" width="80px" height="32px" />
        </div>
      ))}
    </div>
  )
}