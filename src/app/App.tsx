import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameProvider } from '@store/gameStore'
import { SoundProvider } from '@hooks/useSound'
import { LandingPage } from '@components/landing/LandingPage'
import { OnboardingFlow } from '@components/onboarding/OnboardingFlow'
import { Dashboard } from '@components/dashboard/Dashboard'
import { ManagementTabs } from '@components/management/ManagementTabs'
import { BusinessCity } from '@components/city/BusinessCity'
import { FounderProfile } from '@components/profile/FounderProfile'
import { Leaderboard } from '@components/progression/Leaderboard'
import { Settings } from '@components/profile/Settings'
import { PageShell } from '@components/layout/PageShell'
import { LoadingSpinner } from '@components/ui/LoadingSpinner'

const NotFound = () => (
  <PageShell>
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-display-lg font-display font-bold mb-4">404</h1>
        <p className="text-slate-400 mb-6">Page not found</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </div>
  </PageShell>
)

function App() {
  return (
    <SoundProvider>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingFlow />} />
            <Route
              path="/dashboard"
              element={
                <PageShell>
                  <Dashboard />
                </PageShell>
              }
            />
            <Route
              path="/management"
              element={
                <PageShell>
                  <ManagementTabs />
                </PageShell>
              }
            />
            <Route
              path="/city"
              element={
                <PageShell>
                  <BusinessCity />
                </PageShell>
              }
            />
            <Route
              path="/profile"
              element={
                <PageShell>
                  <FounderProfile />
                </PageShell>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PageShell>
                  <Leaderboard />
                </PageShell>
              }
            />
            <Route
              path="/settings"
              element={
                <PageShell>
                  <Settings />
                </PageShell>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </SoundProvider>
  )
}

export default App