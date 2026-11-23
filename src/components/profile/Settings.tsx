import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Save, RotateCcw, Trash2, Download, Upload, Moon, Sun, Bell, Volume2, VolumeX, Gamepad2, Palette, Shield, Database, X, Music, Award, Monitor, AlertCircle, CheckCircle, Calendar, User, Volume2 as Volume2Icon } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Card } from '@components/ui'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { Select, SelectOption } from '@components/ui/Select'
import { Switch } from '@components/ui/Switch'
import { Badge } from '@components/ui/Badge'
import { NumberDisplay } from '@components/ui/NumberDisplay'
import { formatCurrency } from '@utils/helpers'
import { useGameStore } from '@store/gameStore'
import { saveGame, exportSave, importSave, deleteSave, hasSave, getSaveInfo, createNewGame } from '@store/persistence'

export function Settings() {
  const { settings, actions, isDemoMode, founder, company } = useGameStore()
  const [activeTab, setActiveTab] = useState<'general' | 'audio' | 'display' | 'data' | 'danger'>('general')
  const [importFile, setImportFile] = useState<File | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const tabs = [
    { id: 'general', label: 'General', icon: Gamepad2 },
    { id: 'audio', label: 'Audio', icon: Volume2 },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'danger', label: 'Danger Zone', icon: Trash2 },
  ]

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    actions.updateSettings({ [key]: value })
  }

  const handleExport = () => {
    const data = exportSave()
    if (data) {
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `mini-ceo-save-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImportFile(file)
    }
  }

  const confirmImport = () => {
    if (importFile) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result
        if (typeof result === 'string') {
          const success = importSave(result)
          if (success) {
            alert('Save imported successfully! Reloading...')
            window.location.reload()
          } else {
            alert('Failed to import save. Invalid file format.')
          }
        }
      }
      reader.readAsText(importFile)
      setImportFile(null)
    }
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all game progress? This cannot be undone.')) {
      actions.resetGame()
      window.location.href = '/onboarding'
    }
  }

  const handleDelete = () => {
    if (window.confirm('PERMANENTLY delete all save data? This cannot be undone!')) {
      deleteSave()
      actions.resetGame()
      window.location.href = '/onboarding'
    }
  }

  const saveInfo = getSaveInfo()

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-display-md font-display font-bold text-ivory-100">Settings</h1>
          <p className="text-body text-slate-400 mt-1">
            Customize your MINI CEO experience
          </p>
        </div>
        <Button onClick={() => saveGame(useGameStore.getState())} leftIcon={<Save className="w-4 h-4" />}>
          Save Now
        </Button>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />

      {/* General Settings */}
      <TabPanel id="general" activeTab={activeTab}>
        <div className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-champagne-400" />
              Gameplay
            </h3>
            <div className="space-y-4">
              <SettingRow
                label="Auto-Save"
                description="Automatically save progress every 30 seconds"
                icon={Database}
              >
                <Switch
                  checked={settings.autoSave}
                  onChange={checked => handleSettingChange('autoSave', checked)}
                />
              </SettingRow>
              <SettingRow
                label="Notifications"
                description="Show in-game notifications for events and achievements"
                icon={Bell}
              >
                <Switch
                  checked={settings.notifications}
                  onChange={checked => handleSettingChange('notifications', checked)}
                />
              </SettingRow>
              <SettingRow
                label="Demo Mode"
                description="Use pre-built demo company with unlocked features"
                icon={Shield}
              >
                <Switch
                  checked={isDemoMode}
                  onChange={checked => {
                    handleSettingChange('demoMode', checked)
                    actions.setDemoMode(checked)
                  }}
                />
              </SettingRow>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-champagne-400" />
              Founder Profile
            </h3>
            <div className="space-y-4">
              <Input
                label="Founder Name"
                value={founder?.name || ''}
                onChange={e => actions.setFounder({ ...founder!, name: e.target.value })}
                disabled={isDemoMode}
              />
              <Input
                label="Company Name"
                value={company?.name || ''}
                onChange={e => actions.updateCompany({ name: e.target.value })}
                disabled={isDemoMode}
              />
              <Select
                label="Experience Level"
                options={[
                  { value: 'beginner', label: 'New Entrepreneur' },
                  { value: 'intermediate', label: 'Experienced Founder' },
                  { value: 'advanced', label: 'Serial Entrepreneur' },
                ]}
                value={founder?.experienceLevel || 'beginner'}
                onChange={value => actions.setFounder({ ...founder!, experienceLevel: value as any })}
                disabled={isDemoMode}
              />
            </div>
          </Card>
        </div>
      </TabPanel>

      {/* Audio Settings */}
      <TabPanel id="audio" activeTab={activeTab}>
        <div className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <Volume2Icon className="w-5 h-5 text-champagne-400" />
              Sound Effects
            </h3>
            <div className="space-y-4">
              <SettingRow
                label="Sound Effects"
                description="UI clicks, transactions, and interactions"
                icon={Volume2}
              >
                <Switch
                  checked={settings.soundEnabled}
                  onChange={checked => handleSettingChange('soundEnabled', checked)}
                />
              </SettingRow>
              <SettingRow
                label="Background Music"
                description="Ambient music during gameplay"
                icon={Music}
              >
                <Switch
                  checked={settings.musicEnabled}
                  onChange={checked => handleSettingChange('musicEnabled', checked)}
                />
              </SettingRow>
              <SettingRow
                label="Achievement Sounds"
                description="Special sounds for unlocking achievements"
                icon={Award}
              >
                <Switch
                  checked={settings.soundEnabled}
                  onChange={checked => handleSettingChange('soundEnabled', checked)}
                />
              </SettingRow>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <VolumeX className="w-5 h-5 text-champagne-400" />
              Volume Levels
            </h3>
            <div className="space-y-4">
              <VolumeSlider label="Master Volume" value={0.7} onChange={v => console.log(v)} />
              <VolumeSlider label="Effects Volume" value={0.8} onChange={v => console.log(v)} />
              <VolumeSlider label="Music Volume" value={0.4} onChange={v => console.log(v)} />
            </div>
          </Card>
        </div>
      </TabPanel>

      {/* Display Settings */}
      <TabPanel id="display" activeTab={activeTab}>
        <div className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-champagne-400" />
              Visual Preferences
            </h3>
            <div className="space-y-4">
              <SettingRow
                label="Reduced Motion"
                description="Minimize animations and transitions (respects system preference)"
                icon={RotateCcw}
              >
                <Switch
                  checked={settings.reducedMotion}
                  onChange={checked => handleSettingChange('reducedMotion', checked)}
                />
              </SettingRow>
              <SettingRow
                label="High Contrast"
                description="Increase color contrast for better visibility"
                icon={Shield}
              >
                <Switch
                  checked={false}
                  onChange={checked => console.log(checked)}
                />
              </SettingRow>
              <SettingRow
                label="Show FPS Counter"
                description="Display frames per second in 3D city view"
                icon={Gamepad2}
              >
                <Switch
                  checked={false}
                  onChange={checked => console.log(checked)}
                />
              </SettingRow>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5 text-champagne-400" />
              Theme
            </h3>
            <div className="flex gap-4">
              <ThemeButton
                active={true}
                onClick={() => {}}
                icon={<Moon className="w-5 h-5" />}
                label="Dark"
                description="Default dark theme"
              />
              <ThemeButton
                active={false}
                onClick={() => {}}
                icon={<Sun className="w-5 h-5" />}
                label="Light"
                description="Light theme (coming soon)"
                disabled
              />
              <ThemeButton
                active={false}
                onClick={() => {}}
                icon={<Monitor className="w-5 h-5" />}
                label="System"
                description="Follow system preference"
              />
            </div>
          </Card>
        </div>
      </TabPanel>

      {/* Data Settings */}
      <TabPanel id="data" activeTab={activeTab}>
        <div className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-champagne-400" />
              Save Management
            </h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <InfoBox
                  label="Save Status"
                  value={hasSave() ? 'Save File Exists' : 'No Save Found'}
                  icon={hasSave() ? <CheckCircle className="w-5 h-5 text-success-400" /> : <AlertCircle className="w-5 h-5 text-champagne-400" />}
                />
                <InfoBox
                  label="Last Saved"
                  value={saveInfo ? new Date(saveInfo.timestamp).toLocaleString() : 'Never'}
                  icon={<Calendar className="w-5 h-5 text-slate-400" />}
                />
              </div>
              {saveInfo && (
                <InfoBox
                  label="Save Version"
                  value={`v${saveInfo.version}`}
                  icon={<Shield className="w-5 h-5 text-slate-400" />}
                />
              )}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-graphite-800">
                <Button variant="secondary" onClick={handleExport} leftIcon={<Download className="w-4 h-4" />}>
                  Export Save
                </Button>
                <Button variant="secondary" leftIcon={<Upload className="w-4 h-4" />}>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                    id="import-file"
                    ref={(el) => { if (el) (window as any).importFileRef = el }}
                  />
                  <label htmlFor="import-file" className="cursor-pointer">
                    Import Save
                  </label>
                </Button>
                {importFile && (
                  <Button variant="primary" onClick={confirmImport} leftIcon={<CheckCircle className="w-4 h-4" />}>
                    Confirm Import
                  </Button>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-heading-md font-display font-semibold text-ivory-100 mb-4 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-champagne-400" />
              Reset Options
            </h3>
            <p className="text-body-sm text-slate-400 mb-4">
              Start fresh with a new company while keeping your settings.
            </p>
            <Button variant="danger" onClick={handleReset} leftIcon={<RotateCcw className="w-4 h-4" />}>
              Reset Game Progress
            </Button>
          </Card>
        </div>
      </TabPanel>

      {/* Danger Zone */}
      <TabPanel id="danger" activeTab={activeTab}>
        <div className="space-y-6 mt-6">
          <Card className="p-6 border-danger-500/20 bg-danger-500/5">
            <h3 className="text-heading-md font-display font-semibold text-danger-400 mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </h3>
            <p className="text-body text-slate-400 mb-6">
              These actions are irreversible. All your progress, achievements, and company data will be permanently deleted.
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-graphite-800/50 rounded-lg border border-graphite-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ivory-100">Delete Save File</p>
                    <p className="text-body-sm text-slate-400">Permanently remove all local save data</p>
                  </div>
                  <Button variant="danger" onClick={handleDelete} size="sm">
                    Delete Forever
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-graphite-800/50 rounded-lg border border-graphite-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ivory-100">Factory Reset</p>
                    <p className="text-body-sm text-slate-400">Reset game AND delete save file</p>
                  </div>
                  <Button variant="danger" onClick={handleDelete} size="sm">
                    Factory Reset
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </TabPanel>
    </div>
  )
}

// Helper Components
function SettingRow({ label, description, icon, children }: { label: string; description: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-graphite-800/50 rounded-xl">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-graphite-800 flex items-center justify-center text-champagne-400 flex-shrink-0">
          {icon}
        </div>
        <div>
          <p className="font-medium text-ivory-100">{label}</p>
          <p className="text-body-sm text-slate-400">{description}</p>
        </div>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

function VolumeSlider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 text-body-sm text-slate-400">{label}</div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="flex-1 h-2 bg-graphite-800 rounded-full appearance-none accent-champagne-400"
      />
      <span className="w-12 text-right font-mono text-body-sm text-champagne-400">{Math.round(value * 100)}%</span>
    </div>
  )
}

function ThemeButton({ active, onClick, icon, label, description, disabled }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; description: string; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all flex-1',
        active
          ? 'border-champagne-400 bg-champagne-400/10'
          : 'border-graphite-700 hover:border-graphite-600',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', active ? 'bg-champagne-400 text-graphite-950' : 'bg-graphite-800 text-slate-400')}>
        {icon}
      </div>
      <span className="font-medium text-ivory-100">{label}</span>
      <span className="text-caption text-slate-400">{description}</span>
    </button>
  )
}

function InfoBox({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-4 bg-graphite-800/50 rounded-xl border border-graphite-700">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-graphite-800 flex items-center justify-center">{icon}</div>
        <p className="text-caption text-slate-400">{label}</p>
      </div>
      <p className="font-medium text-ivory-100">{value}</p>
    </div>
  )
}

