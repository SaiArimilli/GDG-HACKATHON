import { useState } from 'react';
import { motion } from 'framer-motion';
import { colorMap } from '../data/domains';

function ShapeIcon({ shape, color, size = 20 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 44 44" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
      {shape === 'circle' && <circle cx="22" cy="22" r="18" fill="none" stroke={color} strokeWidth="3" />}
      {shape === 'triangle' && <polygon points="22,4 40,38 4,38" fill="none" stroke={color} strokeWidth="3" />}
      {shape === 'square' && <rect x="6" y="6" width="32" height="32" fill="none" stroke={color} strokeWidth="3" />}
      {shape === 'o' && <circle cx="22" cy="22" r="18" fill="none" stroke={color} strokeWidth="3" />}
      {shape === 'x' && <path d="M12,12 L32,32 M32,12 L12,32" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />}
    </svg>
  );
}

export default function DomainCard({ domain, index, isRevealed }) {
  const [hovered, setHovered] = useState(false);
  const colors = colorMap[domain.color];

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
      animate={isRevealed ? {
        opacity: 1,
        rotateY: 0,
        scale: 1,
      } : {}}
      transition={{
        duration: 0.7,
        ease: [0.34, 1.2, 0.64, 1],
        rotateY: { duration: 0.7 },
        opacity: { duration: 0.4 },
      }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative h-full rounded-sm overflow-hidden cursor-pointer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={hovered ? { y: -6 } : { y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          background: hovered
            ? `linear-gradient(135deg, rgba(17,17,17,1) 0%, ${colors.glowLight} 100%)`
            : 'rgba(17,17,17,0.95)',
          border: `1px solid ${hovered ? colors.accent : 'rgba(255,255,255,0.08)'}`,
          boxShadow: hovered
            ? `0 0 30px ${colors.glow}, 0 8px 40px rgba(0,0,0,0.8), inset 0 0 30px ${colors.glowLight}`
            : '0 4px 20px rgba(0,0,0,0.6)',
          transition: 'background 0.4s, border-color 0.3s, box-shadow 0.3s',
          minHeight: '260px',
        }}
      >
        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5"
          animate={hovered
            ? { background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`, opacity: 1 }
            : { background: `linear-gradient(90deg, transparent, ${colors.accent}40, transparent)`, opacity: 0.5 }
          }
          transition={{ duration: 0.3 }}
        />

        {/* Card content */}
        <div className="p-5 flex flex-col h-full">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Domain number */}
              <div
                className="font-mono text-xs font-bold px-2 py-0.5 rounded-sm"
                style={{
                  color: colors.accent,
                  background: `${colors.glowLight}`,
                  border: `1px solid ${colors.border}`,
                  letterSpacing: '0.15em',
                }}
              >
                #{String(index + 1).padStart(2, '0')}
              </div>
              {/* Tag */}
              <div
                className="font-mono text-xs tracking-widest"
                style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}
              >
                {domain.tag}
              </div>
            </div>
            <ShapeIcon shape={domain.shape} color={colors.accent} size={22} />
          </div>

          {/* Icon */}
          <motion.div
            className="text-4xl mb-3"
            animate={hovered ? { scale: 1.15, rotate: [0, -5, 5, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            {domain.icon}
          </motion.div>

          {/* Title */}
          <h3
            className="font-body font-bold mb-3 leading-tight flex-grow"
            style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              color: hovered ? '#ffffff' : 'rgba(255,255,255,0.85)',
              letterSpacing: '0.01em',
              transition: 'color 0.3s',
            }}
          >
            {domain.title}
          </h3>

          {/* Description */}
          <p
            className="font-body text-sm mb-4 leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.78rem',
              lineHeight: 1.6,
            }}
          >
            {domain.description}
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 font-mono text-xs tracking-widest relative overflow-hidden"
            style={{
              background: hovered ? colors.accent : 'transparent',
              color: hovered ? '#0b0b0b' : colors.accent,
              border: `1px solid ${colors.accent}`,
              boxShadow: hovered ? `0 0 20px ${colors.glow}` : 'none',
              cursor: 'pointer',
              letterSpacing: '0.2em',
              transition: 'background 0.3s, color 0.3s, box-shadow 0.3s',
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            ACCEPT INVITATION →
          </motion.button>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l" style={{ borderColor: colors.accent + '60' }} />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r" style={{ borderColor: colors.accent + '60' }} />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l" style={{ borderColor: colors.accent + '60' }} />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r" style={{ borderColor: colors.accent + '60' }} />
      </motion.div>
    </motion.div>
  );
}
