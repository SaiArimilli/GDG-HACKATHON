import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingShapes from './FloatingShapes';

const sequence = ['5', '4', '3', '2', '1', 'BEGIN'];

const colorForStep = {
  '5': { color: '#3b82f6', glow: 'rgba(59,130,246,0.6)' },
  '4': { color: '#f59e0b', glow: 'rgba(245,158,11,0.6)' },
  '3': { color: '#ef4444', glow: 'rgba(239,68,68,0.6)' },
  '2': { color: '#167a5b', glow: 'rgba(22,122,91,0.6)' },
  '1': { color: '#ed1b76', glow: 'rgba(237,27,118,0.6)' },
  'BEGIN': { color: '#ffffff', glow: 'rgba(255,255,255,0.5)' },
};

export default function Countdown({ onComplete }) {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (step >= sequence.length) {
      setTimeout(onComplete, 800);
      return;
    }

    // Flash effect on each number
    setFlash(true);
    const flashTimer = setTimeout(() => setFlash(false), 150);

    const duration = step === sequence.length - 1 ? 2000 : 1500;
    const timer = setTimeout(() => {
      if (step < sequence.length - 1) {
        setStep(s => s + 1);
      } else {
        setStep(s => s + 1);
      }
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(flashTimer);
    };
  }, [step]);

  const current = sequence[Math.min(step, sequence.length - 1)];
  const { color, glow } = colorForStep[current] || colorForStep['3'];
  const isBegin = current === 'BEGIN';

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: '#0b0b0b', zIndex: 20 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.5 } }}
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ background: color, zIndex: 50, mixBlendMode: 'screen' }}
          />
        )}
      </AnimatePresence>

      {/* Radial background pulse */}
      <motion.div
        key={`bg-${step}`}
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${glow} 0%, transparent 70%)`,
        }}
      />

      <FloatingShapes opacity={0.1} />

      {/* Concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={`ring-${step}-${ring}`}
            className="absolute rounded-full border"
            initial={{ width: 100, height: 100, opacity: 0.8 }}
            animate={{ width: 300 * ring, height: 300 * ring, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: ring * 0.08 }}
            style={{ borderColor: color, boxShadow: `0 0 20px ${color}` }}
          />
        ))}
      </div>

      {/* Main number */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`num-${step}`}
          initial={{ scale: 3, opacity: 0, filter: 'blur(30px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 0.3, opacity: 0, filter: 'blur(20px)', y: -60 }}
          transition={{
            enter: { duration: 0.5, type: 'spring', stiffness: 200, damping: 20 },
            exit: { duration: 0.3, ease: 'easeIn' },
          }}
          className="relative flex flex-col items-center select-none"
        >
          <div
            className="font-display"
            style={{
              fontSize: isBegin ? 'clamp(5rem, 14vw, 14rem)' : 'clamp(10rem, 28vw, 28rem)',
              color,
              textShadow: `0 0 20px ${glow}, 0 0 60px ${glow}, 0 0 120px ${color}40`,
              lineHeight: 1,
              letterSpacing: isBegin ? '0.1em' : '-0.05em',
            }}
          >
            {current}
          </div>

          {/* Underline strike */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              height: '3px',
              width: '60%',
              background: color,
              boxShadow: `0 0 15px ${color}`,
              marginTop: '0.5rem',
            }}
          />

          {/* Sub text */}
          {isBegin && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-mono mt-6 tracking-widest"
              style={{ color: '#167a5b', fontSize: '1.2rem', letterSpacing: '0.4em' }}
            >
              THE GAMES RESUME...
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Step indicators */}
      <div className="absolute bottom-12 flex gap-4">
        {sequence.slice(0, 5).map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            animate={{
              backgroundColor: i < step ? colorForStep[sequence[i]].color : 'rgba(255,255,255,0.1)',
              boxShadow: i < step ? `0 0 10px ${colorForStep[sequence[i]].color}` : 'none',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
