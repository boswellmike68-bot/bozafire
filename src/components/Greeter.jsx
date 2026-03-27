import { useState, useEffect, useRef } from 'react';
import BozafireBadge from './BozafireBadge';

const GREETING_LINES = [
  { text: '> ESTABLISHING QUANTUM LINK...', delay: 0 },
  { text: '> DECRYPTING DIMENSIONAL GATEWAY...', delay: 800 },
  { text: '> NEURAL HANDSHAKE CONFIRMED', delay: 1600 },
  { text: '> BOZAFIRE PROTOCOL ENGAGED', delay: 2400 },
];

const TOPICS = [
  {
    icon: '🌱',
    title: 'Soil Remediation',
    desc: 'Restoring Earth one molecule at a time through advanced remediation protocols.',
    color: 'from-green-500/20 to-emerald-500/10',
    border: 'border-green-500/30',
    glow: 'rgba(34,197,94,0.3)',
  },
  {
    icon: '🌿',
    title: 'Hemp Projects',
    desc: 'Pioneering sustainable solutions with industrial hemp innovation.',
    color: 'from-lime-500/20 to-green-500/10',
    border: 'border-lime-500/30',
    glow: 'rgba(132,204,22,0.3)',
  },
  {
    icon: '🏛️',
    title: 'BBnCC Governance',
    desc: 'Decentralized governance for the betterment of all earthlings.',
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/30',
    glow: 'rgba(0,229,255,0.3)',
  },
  {
    icon: '🧮',
    title: 'Mathematical Frameworks',
    desc: 'Perfection of the Boardroom through computational certainty.',
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-500/30',
    glow: 'rgba(255,171,0,0.3)',
  },
];

function TypewriterText({ text, delay, onComplete }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 30);
    return () => clearInterval(interval);
  }, [started, text, onComplete]);

  if (!started) return null;

  return (
    <div className="font-mono text-sm md:text-base text-cyan-400/80 mb-1">
      {displayed}
      <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse" />
    </div>
  );
}

function FloatingCode() {
  const snippets = [
    'const remediate = (soil) => transform(soil.ph);',
    'function governance(BBnCC) { return optimize(); }',
    'hemp.yield = calculateBioMass(acres, density);',
    'nanostruct.surface = transmute(material);',
    'mutationDensity = (dt) => A3k2 / BOnC;',
    'attrs.set("HempRoot", "bioSequence");',
    'if (consciousness > 0) { evolve(); }',
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {snippets.map((snippet, i) => (
        <div
          key={i}
          className="absolute font-mono text-xs whitespace-nowrap"
          style={{
            top: `${10 + i * 13}%`,
            left: i % 2 === 0 ? '2%' : undefined,
            right: i % 2 !== 0 ? '2%' : undefined,
            color: 'rgba(0, 229, 255, 0.12)',
            animation: `fadeInUp 1s ${i * 0.3}s both`,
          }}
        >
          {snippet}
        </div>
      ))}
    </div>
  );
}

export default function Greeter() {
  const [phase, setPhase] = useState(0); // 0=boot, 1=greeting, 2=topics
  const [bootComplete, setBootComplete] = useState(0);
  const [hovered, setHovered] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (bootComplete >= GREETING_LINES.length) {
      const timer = setTimeout(() => setPhase(1), 600);
      return () => clearTimeout(timer);
    }
  }, [bootComplete]);

  useEffect(() => {
    if (phase === 1) {
      const timer = setTimeout(() => setPhase(2), 2000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ zIndex: 10 }}>
      <FloatingCode />

      {/* Boot Sequence */}
      <div
        className="w-full max-w-2xl mb-8 transition-all duration-1000"
        style={{
          opacity: phase >= 1 ? 0.3 : 1,
          transform: phase >= 1 ? 'translateY(-20px) scale(0.95)' : 'none',
        }}
      >
        <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 md:p-6 font-mono">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-cyan-500/10">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-2 text-xs text-cyan-500/40">bozafire_terminal v3.7.2</span>
          </div>
          {GREETING_LINES.map((line, i) => (
            <TypewriterText
              key={i}
              text={line.text}
              delay={line.delay}
              onComplete={() => setBootComplete((prev) => prev + 1)}
            />
          ))}
        </div>
      </div>

      {/* Main Greeting */}
      <div
        className="text-center transition-all duration-1000"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        <BozafireBadge />

        <h1
          className="mt-6 text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-glow-cyan"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            background: 'linear-gradient(135deg, #00e5ff 0%, #ffffff 40%, #ffab00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          BOZAFIRE
        </h1>

        <div className="mt-4 overflow-hidden">
          <h2
            className="text-2xl md:text-4xl font-light tracking-[0.3em] text-glow-amber"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              color: '#ffab00',
              animation: phase >= 1 ? 'fadeInUp 1s 0.5s both' : 'none',
            }}
          >
            GREETINGS EARTHLING
          </h2>
        </div>

        <p
          className="mt-4 text-base md:text-lg text-cyan-100/50 max-w-md mx-auto"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '0.15em',
            animation: phase >= 1 ? 'fadeInUp 1s 0.8s both' : 'none',
          }}
        >
          Welcome to the nexus of innovation, sustainability, and cosmic governance
        </p>
      </div>

      {/* Topic Cards */}
      <div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl w-full transition-all duration-1000"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        {TOPICS.map((topic, i) => (
          <div
            key={i}
            className={`relative bg-gradient-to-br ${topic.color} border ${topic.border} rounded-xl p-5 cursor-pointer transition-all duration-300 backdrop-blur-sm`}
            style={{
              animation: phase >= 2 ? `fadeInUp 0.6s ${i * 0.15}s both` : 'none',
              boxShadow: hovered === i ? `0 0 30px ${topic.glow}` : 'none',
              transform: hovered === i ? 'translateY(-4px) scale(1.02)' : 'none',
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="text-2xl mb-2">{topic.icon}</div>
            <h3
              className="text-lg font-bold text-white/90 mb-1"
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem' }}
            >
              {topic.title}
            </h3>
            <p
              className="text-sm text-white/50"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              {topic.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Scan Line Effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 50,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.01) 2px, rgba(0,229,255,0.01) 4px)',
        }}
      />

      {/* Bottom tag */}
      <div
        className="mt-16 text-center"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 1s ease',
          animation: phase >= 2 ? 'fadeInUp 1s 1s both' : 'none',
        }}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-cyan-400/60 tracking-widest uppercase">System Online</span>
        </div>
      </div>
    </div>
  );
}
