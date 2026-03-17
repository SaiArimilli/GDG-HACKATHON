import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DomainCard from './DomainCard';
import FloatingShapes from './FloatingShapes';
import { domains } from '../data/domains';
import confetti from 'canvas-confetti';

function FinalExplosion() {
  useEffect(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ['#ed1b76', '#167a5b', '#ef4444', '#3b82f6'];

    const frame = () => {
      confetti({
        particleCount: 6,
        spread: 80,
        origin: { x: Math.random(), y: Math.random() * 0.6 },
        colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2,
        shapes: ['circle', 'square'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    // Big burst first
    confetti({
      particleCount: 200,
      spread: 180,
      origin: { x: 0.5, y: 0.4 },
      colors,
      ticks: 400,
      startVelocity: 60,
      gravity: 0.8,
      shapes: ['circle', 'square'],
    });

    setTimeout(() => requestAnimationFrame(frame), 300);
  }, []);

  return null;
}

export default function DomainReveal() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isPaused && revealedCount < domains.length) {
      intervalRef.current = setTimeout(() => {
        setRevealedCount(c => {
          const next = c + 1;
          if (next === domains.length) {
            setTimeout(() => {
              setAllRevealed(true);
              setShowExplosion(true);
            }, 800);
          }
          return next;
        });
      }, 3000);
    }
    return () => clearTimeout(intervalRef.current);
  }, [revealedCount, isPaused]);

  // Auto-scroll to latest card
  useEffect(() => {
    if (containerRef.current && revealedCount > 0) {
      const cards = containerRef.current.querySelectorAll('[data-card]');
      const lastCard = cards[revealedCount - 1];
      if (lastCard) {
        lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [revealedCount]);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden crt-overlay"
      style={{ background: '#0b0b0b', zIndex: 30 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {showExplosion && <FinalExplosion />}
      <FloatingShapes opacity={0.08} />

      {/* Scanline sweep */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #167a5b60, transparent)',
          zIndex: 5,
        }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Header */}
      <div
        className="sticky top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(11,11,11,0.95)',
          borderBottom: '1px solid rgba(237,27,118,0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Left: Logo area */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {['#ed1b76', '#167a5b', '#3b82f6'].map((c, i) => (
              <motion.div
                key={i}
                className="w-3 h-3"
                style={{ background: c, boxShadow: `0 0 8px ${c}` }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
          <span
            className="font-display tracking-widest"
            style={{ color: '#ed1b76', fontSize: '1.1rem', textShadow: '0 0 10px rgba(237,27,118,0.6)' }}
          >
            SQUID GAME 2
          </span>
        </div>

        {/* Center: Progress */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1.5">
            {domains.map((_, i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-sm"
                style={{ width: i < revealedCount ? 28 : 8 }}
                animate={{
                  backgroundColor: i < revealedCount ? '#167a5b' : 'rgba(255,255,255,0.1)',
                  boxShadow: i < revealedCount ? '0 0 6px #167a5b' : 'none',
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>
            {revealedCount}/{domains.length} DOMAINS
          </span>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setIsPaused(p => !p)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-mono text-xs px-4 py-1.5 border tracking-widest"
            style={{
              color: isPaused ? '#ef4444' : '#167a5b',
              borderColor: isPaused ? '#ef4444' : '#167a5b',
              background: 'transparent',
              cursor: 'pointer',
              boxShadow: isPaused ? '0 0 10px rgba(239,68,68,0.3)' : '0 0 10px rgba(22,122,91,0.3)',
              letterSpacing: '0.15em',
            }}
          >
            {isPaused ? '▶ RESUME' : '⏸ PAUSE'}
          </motion.button>

          {revealedCount < domains.length && !isPaused && (
            <motion.button
              onClick={() => {
                clearTimeout(intervalRef.current);
                setRevealedCount(domains.length);
                setAllRevealed(true);
                setShowExplosion(true);
              }}
              whileHover={{ scale: 1.05 }}
              className="font-mono text-xs px-4 py-1.5 border tracking-widest"
              style={{
                color: '#ed1b76',
                borderColor: 'rgba(237,27,118,0.4)',
                background: 'transparent',
                cursor: 'pointer',
                letterSpacing: '0.15em',
              }}
            >
              REVEAL ALL
            </motion.button>
          )}
        </div>
      </div>

      {/* Cards grid */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto pt-6 pb-12 px-6"
        style={{ maxHeight: 'calc(100vh - 80px)' }}
      >
        <div
          className="grid gap-4 mx-auto"
          style={{
            maxWidth: '1600px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          }}
        >
          {domains.map((domain, i) => (
            <div key={domain.id} data-card style={{ minHeight: '260px' }}>
              <DomainCard
                domain={domain}
                index={i}
                isRevealed={i < revealedCount}
              />
            </div>
          ))}
        </div>

        {/* ALL REVEALED banner */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
              className="mt-12 flex flex-col items-center gap-4 pb-12"
            >
              <motion.div
                className="text-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div
                  className="font-display mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    color: '#ed1b76',
                    textShadow: '0 0 30px rgba(237,27,118,0.8), 0 0 60px rgba(237,27,118,0.4)',
                    letterSpacing: '0.1em',
                  }}
                >
                  LET THE GAMES BEGIN
                </div>
                <p
                  className="font-mono tracking-widest"
                  style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', fontSize: '0.85rem' }}
                >
                  THE CHOICE IS YOURS · O OR X
                </p>
              </motion.div>

              {/* Shape trio */}
              <div className="flex gap-8 mt-4">
                {[
                  { svg: <circle cx="22" cy="22" r="18" fill="none" stroke="#ed1b76" strokeWidth="3" />, c: '#ed1b76' },
                  { svg: <polygon points="22,4 40,38 4,38" fill="none" stroke="#ed1b76" strokeWidth="3" />, c: '#ed1b76' },
                  { svg: <rect x="6" y="6" width="32" height="32" fill="none" stroke="#ed1b76" strokeWidth="3" />, c: '#ed1b76' },
                  { svg: <path d="M12,12 L32,32 M32,12 L12,32" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />, c: '#ef4444' },
                  { svg: <circle cx="22" cy="22" r="18" fill="none" stroke="#3b82f6" strokeWidth="3" />, c: '#3b82f6' }
                ].map((shape, i) => (
                  <motion.svg
                    key={i}
                    width="48" height="48"
                    viewBox="0 0 44 44"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity, delay: i * 0.5 }
                    }}
                    style={{ filter: `drop-shadow(0 0 10px ${shape.c})` }}
                  >
                    {shape.svg}
                  </motion.svg>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next reveal indicator */}
      <AnimatePresence>
        {!allRevealed && !isPaused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2 font-mono text-xs"
            style={{
              color: '#167a5b',
              background: 'rgba(22,122,91,0.08)',
              border: '1px solid rgba(22,122,91,0.3)',
              letterSpacing: '0.2em',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ●
            </motion.span>
            NEXT DOMAIN INCOMING...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
