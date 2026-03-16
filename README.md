# 🦑 HACK THE GAME — Squid Game Hackathon Domain Reveal

A cinematic, Squid Game-inspired domain reveal web app for hackathon opening ceremonies. Built with React + Vite + TailwindCSS + Framer Motion.

---

## ✨ Features

- 🎬 **Cinematic Intro Screen** — Glowing "WELCOME PLAYERS" with flicker effect and animated shapes
- ⏳ **Dramatic Countdown** — 3→2→1→BEGIN with shockwave ring animations
- 🃏 **Sequential Domain Reveal** — Cards flip in one-by-one with 3D perspective animations
- 🎆 **Confetti Explosion** — Fires when all domains are revealed
- ⏸️ **Pause / Resume / Reveal All** — Full presentation controls
- 🔷 **Floating Squid Game Shapes** — Circle, Triangle, Square float throughout
- 💡 **Neon Glow Effects** — Pink, teal, and yellow accents throughout

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

The app will open at http://localhost:5173

---

## 📁 Project Structure

\`\`\`
squid-hackathon/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Stage manager (intro → countdown → reveal)
    ├── index.css             # Global styles + CRT overlay + animations
    ├── components/
    │   ├── IntroScreen.jsx   # Fullscreen welcome with START GAME button
    │   ├── Countdown.jsx     # 3-2-1-BEGIN animated countdown
    │   ├── DomainReveal.jsx  # Grid reveal with progress bar & controls
    │   ├── DomainCard.jsx    # Individual card with flip + hover effects
    │   └── FloatingShapes.jsx # Animated circle/triangle/square bg shapes
    └── data/
        └── domains.js        # Domain data + color config
\`\`\`

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| neon-pink | #ff2e63 | Primary accent, cards 1/4/7/10 |
| neon-teal | #08d9d6 | Secondary accent, cards 2/5/8/11 |
| neon-yellow | #f7f48b | Tertiary accent, cards 3/6/9 |
| dark-bg | #0b0b0b | Background |
| dark-card | #111111 | Card background |

---

## ⚙️ Customization

### Change reveal speed
In DomainReveal.jsx, edit the setTimeout delay (default 1500ms):
  intervalRef.current = setTimeout(() => { ... }, 1500);

### Add/edit domains
Edit src/data/domains.js — each domain has id, title, description, icon, color ("pink"|"teal"|"yellow"), shape ("circle"|"triangle"|"square"), and tag.

---

## 🖥️ Recommended Display Setup
- Full-screen browser (F11) on a large display or projector
- 1920x1080 or higher resolution
- Chrome/Edge for best performance

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| react + react-dom | UI framework |
| framer-motion ^11 | All animations |
| canvas-confetti ^1.9 | Final celebration |
| tailwindcss ^3.4 | Styling utilities |
| vite ^5 | Build tool |
