import { ReactNode } from 'react'
import { Header } from './Header'
import { cn } from '@utils/helpers'

export interface PageShellProps {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  actions?: ReactNode
}

export function PageShell({ children, className, title, description, actions }: PageShellProps) {
  return (
    <div className={cn('min-h-screen bg-graphite-950', className)}>
      <Header />
      <main className="pt-16 lg:pt-20 pb-12" id="main-content">
        <div className="container">
          {(title || description || actions) && (
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                {title && <h1 className="text-display-md font-display font-semibold text-ivory-100">{title}</h1>}
                {description && <p className="mt-1 text-body text-slate-400">{description}</p>}
              </div>
              {actions && <div className="flex-shrink-0">{actions}</div>}
            </div>
          )}
          {children}
        </div>
      </main>
      <footer className="border-t border-graphite-800 bg-graphite-900/50">
        <div className="container py-6">
          <p className="text-caption text-slate-500 text-center">
            MINI CEO — Build. Manage. Conquer. {' '}
            <span className="text-champagne-400">Student Technology Challenge</span>
          </p>
        </div>
      </footer>
    </div>
  )
}