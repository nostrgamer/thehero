# MyOwnHero - Personal Empowerment Calculator

A modern mobile-first React TypeScript application that leads users to Bitcoin through a hero's journey of personal empowerment and financial education.

## The Hero's Journey

1. **Question Everything** - Challenge false narratives keeping users trapped
2. **Your Time Has Value** - Realize what you're trading your life for  
3. **A Hero Seeks Understanding** - Show systematic time theft by design
4. **Same Rules for Everyone** - Discover the power of hard money
5. **The Hero's Triumph** - The Bitcoin revelation

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies
   ```bash
   npm install
   ```

2. Start development server
   ```bash
   npm run dev
   ```

3. Open browser to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **State Management**: Zustand
- **PWA**: Vite PWA plugin for offline capability

## Mobile-First Design

- Touch-first interactions (44px minimum tap targets)
- Thumb-zone optimization
- Responsive typography  
- Efficient loading and caching
- Offline capability
- Battery efficient

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base components (Button, Input, etc.)
│   ├── layout/         # Layout components  
│   └── features/       # Feature-specific components
├── pages/              # Page components (Hero's Journey steps)
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── types/              # TypeScript interfaces
├── utils/              # Utility functions
└── styles/             # Global styles
```

## Strategic Approach

This application uses a "Trojan horse" strategy - appearing as a personal empowerment tool while guiding users toward Bitcoin education through calculated revelation rather than direct messaging.

## Privacy-First

- No external tracking
- Local storage only
- No data collection
- No email required

## Performance Targets

- TypeScript coverage: 100%
- Mobile responsiveness: All device sizes
- Performance: Lighthouse score 90+
- Accessibility: WCAG AA compliance
- Bundle size: Under 1MB initial load 