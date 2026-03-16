import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingShapes from './FloatingShapes';

export default function IntroScreen({ onStart }) {
  const [glitching, setGlitching] = useState(false);
  const [hoveringBtn, setHoveringBtn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center crt-overlay noise-overlay"
      style={{ background: '#0b0b0b', zIndex: 10 }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'brightness(3) blur(20px)',
        transition: { duration: 0.8, ease: 'easeIn' }
      }}
    >
      <FloatingShapes opacity={0.2} />

      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(237,27,118,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Player number badge */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-8 px-6 py-2 border font-mono text-sm tracking-widest"
        style={{
          borderColor: 'rgba(22,122,91,0.5)',
          color: '#167a5b',
          background: 'rgba(22,122,91,0.05)',
          boxShadow: '0 0 20px rgba(22,122,91,0.2)',
          letterSpacing: '0.3em',
        }}
      >
        O · △ · ◻ — INVITATION
      </motion.div>

      {/* Main title */}
      <div className="relative mb-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, type: 'spring', stiffness: 100 }}
          className="font-display text-center select-none"
          style={{
            fontSize: 'clamp(4rem, 10vw, 9rem)',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          <span
            style={{
              display: 'block',
              color: '#ed1b76',
              textShadow: glitching
                ? '4px 0 #167a5b, -4px 0 #ef4444, 0 0 40px #ed1b76'
                : '0 0 30px #ed1b7680, 0 0 60px #ed1b7640',
              filter: glitching ? 'blur(0.5px)' : 'none',
              transform: glitching ? 'translateX(3px)' : 'translateX(0)',
              transition: 'transform 0.05s, filter 0.05s',
            }}
          >
            SQUID GAME
          </span>
          <span
            style={{
              display: 'block',
              color: '#ffffff',
              textShadow: '0 0 20px rgba(255,255,255,0.3)',
              transform: glitching ? 'translateX(-2px)' : 'translateX(0)',
              transition: 'transform 0.05s',
            }}
          >
            SEASON 2
          </span>
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
          className="mt-4 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, #ed1b76, #167a5b, transparent)',
            boxShadow: '0 0 10px #ed1b76',
          }}
        />
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="font-body text-center mb-16"
        style={{
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          color: '#ef4444',
          letterSpacing: '0.25em',
          textShadow: '0 0 15px rgba(239,68,68,0.6)',
          fontWeight: 300,
        }}
      >
        ARE YOU READY TO PLAY AGAIN?
      </motion.p>

      {/* Squid game shapes row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="flex items-center gap-8 mb-16"
      >
        {[
          { svg: <circle cx="22" cy="22" r="18" fill="none" stroke="#ed1b76" strokeWidth="3" />, vb: "0 0 44 44" },
          { svg: <polygon points="22,4 40,38 4,38" fill="none" stroke="#ed1b76" strokeWidth="3" />, vb: "0 0 44 44" },
          { svg: <rect x="6" y="6" width="32" height="32" fill="none" stroke="#ed1b76" strokeWidth="3" />, vb: "0 0 44 44" },
          { svg: <path d="M12,12 L32,32 M32,12 L12,32" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />, vb: "0 0 44 44" },
          { svg: <circle cx="22" cy="22" r="18" fill="none" stroke="#3b82f6" strokeWidth="3" />, vb: "0 0 44 44" },
        ].map((shape, i) => (
          <motion.svg
            key={i}
            width="44" height="44"
            viewBox={shape.vb}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear' }}
            style={{ filter: 'drop-shadow(0 0 6px currentColor)' }}
          >
            {shape.svg}
          </motion.svg>
        ))}
      </motion.div>

      {/* START BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.button
          onClick={onStart}
          onHoverStart={() => setHoveringBtn(true)}
          onHoverEnd={() => setHoveringBtn(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative font-display tracking-widest overflow-hidden"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            padding: '1.2rem 4rem',
            background: hoveringBtn
              ? '#ed1b76'
              : 'transparent',
            color: hoveringBtn ? '#0b0b0b' : '#ed1b76',
            border: '2px solid #ed1b76',
            boxShadow: hoveringBtn
              ? '0 0 40px #ed1b76, 0 0 80px rgba(237,27,118,0.5), inset 0 0 30px rgba(237,27,118,0.3)'
              : '0 0 20px rgba(237,27,118,0.4), 0 0 40px rgba(237,27,118,0.2)',
            cursor: 'pointer',
            letterSpacing: '0.3em',
            transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
          }}
        >
          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
              translateX: '-100%',
            }}
            animate={hoveringBtn ? { translateX: ['−100%', '200%'] } : {}}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
          ▶ RESTART GAME
        </motion.button>
      </motion.div>

      {/* Bottom status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 font-mono text-xs tracking-widest"
        style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}
      >
        456 PLAYERS · NEW RULES · 1 WINNER
      </motion.div>
    </motion.div>
  );
}
