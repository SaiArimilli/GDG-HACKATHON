import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const shapes = [
  { type: 'circle', size: 120, x: '8%', y: '15%', color: '#ed1b76', delay: 0, duration: 10 },
  { type: 'triangle', size: 90, x: '88%', y: '10%', color: '#167a5b', delay: 2, duration: 13 },
  { type: 'square', size: 70, x: '75%', y: '70%', color: '#ef4444', delay: 1, duration: 9 },
  { type: 'circle', size: 50, x: '92%', y: '45%', color: '#ed1b76', delay: 3, duration: 11 },
  { type: 'triangle', size: 60, x: '5%', y: '75%', color: '#167a5b', delay: 0.5, duration: 14 },
  { type: 'square', size: 40, x: '50%', y: '5%', color: '#ef4444', delay: 2.5, duration: 8 },
  { type: 'circle', size: 30, x: '30%', y: '88%', color: '#3b82f6', delay: 4, duration: 12 },
  { type: 'triangle', size: 100, x: '18%', y: '45%', color: '#ed1b76', delay: 1.5, duration: 16 },
  { type: 'square', size: 55, x: '62%', y: '85%', color: '#167a5b', delay: 3.5, duration: 10 },
];

function CircleShape({ size, color, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle
        cx="50" cy="50" r="45"
        fill="none"
        stroke={color}
        strokeWidth="4"
        opacity={opacity}
      />
    </svg>
  );
}

function TriangleShape({ size, color, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon
        points="50,8 92,88 8,88"
        fill="none"
        stroke={color}
        strokeWidth="4"
        opacity={opacity}
      />
    </svg>
  );
}

function SquareShape({ size, color, opacity }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect
        x="10" y="10" width="80" height="80"
        fill="none"
        stroke={color}
        strokeWidth="4"
        opacity={opacity}
      />
    </svg>
  );
}

export default function FloatingShapes({ opacity = 0.15 }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [0, -30, 10, -15, 0],
            rotate: [0, 8, -4, 6, 0],
            scale: [1, 1.05, 0.97, 1.02, 1],
          }}
          transition={{
            opacity: { duration: 1, delay: shape.delay },
            y: { duration: shape.duration, repeat: Infinity, ease: 'easeInOut', delay: shape.delay },
            rotate: { duration: shape.duration * 1.3, repeat: Infinity, ease: 'easeInOut', delay: shape.delay },
            scale: { duration: shape.duration * 0.8, repeat: Infinity, ease: 'easeInOut', delay: shape.delay },
          }}
        >
          <div
            style={{
              filter: `drop-shadow(0 0 12px ${shape.color}) drop-shadow(0 0 25px ${shape.color}60)`,
            }}
          >
            {shape.type === 'circle' && <CircleShape size={shape.size} color={shape.color} opacity={opacity} />}
            {shape.type === 'triangle' && <TriangleShape size={shape.size} color={shape.color} opacity={opacity} />}
            {shape.type === 'square' && <SquareShape size={shape.size} color={shape.color} opacity={opacity} />}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
