import { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RotateCw, Home } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui/Button'
import { Card } from '@components/ui/Card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo })
    console.error('Error caught by boundary:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-graphite-950">
          <Card className="max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-danger-500/20 flex items-center justify-center mx-auto mb-4 text-danger-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">Something went wrong</h2>
            <p className="text-body text-slate-400 mb-6">
              An unexpected error occurred. Our team has been notified.
            </p>
            {this.state.error && (
              <details className="text-left mb-4 p-4 bg-graphite-800 rounded-lg text-caption text-slate-400">
                <summary className="cursor-pointer font-medium text-ivory-100 mb-2">Error Details</summary>
                <pre className="whitespace-pre-wrap font-mono">{this.state.error.toString()}</pre>
                {this.state.errorInfo?.componentStack && (
                  <pre className="whitespace-pre-wrap font-mono mt-2">{this.state.errorInfo.componentStack}</pre>
                )}
              </details>
            )}
            <div className="flex gap-3">
              <Button onClick={this.handleReset} leftIcon={<RotateCw className="w-4 h-4" />} className="flex-1">
                Try Again
              </Button>
              <Button variant="secondary" onClick={() => window.location.href = '/'} leftIcon={<Home className="w-4 h-4" />} className="flex-1">
                Go Home
              </Button>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback((err: Error) => {
    setError(err)
    console.error('Error:', err)
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, clearError }
}

// Need to import React
import React from 'react'