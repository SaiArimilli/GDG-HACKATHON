import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import Countdown from './components/Countdown';
import DomainReveal from './components/DomainReveal';

const STAGES = {
  INTRO: 'intro',
  COUNTDOWN: 'countdown',
  REVEAL: 'reveal',
};

export default function App() {
  const [stage, setStage] = useState(STAGES.INTRO);

  return (
    <div className="w-full h-full bg-dark-bg overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === STAGES.INTRO && (
          <IntroScreen
            key="intro"
            onStart={() => setStage(STAGES.COUNTDOWN)}
          />
        )}
        {stage === STAGES.COUNTDOWN && (
          <Countdown
            key="countdown"
            onComplete={() => setStage(STAGES.REVEAL)}
          />
        )}
        {stage === STAGES.REVEAL && (
          <DomainReveal key="reveal" />
        )}
      </AnimatePresence>

      {/* Global Footer element */}
      <div className="fixed bottom-4 right-6 z-50 font-mono text-xs tracking-widest pointer-events-none" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>
        &copy; 2026 @SaiArimilli
      </div>
    </div>
  );
}
