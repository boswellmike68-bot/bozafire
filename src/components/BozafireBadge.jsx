import { useState, useEffect } from 'react';

export default function BozafireBadge() {
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowing((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-40 h-40 mx-auto animate-float">
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        <defs>
          <radialGradient id="badgeBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0a0a15" />
          </radialGradient>
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="50%" stopColor="#ffab00" />
            <stop offset="100%" stopColor="#00e5ff" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="100" cy="100" r="90" fill="url(#badgeBg)" stroke="url(#rimGrad)" strokeWidth="4" filter="url(#glow)" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(0,229,255,0.15)" strokeWidth="1" />
        <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(0,229,255,0.08)" strokeWidth="0.5" strokeDasharray="4 8" />

        <text
          x="100"
          y="115"
          textAnchor="middle"
          fontFamily="Orbitron, sans-serif"
          fontSize="72"
          fontWeight="900"
          fill="#00e5ff"
          filter={glowing ? 'url(#strongGlow)' : 'url(#glow)'}
          style={{
            transition: 'filter 1s ease',
          }}
        >
          Z
        </text>

        <circle cx="70" cy="140" r="6" fill="#1565c0" filter="url(#glow)" opacity="0.8" />
        <circle cx="70" cy="140" r="3" fill="#42a5f5" />
        <circle cx="130" cy="140" r="6" fill="#1565c0" filter="url(#glow)" opacity="0.8" />
        <circle cx="130" cy="140" r="3" fill="#42a5f5" />
        <circle cx="100" cy="55" r="5" fill="#1565c0" filter="url(#glow)" opacity="0.8" />
        <circle cx="100" cy="55" r="2.5" fill="#42a5f5" />
      </svg>

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: glowing
            ? 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
          transition: 'background 1s ease',
        }}
      />
    </div>
  );
}
