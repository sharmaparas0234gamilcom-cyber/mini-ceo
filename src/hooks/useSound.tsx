import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

type SoundType = 'click' | 'success' | 'error' | 'achievement' | 'launch' | 'coin' | 'notification'

const SOUND_FREQUENCIES: Record<SoundType, { freq: number; type: OscillatorType; duration: number; volume: number }> = {
  click: { freq: 800, type: 'sine', duration: 0.1, volume: 0.1 },
  success: { freq: 523.25, type: 'sine', duration: 0.3, volume: 0.15 }, // C5
  error: { freq: 200, type: 'square', duration: 0.2, volume: 0.15 },
  achievement: { freq: 659.25, type: 'sine', duration: 0.5, volume: 0.2 }, // E5
  launch: { freq: 329.63, type: 'triangle', duration: 0.8, volume: 0.2 }, // E4
  coin: { freq: 1000, type: 'sine', duration: 0.15, volume: 0.1 },
  notification: { freq: 440, type: 'sine', duration: 0.2, volume: 0.1 }, // A4
}

interface SoundContextType {
  playSound: (type: SoundType) => void
  enabled: boolean
  toggleSound: () => void
}

const SoundContext = createContext<SoundContextType | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  const initAudioContext = useCallback(() => {
    if (!audioContext) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)
    }
    return audioContext
  }, [audioContext])

  const playSound = useCallback((type: SoundType) => {
    if (!enabled) return

    const ctx = initAudioContext()
    if (!ctx) return

    const config = SOUND_FREQUENCIES[type]
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = config.type
    oscillator.frequency.setValueAtTime(config.freq, ctx.currentTime)

    gainNode.gain.setValueAtTime(config.volume, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config.duration)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + config.duration)
  }, [enabled, initAudioContext])

  const toggleSound = useCallback(() => {
    setEnabled(prev => !prev)
  }, [])

  return (
    <SoundContext.Provider value={{ playSound, enabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}

// Hook for easy sound playing in components
export function useSoundEffect() {
  const { playSound } = useSound()
  return playSound
}