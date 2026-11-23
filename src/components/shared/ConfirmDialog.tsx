import { Fragment } from 'react'
import { X, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui/Button'

export interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'primary' | 'warning'
  loading?: boolean
  icon?: React.ReactNode
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  loading,
  icon,
}: ConfirmDialogProps) {
  if (!isOpen) return null

  const variantStyles = {
    primary: { icon: CheckCircle, color: 'text-champagne-400', bg: 'bg-champagne-400/20', btn: 'btn-primary' },
    danger: { icon: Trash2, color: 'text-danger-400', bg: 'bg-danger-500/20', btn: 'btn-danger' },
    warning: { icon: AlertTriangle, color: 'text-champagne-400', bg: 'bg-champagne-400/20', btn: 'btn-primary' },
  }

  const { icon: Icon, color, bg, btn } = variantStyles[variant]

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/80 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-graphite-900 rounded-xl border border-graphite-800 max-w-md w-full shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-start justify-between p-6 border-b border-graphite-800">
            <div className="flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bg, color)}>
                {icon || <Icon className="w-5 h-5" />}
              </div>
              <h2 id="confirm-title" className="text-heading-lg font-display font-semibold text-ivory-100">
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-ivory-100 hover:bg-graphite-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            <p id="confirm-message" className="text-body text-slate-300 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose} disabled={loading}>
                {cancelText}
              </Button>
              <Button
                className={btn}
                onClick={onConfirm}
                disabled={loading}
                loading={loading}
              >
                {confirmText}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export interface AlertDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  variant?: 'info' | 'success' | 'warning' | 'error'
}

export function AlertDialog({ isOpen, onClose, title, message, variant = 'info' }: AlertDialogProps) {
  if (!isOpen) return null

  const variantStyles = {
    info: { icon: 'ℹ️', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
    success: { icon: '✅', color: 'text-success-400', bg: 'bg-success-500/20', border: 'border-success-500/30' },
    warning: { icon: '⚠️', color: 'text-champagne-400', bg: 'bg-champagne-400/20', border: 'border-champagne-400/30' },
    error: { icon: '❌', color: 'text-danger-400', bg: 'bg-danger-500/20', border: 'border-danger-500/30' },
  }

  const { icon, color, bg, border } = variantStyles[variant]

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/80 backdrop-blur-sm"
        onClick={onClose}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        aria-describedby="alert-message"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={cn('bg-graphite-900 rounded-xl border', border, 'max-w-md w-full shadow-xl', bg)}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 p-6 border-b border-graphite-800">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl bg-opacity-20" style={{ backgroundColor: color.replace('text-', '').replace('-400', '-500') }}>
              {icon}
            </div>
            <h2 id="alert-title" className="text-heading-lg font-display font-semibold text-ivory-100">
              {title}
            </h2>
          </div>
          <div className="p-6">
            <p id="alert-message" className="text-body text-slate-300 mb-6">{message}</p>
            <div className="flex justify-end">
              <Button onClick={onClose} className="w-full sm:w-auto">
                OK
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}