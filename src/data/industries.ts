import type { IndustryType } from '@types/game'

export interface IndustryData {
  id: IndustryType
  name: string
  description: string
  icon: string
  color: string
  backgroundColor: string
  startingProducts: { name: string; category: string; basePrice: number; baseCost: number; baseDemand: number }[]
  marketSize: number
  growthRate: number
  competitionLevel: 'low' | 'medium' | 'high'
  priceElasticity: number
  customerSegments: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export const INDUSTRIES: Record<IndustryType, IndustryData> = {
  technology: {
    id: 'technology',
    name: 'Technology',
    description: 'Build innovative software, apps, and digital solutions. High growth potential with scalable products.',
    icon: 'cpu',
    color: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    startingProducts: [
      { name: 'SaaS Platform', category: 'digital', basePrice: 2999, baseCost: 500, baseDemand: 20 },
      { name: 'Mobile App', category: 'digital', basePrice: 999, baseCost: 200, baseDemand: 35 },
      { name: 'API Service', category: 'digital', basePrice: 1999, baseCost: 300, baseDemand: 15 },
    ],
    marketSize: 15000,
    growthRate: 0.05,
    competitionLevel: 'high',
    priceElasticity: 1.3,
    customerSegments: ['professionals', 'startups', 'enterprises'],
    difficulty: 'intermediate',
  },
  fashion: {
    id: 'fashion',
    name: 'Fashion & Apparel',
    description: 'Design and sell clothing, accessories, and lifestyle products. Creative with seasonal trends.',
    icon: 'shirt',
    color: '#EC4899',
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    startingProducts: [
      { name: 'Designer T-Shirts', category: 'physical', basePrice: 1499, baseCost: 400, baseDemand: 50 },
      { name: 'Premium Jeans', category: 'physical', basePrice: 2999, baseCost: 800, baseDemand: 30 },
      { name: 'Accessories Line', category: 'physical', basePrice: 799, baseCost: 200, baseDemand: 60 },
    ],
    marketSize: 12000,
    growthRate: 0.03,
    competitionLevel: 'high',
    priceElasticity: 1.8,
    customerSegments: ['gen-z', 'millennials', 'fashion-enthusiasts'],
    difficulty: 'beginner',
  },
  'food-beverage': {
    id: 'food-beverage',
    name: 'Food & Beverage',
    description: 'Create and sell food products, beverages, or dining experiences. Steady demand with repeat customers.',
    icon: 'coffee',
    color: '#F97316',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    startingProducts: [
      { name: 'Artisan Coffee', category: 'physical', basePrice: 499, baseCost: 150, baseDemand: 80 },
      { name: 'Healthy Snacks', category: 'physical', basePrice: 299, baseCost: 80, baseDemand: 100 },
      { name: 'Meal Kits', category: 'service', basePrice: 1999, baseCost: 600, baseDemand: 25 },
    ],
    marketSize: 20000,
    growthRate: 0.02,
    competitionLevel: 'medium',
    priceElasticity: 1.6,
    customerSegments: ['families', 'professionals', 'health-conscious', 'students'],
    difficulty: 'beginner',
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming & Entertainment',
    description: 'Develop games, gaming accessories, or entertainment content. Passionate community with high engagement.',
    icon: 'gamepad-2',
    color: '#8B5CF6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    startingProducts: [
      { name: 'Indie Game', category: 'digital', basePrice: 799, baseCost: 100, baseDemand: 40 },
      { name: 'Gaming Merch', category: 'physical', basePrice: 1299, baseCost: 350, baseDemand: 45 },
      { name: 'Game Server Hosting', category: 'service', basePrice: 999, baseCost: 200, baseDemand: 30 },
    ],
    marketSize: 10000,
    growthRate: 0.06,
    competitionLevel: 'high',
    priceElasticity: 1.4,
    customerSegments: ['gen-z', 'millennials', 'gamers', 'streamers'],
    difficulty: 'advanced',
  },
  education: {
    id: 'education',
    name: 'Education & Learning',
    description: 'Create courses, educational tools, or learning platforms. Growing market with social impact.',
    icon: 'graduation-cap',
    color: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    startingProducts: [
      { name: 'Online Course', category: 'digital', basePrice: 4999, baseCost: 500, baseDemand: 25 },
      { name: 'Tutoring Service', category: 'service', basePrice: 1999, baseCost: 300, baseDemand: 30 },
      { name: 'Learning App', category: 'digital', basePrice: 299, baseCost: 50, baseDemand: 50 },
    ],
    marketSize: 8000,
    growthRate: 0.04,
    competitionLevel: 'medium',
    priceElasticity: 1.5,
    customerSegments: ['students', 'professionals', 'parents', 'lifelong-learners'],
    difficulty: 'beginner',
  },
  entertainment: {
    id: 'entertainment',
    name: 'Entertainment & Media',
    description: 'Produce content, events, or media experiences. Creative freedom with viral potential.',
    icon: 'film',
    color: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    startingProducts: [
      { name: 'Content Channel', category: 'digital', basePrice: 0, baseCost: 100, baseDemand: 100 },
      { name: 'Event Tickets', category: 'service', basePrice: 2999, baseCost: 800, baseDemand: 20 },
      { name: 'Merchandise', category: 'physical', basePrice: 999, baseCost: 250, baseDemand: 40 },
    ],
    marketSize: 15000,
    growthRate: 0.04,
    competitionLevel: 'high',
    priceElasticity: 1.7,
    customerSegments: ['gen-z', 'millennials', 'fans', 'general'],
    difficulty: 'intermediate',
  },
}

export const INDUSTRY_LIST = Object.values(INDUSTRIES)

export function getIndustry(id: IndustryType): IndustryData {
  return INDUSTRIES[id]
}