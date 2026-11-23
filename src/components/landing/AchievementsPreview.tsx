import { motion } from 'motion/react'
import { Award, Star, TrendingUp, Target, Users, DollarSign, Package, Megaphone, Building2, Calendar, AlertTriangle, Zap } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Badge } from '@components/ui/Badge'
import { ACHIEVEMENT_TEMPLATES } from '@data/achievements'

const featuredAchievements = [
  { id: 'first-sale', icon: ShoppingBag, title: 'First Sale', rarity: 'common', category: 'milestone' },
  { id: 'first-profit', icon: TrendingUp, title: 'First Profit', rarity: 'common', category: 'milestone' },
  { id: 'revenue-100k', icon: DollarSign, title: 'Growing Business', rarity: 'uncommon', category: 'milestone' },
  { id: 'customers-1000', icon: Users, title: 'Community Builder', rarity: 'uncommon', category: 'milestone' },
  { id: 'products-5', icon: Package, title: 'Product Diversifier', rarity: 'common', category: 'mastery' },
  { id: 'campaigns-10', icon: Megaphone, title: 'Marketing Master', rarity: 'common', category: 'mastery' },
  { id: 'employees-10', icon: Building2, title: 'Team Builder', rarity: 'uncommon', category: 'mastery' },
  { id: 'level-10', icon: Star, title: 'Seasoned Founder', rarity: 'uncommon', category: 'milestone' },
  { id: 'days-365', icon: Calendar, title: 'Annual Veteran', rarity: 'rare', category: 'special' },
  { id: 'events-50', icon: AlertTriangle, title: 'Strategic Navigator', rarity: 'uncommon', category: 'mastery' },
  { id: 'perfect-day', icon: Award, title: 'Perfect Day', rarity: 'rare', category: 'special' },
  { id: 'comeback', icon: Zap, title: 'Comeback King', rarity: 'uncommon', category: 'special' },
]

// Need to import ShoppingBag
import { ShoppingBag } from 'lucide-react'

const rarityStyles = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  uncommon: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  rare: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-champagne-400/20 text-champagne-400 border-champagne-400/30',
}

const rarityLabels = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  legendary: 'Legendary',
}

const categoryIcons = {
  milestone: Target,
  mastery: TrendingUp,
  special: Zap,
  secret: Award,
}

export function AchievementsPreview() {
  return (
    <section id="achievements" className="section bg-graphite-900/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-champagne-400 text-body-sm font-medium uppercase tracking-wider">Achievements</span>
          <h2 className="mt-3 text-display-md font-display font-bold text-ivory-100">
            Milestones Worth Celebrating
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            24 unique achievements across 4 rarity tiers. Unlock XP, bragging rights, and special rewards.
          </p>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {featuredAchievements.map((achievement, index) => {
            const template = ACHIEVEMENT_TEMPLATES.find(t => t.id === achievement.id)
            const CategoryIcon = categoryIcons[template?.category || 'milestone']

            return (
              <motion.article
                key={achievement.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="card-hover p-4 group relative"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110',
                      `bg-gradient-to-br ${template?.color || 'from-champagne-400 to-champagne-600'}`
                    )}
                  >
                    <achievement.icon className="w-6 h-6 text-graphite-950" />
                  </div>
                  <Badge variant="default" className={rarityStyles[achievement.rarity]}>
                    {rarityLabels[achievement.rarity]}
                  </Badge>
                </div>

                <h4 className="text-heading-sm font-display font-semibold text-ivory-100 mb-1 group-hover:text-champagne-400 transition-colors">
                  {achievement.title}
                </h4>
                <p className="text-caption text-slate-500 mb-3">{template?.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-graphite-800">
                  <div className="flex items-center gap-1.5 text-caption text-slate-400">
                    <CategoryIcon className="w-3.5 h-3.5" />
                    <span className="capitalize">{template?.category}</span>
                  </div>
                  <span className="text-caption font-mono text-champagne-400">
                    +{template?.xpReward}XP
                  </span>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <StatCard
            label="Total Achievements"
            value={ACHIEVEMENT_TEMPLATES.length}
            format="number"
            icon={<Award className="w-8 h-8" />}
          />
          <StatCard
            label="Rarity Tiers"
            value={4}
            format="number"
            icon={<Star className="w-8 h-8" />}
          />
          <StatCard
            label="Categories"
            value={4}
            format="number"
            icon={<Target className="w-8 h-8" />}
          />
          <StatCard
            label="Max XP from Achievements"
            value={ACHIEVEMENT_TEMPLATES.reduce((sum, a) => sum + a.xpReward, 0)}
            format="number"
            icon={<TrendingUp className="w-8 h-8" />}
          />
        </motion.div>
      </div>
    </section>
  )
}

// Need StatCard import
import { StatCard } from '@components/ui/NumberDisplay'