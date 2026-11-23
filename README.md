# MINI CEO — Build Your Empire

A premium business simulation platform for students. Experience the journey of a startup founder — create companies, make strategic decisions, manage resources, and grow your virtual business empire.

## Features

- **Landing Page**: Exceptional hero with interactive 3D isometric city, scroll animations, and comprehensive feature sections
- **Onboarding Flow**: 5-step interactive experience (Founder Profile → Industry Selection → Company Creation → Initial Resources → Launch)
- **Business Dashboard**: Real-time KPIs, interactive financial charts, revenue/expense tracking, notifications, and current challenges
- **Business Management**:
  - Products: Create, price, and manage inventory with demand simulation
  - Marketing: Launch campaigns across 7 channels targeting 6 audience segments
  - Employees: Hire across 5 departments with skills, productivity, and satisfaction tracking
  - Departments: Upgrade 5 departments for powerful bonuses
- **Simulation Engine**: Real business mechanics with price elasticity, market dynamics, customer satisfaction, and reputation systems
- **Events System**: 15+ dynamic business events with strategic choices and consequences
- **Missions & Progression**: 15 missions across 3 difficulty tiers, 24 achievements across 4 rarity levels
- **Business City**: Interactive 3D city visualization with building evolution (WebGL with CSS fallback)
- **Leaderboard**: Competitive rankings (demo mode with fictional data)
- **Profile & Settings**: Comprehensive founder profile, achievement gallery, mission history, and settings
- **Persistence**: LocalStorage save/load with auto-save, export/import, and versioning

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling with custom design system
- **Motion (Framer Motion)** for animations
- **React Three Fiber** + **Drei** for 3D graphics
- **Recharts** for data visualization
- **Zustand** for state management with persistence
- **Radix UI** primitives for accessible components

## Design System

- **Colors**: Deep graphite/navy base, warm ivory content areas, muted champagne gold accents
- **Typography**: Space Grotesk (display), DM Sans (body), JetBrains Mono (data)
- **Spacing**: 4px base unit system
- **Motion**: Spring-based animations with reduced-motion support

## Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Project Structure

```
mini-ceo/
├── public/                 # Static assets
├── src/
│   ├── app/               # App routing and providers
│   ├── components/
│   │   ├── ui/            # Base UI components (Button, Card, Input, etc.)
│   │   ├── layout/        # Layout components (Header, PageShell)
│   │   ├── landing/       # Landing page sections
│   │   ├── onboarding/    # 5-step onboarding flow
│   │   ├── dashboard/     # Main dashboard components
│   │   ├── management/    # Business management (products, marketing, employees)
│   │   ├── city/          # 3D business city
│   │   ├── profile/       # Founder profile and settings
│   │   ├── progression/   # Leaderboard, achievements
│   │   └── shared/        # Shared components (Loading, Empty, ErrorBoundary)
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand stores and simulation engines
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles and Tailwind config
│   └── data/              # Static data (industries, avatars, missions, events)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

## Game Mechanics

### Simulation Engine
- **Revenue Calculation**: Base demand × marketing multiplier × satisfaction multiplier × price elasticity factor × market conditions
- **Price Elasticity**: Configurable per product (1.2-1.8), higher prices reduce demand
- **Marketing**: Channel efficiency × audience match × diminishing returns × brand awareness
- **Customer Satisfaction**: Price fairness + product quality + support quality
- **Reputation**: Sales-driven gains, complaint-driven losses, time decay

### Events
15+ event templates across 7 categories:
- Competitor (launches, marketing blitz)
- Market (demand surge, downturn)
- Supplier (discounts, disruptions)
- Customer (viral reviews, complaints)
- Internal (key employee leaves, R&D breakthrough)
- Regulatory (new regulations)
- External (economic boom)

Each event has 3-4 choices with pros/cons and measurable effects.

### Progression
- **XP Sources**: Sales, profit, customers, milestones, events
- **Levels**: 15-level curve with increasing XP requirements
- **Achievements**: 24 across 4 rarities (Common, Uncommon, Rare, Legendary)
- **Missions**: 15 missions (5 Beginner, 5 Intermediate, 5 Advanced)

## Demo Mode

The app includes a comprehensive demo mode with:
- Pre-built company (TechNova Solutions)
- 3 products with performance history
- 3 marketing campaigns with analytics
- 7 employees across 5 departments
- 30 days of simulation history
- 6 unlocked achievements
- 4 buildings in the business city

## Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- WebGL required for 3D city (CSS fallback provided)
- LocalStorage required for persistence

## Performance Targets

- Initial load < 2s on 3G
- 60fps on desktop, 30fps on mobile for 3D city
- Bundle size < 200KB gzipped
- LCP < 2.5s, CLS < 0.1

## Accessibility

- WCAG AA contrast ratios
- Keyboard navigation support
- Screen reader compatible
- Reduced motion support
- Focus visible states
- ARIA labels on all interactive elements

## License

Built for the Student Technology Challenge. Educational use only.
