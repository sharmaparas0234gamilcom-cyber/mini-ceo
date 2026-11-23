import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { SoundProvider } from './hooks/useSound'
import './styles/globals.css'
import App from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
      <SoundProvider>
        <App />
      </SoundProvider>
    </MotionConfig>
  </StrictMode>,
)