import { motion, AnimatePresence } from 'motion/react'
import { Plus, Trash2, Edit, Eye, Package, DollarSign, TrendingUp, AlertTriangle, ChevronRight } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Badge } from '@components/ui/Badge'
import { NumberDisplay, NumberChangeIndicator } from '@components/ui/NumberDisplay'
import { formatCurrency, formatNumber } from '@utils/helpers'
import { useGameStore } from '@store/gameStore'

export function ProductList() {
  const { products, actions } = useGameStore()
  const [editingProduct, setEditingProduct] = React.useState<string | null>(null)
  const [showForm, setShowForm] = React.useState(false)
  const [deletingProduct, setDeletingProduct] = React.useState<string | null>(null)

  const handleDelete = (id: string) => {
    setDeletingProduct(id)
  }

  const confirmDelete = (id: string) => {
    actions.deleteProduct(id)
    setDeletingProduct(null)
  }

  const getDemandTrend = (product: any) => {
    if (product.performance.length < 2) return 'neutral'
    const latest = product.performance[product.performance.length - 1]
    const previous = product.performance[product.performance.length - 2]
    if (latest.unitsSold > previous.unitsSold) return 'up'
    if (latest.unitsSold < previous.unitsSold) return 'down'
    return 'neutral'
  }

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 80) return 'success'
    if (satisfaction >= 60) return 'warning'
    return 'danger'
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Package className="w-16 h-16 text-slate-600 mb-4" />
        <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">No Products Yet</h3>
        <p className="text-body text-slate-400 mb-6 max-w-md">
          Create your first product to start generating revenue. Define pricing, costs, and watch market demand respond.
        </p>
        <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Create First Product
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-heading-lg font-display font-semibold text-ivory-100">Product Portfolio</h2>
          <p className="text-body-sm text-slate-400">{products.length} product{products.length !== 1 ? 's' : ''} active</p>
        </div>
        <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-4 h-4" />}>
          New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="card-hover relative"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-graphite-800 flex items-center justify-center">
                    <Package className="w-6 h-6 text-champagne-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ivory-100">{product.name}</h3>
                    <span className="text-caption text-slate-400 capitalize">{product.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product.id)} aria-label="Edit product">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(product.id)} aria-label="Delete product">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <p className="text-body-sm text-slate-400 mb-4 line-clamp-2">{product.description}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-graphite-800/50 rounded-lg p-3">
                  <p className="text-caption text-slate-400">Price</p>
                  <NumberDisplay value={product.sellingPrice} format="currency" size="md" color="champagne" className="block" />
                </div>
                <div className="bg-graphite-800/50 rounded-lg p-3">
                  <p className="text-caption text-slate-400">Cost</p>
                  <NumberDisplay value={product.productionCost} format="currency" size="md" color="danger" className="block" />
                </div>
                <div className="bg-graphite-800/50 rounded-lg p-3">
                  <p className="text-caption text-slate-400">Margin</p>
                  <NumberDisplay value={product.sellingPrice - product.productionCost} format="currency" size="md" color="success" className="block" />
                </div>
                <div className="bg-graphite-800/50 rounded-lg p-3">
                  <p className="text-caption text-slate-400">Inventory</p>
                  <NumberDisplay value={product.inventory} format="number" size="md" color={product.inventory < 20 ? 'danger' : 'default'} className="block" />
                </div>
              </div>

              {/* Performance */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <span className="text-caption text-slate-400">Demand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <NumberDisplay value={product.demand} format="number" size="sm" color="default" />
                    <span className={cn('text-caption', getDemandTrend(product) === 'up' ? 'text-success-400' : getDemandTrend(product) === 'down' ? 'text-danger-400' : 'text-slate-400')}>
                      {getDemandTrend(product) === 'up' ? '↑' : getDemandTrend(product) === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className={cn('w-4 h-4', getSatisfactionColor(product.customerSatisfaction))} />
                    <span className="text-caption text-slate-400">Satisfaction</span>
                  </div>
                  <NumberDisplay value={product.customerSatisfaction} format="percentage" size="sm" color={getSatisfactionColor(product.customerSatisfaction)} />
                </div>

                {/* Latest Performance */}
                {product.performance.length > 0 && (
                  <div className="pt-2 border-t border-graphite-800">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-graphite-800/50 rounded-lg p-2">
                        <p className="text-caption text-slate-400">Units Sold</p>
                        <NumberDisplay value={product.performance[product.performance.length - 1].unitsSold} format="number" size="sm" color="default" className="block" />
                      </div>
                      <div className="bg-graphite-800/50 rounded-lg p-2">
                        <p className="text-caption text-slate-400">Revenue</p>
                        <NumberDisplay value={product.performance[product.performance.length - 1].revenue} format="currency" size="sm" color="success" className="block" />
                      </div>
                      <div className="bg-graphite-800/50 rounded-lg p-2">
                        <p className="text-caption text-slate-400">Profit</p>
                        <NumberDisplay value={product.performance[product.performance.length - 1].profit} format="currency" size="sm" color="success" className="block" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Low inventory warning */}
            {product.inventory < 20 && product.inventory > 0 && (
              <div className="px-5 pb-5">
                <div className="flex items-center gap-2 text-caption text-champagne-400 bg-champagne-400/10 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Low inventory: {product.inventory} units remaining</span>
                </div>
              </div>
            )}

            {product.inventory === 0 && (
              <div className="px-5 pb-5">
                <div className="flex items-center gap-2 text-caption text-danger-400 bg-danger-500/10 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Out of stock! No sales possible.</span>
                </div>
              </div>
            )}
          </motion.article>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/80 backdrop-blur-sm"
            onClick={() => setDeletingProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-graphite-900 rounded-xl border border-graphite-800 p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-heading-lg font-display font-semibold text-ivory-100 mb-2">Delete Product?</h3>
              <p className="text-body text-slate-400 mb-6">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setDeletingProduct(null)}>Cancel</Button>
                <Button variant="danger" onClick={() => confirmDelete(deletingProduct!)}>Delete</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Need to import React and Star
import React from 'react'
import { Star } from 'lucide-react'