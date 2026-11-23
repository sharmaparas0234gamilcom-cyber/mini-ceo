import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Building2, ArrowRight } from 'lucide-react'
import { cn } from '@utils/helpers'
import { Button } from '@components/ui'
import { Card } from '@components/ui/Card'
import { Step1FounderProfile, FounderProfileData } from './Step1FounderProfile'
import { Step2BusinessSelection, BusinessSelectionData } from './Step2BusinessSelection'
import { Step3CompanyCreation, CompanyCreationData } from './Step3CompanyCreation'
import { Step4InitialResources, InitialResourcesData } from './Step4InitialResources'
import { Step5Launch, LaunchData } from './Step5Launch'
import { INDUSTRIES } from '@data/industries'
import { useGameStore } from '@store/gameStore'

type Step = 1 | 2 | 3 | 4 | 5

interface OnboardingState {
  step1: FounderProfileData
  step2: BusinessSelectionData
  step3: CompanyCreationData
  step4: InitialResourcesData
  step5: LaunchData
}

const initialState: OnboardingState = {
  step1: {
    name: '',
    avatarId: 'founder-1',
    experienceLevel: 'beginner',
  },
  step2: {
    industry: null,
  },
  step3: {
    name: '',
    description: '',
    brandIdentity: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E242A',
      logoType: 'modern',
      tagline: '',
    },
    strategy: 'balanced',
  },
  step4: {
    acknowledged: false,
  },
  step5: {
    completed: false,
  },
}

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState<OnboardingState>(initialState)
  const { actions } = useGameStore()

  const updateStepData = useCallback(<K extends keyof OnboardingState>(
    step: K,
    data: Partial<OnboardingState[K]>
  ) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }))
  }, [])

  const goToStep = useCallback((step: Step) => {
    setCurrentStep(step)
  }, [])

  const handleNext = useCallback(() => {
    if (currentStep < 5) {
      setCurrentStep(prev => (prev + 1) as Step)
    }
  }, [currentStep])

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => (prev - 1) as Step)
    }
  }, [currentStep])

  const handleComplete = useCallback(() => {
    // The launch step handles navigation
  }, [])

  // Reset form if needed
  const resetOnboarding = useCallback(() => {
    setFormData(initialState)
    setCurrentStep(1)
  }, [])

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: 1, label: 'Founder', icon: <Building2 className="w-4 h-4" /> },
    { key: 2, label: 'Industry', icon: <Building2 className="w-4 h-4" /> },
    { key: 3, label: 'Company', icon: <Building2 className="w-4 h-4" /> },
    { key: 4, label: 'Resources', icon: <Building2 className="w-4 h-4" /> },
    { key: 5, label: 'Launch', icon: <ArrowRight className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-graphite-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-graphite-950" />
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(201,184,150,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,184,150,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne-400/3 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-4xl"
        >
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center gap-2 flex-1 relative"
                >
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10',
                    currentStep > step.key
                      ? 'bg-champagne-400 border-champagne-400 text-graphite-950'
                      : currentStep === step.key
                        ? 'border-champagne-400 bg-champagne-400/20 text-champagne-400 animate-pulse'
                        : 'border-graphite-700 text-slate-500 bg-graphite-800'
                  )}>
                    {currentStep > step.key ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className={cn(
                    'text-caption font-medium text-center max-w-[70px]',
                    currentStep >= step.key ? 'text-ivory-100' : 'text-slate-500'
                  )}>
                    {step.label}
                  </span>

                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'absolute top-5 left-[calc(50%+20px)] w-full h-0.5 -translate-y-1/2',
                      currentStep > step.key
                        ? 'bg-champagne-400'
                        : 'bg-graphite-700'
                    )} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step1FounderProfile
                  data={formData.step1}
                  onChange={data => updateStepData('step1', data)}
                  onNext={handleNext}
                  onBack={handleBack}
                  isFirstStep={true}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step2BusinessSelection
                  data={formData.step2}
                  onChange={data => updateStepData('step2', data)}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step3CompanyCreation
                  data={formData.step3}
                  onChange={data => updateStepData('step3', data)}
                  onNext={handleNext}
                  onBack={handleBack}
                  industry={formData.step2.industry || 'technology'}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step4InitialResources
                  data={formData.step4}
                  onChange={data => updateStepData('step4', data)}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Step5Launch
                  data={formData.step5}
                  onChange={data => updateStepData('step5', data)}
                  onNext={handleComplete}
                  onBack={handleBack}
                  founderName={formData.step1.name}
                  companyName={formData.step3.name}
                  industry={formData.step2.industry || 'technology'}
                  brandIdentity={formData.step3.brandIdentity}
                  strategy={formData.step3.strategy}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset option at bottom */}
          {currentStep > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <button
                onClick={resetOnboarding}
                className="text-caption text-slate-500 hover:text-slate-400 transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Start Over
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}