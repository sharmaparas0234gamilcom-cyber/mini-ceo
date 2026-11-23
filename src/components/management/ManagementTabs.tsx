import { motion } from 'motion/react'
import { Package, Target, Users, Building2, Settings } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Tabs, TabPanel } from '@components/ui/Tabs'
import { ProductList } from './products/ProductList'
import { ProductForm } from './products/ProductForm'
import { CampaignList } from './marketing/CampaignList'
import { CampaignForm } from './marketing/CampaignForm'
import { EmployeeList } from './employees/EmployeeList'
import { DepartmentManager } from './employees/DepartmentManager'
import { useGameStore } from '@store/gameStore'

export function ManagementTabs() {
  const { company, actions } = useGameStore()
  const [activeTab, setActiveTab] = React.useState<'products' | 'marketing' | 'employees' | 'departments'>('products')
  const [showProductForm, setShowProductForm] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState<any>(null)
  const [showCampaignForm, setShowCampaignForm] = React.useState(false)
  const [editingCampaign, setEditingCampaign] = React.useState<any>(null)

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'marketing', label: 'Marketing', icon: Target },
    { id: 'employees', label: 'Team', icon: Users },
    { id: 'departments', label: 'Departments', icon: Building2 },
  ]

  const handleProductSubmit = (data: any) => {
    if (editingProduct) {
      actions.updateProduct(editingProduct.id, data)
    } else {
      actions.addProduct(data)
    }
    setShowProductForm(false)
    setEditingProduct(null)
  }

  const handleCampaignSubmit = (data: any) => {
    if (editingCampaign) {
      actions.updateCampaign(editingCampaign.id, data)
    } else {
      actions.addCampaign(data)
    }
    setShowCampaignForm(false)
    setEditingCampaign(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-display-md font-display font-bold text-ivory-100">Business Management</h1>
          <p className="text-body text-slate-400 mt-1">
            Manage your products, marketing, team, and departments
          </p>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === 'products' && (
            <button
              onClick={() => { setEditingProduct(null); setShowProductForm(true); }}
              className="btn-primary"
            >
              <Plus className="w-4 h-4" /> New Product
            </button>
          )}
          {activeTab === 'marketing' && (
            <button
              onClick={() => { setEditingCampaign(null); setShowCampaignForm(true); }}
              className="btn-primary"
            >
              <Plus className="w-4 h-4" /> New Campaign
            </button>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />

      <TabPanel id="products" activeTab={activeTab}>
        <ProductList />
      </TabPanel>

      <TabPanel id="marketing" activeTab={activeTab}>
        <CampaignList />
      </TabPanel>

      <TabPanel id="employees" activeTab={activeTab}>
        <EmployeeList />
      </TabPanel>

      <TabPanel id="departments" activeTab={activeTab}>
        <DepartmentManager />
      </TabPanel>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => { setShowProductForm(false); setEditingProduct(null); }}
          onSubmit={handleProductSubmit}
        />
      )}

      {/* Campaign Form Modal */}
      {showCampaignForm && (
        <CampaignForm
          campaign={editingCampaign}
          onClose={() => { setShowCampaignForm(false); setEditingCampaign(null); }}
          onSubmit={handleCampaignSubmit}
          industry={company?.industry || 'technology'}
        />
      )}
    </div>
  )
}

// Need to import React and Plus
import React from 'react'
import { Plus } from 'lucide-react'