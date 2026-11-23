import { useState } from 'react'
import { motion } from 'motion/react'
import { ChevronRight, User, Star, Zap, Brain } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui'
import { Input } from '@components/ui/Input'
import { Select, SelectOption } from '@components/ui/Select'
import { Avatar, AVATARS } from '@components/ui/Avatar'
import { Card } from '@components/ui/Card'

export interface FounderProfileData {
  name: string
  avatarId: string
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
}

export interface Step1FounderProfileProps {
  data: FounderProfileData
  onChange: (data: Partial<FounderProfileData>) => void
  onNext: () => void
  onBack: () => void
  isFirstStep: boolean
}

const experienceLevels: SelectOption[] = [
  { value: 'beginner', label: 'New Entrepreneur', description: 'First time building a business. Extra guidance and tutorials.' },
  { value: 'intermediate', label: 'Experienced Founder', description: 'Some business knowledge. Standard simulation experience.' },
  { value: 'advanced', label: 'Serial Entrepreneur', description: 'Deep business expertise. Challenging mode with less hand-holding.' },
]

export function Step1FounderProfile({ data, onChange, onNext, onBack, isFirstStep }: Step1FounderProfileProps) {
  const [nameError, setNameError] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNameError(value.length > 0 && value.length < 2 ? 'Name must be at least 2 characters' : '')
    onChange({ name: value })
  }

  const handleAvatarSelect = (avatarId: string) => {
    onChange({ avatarId })
  }

  const handleExperienceChange = (value: string) => {
    onChange({ experienceLevel: value as any })
  }

  const canProceed = data.name.trim().length >= 2

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption text-slate-400">Step 1 of 5</span>
          <span className="text-caption text-champagne-400 font-mono">Founder Profile</span>
        </div>
        <div className="h-1 bg-graphite-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '20%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-champagne-400 to-champagne-600"
          />
        </div>
      </div>

      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center">
            <User className="w-6 h-6 text-graphite-950" />
          </div>
          <h2 className="text-display-md font-display font-bold text-ivory-100">Who's the Founder?</h2>
        </motion.div>
        <p className="text-body text-slate-400 max-w-lg mx-auto">
          Tell us about yourself. This will personalize your journey and tailor the experience to your level.
        </p>
      </div>

      {/* Name Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Card className="p-6">
          <label htmlFor="founder-name" className="label">
            Founder Name
          </label>
          <Input
            id="founder-name"
            value={data.name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            error={nameError}
            autoComplete="name"
            autoFocus
            className="text-lg"
          />
          <p className="mt-2 text-caption text-slate-500">
            This name will appear on your founder profile and company documents.
          </p>
        </Card>
      </motion.div>

      {/* Avatar Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="label mb-0">Choose Your Avatar</label>
            <span className="text-caption text-slate-500">Can be changed later</span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3" role="radiogroup" aria-label="Select avatar">
            {AVATARS.map(avatar => (
              <button
                key={avatar.id}
                type="button"
                role="radio"
                aria-checked={data.avatarId === avatar.id}
                onClick={() => handleAvatarSelect(avatar.id)}
                className={cn(
                  'relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-fast',
                  data.avatarId === avatar.id
                    ? 'border-champagne-400 bg-champagne-400/10 shadow-lg shadow-champagne-400/10'
                    : 'border-graphite-700 hover:border-graphite-600 hover:shadow-md'
                )}
              >
                <Avatar avatarId={avatar.id} size="xl" className="w-full h-full" />
                {data.avatarId === avatar.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-graphite-950/50">
                    <div className="w-8 h-8 rounded-full bg-champagne-400 flex items-center justify-center">
                      <svg className="w-5 h-5 text-graphite-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Experience Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card className="p-6">
          <label className="label mb-4">Experience Level</label>
          <div className="grid gap-3" role="radiogroup" aria-label="Select experience level">
            {experienceLevels.map(level => (
              <button
                key={level.value}
                type="button"
                role="radio"
                aria-checked={data.experienceLevel === level.value}
                onClick={() => handleExperienceChange(level.value)}
                className={cn(
                  'relative p-4 rounded-xl border-2 text-left transition-all duration-fast',
                  data.experienceLevel === level.value
                    ? 'border-champagne-400 bg-champagne-400/10'
                    : 'border-graphite-700 hover:border-graphite-600'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                    data.experienceLevel === level.value
                      ? 'bg-champagne-400 text-graphite-950'
                      : 'bg-graphite-800 text-slate-400'
                  )}>
                    {level.value === 'beginner' && <Star className="w-5 h-5" />}
                    {level.value === 'intermediate' && <Zap className="w-5 h-5" />}
                    {level.value === 'advanced' && <Brain className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      'font-medium',
                      data.experienceLevel === level.value ? 'text-ivory-100' : 'text-slate-300'
                    )}>
                      {level.label}
                    </p>
                    <p className="text-body-sm text-slate-500 mt-0.5">{level.description}</p>
                  </div>
                  {data.experienceLevel === level.value && (
                    <div className="w-6 h-6 rounded-full bg-champagne-400 flex items-center justify-center">
                      <svg className="w-4 h-4 text-graphite-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-between"
      >
        <Button variant="ghost" onClick={onBack} disabled={isFirstStep}>
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          rightIcon={<ChevronRight className="w-5 h-5" />}
          size="lg"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  )
}