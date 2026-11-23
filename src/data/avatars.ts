export interface Avatar {
  id: string
  name: string
  svg: string
  bgColor: string
}

export const AVATARS: Avatar[] = [
  {
    id: 'founder-1',
    name: 'Alex Chen',
    bgColor: '#3B82F6',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M30 85 Q30 65 50 65 Q70 65 70 85" fill="#3B82F6"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 40 Q50 45 58 40" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-2',
    name: 'Priya Sharma',
    bgColor: '#EC4899',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M30 55 Q30 45 40 45 Q50 45 50 55 Q50 45 60 45 Q70 45 70 55" fill="#EC4899"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 40 Q50 45 58 40" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-3',
    name: 'Marcus Johnson',
    bgColor: '#10B981',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M35 35 Q35 25 50 25 Q65 25 65 35 Q65 40 50 40 Q35 40 35 35" fill="#10B981"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-4',
    name: 'Sofia Rossi',
    bgColor: '#F59E0B',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M30 45 Q30 35 40 35 Q50 35 50 45 Q50 35 60 35 Q70 35 70 45" fill="#F59E0B"/>
      <path d="M35 40 Q42 32 50 35 Q58 32 65 40" stroke="#F5F0E8" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-5',
    name: 'David Park',
    bgColor: '#8B5CF6',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M38 35 Q38 28 50 28 Q62 28 62 35" fill="#8B5CF6"/>
      <rect x="38" y="28" width="24" height="10" fill="#8B5CF6"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-6',
    name: 'Aisha Patel',
    bgColor: '#06B6D4',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M30 50 Q30 40 40 40 Q50 40 50 50 Q50 40 60 40 Q70 40 70 50" fill="#06B6D4"/>
      <path d="M40 45 Q45 38 50 42 Q55 38 60 45" stroke="#F5F0E8" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-7',
    name: 'James Wilson',
    bgColor: '#EF4444',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M35 35 Q35 25 50 25 Q65 25 65 35" fill="#EF4444"/>
      <rect x="35" y="25" width="30" height="12" fill="#EF4444"/>
      <path d="M38 30 Q42 26 50 28 Q58 26 62 30" stroke="#F5F0E8" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-8',
    name: 'Maria Santos',
    bgColor: '#84CC16',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M30 45 Q30 35 40 35 Q50 35 50 45 Q50 35 60 35 Q70 35 70 45" fill="#84CC16"/>
      <ellipse cx="50" cy="35" rx="15" ry="8" fill="#F5F0E8"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-9',
    name: 'Ryan Kim',
    bgColor: '#F97316',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M35 35 Q35 28 50 28 Q65 28 65 35" fill="#F97316"/>
      <path d="M42 30 Q48 26 50 28 Q52 26 58 30" stroke="#F5F0E8" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-10',
    name: 'Emma Thompson',
    bgColor: '#6366F1',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M30 55 Q30 45 40 45 Q50 45 50 55 Q50 45 60 45 Q70 45 70 55" fill="#6366F1"/>
      <path d="M38 50 Q45 42 50 45 Q55 42 62 50" stroke="#F5F0E8" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-11',
    name: 'Carlos Mendoza',
    bgColor: '#14B8A6',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M38 35 Q38 28 50 28 Q62 28 62 35" fill="#14B8A6"/>
      <rect x="38" y="28" width="24" height="8" fill="#14B8A6"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'founder-12',
    name: 'Lisa Anderson',
    bgColor: '#D946EF',
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="35" r="18" fill="#F5F0E8"/>
      <ellipse cx="50" cy="85" rx="28" ry="20" fill="#F5F0E8"/>
      <path d="M30 45 Q30 35 40 35 Q50 35 50 45 Q50 35 60 35 Q70 35 70 45" fill="#D946EF"/>
      <ellipse cx="50" cy="35" rx="18" ry="10" fill="#F5F0E8" opacity="0.3"/>
      <circle cx="44" cy="32" r="2.5" fill="#1E242A"/>
      <circle cx="56" cy="32" r="2.5" fill="#1E242A"/>
      <path d="M42 42 Q50 47 58 42" stroke="#1E242A" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
  },
]

export function getAvatar(id: string): Avatar | undefined {
  return AVATARS.find(a => a.id === id)
}

export function getRandomAvatar(): Avatar {
  return AVATARS[Math.floor(Math.random() * AVATARS.length)]
}