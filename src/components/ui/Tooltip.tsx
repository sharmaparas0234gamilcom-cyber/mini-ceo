import React, { forwardRef, ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@utils/helpers'

export interface TooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
}

export function Tooltip({ content, children, position = 'top', delay = 200, className }: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()

  const show = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay)
  }

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-champagne-400',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-champagne-400',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-champagne-400',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-champagne-400',
  }

  return (
    <div className="relative inline-block" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 4 : position === 'bottom' ? -4 : 0, x: position === 'left' ? 4 : position === 'right' ? -4 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute z-50 px-3 py-2 text-caption font-medium text-graphite-950 bg-champagne-400 rounded-md shadow-lg whitespace-nowrap',
              positions[position],
              className
            )}
            role="tooltip"
          >
            {content}
            <div className={cn('absolute w-0 h-0 border-4 border-transparent', arrows[position])} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}