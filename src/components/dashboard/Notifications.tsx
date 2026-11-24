import React from 'react'
import { motion } from 'motion/react'
import { Bell, CheckCircle, AlertTriangle, TrendingUp, ShoppingBag, Users, DollarSign, X } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { formatDate } from '@utils/helpers'
import { useGameStore } from '@store/gameStore'

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'achievement' | 'event'
  title: string
  message: string
  day: number
  read: boolean
  action?: { label: string; onClick: () => void }
}

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'success',
    title: 'Profitable Day!',
    message: 'Your company earned ₹65,000 net profit yesterday.',
    day: 30,
    read: false,
  },
  {
    id: 'notif-2',
    type: 'achievement',
    title: 'Achievement Unlocked: Month Survivor',
    message: 'Survived 30 days in business! +200 XP',
    day: 30,
    read: false,
  },
  {
    id: 'notif-3',
    type: 'info',
    title: 'Campaign Completed',
    message: 'Launch Campaign - ProjectFlow has finished its run.',
    day: 29,
    read: true,
  },
  {
    id: 'notif-4',
    type: 'warning',
    title: 'Low Inventory Alert',
    message: 'ProjectFlow inventory is running low (45 units remaining).',
    day: 29,
    read: false,
  },
  {
    id: 'notif-5',
    type: 'success',
    title: 'New Employee Hired',
    message: 'Welcome Aisha Patel to Customer Support!',
    day: 28,
    read: true,
  },
  {
    id: 'notif-6',
    type: 'info',
    title: 'Department Upgraded',
    message: 'Product Development upgraded to Level 3. +15% productivity!',
    day: 27,
    read: true,
  },
  {
    id: 'notif-7',
    type: 'event',
    title: 'Business Event: Viral Review',
    message: 'A tech influencer reviewed ProjectFlow. Traffic up 40%!',
    day: 25,
    read: true,
  },
  {
    id: 'notif-8',
    type: 'achievement',
    title: 'Achievement Unlocked: Customer Champion',
    message: 'Served 100 total customers! +200 XP',
    day: 22,
    read: true,
  },
]

export function Notifications() {
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications)
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all')

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const notificationIcons = {
    success: { icon: CheckCircle, color: 'text-success-400', bg: 'bg-success-500/20' },
    warning: { icon: AlertTriangle, color: 'text-champagne-400', bg: 'bg-champagne-400/20' },
    info: { icon: Bell, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    achievement: { icon: TrendingUp, color: 'text-champagne-400', bg: 'bg-champagne-500/20' },
    event: { icon: ShoppingBag, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  }

  return (
    <Card className="h-[500px] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-graphite-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-champagne-400/20 flex items-center justify-center text-champagne-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-heading-md font-display font-semibold text-ivory-100">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-caption text-champagne-400">{unreadCount} unread</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as any)}
            className="bg-graphite-800 border border-graphite-700 text-body-sm text-ivory-100 rounded-md px-3 py-1.5 appearance-none pr-8"
            style={{
              backgroundImage: "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394A3B8%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/%3E</svg>')",
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <option value="all">All</option>
            <option value="unread">Unread Only</option>
          </select>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-graphite-800/50">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Bell className="w-12 h-12 text-slate-600 mb-3" />
            <p className="text-body text-slate-400">{filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}</p>
            <p className="text-body-sm text-slate-500 mt-1">Notifications appear as you play</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const { icon: Icon, color, bg } = notificationIcons[notification.type]

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={cn(
                  'p-4 hover:bg-graphite-800/50 transition-colors flex items-start gap-3',
                  !notification.read && 'bg-champagne-400/5'
                )}
              >
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', bg, color)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={cn('font-medium text-ivory-100', !notification.read && 'font-semibold')}>
                      {notification.title}
                    </h4>
                    <span className="text-caption text-slate-500 flex-shrink-0">
                      Day {notification.day}
                    </span>
                  </div>
                  <p className={cn('text-body-sm mt-1', !notification.read ? 'text-slate-300' : 'text-slate-400')}>
                    {notification.message}
                  </p>
                  {notification.action && (
                    <Button variant="ghost" size="sm" onClick={notification.action.onClick} className="mt-2">
                      {notification.action.label}
                    </Button>
                  )}
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 text-slate-500 hover:text-ivory-100 transition-colors flex-shrink-0"
                    aria-label="Mark as read"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            )
          })
      </div>) 
    </Card>
  )
}
