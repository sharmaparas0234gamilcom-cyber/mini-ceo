import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu, X, Building2, TrendingUp, Users, Award, MapPin, Settings, LogOut, ChevronDown } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui'
import { useGameStore } from '@store/gameStore'

export function Header() {
  const location = useLocation()
  const { founder, company, isDemoMode, actions } = useGameStore()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Building2 },
    { path: '/management', label: 'Management', icon: TrendingUp },
    { path: '/city', label: 'Business City', icon: MapPin },
    { path: '/leaderboard', label: 'Leaderboard', icon: Award },
  ]

  const isLanding = location.pathname === '/'
  const isOnboarding = location.pathname === '/onboarding'

  if (isLanding || isOnboarding) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 bg-graphite-950/95 backdrop-blur-xl border-b border-graphite-800">
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2" aria-label="MINI CEO Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-graphite-950" />
            </div>
            <span className="text-heading-lg font-display font-bold text-ivory-100 hidden sm:block">MINI CEO</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="#features" className="text-body-sm text-slate-400 hover:text-ivory-100 transition-colors">Features</Link>
            <Link to="#how-it-works" className="text-body-sm text-slate-400 hover:text-ivory-100 transition-colors">How It Works</Link>
            <Link to="#learn" className="text-body-sm text-slate-400 hover:text-ivory-100 transition-colors">Learn</Link>
            <Link to="#challenges" className="text-body-sm text-slate-400 hover:text-ivory-100 transition-colors">Challenges</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/onboarding">
              <Button size="lg">Start Your Company</Button>
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-graphite-950/95 backdrop-blur-xl border-b border-graphite-800">
      <div className="container flex items-center justify-between h-16 lg:h-20">
        <Link to="/dashboard" className="flex items-center gap-2" aria-label="MINI CEO Dashboard">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-graphite-950" />
          </div>
          <span className="text-heading-lg font-display font-bold text-ivory-100">MINI CEO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-body-sm font-medium transition-all duration-fast',
                location.pathname === item.path
                  ? 'bg-graphite-800 text-champagne-400'
                  : 'text-slate-400 hover:text-ivory-100 hover:bg-graphite-800/50'
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Company Info */}
          {company && (
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-graphite-800/50 border border-graphite-800">
              <div className="text-right">
                <p className="text-caption text-slate-400">Valuation</p>
                <p className="text-body-sm font-mono font-semibold text-champagne-400">
                  ₹{company.valuation.toLocaleString()}
                </p>
              </div>
              <div className="w-px h-8 bg-graphite-700" />
              <div className="text-right">
                <p className="text-caption text-slate-400">Day</p>
                <p className="text-body-sm font-mono font-semibold text-ivory-100">
                  {useGameStore.getState().simulationDay}
                </p>
              </div>
            </div>
          )}

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-graphite-800 transition-colors"
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <Avatar avatarId={founder?.avatarId} size="sm" />
              <span className="hidden sm:block text-body-sm font-medium text-ivory-100">
                {founder?.name || 'Founder'}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-full mt-2 w-56 bg-graphite-900 rounded-xl border border-graphite-800 shadow-xl overflow-hidden py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-graphite-800">
                  <p className="text-body-sm font-medium text-ivory-100">{founder?.name}</p>
                  <p className="text-caption text-slate-400">{company?.name}</p>
                  <p className="text-caption text-champagne-400">Level {useGameStore.getState().level} Founder</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-body-sm text-slate-400 hover:text-ivory-100 hover:bg-graphite-800/50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-body-sm text-slate-400 hover:text-ivory-100 hover:bg-graphite-800/50"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <hr className="my-2 border-graphite-800" />
                {isDemoMode && (
                  <button
                    onClick={() => { actions.setDemoMode(false); setUserMenuOpen(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-body-sm text-slate-400 hover:text-ivory-100 hover:bg-graphite-800/50"
                  >
                    <LogOut className="w-4 h-4" />
                    Exit Demo Mode
                  </button>
                )}
                <button
                  onClick={() => { actions.resetGame(); setUserMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-body-sm text-danger-400 hover:bg-graphite-800/50"
                >
                  <LogOut className="w-4 h-4" />
                  Reset Game
                </button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-graphite-800 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-ivory-100" /> : <Menu className="w-6 h-6 text-ivory-100" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-graphite-950 border-t border-graphite-800 overflow-hidden"
        >
          <nav className="p-4 space-y-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-body font-medium transition-colors',
                  location.pathname === item.path
                    ? 'bg-graphite-800 text-champagne-400'
                    : 'text-slate-400 hover:text-ivory-100 hover:bg-graphite-800/50'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  )
}

// Need to import React
import React from 'react'
import { Avatar } from '@components/ui'