import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { X, Package, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { Textarea } from '@components/ui/Input'
import { Select, SelectOption } from '@components/ui/Select'
import { NumberDisplay } from '@components/ui/NumberDisplay'
import { useGameStore } from '@store/gameStore'

interface ProductFormData {
  name: string
  description: string
  category: 'physical' | 'digital' | 'service' | 'subscription'
  sellingPrice: number
  productionCost: number
  maxInventory: number
}

const initialFormData: ProductFormData = {
  name: '',
  description: '',
  category: 'digital',
  sellingPrice: 1000,
  productionCost: 200,
  maxInventory: 1000,
}

const categories: SelectOption[] = [
  { value: 'physical', label: 'Physical Product', description: 'Tangible goods with inventory and shipping' },
  { value: 'digital', label: 'Digital Product', description: 'Software, downloads, SaaS - unlimited inventory' },
  { value: 'service', label: 'Service', description: 'Consulting, maintenance, subscriptions' },
  { value: 'subscription', label: 'Subscription', description: 'Recurring revenue model' },
]

interface ProductFormProps {
  product?: ProductFormData & { id: string }
  onClose: () => void
  onSubmit: (data: ProductFormData) => void
}

export function ProductForm({ product, onClose, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(product || initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)

  const { products } = useGameStore()

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {}

    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters'

    if (!formData.description.trim()) newErrors.description = 'Description is required'
    else if (formData.description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters'

    if (formData.sellingPrice <= 0) newErrors.sellingPrice = 'Price must be greater than 0'

    if (formData.productionCost < 0) newErrors.productionCost = 'Cost cannot be negative'

    if (formData.productionCost >= formData.sellingPrice) newErrors.productionCost = 'Cost should be less than selling price'

    if (formData.maxInventory <= 0) newErrors.maxInventory = 'Max inventory must be greater than 0'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setTimeout(() => {
      onSubmit(formData)
      setSubmitting(false)
      onClose()
    }, 300)
  }

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const margin = formData.sellingPrice - formData.productionCost
  const marginPercent = formData.sellingPrice > 0 ? ((margin / formData.sellingPrice) * 100).toFixed(1) : 0

  const priceElasticity = formData.category === 'digital' ? 1.3 : formData.category === 'physical' ? 1.6 : 1.4

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-graphite-950/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-graphite-900 rounded-xl border border-graphite-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-graphite-800 sticky top-0 bg-graphite-900/95 backdrop-blur z-10 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
              <Package className="w-5 h-5 text-graphite-950" />
            </div>
            <h2 id="product-form-title" className="text-heading-lg font-display font-semibold text-ivory-100">
              {product ? 'Edit Product' : 'Create New Product'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-ivory-100 hover:bg-graphite-800 transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <Card className="p-5">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-champagne-400" />
              Basic Information
            </h3>
            <div className="space-y-4">
              <Input
                label="Product Name"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Enter product name"
                error={errors.name}
                autoFocus
              />
              <Textarea
                label="Description"
                value={formData.description}
                onChange={e => handleChange('description', e.target.value)}
                placeholder="Describe your product, its features, and value proposition..."
                rows={3}
                error={errors.description}
              />
              <Select
                label="Category"
                options={categories}
                value={formData.category}
                onChange={value => handleChange('category', value as any)}
                placeholder="Select category"
              />
            </div>
          </Card>

          {/* Pricing */}
          <Card className="p-5">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-champagne-400" />
              Pricing & Inventory
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Input
                label="Selling Price (₹)"
                type="number"
                value={formData.sellingPrice}
                onChange={e => handleChange('sellingPrice', parseInt(e.target.value) || 0)}
                placeholder="1000"
                error={errors.sellingPrice}
              />
              <Input
                label="Production Cost (₹)"
                type="number"
                value={formData.productionCost}
                onChange={e => handleChange('productionCost', parseInt(e.target.value) || 0)}
                placeholder="200"
                error={errors.productionCost}
              />
            </div>
            <Input
              label="Max Inventory"
              type="number"
              value={formData.maxInventory}
              onChange={e => handleChange('maxInventory', parseInt(e.target.value) || 0)}
              placeholder="1000"
              error={errors.maxInventory}
              helperText="Digital products can have unlimited inventory (set high number)"
            />

            {/* Price Analysis */}
            <div className="mt-6 p-4 bg-graphite-800/50 rounded-xl border border-graphite-700">
              <h4 className="text-heading-sm font-display font-semibold text-ivory-100 mb-3">Price Analysis</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-graphite-800 rounded-lg">
                  <p className="text-caption text-slate-400">Margin</p>
                  <NumberDisplay value={margin} format="currency" size="md" color={margin > 0 ? 'success' : 'danger'} className="block" />
                </div>
                <div className="text-center p-3 bg-graphite-800 rounded-lg">
                  <p className="text-caption text-slate-400">Margin %</p>
                  <NumberDisplay value={parseFloat(marginPercent)} format="percentage" size="md" color="champagne" className="block" />
                </div>
                <div className="text-center p-3 bg-graphite-800 rounded-lg">
                  <p className="text-caption text-slate-400">Price Elasticity</p>
                  <NumberDisplay value={priceElasticity} format="number" size="md" decimals={1} color="default" className="block" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-body-sm text-slate-400">
                <AlertTriangle className="w-4 h-4 text-champagne-400" />
                <span>Higher price = lower demand. Elasticity of {priceElasticity} means 10% price increase → ~{Math.round(priceElasticity * 10)}% demand drop.</span>
              </div>
            </div>
          </Card>

          {/* Demand Preview */}
          <Card className="p-5">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-champagne-400" />
              Demand Preview
            </h3>
            <p className="text-body-sm text-slate-400 mb-4">
              Estimated daily demand based on your pricing, category, and base market conditions.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-graphite-800 rounded-xl">
                <p className="text-caption text-slate-400">Conservative</p>
                <NumberDisplay value={Math.round(50 / priceElasticity * (1000 / formData.sellingPrice) ** priceElasticity)} format="number" size="lg" color="default" className="block" />
                <p className="text-caption text-slate-500">units/day</p>
              </div>
              <div className="p-4 bg-graphite-800 rounded-xl">
                <p className="text-caption text-slate-400">Expected</p>
                <NumberDisplay value={Math.round(75 / priceElasticity * (1000 / formData.sellingPrice) ** priceElasticity)} format="number" size="lg" color="champagne" className="block" />
                <p className="text-caption text-slate-500">units/day</p>
              </div>
              <div className="p-4 bg-graphite-800 rounded-xl">
                <p className="text-caption text-slate-400">Optimistic</p>
                <NumberDisplay value={Math.round(100 / priceElasticity * (1000 / formData.sellingPrice) ** priceElasticity)} format="number" size="lg" color="success" className="block" />
                <p className="text-caption text-slate-500">units/day</p>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-graphite-800">
            <Button variant="ghost" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting} rightIcon={<X className="w-4 h-4" />}>
              {product ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}