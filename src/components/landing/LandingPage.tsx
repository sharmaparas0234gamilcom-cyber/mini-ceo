import { Hero } from './Hero'
import { HowItWorks } from './HowItWorks'
import { WhatYouLearn } from './WhatYouLearn'
import { SimulationPreview } from './SimulationPreview'
import { FeaturedChallenges } from './FeaturedChallenges'
import { AchievementsPreview } from './AchievementsPreview'
import { FinalCTA } from './FinalCTA'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-graphite-950">
      <Hero />
      <HowItWorks />
      <WhatYouLearn />
      <SimulationPreview />
      <FeaturedChallenges />
      <AchievementsPreview />
      <FinalCTA />
    </div>
  )
}