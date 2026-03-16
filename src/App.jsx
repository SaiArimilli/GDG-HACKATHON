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
    </div>
  );
}
